#!/usr/bin/env bash
# =============================================================================
#  mods-sync.sh —— 玩家端: 按 update.tsv 校验/下载 mods, 按 delete.tsv 清理旧版本
#
#  调用时机: git 同步完成之后(由 setup-gitee-sync.sh 调用; Windows 侧由 sync.ps1 或 update-cmi.ps1 调用)
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
#    bash updater/mods-sync.sh [--dry-run] [--proxy <url>] [--no-mirror]
#
#  网络容错(2026-11-15 玩家日志 curl 退出码 6 事故后加入):
#    - CurseForge 官方 CDN 有两个等价域名(edge.forgecdn.net / mediafilez.forgecdn.net),
#      原地址失败会自动切换备用域名; --no-mirror 可关闭该行为(排障用).
#    - 下载前先做域名解析预检, 预检全部失败时直接中止, 不移动本地任何文件.
#    - 支持代理: --proxy 参数, 或 http(s)_proxy 环境变量(curl 自动读取).
#    - 失败时打印 curl 退出码的中文含义, 以及可手动下载的项目页地址.
#
#  安全: 只操作 mods/ config/ kubejs/ defaultconfigs/ resourcepacks/,
#        绝不触碰 saves, options.txt 与服务器数据. 
# =============================================================================
set -uo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$BASE_DIR/.." && pwd)"
MANIFEST="$ROOT/updater/update.tsv"
DELETE_LIST="$ROOT/updater/delete.tsv"
LOG_DIR="$ROOT/updater/logs"
BACKUP_ROOT="$ROOT/updater/.rollback"

DRY_RUN=0
NO_MIRROR=0
PROXY_URL=""
PROXY_FROM=""
# 环境变量代理: curl 自身会读取, 这里额外记录来源用于日志提示
for _pn in HTTPS_PROXY https_proxy HTTP_PROXY http_proxy ALL_PROXY all_proxy; do
  eval "_pv=\"${_pn:-}\""
  if [ -n "$_pv" ]; then PROXY_URL="$_pv"; PROXY_FROM="环境变量"; break; fi
done
unset _pn _pv 2>/dev/null || true

while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run)   DRY_RUN=1 ;;
    --no-mirror) NO_MIRROR=1 ;;
    --proxy)     shift; PROXY_URL="${1:-}"; PROXY_FROM="命令行 --proxy" ;;
    --proxy=*)   PROXY_URL="${1#*=}"; PROXY_FROM="命令行 --proxy" ;;
    -h|--help)   echo "用法: bash updater/mods-sync.sh [--dry-run] [--proxy <url>] [--no-mirror]"; exit 0 ;;
  esac
  shift
done

# 只有命令行显式指定的代理才加 --proxy; 环境变量代理交给 curl 自己处理(以尊重 NO_PROXY)
CURL_PROXY=()
case "$PROXY_FROM" in
  命令行*) CURL_PROXY=(--proxy "$PROXY_URL") ;;
esac

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

# --- 代理日志 -----------------------------------------------------------
if [ -n "$PROXY_FROM" ]; then
  log "[mods] 代理: $PROXY_FROM $PROXY_URL"
else
  log "[mods] 代理: 未检测到(直连)"
fi

# --- 工具函数 -----------------------------------------------------------
# 取 URL 的主机名(去掉协议/路径/端口)
url_host() {
  local u="$1"
  u="${u#*://}"
  u="${u%%/*}"
  u="${u%%:*}"
  printf '%s' "$u"
}

# 内建备用域名: 只对 CurseForge 官方 CDN 生效(Modrinth 无公开镜像).
# mediafilez.forgecdn.net 与 edge.forgecdn.net 指向同一批文件, 实测 sha1 一致.
host_mirror() {
  case "$1" in
    edge.forgecdn.net)       printf '%s' "mediafilez.forgecdn.net" ;;
    mediafilez.forgecdn.net) printf '%s' "edge.forgecdn.net" ;;
    *)                       printf '' ;;
  esac
}

# 输出该地址的候选列表(每行一个): 原地址在前, 备用域名在后
build_candidates() {
  local u="$1" h m esc
  printf '%s\n' "$u"
  [ "$NO_MIRROR" = "1" ] && return 0
  h="$(url_host "$u")"
  [ -n "$h" ] || return 0
  m="$(host_mirror "$h")"
  [ -n "$m" ] || return 0
  esc="$(printf '%s' "$h" | sed 's/\./\\./g')"
  printf '%s\n' "$(printf '%s' "$u" | sed "s|//$esc/|//$m/|")"
  return 0
}

