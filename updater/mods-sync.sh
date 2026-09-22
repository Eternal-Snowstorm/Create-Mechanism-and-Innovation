#!/usr/bin/env bash
# =============================================================================
#  mods-sync.sh —— 玩家端: 按 update.tsv 校验/下载 mods, 按 delete.tsv 清理旧版本
#
#  调用时机: git 同步完成之后(由 update-from-gitee.sh / setup-gitee-sync.sh 调用)
#
#  流程:
#    1) 解析清单 update.tsv(5 列: sha1 | path | url | project | replaces)
#    2) 汇总"需要下架/替换"的旧 jar:
#         = delete.tsv 中仍在本地且不在新清单里的
#         ∪ 各清单条目 replaces 字段里记录的"被本条目取代的旧 jar"
#    3) 先把这些旧 jar 备份到 updater/.rollback/<时间戳>/ (不立即彻底删除)
#    4) 按清单里的第三方直链下载"缺失或 sha1 不符"的 jar:
#         mods/xxx.jar <- https://edge.forgecdn.net/...  (CurseForge CDN)
#                      或 https://cdn.modrinth.com/...   (Modrinth CDN)
#    5) 任一 mod 下载失败 -> 把它被替换掉的旧版本从备份恢复回原位,
#       使该 mod 回到"上一个可用版本", 游戏仍能正常启动
#    6) 全过程写入 updater/logs/update-<时间戳>.log;
#       有失败时用中文提示玩家把该日志发送给开发者
#
#  用法:
#    bash updater/mods-sync.sh [--dry-run]
#
#  安全: 只操作 mods/ config/ kubejs/ defaultconfigs/ resourcepacks/,
#        绝不触碰 saves、options.txt 与服务器数据。
# =============================================================================
set -uo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$BASE_DIR/.." && pwd)"
MANIFEST="$ROOT/updater/update.tsv"
DELETE_LIST="$ROOT/updater/delete.tsv"
LOG_DIR="$ROOT/updater/logs"
BACKUP_ROOT="$ROOT/updater/.rollback"

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

cd "$ROOT" || exit 1

# --- 日志 ---------------------------------------------------------------
STAMP="$(date +%Y%m%d-%H%M%S)"
LOG_FILE="$LOG_DIR/update-$STAMP.log"
mkdir -p "$LOG_DIR" 2>/dev/null || true
if [ -d "$LOG_DIR" ]; then
  {
    echo "==== CMI 整合包 mods 更新日志 ===="
    echo "时间      : $(date '+%Y-%m-%d %H:%M:%S')"
    echo "客户端根目录: $ROOT"
    echo "清单文件  : $MANIFEST"
    echo "----------------------------------"
  } >> "$LOG_FILE" 2>/dev/null || true
else
  LOG_FILE=""
fi

log() {
  printf '%s\n' "$*"
  [ -n "$LOG_FILE" ] && printf '%s\n' "$*" >> "$LOG_FILE"
  return 0
}
warn() {
  printf '%s\n' "$*" >&2
  [ -n "$LOG_FILE" ] && printf '%s\n' "$*" >> "$LOG_FILE"
  return 0
}

# --- 工具函数 -----------------------------------------------------------
sha1_file() {
  if command -v sha1sum >/dev/null 2>&1; then
    sha1sum "$1" | awk '{print $1}'
  elif command -v openssl >/dev/null 2>&1; then
    openssl sha1 "$1" | awk '{print $NF}'
  elif command -v certutil >/dev/null 2>&1; then
    certutil -hashfile "$1" SHA1 | sed -n '2p' | tr -d ' \r'
  else
    return 1
  fi
}

safe_path() {
  local p="$1"
  [ -z "$p" ] && return 1
  case "$p" in
    /*|\*) return 1 ;;
  esac
  case "$p" in
    *..*) return 1 ;;
  esac
  case "$p" in
    mods/*|config/*|kubejs/*|defaultconfigs/*|resourcepacks/*) return 0 ;;
    *) return 1 ;;
  esac
}

# 去掉行首尾空白与 \r(不用 xargs, 避免它把文件名里的引号当转义符)
trim() {
  local s="$1"
  s="${s%$'\r'}"
  s="${s#"${s%%[![:space:]]*}"}"
  s="${s%"${s##*[![:space:]]}"}"
  printf '%s' "$s"
}

# 黑名单: 文件名以 "[]" 开头的 mod 不参与同步(与 dev/make-update-json.sh 的约定一致)。
# 这类文件由玩家自行持有, 既不在 update.tsv 里, 也绝不能被 delete.tsv / replaces
# 流程删除 —— 否则历史 delete.tsv 里一旦混入同样的路径, 每次更新都会把它清掉。
is_blacklisted() {
  local b="${1##*/}"
  case "$b" in
    '[]'*) return 0 ;;
  esac
  return 1
}

