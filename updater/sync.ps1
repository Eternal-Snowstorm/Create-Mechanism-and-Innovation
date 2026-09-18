param(
  [ValidateSet('setup', 'update')]
  [string]$Mode = 'update'
)
$ErrorActionPreference = 'Stop'

# =============================================================================
#  sync.ps1 —— 玩家端同步流程(供 update-from-gitee.bat / setup-gitee-sync.bat 调用)
#
#  为什么中文提示放在这里而不是 .bat 里:
#    Windows 的 cmd.exe 按"字节偏移"逐行解析批处理文件, 如果文件里含多字节
#    字符(中文)又中途切换代码页, 会导致解析错位、命令被截断; 而用 UTF-8 保存
#    中文又会在默认代码页 936 的控制台上显示为乱码。因此 .bat 入口一律保持
#    **纯 ASCII**(只写英文注释), 所有面向玩家的中文提示集中在本 PowerShell 脚本
#    (UTF-8 编码), 由 PowerShell 正确输出。
#
#  用法(由 .bat 自动调用, 也可手动执行):
#    powershell -NoProfile -ExecutionPolicy Bypass -File sync.ps1 -Mode update
#    powershell -NoProfile -ExecutionPolicy Bypass -File sync.ps1 -Mode setup
# =============================================================================

$UpdaterDir = $PSScriptRoot
$Root = Split-Path -Parent $UpdaterDir
$RemoteUrl = 'https://gitee.com/eternalsnowstorm/mechanism-and-innovation'
$Branch = 'master'

function Write-Fail([string]$msg) {
  Write-Host ''
  Write-Host $msg
  exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Fail '[错误] 未检测到 Git, 或 Git 未加入 PATH 环境变量。请先安装 Git for Windows, 然后重新运行本脚本。'
}

Set-Location -LiteralPath $Root

if ($Mode -eq 'setup') {
  Write-Host '=== 建立与 Gitee 镜像的同步 ==='
  if (-not (Test-Path -LiteralPath (Join-Path $Root '.git'))) {
    git init | Out-Null
  }
} else {
  if (-not (Test-Path -LiteralPath (Join-Path $Root '.git'))) {
    Write-Fail '[错误] 当前目录还不是 git 仓库。请先运行 setup-gitee-sync.bat 建立同步。'
  }
}

# 确保 gitee 远程存在
# 警告: 这里不能写成 "git remote get-url gitee > $null 2>&1"。
#   Windows PowerShell 5.1 会把经 2>&1 合并过来的原生命令 stderr 包装成 ErrorRecord
#   写进成功流, 叠加本脚本顶部的 $ErrorActionPreference='Stop' 会抛出 NativeCommandError
#   并当场终止脚本; 而"本地还没有 gitee 远程"正是首次 setup 的必经分支,
#   结果是远程永远建不起来, 玩家只能看到一句英文报错。
#   git config --get 在键不存在时静默返回退出码 1(不写 stderr), 因此安全。
git config --get remote.gitee.url | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host '[提示] 未找到 gitee 远程, 正在添加...'
  git remote add gitee $RemoteUrl
}

Write-Host '=== 从 Gitee 镜像拉取最新内容 ==='
git fetch gitee
if ($LASTEXITCODE -ne 0) {
  Write-Fail '[错误] 从 Gitee 拉取失败, 请检查网络后重试。'
}

Write-Host '正在应用更新到本客户端...'
git reset --hard "gitee/$Branch"
if ($LASTEXITCODE -ne 0) {
  Write-Fail '[错误] 应用更新失败。'
}

Write-Host '正在按更新清单下载 / 校验 mods [第三方直链]...'
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $UpdaterDir 'mods-sync.ps1')
$modsRc = $LASTEXITCODE

if ($modsRc -ne 0) {
  Write-Host ''
  Write-Host '[提示] 本次有部分 mod 没能更新成功。'
  Write-Host '       失败的 mod 已自动恢复为旧版本, 游戏仍可正常启动。'
  Write-Host '       请把 updater\logs\ 目录下最新的那个日志文件发送给开发者, 以便排查;'
  Write-Host '       也可以直接重新运行本脚本重试 [只会重新下载失败的那几个 mod]。'
  exit 1
}

Write-Host ''
if ($Mode -eq 'setup') {
  Write-Host '完成! 本客户端已与 Gitee 镜像同步。'
  Write-Host '以后运行 update-from-gitee.bat 即可拉取更新。'
} else {
  Write-Host '完成! 本客户端内容已更新到 Gitee 镜像最新版。'
}
exit 0