# 域名解析预检: 只判定"主机名能否解析", 不做 TCP 连接
probe_host() {
  local h="$1" rc=0 out=""
  if command -v getent >/dev/null 2>&1; then
    if getent hosts "$h" >/dev/null 2>&1; then printf 'ok'; else printf 'dns-fail'; fi
    return 0
  fi
  if command -v nslookup >/dev/null 2>&1; then
    # 注意: Windows 的 nslookup 对 NXDOMAIN 仍返回退出码 0, 必须看输出文本,
    # 否则"域名不存在"会被误判为可解析(实测 2026-11-15).
    out="$(nslookup "$h" 2>&1)"
    if printf '%s' "$out" | grep -qiE "can't find|NXDOMAIN|non-existent|找不到|不存在"; then
      printf 'dns-fail'
    elif printf '%s' "$out" | grep -qiE "timed out|no servers could be reached|超时|无法访问"; then
      printf 'net-fail'
    else
      printf 'ok'
    fi
    return 0
  fi
  curl -s -o /dev/null --connect-timeout 8 --max-time 15 ${CURL_PROXY[@]+"${CURL_PROXY[@]}"} "https://$h/" >/dev/null 2>&1
  rc=$?
  if [ "$rc" -eq 6 ]; then printf 'dns-fail'; elif [ "$rc" -ne 0 ]; then printf 'net-fail'; else printf 'ok'; fi
  return 0
}

# curl 退出码 -> 中文含义
curl_err_text() {
  case "$1" in
    1)  printf '%s' '不支持的协议' ;;
    2)  printf '%s' '初始化失败' ;;
    3)  printf '%s' '下载地址格式不正确' ;;
    5)  printf '%s' '无法解析代理服务器地址(代理设置有误)' ;;
    6)  printf '%s' '无法解析下载域名(网络断开 / DNS 被干扰 / 需要代理)' ;;
    7)  printf '%s' '无法连接下载服务器(网络不通或被防火墙拦截)' ;;
    18) printf '%s' '下载内容不完整(连接被中途断开)' ;;
    22) printf '%s' '服务器返回错误状态(文件可能已下架, 或该平台限流)' ;;
    23) printf '%s' '写入文件失败(磁盘空间不足或文件被占用)' ;;
    28) printf '%s' '连接超时(网络过慢或被拦截)' ;;
    35) printf '%s' 'TLS 握手失败(可能被网络中间设备干扰)' ;;
    51) printf '%s' '服务器证书校验失败' ;;
    52) printf '%s' '服务器返回空响应' ;;
    55) printf '%s' '发送数据失败' ;;
    56) printf '%s' '接收数据失败(连接被重置)' ;;
    60) printf '%s' 'HTTPS 证书校验失败(系统时间或证书链有问题)' ;;
    *)  printf '%s' '下载出错' ;;
  esac
}

# 失败时给玩家一条"可以自己动手"的路: 项目页 + 手动放置说明
manual_hint() {
  local u="$1" proj="$2" mid="" kind=""
  case "$proj" in
    modrinth:*) mid="${proj#modrinth:}"; [ -n "$mid" ] && kind="modrinth" ;;
  esac
  if [ -z "$kind" ]; then
    case "$u" in
      *'/data/'*)
        mid="$(printf '%s' "$u" | sed -n 's|.*/data/\([^/]*\)/.*|\1|p')"
        [ -n "$mid" ] && kind="modrinth"
        ;;
    esac
  fi
  if [ -z "$kind" ]; then
    case "$proj" in
      curseforge:*) mid="${proj#curseforge:}"; [ -n "$mid" ] && kind="curseforge" ;;
    esac
  fi
  case "$kind" in
    modrinth)   printf '%s\n' "项目页   : https://modrinth.com/project/$mid" ;;
    curseforge) printf '%s\n' "项目页   : https://www.curseforge.com/projects/$mid  (浏览器打开, 可能需要人机验证)" ;;
    *)          return 0 ;;
  esac
  printf '%s\n' "手动更新 : 在项目页下载同名 jar, 放入 mods/ 目录(先删掉旧的同名文件)"
  return 0
}

# 统一的失败输出: 原因 / 地址 / 备用地址 / 手动下载入口
report_fail() {
  local p="$1" u="$2" proj="$3" why="$4" tlist="$5" cu hl hint
  warn "[mods] 失败(下载出错): $p"
  warn "       原因     : $why"
  warn "       下载地址 : $u"
  while IFS= read -r cu; do
    [ -n "$cu" ] || continue
    [ "$cu" = "$u" ] && continue
    warn "       备用地址 : $cu"
  done <<< "$tlist"
  hint="$(manual_hint "$u" "$proj")"
  if [ -n "$hint" ]; then
    while IFS= read -r hl; do warn "       $hl"; done <<< "$hint"
  fi
  return 0
}

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