# 黑名单保护计数器(仅用于日志汇总)
BL_SKIP=0

# mod 名主干: 与 make-update-json.sh 保持一致, 用于把失败项匹配到它的旧版本备份
mod_key() {
  local b="$1"
  b="${b##*/}"
  b="${b%.jar}"; b="${b%.disabled}"
  b="$(printf '%s' "$b" | sed 's/[0-9].*$//')"
  b="$(printf '%s' "$b" | sed 's/[^A-Za-z0-9]*$//')"
  printf '%s' "$b" | tr 'A-Z' 'a-z'
}

# --- 1. 解析清单 --------------------------------------------------------
if [ ! -f "$MANIFEST" ]; then
  log "[mods] 未找到 update.tsv, 跳过 mods 同步"
  exit 0
fi

M_HASH=(); M_PATH=(); M_URL=(); M_REPS=()
while IFS=$'\t' read -r h p u proj reps || [ -n "$p" ]; do
  h="$(trim "$h")"; p="$(trim "$p")"; u="$(trim "$u")"; reps="$(trim "$reps")"
  [ -n "$p" ] || continue
  safe_path "$p" || continue
  M_HASH+=("$h"); M_PATH+=("$p"); M_URL+=("$u"); M_REPS+=("$reps")
done < "$MANIFEST"

if [ "${#M_PATH[@]}" -eq 0 ]; then
  log "[mods] 清单为空, 跳过 mods 同步"
  exit 0
fi

# 仍在清单中的路径 = 受保护, 绝不删除(下架后又被重新加入的 mod 走这里)
PROTECTED="$(mktemp)"
for p in "${M_PATH[@]}"; do printf '%s\n' "$p"; done > "$PROTECTED"

# --- 2. 汇总待下架/待替换的旧 jar ---------------------------------------
PENDING="$(mktemp)"
: > "$PENDING"

# 2a. delete.tsv(累积的历史下架项)
if [ -f "$DELETE_LIST" ]; then
  while IFS= read -r p || [ -n "$p" ]; do
    p="$(trim "$p")"
    safe_path "$p" || continue
    grep -qxF "$p" "$PROTECTED" && continue
    if is_blacklisted "$p"; then BL_SKIP=$((BL_SKIP+1)); continue; fi
    [ -e "$ROOT/$p" ] || continue
    printf '%s\n' "$p" >> "$PENDING"
  done < "$DELETE_LIST"
fi

# 2b. 清单里 replaces 字段(本次"版本更替"被取代的旧 jar)
for i in "${!M_PATH[@]}"; do
  reps="${M_REPS[$i]}"
  [ -n "$reps" ] || continue
  IFS=',' read -r -a _rp <<< "$reps"
  for op in "${_rp[@]}"; do
    op="$(trim "$op")"
    safe_path "$op" || continue
    grep -qxF "$op" "$PROTECTED" && continue
    if is_blacklisted "$op"; then BL_SKIP=$((BL_SKIP+1)); continue; fi
    [ -e "$ROOT/$op" ] || continue
    printf '%s\n' "$op" >> "$PENDING"
  done
done

