# =============================================================================
#  setup-gitee-sync.sh —— 玩家端: 首次同步(建立 git 仓库与远程, 再拉取完整内容)
#
#  【更新源优先级】与 update-from-gitee.sh 一致: 优先 GitHub 主仓库, 连不上则回退 Gitee:
#    1) GitHub : 远程 origin, 分支自动探测(读不到 symref 时按 main)
#    2) Gitee  : 远程 gitee,  分支 master
#    与 update 的唯一区别: setup 会主动做初始化工作 ——
#      · 没有 .git 就 git init
#      · 没有 origin 就尝试 git remote add origin <GitHub 仓库>, 并探测是否可用
#      · gitee 远程缺失或指向别的仓库时, 重建为官方镜像地址
#
#  【为什么还叫 setup-gitee-sync】文件名保留是为了不破坏既有文档链接、快捷方式与
#    玩家双击习惯; 内部逻辑已改为 GitHub 优先。
#
#  【手动指定源】--source auto|github|gitee, 默认 auto。
#
#  用法:
#    bash updater/setup-gitee-sync.sh [--source auto|github|gitee]
# =============================================================================
set -uo pipefail
# 注意: 这里刻意不用 set -e —— 本脚本要按退出码分叉("GitHub 失败就回退 Gitee"),
# set -e 会在第一条失败的命令处直接中止, 回退分支就永远走不到了。

cd "$(dirname "$0")/.." || { echo "[错误] 无法进入整合包目录。"; exit 1; }

# GitHub 主仓库
GH_REMOTE="origin"
GH_URL="https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation.git"
GH_FALLBACK_BRANCH="main"
# Gitee 镜像仓库
GT_REMOTE="gitee"
GT_URL="https://gitee.com/eternalsnowstorm/mechanism-and-innovation"
GT_BRANCH="master"

# 网络兜底: 速率低于 1KB/s 持续 20 秒即判定连接已死, 免得连不上 GitHub 时长时间挂住
GIT_NET_OPTS=(-c http.lowSpeedLimit=1000 -c http.lowSpeedTime=20)

# 绝不允许 git 弹出凭据提示
export GIT_TERMINAL_PROMPT=0

usage() {
  echo "用法: bash updater/setup-gitee-sync.sh [--source auto|github|gitee]"
  echo ""
  echo "  --source auto    (默认) 优先 GitHub, 连不上则回退 Gitee 镜像"
  echo "  --source github  只用 GitHub, 连不上直接报错(不静默回退)"
  echo "  --source gitee   只用 Gitee 镜像"
}

fail() {
  echo ""
  echo "$1"
  shift
  if [ "$#" -gt 0 ]; then
    for h in "$@"; do echo "       $h"; done
  fi
  exit 1
}

# 有 timeout 命令时给 git 加硬超时(防"连不上"时长时间挂住); 没有就直接跑
run_timeout() {
  local secs="$1"
  shift
  if command -v timeout >/dev/null 2>&1; then
    timeout -k 5 "$secs" "$@"
  else
    "$@"
  fi
}

# 探测远程可访问性: 成功返回 0 并输出默认分支; 失败返回非 0
probe_remote() {
  local remote="$1" out rc hash branch
  out="$(run_timeout 60 git "${GIT_NET_OPTS[@]}" ls-remote --symref "$remote" HEAD 2>/dev/null)"
  rc=$?
  [ "$rc" -eq 0 ] || return 1
  hash="$(printf '%s\n' "$out" | awk '$2 == "HEAD" && $1 ~ /^[0-9a-fA-F]{40}$/ { print $1; exit }')"
  [ -n "$hash" ] || return 1
  branch="$(printf '%s\n' "$out" | sed -n 's/^ref: refs\/heads\/\([^[:space:]]*\)[[:space:]]*HEAD$/\1/p' | head -n 1)"
  [ -n "$branch" ] || branch="$GH_FALLBACK_BRANCH"
  printf '%s' "$branch"
  return 0
}

remote_url() { git config --get "remote.$1.url" 2>/dev/null; }

# GitHub 与 Gitee 的仓库名都含 mechanism-and-innovation
is_pack_url() {
  [ -n "$1" ] || return 1
  case "$(printf '%s' "$1" | tr 'A-Z' 'a-z')" in
    *mechanism-and-innovation*) return 0 ;;
  esac
  return 1
}

SYNC_RESULT=""