# 黑名单: 文件名以 "[]" 开头的 mod 不参与同步(与 dev/make-update-json.sh 的约定一致). 
# 这类文件由玩家自行持有, 既不在 update.tsv 里, 也绝不能被 delete.tsv / replaces
# 流程删除 —— 否则历史 delete.tsv 里一旦混入同样的路径, 每次更新都会把它清掉. 
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

M_HASH=(); M_PATH=(); M_URL=(); M_PROJ=(); M_REPS=()
while IFS=$'\t' read -r h p u proj reps || [ -n "$p" ]; do
  # 若 sha1 列为空(read 会吞掉行首制表符), 后续列会整体左移一位, 这里补回来,
  # 否则该条目会被误当成"路径是 http://..."而整条丢弃.
  case "$p" in
    http://*|https://*)
      _t_p="$h"; _t_u="$p"; _t_proj="$u"; _t_reps="$proj"
      h=""; p="$_t_p"; u="$_t_u"; proj="$_t_proj"; reps="$_t_reps" ;;
  esac
  h="$(trim "$h")"; p="$(trim "$p")"; u="$(trim "$u")"; proj="$(trim "$proj")"; reps="$(trim "$reps")"
  [ -n "$p" ] || continue
  safe_path "$p" || continue
  M_HASH+=("$h"); M_PATH+=("$p"); M_URL+=("$u"); M_PROJ+=("$proj"); M_REPS+=("$reps")
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
#     "Duplicate mods" 直接崩溃启动; 这里按 mod 名主干兜底清理. 
#     只扫 mods/*.jar, 并且只清理"与清单中某个 mod 同主干"的文件 ——
#     玩家自己添加的, 与清单无关的 mod 不会被碰. 
#     注意: mod_key 用 printf '%s' 输出(不带换行), 这里必须自己补 \n,
#           否则所有 key 会粘成一行, 下面的整行匹配就永远失效. 
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

# --- 2d. 网络预检 -------------------------------------------------------
# 在动任何本地文件之前, 先确认本次要用的下载域名能否解析.
# 若所有域名都解析失败(典型场景: 玩家网络无法访问 CurseForge), 直接中止,
# 避免"旧版本已被移出但新版本下不回来"的破坏性结果.
HOSTS_FILE="$(mktemp)"; : > "$HOSTS_FILE"
BAD_HOSTS="$(mktemp)"; : > "$BAD_HOSTS"
for i in "${!M_PATH[@]}"; do
  u="${M_URL[i]}"
  [ -n "$u" ] || continue
  _h="$(url_host "$u")"
  [ -n "$_h" ] && printf '%s\n' "$_h" >> "$HOSTS_FILE"
  if [ "$NO_MIRROR" != "1" ]; then
    _hm="$(host_mirror "$_h")"
    [ -n "$_hm" ] && printf '%s\n' "$_hm" >> "$HOSTS_FILE"
  fi
done
sort -u "$HOSTS_FILE" -o "$HOSTS_FILE"

HOST_TOTAL=0; HOST_BAD=0
while IFS= read -r h; do
  [ -n "$h" ] || continue
  HOST_TOTAL=$((HOST_TOTAL+1))
  if [ "$(probe_host "$h")" = "dns-fail" ]; then
    printf '%s\n' "$h" >> "$BAD_HOSTS"
    HOST_BAD=$((HOST_BAD+1))
  fi
done < "$HOSTS_FILE"

if [ "$HOST_TOTAL" -gt 0 ]; then
  if [ "$HOST_BAD" -eq 0 ]; then
    log "[mods] 网络预检: $HOST_TOTAL 个下载域名均可解析"
  else
    log ""
    log "[mods] 网络预检: $HOST_TOTAL 个下载域名中 $HOST_BAD 个无法解析"
    while IFS= read -r h; do
      [ -n "$h" ] && warn "       无法解析: $h"
    done < "$BAD_HOSTS"
    log "       可能原因: 网络未连接 / DNS 解析被干扰 / 需要代理或加速器"
    log "       有备用域名的会自动切换; 若仍然失败, 请开启代理后重新运行"
  fi
fi
if [ "$HOST_TOTAL" -gt 0 ] && [ "$HOST_BAD" -eq "$HOST_TOTAL" ] && [ "$DRY_RUN" = "0" ]; then
  log ""
  warn "[mods] 所有下载域名都无法解析, 本次未改动任何本地文件."
  warn "       请检查网络连接, 或开启代理后重试(支持 --proxy 参数 / http(s)_proxy 环境变量)."
  rm -f "$HOSTS_FILE" "$BAD_HOSTS" 2>/dev/null || true
  exit 1
fi

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
total=0; skipped=0; downloaded=0; failed=0; nosource=0; NET_FAIL=0
FAIL_TABLE="$(mktemp)"; : > "$FAIL_TABLE"
ERR_FILE="$(mktemp)"; : > "$ERR_FILE"