# 2c. 自愈: 清单中的 mod 在 mods/ 下残留的其它版本(同名主干)
#     若历史 delete.tsv 漏记了某个下架项, 新旧两个 jar 会并存, Forge 会以
#     "Duplicate mods" 直接崩溃启动; 这里按 mod 名主干兜底清理。
#     只扫 mods/*.jar, 并且只清理"与清单中某个 mod 同主干"的文件 ——
#     玩家自己添加的、与清单无关的 mod 不会被碰。
#     注意: mod_key 用 printf '%s' 输出(不带换行), 这里必须自己补 \n,
#           否则所有 key 会粘成一行, 下面的整行匹配就永远失效。
LIST_KEYS="$(mktemp)"
for i in "${!M_PATH[@]}"; do
  case "${M_PATH[$i]}" in
    mods/*) printf '%s\n' "$(mod_key "${M_PATH[$i]}")" ;;
  esac
done | sort -u > "$LIST_KEYS"
if [ -s "$LIST_KEYS" ] && [ -d "$ROOT/mods" ]; then
  for _f in "$ROOT"/mods/*.jar; do
    [ -f "$_f" ] || continue
    _rel="mods/$(basename "$_f")"
    grep -qxF "$_rel" "$PROTECTED" && continue
    if is_blacklisted "$_rel"; then BL_SKIP=$((BL_SKIP+1)); continue; fi
    _k="$(mod_key "$_rel")"
    grep -qxF "$_k" "$LIST_KEYS" || continue
    printf '%s\n' "$_rel" >> "$PENDING"
  done
fi
rm -f "$LIST_KEYS" 2>/dev/null || true

sort -u "$PENDING" -o "$PENDING"

# --- 3. 备份待删除的旧 jar ---------------------------------------------
BACKUP_DIR="$BACKUP_ROOT/$STAMP"
BK_COUNT=0
if [ -s "$PENDING" ]; then
  if [ "$DRY_RUN" = "1" ]; then
    while IFS= read -r p; do
      [ -n "$p" ] || continue
      log "[mods][dry-run] 将删除/替换(会先备份): $p"
    done < "$PENDING"
  else
    while IFS= read -r p; do
      [ -n "$p" ] || continue
      mkdir -p "$BACKUP_DIR/$(dirname "$p")" 2>/dev/null || true
      if mv -f "$ROOT/$p" "$BACKUP_DIR/$p" 2>/dev/null; then
        BK_COUNT=$((BK_COUNT+1))
        log "[mods] 已移出旧版本(备份待清理): $p"
      else
        warn "[mods] 旧版本移出失败(可能被占用), 保持原样: $p"
      fi
    done < "$PENDING"
  fi
fi

# --- 4. 按清单下载缺失 / 校验不符的 jar ---------------------------------
total=0; skipped=0; downloaded=0; failed=0; nosource=0
FAIL_TABLE="$(mktemp)"; : > "$FAIL_TABLE"

for i in "${!M_PATH[@]}"; do
  h="${M_HASH[$i]}"; p="${M_PATH[$i]}"; u="${M_URL[$i]}"; reps="${M_REPS[$i]}"
  total=$((total+1))
  dest="$ROOT/$p"

  # 本地已是最新 -> 跳过
  if [ -f "$dest" ] && [ -n "$h" ]; then
    cur="$(sha1_file "$dest" 2>/dev/null || true)"
    if [ "$cur" = "$h" ]; then skipped=$((skipped+1)); continue; fi
  fi

  # 清单没有下载地址 -> 无法处理
  if [ -z "$u" ]; then
    nosource=$((nosource+1))
    if [ "$DRY_RUN" = "1" ]; then
      log "[mods][dry-run] 缺失且无源: $p"
    else
      warn "[mods] 无源(清单未提供下载地址): $p"
    fi
    continue
  fi

  if [ "$DRY_RUN" = "1" ]; then
    log "[mods][dry-run] 将下载: $p"
    log "               <- $u"
    continue
  fi

  mkdir -p "$(dirname "$dest")" 2>/dev/null || true
  tmp="$dest.download"
  rm -f "$tmp" 2>/dev/null || true

  log "[mods] 下载: $p"
  log "       <- $u"
  if curl -L --fail --retry 3 --retry-delay 2 --connect-timeout 20 -o "$tmp" "$u"; then
    got="$(sha1_file "$tmp" 2>/dev/null || true)"
    if [ -n "$h" ] && [ "$got" != "$h" ]; then
      warn "[mods] 失败(sha1 不匹配): $p"
      warn "       期望 sha1: $h"
      warn "       实际 sha1: $got"
      warn "       下载地址 : $u"
      rm -f "$tmp" 2>/dev/null || true
      failed=$((failed+1))
      printf '%s\t%s\t%s\n' "$p" "$reps" "$u" >> "$FAIL_TABLE"
    else
      if mv -f "$tmp" "$dest" 2>/dev/null; then
        downloaded=$((downloaded+1))
        log "[mods] 完成: $p"
      else
        warn "[mods] 失败(无法写入目标文件, 可能被游戏占用): $p"
        rm -f "$tmp" 2>/dev/null || true
        failed=$((failed+1))
        printf '%s\t%s\t%s\n' "$p" "$reps" "$u" >> "$FAIL_TABLE"
      fi
    fi
  else
    rc=$?
    warn "[mods] 失败(下载出错, curl 退出码 $rc): $p"
    warn "       下载地址 : $u"
    rm -f "$tmp" 2>/dev/null || true
    failed=$((failed+1))
    printf '%s\t%s\t%s\n' "$p" "$reps" "$u" >> "$FAIL_TABLE"
  fi
done

# --- 5. 下载失败的 mod: 恢复它被替换掉的旧版本 --------------------------
RESTORED=0
if [ "$failed" -gt 0 ] && [ "$DRY_RUN" = "0" ] && [ -d "$BACKUP_DIR" ]; then
  log ""
  log "[mods] 检测到 $failed 个 mod 更新失败, 正在恢复它们的旧版本 ..."
  while IFS=$'\t' read -r fp freps furl; do
    [ -n "$fp" ] || continue
    restored_this=0

    # 5a. 优先按清单 replaces 精确恢复
    if [ -n "$freps" ]; then
      IFS=',' read -r -a _rp <<< "$freps"
      for op in "${_rp[@]}"; do
        op="$(trim "$op")"
        [ -n "$op" ] || continue
        if [ -f "$BACKUP_DIR/$op" ]; then
          mkdir -p "$(dirname "$ROOT/$op")" 2>/dev/null || true
          if mv -f "$BACKUP_DIR/$op" "$ROOT/$op" 2>/dev/null; then
            log "[mods] 已恢复旧版本: $op   (因为 $fp 更新失败)"
            RESTORED=$((RESTORED+1)); restored_this=1
          fi
        fi
      done
    fi

    # 5b. 没有 replaces 记录时, 按 mod 名主干在备份里找同一 mod 的旧版本
    if [ "$restored_this" = "0" ]; then
      fkey="$(mod_key "$fp")"
      if [ -n "$fkey" ]; then
        while IFS= read -r cand; do
          [ -n "$cand" ] || continue
          [ "$(mod_key "$cand")" = "$fkey" ] || continue
          if [ -f "$BACKUP_DIR/$cand" ]; then
            mkdir -p "$(dirname "$ROOT/$cand")" 2>/dev/null || true
            if mv -f "$BACKUP_DIR/$cand" "$ROOT/$cand" 2>/dev/null; then
              log "[mods] 已恢复旧版本: $cand   (按 mod 名匹配到失败的 $fp)"
              RESTORED=$((RESTORED+1)); restored_this=1
            fi
            break
          fi
        done < "$PENDING"
      fi
    fi

    if [ "$restored_this" = "0" ]; then
      log "[mods] 该 mod 没有可恢复的旧版本(本就是新增文件), 保持缺失: $fp"
    fi
  done < "$FAIL_TABLE"
fi

# --- 6. 清理备份目录 ----------------------------------------------------
if [ "$DRY_RUN" = "0" ] && [ -d "$BACKUP_DIR" ]; then
  if [ "$failed" -eq 0 ]; then
    rm -rf "$BACKUP_DIR" 2>/dev/null || true
    rmdir "$BACKUP_ROOT" 2>/dev/null || true
  else
    # 有失败时保留备份(若恢复后仍有剩余文件), 便于玩家/开发者手动回滚
    if [ -n "$(ls -A "$BACKUP_DIR" 2>/dev/null)" ]; then
      log "[mods] 部分更新失败, 未恢复的旧文件备份保留在: $BACKUP_DIR"
    else
      log "[mods] 失败项的旧版本均已恢复, 无需保留额外备份。"
    fi
  fi
fi

rm -f "$PROTECTED" "$PENDING" "$FAIL_TABLE" 2>/dev/null || true

# --- 7. 汇总与中文提示 --------------------------------------------------
log ""
if [ "$BL_SKIP" -gt 0 ]; then
  log "[mods] 黑名单保护: 已跳过 $BL_SKIP 个以 [] 开头的文件(不删除/不替换)"
fi
log "[mods] 完成: 总数 $total, 已最新 $skipped, 已下载 $downloaded, 失败 $failed, 无源 $nosource"
[ "$DRY_RUN" = "1" ] && { log "[mods] (dry-run 模式, 未做任何实际改动)"; exit 0; }

if [ "$failed" -gt 0 ]; then
  log ""
  log "============================================================"
  log "[提示] 本次有 $failed 个 mod 没能更新成功。"
  if [ "$RESTORED" -gt 0 ]; then
    log "       相关 mod 的旧版本已自动恢复($RESTORED 个文件), 游戏仍可正常启动。"
  fi
  log "       请把下面这个日志文件发送给开发者, 以便我们排查原因:"
  log "       $LOG_FILE"
  log "============================================================"
  exit 1
fi

exit 0