fetch_remote() {
  local remote="$1" branch="$2" refspec i
  refspec="+refs/heads/$branch:refs/remotes/$remote/$branch"
  for i in 1 2; do
    echo "       正在下载最新版本 (第 $i/2 次) ..."
    if run_timeout 600 git "${GIT_NET_OPTS[@]}" fetch --no-tags --progress "$remote" "$refspec"; then
      return 0
    fi
    if [ "$i" -lt 2 ]; then
      echo "       下载中断, 3 秒后重试 ..."
      sleep 3
    fi
  done
  return 1
}

# 拉取 + 落地。结果写入 SYNC_RESULT: ok / fetch-fail / apply-fail
sync_from() {
  local remote="$1" branch="$2"
  SYNC_RESULT=""
  if ! fetch_remote "$remote" "$branch"; then
    SYNC_RESULT="fetch-fail"
    return
  fi
  echo "正在应用更新到本客户端 ..."
  if git reset --hard "$remote/$branch"; then
    SYNC_RESULT="ok"
  else
    SYNC_RESULT="apply-fail"
  fi
}

parse_args() {
  SOURCE="auto"
  while [ "$#" -gt 0 ]; do
    case "$1" in
      --source)
        if [ "$#" -lt 2 ]; then
          echo "[错误] --source 需要一个取值: auto / github / gitee。"
          exit 1
        fi
        SOURCE="$2"
        shift 2
        ;;
      --source=*)
        SOURCE="${1#*=}"
        shift
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        echo "[错误] 未知参数: $1"
        usage
        exit 1
        ;;
    esac
  done
  case "$SOURCE" in
    auto|github|gitee) ;;
    *)
      echo "[错误] --source 只接受 auto / github / gitee, 收到: $SOURCE"
      exit 1
      ;;
  esac
}

show_source_line() {
  case "$SOURCE" in
    github) echo "更新源: 仅 GitHub" ;;
    gitee)  echo "更新源: 仅 Gitee 镜像" ;;
    *)      echo "更新源: 自动(优先 GitHub, 连不上则回退 Gitee 镜像)" ;;
  esac
}

check_git() {
  command -v git >/dev/null 2>&1 || fail "[错误] 未检测到 Git。请先安装 Git 再运行本脚本。" \
    "Windows / Linux / macOS 的安装方式见: https://git-scm.com/downloads"
}

# --- 参数与环境 -------------------------------------------------------------
parse_args "$@"

echo ""
echo "============================================================"
echo "   CMI 整合包 首次同步"
echo "============================================================"
echo ""
show_source_line

check_git

# --- 1. 初始化 git 仓库 -----------------------------------------------------
if [ ! -d .git ]; then
  echo ""
  echo "正在初始化 Git 仓库 ..."
  git init -q || fail "[错误] 初始化 Git 仓库失败。" \
    "请确认整合包目录可以正常读写, 且没有被杀毒软件锁定。"
fi

# --- 2. 准备远程: gitee 镜像始终可用, GitHub 有就优先 -------------------------
gt_url="$(remote_url "$GT_REMOTE")"
if [ "$gt_url" = "$GT_URL" ]; then
  :
else
  if [ -n "$gt_url" ]; then
    echo "[提示] 现有 gitee 远程指向其它仓库, 正在改回官方镜像: $gt_url"
  else
    echo "[提示] 未找到 gitee 远程, 正在添加 ..."
  fi
  git remote remove "$GT_REMOTE" >/dev/null 2>&1 || true
  git remote add "$GT_REMOTE" "$GT_URL" || fail "[错误] 添加 gitee 远程失败。" \
    "可以先手动执行: git remote add gitee $GT_URL" \
    "再重新运行本脚本。"
fi

prefer_github=0
gh_branch=""

if [ "$SOURCE" = "gitee" ]; then
  echo ""
  echo "[提示] 已按 --source gitee 强制使用 Gitee 镜像。"
