#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE_URL="https://gitee.com/eternalsnowstorm/mechanism-and-innovation"
BRANCH="master"

command -v git >/dev/null 2>&1 || {
  echo "[错误] 未找到 git, 请先安装 Git for Windows。"
  exit 1
}

if [ ! -d .git ]; then
  echo "[错误] 当前目录还不是 git 仓库, 请先运行 setup-gitee-sync.sh 建立同步。"
  exit 1
fi

git remote get-url gitee >/dev/null 2>&1 || {
  echo "[提示] 未找到 gitee 远程, 正在添加..."
  git remote add gitee "$REMOTE_URL"
}

echo "=== 从 Gitee 镜像拉取最新内容 ==="
git fetch gitee
echo "正在应用更新到本客户端..."
git reset --hard "gitee/$BRANCH"

echo "正在按更新清单下载 / 校验 mods(第三方直链)..."
if ! bash "$(dirname "$0")/mods-sync.sh"; then
  echo
  echo "[提示] 本次有部分 mod 没能更新成功。"
  echo "       失败的 mod 已自动恢复为旧版本, 游戏仍可正常启动。"
  echo "       请把 updater/logs/ 目录下最新的那个日志文件发送给开发者, 以便排查;"
  echo "       也可以直接重新运行本脚本重试(只会重新下载失败的那几个 mod)。"
  exit 1
fi

echo
echo "完成! 本客户端内容已更新到 Gitee 镜像最新版。"