for i in "${!M_PATH[@]}"; do
  h="${M_HASH[$i]}"; p="${M_PATH[$i]}"; u="${M_URL[$i]}"; proj="${M_PROJ[$i]}"; reps="${M_REPS[$i]}"
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

  # 候选地址(原地址 + 内建备用域名); 预检判为不可解析的域名直接跳过
  cands="$(build_candidates "$u")"
  try_list=""
  while IFS= read -r cu; do
    [ -n "$cu" ] || continue
    ch="$(url_host "$cu")"
    if [ -n "$ch" ] && grep -qxF "$ch" "$BAD_HOSTS" 2>/dev/null; then continue; fi
    try_list="${try_list}${cu}"$'\n'
  done <<< "$cands"
  if [ -z "$try_list" ]; then try_list="$cands"; fi

  ok=0; why=""; is_net=0; ntry=0; http_code=""
  while IFS= read -r cu; do
    [ -n "$cu" ] || continue
    ntry=$((ntry+1))
    if [ "$ntry" -gt 1 ]; then log "       <- 改用备用地址: $cu"; fi
    rm -f "$tmp" 2>/dev/null || true
    http_code="$(curl -L --fail -s -S --retry 2 --retry-delay 2 --connect-timeout 20 ${CURL_PROXY[@]+"${CURL_PROXY[@]}"} -w '%{http_code}' -o "$tmp" "$cu" 2>"$ERR_FILE")"
    rc=$?
    if [ "$http_code" = "429" ]; then
      is_net=1; why="服务器限流(HTTP 429, 请求过于频繁)"; continue
    fi
    if [ "$rc" -ne 0 ]; then
      is_net=0
      case "$rc" in 5|6|7|18|28|35|52|56) is_net=1 ;; esac
      why="curl 退出码 $rc ($(curl_err_text "$rc"))"
      emsg="$(tr '\n' ' ' < "$ERR_FILE" 2>/dev/null | sed 's/  */ /g' | cut -c1-300)"
      if [ -n "$emsg" ]; then why="$why - $emsg"; fi
      continue
    fi
    got="$(sha1_file "$tmp" 2>/dev/null || true)"
    if [ -n "$h" ] && [ "$got" != "$h" ]; then
      is_net=0; why="sha1 不匹配(期望 $h, 实际 $got)"; continue
    fi
    if mv -f "$tmp" "$dest" 2>/dev/null; then
      downloaded=$((downloaded+1)); ok=1; log "[mods] 完成: $p"; break
    else
      is_net=0; why="无法写入目标文件(可能被游戏占用)"
    fi
  done <<< "$try_list"

  if [ "$ok" != "1" ]; then
    rm -f "$tmp" 2>/dev/null || true
    report_fail "$p" "$u" "$proj" "$why" "$try_list"
    failed=$((failed+1))
    if [ "$is_net" = "1" ]; then NET_FAIL=$((NET_FAIL+1)); fi
    printf '%s\t%s\t%s\n' "$p" "$reps" "$u" >> "$FAIL_TABLE"
  fi
done

# --- 5. 下载失败的 mod: 恢复它被替换掉的旧版本 --------------------------
RESTORED=0; MISSING=0
if [ "$failed" -gt 0 ] && [ "$DRY_RUN" = "0" ]; then
  log ""
  log "[mods] 检测到 $failed 个 mod 更新失败, 正在检查可恢复的旧版本 ..."
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
      MISSING=$((MISSING+1))
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
      log "[mods] 失败项的旧版本均已恢复, 无需保留额外备份. "
    fi
  fi
fi

rm -f "$PROTECTED" "$PENDING" "$FAIL_TABLE" "${HOSTS_FILE:-}" "${BAD_HOSTS:-}" "${ERR_FILE:-}" 2>/dev/null || true

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
  log "[提示] 本次有 $failed 个 mod 没能更新成功. "
  if [ "$MISSING" -gt 0 ]; then
    log "       其中 $MISSING 个 mod 本地没有旧版本可恢复, 缺失会导致游戏启动失败, 请务必补上. "
  fi
  if [ "$RESTORED" -gt 0 ]; then
    log "       相关 mod 的旧版本已自动恢复($RESTORED 个文件), 游戏仍可正常启动. "
  fi
  if [ "$NET_FAIL" -gt 0 ]; then
    log "       $NET_FAIL 个属于网络类失败(域名解析失败/连接中断/超时/服务器限流). "
    log "       排查顺序: 1) 检查本机网络连接 2) 开启代理或加速器后重新运行"
    log "                 3) 也可用 --proxy 参数, 或按上面的「项目页」地址手动下载"
  fi
  log "       请把下面这个日志文件发送给开发者, 以便我们排查原因:"
  log "       $LOG_FILE"
  log "============================================================"
  exit 1
fi

exit 0