else
  origin_url="$(remote_url "$GH_REMOTE")"
  if [ -z "$origin_url" ]; then
    echo ""
    echo "[提示] 未找到 GitHub 远程, 正在添加 ..."
    if git remote add "$GH_REMOTE" "$GH_URL" 2>/dev/null; then
      origin_url="$(remote_url "$GH_REMOTE")"
    fi
    [ -n "$origin_url" ] || echo "[提示] 添加 GitHub 远程失败, 本次改用 Gitee 镜像。"
  fi

  if [ -z "$origin_url" ]; then
    if [ "$SOURCE" = "github" ]; then
      fail "[错误] 无法建立 GitHub 远程(origin), 无法按 --source github 同步。" \
        "请检查整合包目录权限;" \
        "或改用 --source auto / --source gitee。"
    fi
    echo "[提示] 本次改用 Gitee 镜像同步(以后仍会优先尝试 GitHub)。"
  elif ! is_pack_url "$origin_url"; then
    echo "[提示] 现有 origin 远程指向其它仓库, 本次不使用它: $origin_url"
    echo "       若想改用官方 GitHub 仓库, 可执行: git remote set-url origin $GH_URL"
  else
    echo ""
    echo "正在检测 GitHub 是否可用 ..."
    if gh_branch="$(probe_remote "$GH_REMOTE")"; then
      prefer_github=1
      echo "       GitHub 可用, 目标分支: $gh_branch"
    elif [ "$SOURCE" = "github" ]; then
      fail "[错误] 连不上 GitHub, 或当前网络无法访问它。" \
        "1) 用浏览器打开 https://github.com/ 确认能不能访问;" \
        "2) 若平时需要代理 / VPN 才能上 GitHub, 请先开好再重试;" \
        "3) 也可以改用 Gitee 镜像: 在命令后加 --source gitee。"
    else
      echo "[提示] 连不上 GitHub, 本次改用 Gitee 镜像同步(下次仍会先试 GitHub)。"
    fi
  fi
fi

# --- 3. 拉取并应用 ----------------------------------------------------------
used_source=""

if [ "$prefer_github" -eq 1 ]; then
  echo ""
  echo "=== 从 GitHub 拉取完整内容 (分支 $gh_branch) ==="
  sync_from "$GH_REMOTE" "$gh_branch"
  if [ "$SYNC_RESULT" = "ok" ]; then
    used_source="GitHub"
  elif [ "$SYNC_RESULT" = "apply-fail" ]; then
    fail "[错误] GitHub 内容已下载, 但写入本客户端失败。" \
      "如果游戏或启动器还开着, 请完全退出后重试;" \
      "若反复失败, 请把本终端的输出发给开发者。"
  elif [ "$SOURCE" = "auto" ]; then
    echo ""
    echo "[提示] 从 GitHub 下载失败, 改用 Gitee 镜像重试 ..."
  else
    fail "[错误] 从 GitHub 拉取失败, 请检查网络后重试。" \
      "若平时需要代理 / VPN 才能上 GitHub, 请先开好再重试;" \
      "也可以改用 Gitee 镜像: 在命令后加 --source gitee。"
  fi
fi

if [ -z "$used_source" ]; then
  echo ""
  echo "=== 从 Gitee 镜像拉取完整内容 (分支 $GT_BRANCH) ==="
  sync_from "$GT_REMOTE" "$GT_BRANCH"
  if [ "$SYNC_RESULT" = "ok" ]; then
    used_source="Gitee"
  elif [ "$SYNC_RESULT" = "apply-fail" ]; then
    fail "[错误] Gitee 内容已下载, 但写入本客户端失败。" \
      "如果游戏或启动器还开着, 请完全退出后重试;" \
      "若反复失败, 请把本终端的输出发给开发者。"
  elif [ "$prefer_github" -eq 1 ]; then
    fail "[错误] GitHub 与 Gitee 都无法访问, 本次同步未完成。" \
      "请检查网络连接后重试;" \
      "若只希望用其中一个源, 可显式指定: --source github 或 --source gitee。"
  else
    fail "[错误] 从 Gitee 拉取失败, 请检查网络后重试。" \
      "若反复失败, 请把本终端的输出发给开发者。"
  fi
fi

# --- 4. 按清单同步 mods -----------------------------------------------------
echo ""
echo "正在按更新清单下载 / 校验 mods [第三方直链] ..."
if ! bash updater/mods-sync.sh; then
  echo ""
  echo "[提示] 本次有部分 mod 没能更新成功。"
  echo "       失败的 mod 已自动恢复为旧版本, 游戏仍可正常启动。"
  echo "       请把 updater/logs/ 目录下最新的那个日志文件发送给开发者, 以便排查;"
  echo "       也可以直接重新运行本脚本重试 [只会重新下载失败的那几个]。"
  exit 1
fi

echo ""
echo "完成! 本客户端已与 $used_source 同步。"
echo "以后运行 update-from-gitee.sh 即可拉取更新(仍会优先尝试 GitHub)。"
