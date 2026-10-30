param(
  [ValidateSet('setup', 'update')]
  [string]$Mode = 'update',
  [ValidateSet('auto', 'github', 'gitee')]
  [string]$Source = 'auto'
)
$ErrorActionPreference = 'Stop'

# =============================================================================
#  sync.ps1 —— 玩家端同步流程(供 update-from-gitee.bat / setup-gitee-sync.bat 调用)
#
#  【更新源优先级】优先 GitHub 主仓库, 连不上或没建立 GitHub 远程时回退 Gitee 镜像:
#    1) GitHub : 远程 origin, 分支自动探测(读不到 symref 时按 main)
#    2) Gitee  : 远程 gitee,  分支 master
#    回退条件:
#      * 本地没有 GitHub 远程(origin);
#      * origin 存在但探测失败(网络不通 / 无权限);
#      * 探测通过但下载失败(重试一次仍失败)。
#    只有"下载成功、落地失败"(游戏或启动器占用文件)不回退 —— 换源也写不进去。
#
#  【setup 会主动建立 GitHub 远程, update 不会】setup 模式下若本地没有 origin,
#  会添加 origin -> GitHub 并探测; 探测通过则本次直接用 GitHub。update 模式只做
#  只读探测, 绝不改动玩家的远程配置(只有 gitee 远程缺失时才按历史行为补建)。
#
#  【手动指定源】-Source auto|github|gitee, 默认 auto:
#    -Source gitee  : 强制走 Gitee 镜像(GitHub 访问不畅时可用)
#    -Source github : 只用 GitHub, 连不上直接报错(不静默回退)
#
#  为什么中文提示放在这里而不是 .bat 里:
#    Windows 的 cmd.exe 按"字节偏移"逐行解析批处理文件, 如果文件里含多字节
#    字符(中文)又中途切换代码页, 会导致解析错位, 命令被截断; 而用 UTF-8 保存
#    中文又会在默认代码页 936 的控制台上显示为乱码。因此 .bat 入口一律保持
#    **纯 ASCII**(只写英文注释), 所有面向玩家的中文提示集中在本 PowerShell 脚本
#    (UTF-8 编码), 由 PowerShell 正确输出。
#
#  用法(由 .bat 自动调用, 也可手动执行):
#    powershell -NoProfile -ExecutionPolicy Bypass -File sync.ps1 -Mode update
#    powershell -NoProfile -ExecutionPolicy Bypass -File sync.ps1 -Mode setup
#    powershell -NoProfile -ExecutionPolicy Bypass -File sync.ps1 -Mode update -Source gitee
# =============================================================================

$UpdaterDir = $PSScriptRoot
$Root = Split-Path -Parent $UpdaterDir

# GitHub 主仓库
$GhRemote = 'origin'
$GhUrl = 'https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation.git'
$GhFallbackBranch = 'main'
# Gitee 镜像仓库
$GtRemote = 'gitee'
$GtUrl = 'https://gitee.com/eternalsnowstorm/mechanism-and-innovation'
$GtBranch = 'master'

# 网络兜底: 传输速率低于 1KB/s 持续 20 秒即判定这条连接已死,
# 免得"连不上 GitHub"时玩家对着黑窗口干等好几分钟。
$NetOpts = @('-c', 'http.lowSpeedLimit=1000', '-c', 'http.lowSpeedTime=20')

# 绝不允许 git 弹出凭据输入框: 玩家没有 GitHub 账号, 弹框只会让窗口假死。
$env:GIT_TERMINAL_PROMPT = '0'

# PowerShell 7.4+ 的 $PSNativeCommandUseErrorActionPreference 默认为 $true, 会把原生命令
# 的非零退出码当成终止错误抛出; 那样就读不到 $LASTEXITCODE, "GitHub 失败 -> 回退 Gitee"
# 的分支判断就永远走不到。这里显式关掉(Windows PowerShell 5.1 无此变量, 赋值无害)。
$PSNativeCommandUseErrorActionPreference = $false

$script:GitExitCode = 0
$script:SyncResult = ''

function Write-Fail([string]$Message, [string[]]$Hints = @()) {
  Write-Host ''
  Write-Host $Message
  foreach ($h in $Hints) { Write-Host ('       ' + $h) }
  exit 1
}

# 调用 git 并返回 stdout(丢弃 stderr)。
# 注意: 这里不能写成 "... 2>&1" —— Windows PowerShell 5.1 会把经 2>&1 合并过来的
# 原生命令 stderr 包装成 ErrorRecord 写进成功流, 叠加顶部的 $ErrorActionPreference='Stop'
# 会抛出 NativeCommandError 当场终止脚本; 而"本地还没有这个远程"正是首次 setup 的
# 必经分支, 结果是远程永远建不起来。2>$null 只是丢弃, 是安全的。
function Invoke-GitText([string[]]$Arguments) {
  $out = & git @Arguments 2>$null
  $script:GitExitCode = $LASTEXITCODE
  return (($out | Out-String).Trim())
}

# 读取某个远程的地址(键不存在时 git 静默返回退出码 1, 不写 stderr)
function Get-RemoteUrl([string]$Remote) {
  $url = Invoke-GitText @('config', '--get', ('remote.' + $Remote + '.url'))
  if ($script:GitExitCode -ne 0) { return '' }
  return $url
}

# 远程地址是否指向本整合包(GitHub 与 Gitee 的仓库名都含 mechanism-and-innovation)
function Test-PackUrl([string]$Url) {
  if (-not $Url) { return $false }
  return [bool]($Url -match '(?i)mechanism-and-innovation')
}

# 探测远程是否可访问, 并读回它的默认分支(读不到 symref 时按 main)
# 返回 @{ Ok = $true/$false; Branch = '...' }
function Get-RemoteProbe([string]$Remote) {
  $net = $script:NetOpts
  $text = Invoke-GitText (@($net) + @('ls-remote', '--symref', $Remote, 'HEAD'))
  if ($script:GitExitCode -ne 0) { return @{ Ok = $false; Branch = '' } }

  $hash = ''
  foreach ($line in [regex]::Split($text, "\r?\n")) {
    if ($line -match '^([0-9a-fA-F]{40})\s+HEAD$') { $hash = $Matches[1]; break }
  }
  if (-not $hash) { return @{ Ok = $false; Branch = '' } }

  $branch = ''
  $m = [regex]::Match($text, 'ref:\s+refs/heads/(\S+)\s+HEAD')
  if ($m.Success) { $branch = $m.Groups[1].Value }
  if (-not $branch) { $branch = $script:GhFallbackBranch }
  return @{ Ok = $true; Branch = $branch }
}

# 补建 gitee 远程(仅缺失时补; 与历史行为一致)
function Ensure-GiteeRemote {
  $url = Get-RemoteUrl $script:GtRemote
  if ($url) {
    if (-not (Test-PackUrl $url)) {
      Write-Host ('[提示] 现有 ' + $script:GtRemote + ' 远程指向其它仓库, 仍按它更新: ' + $url)
    }
    return
  }
  Write-Host '[提示] 未找到 gitee 远程, 正在添加 ...'
  [void](Invoke-GitText @('remote', 'add', $script:GtRemote, $script:GtUrl))
  if ($script:GitExitCode -ne 0) {
    Write-Fail '[错误] 添加 gitee 远程失败。' @(
      ('可以先手动执行: git remote add gitee ' + $script:GtUrl),
      '再重新运行本脚本。'
    )
  }
}

# 从指定远程拉取指定分支并落地。结果写入 $script:SyncResult:
#   'ok'         成功
#   'fetch-fail' 下载失败(网络 / 权限) —— 可以换源重试
#   'apply-fail' 下载成功但落地失败(通常是游戏或启动器占用文件) —— 换源也没用
function Invoke-SyncFrom([string]$Remote, [string]$Branch) {
  $script:SyncResult = ''
  $net = $script:NetOpts
  $refspec = '+refs/heads/' + $Branch + ':refs/remotes/' + $Remote + '/' + $Branch

  $fetched = $false
  for ($i = 1; $i -le 2; $i++) {
    Write-Host ('       正在下载最新版本 (第 ' + $i + '/2 次) ...')
    & git @net fetch --no-tags --progress $Remote $refspec
    if ($LASTEXITCODE -eq 0) { $fetched = $true; break }
    if ($i -lt 2) {
      Write-Host '       下载中断, 3 秒后重试 ...'
      Start-Sleep -Seconds 3
    }
  }
  if (-not $fetched) { $script:SyncResult = 'fetch-fail'; return }

  Write-Host '正在应用更新到本客户端 ...'
  & git reset --hard ($Remote + '/' + $Branch)
  if ($LASTEXITCODE -ne 0) { $script:SyncResult = 'apply-fail'; return }

  $script:SyncResult = 'ok'
}

# --- 0. 环境检查 ------------------------------------------------------------
Write-Host ''
Write-Host '============================================================'
if ($Mode -eq 'setup') { Write-Host '   CMI 整合包 首次同步' } else { Write-Host '   CMI 整合包 版本更新' }
Write-Host '============================================================'
Write-Host ''
switch ($Source) {
  'github' { Write-Host '更新源: 仅 GitHub' }
  'gitee'  { Write-Host '更新源: 仅 Gitee 镜像' }
  default  { Write-Host '更新源: 自动(优先 GitHub, 连不上则回退 Gitee 镜像)' }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Fail '[错误] 未检测到 Git, 或 Git 未加入 PATH 环境变量。请先安装 Git for Windows, 然后重新运行本脚本。'
}

try {
  Set-Location -LiteralPath $Root -ErrorAction Stop
} catch {
  Write-Fail ('[错误] 无法进入整合包目录: ' + $Root) @('请确认该目录存在, 并且可以正常读写。')
}

if (-not (Test-Path -LiteralPath (Join-Path $Root '.git'))) {
  if ($Mode -eq 'setup') {
    Write-Host '正在把当前目录初始化为 Git 仓库 ...'
    [void](Invoke-GitText @('init', '-q'))
    if ($script:GitExitCode -ne 0) {
      Write-Fail '[错误] 初始化 Git 仓库失败。' @('请确认整合包目录可以正常读写。')
    }
  } else {
    Write-Fail '[错误] 当前目录还不是 git 仓库。请先运行 setup-gitee-sync.bat 建立同步。'
  }
}

# --- 1. 决定本次使用哪个源 --------------------------------------------------
$preferGitHub = $false
$ghBranch = ''

if ($Source -eq 'gitee') {
  Write-Host ''
  Write-Host '[提示] 已按 -Source gitee 强制使用 Gitee 镜像。'
} else {
  $originUrl = Get-RemoteUrl $GhRemote

  # 只有 setup 才主动补建 GitHub 远程; update 只做只读探测, 绝不改玩家的远程配置。
  if ((-not $originUrl) -and ($Mode -eq 'setup')) {
    Write-Host '[提示] 未找到 GitHub 远程, 正在添加 ...'
    [void](Invoke-GitText @('remote', 'add', $GhRemote, $GhUrl))
    if ($script:GitExitCode -eq 0) {
      $originUrl = Get-RemoteUrl $GhRemote
    } else {
      Write-Host '[提示] 添加 GitHub 远程失败, 本次改用 Gitee 镜像。'
    }
  }

  if (-not $originUrl) {
    if ($Source -eq 'github') {
      Write-Fail ('[错误] 本地未建立 GitHub 远程(' + $GhRemote + '), 无法按 -Source github 更新。') @(
        'setup 模式会自动添加 GitHub 远程; 若添加失败, 请检查网络与 git 配置后重试;',
        'update 模式需要先运行一次 setup-gitee-sync.bat 来建立 GitHub 远程;',
        '或改用 -Source auto / -Source gitee。'
      )
    }
    Write-Host ''
    Write-Host '[提示] 本地未建立 GitHub 远程, 本次改用 Gitee 镜像更新。'
    Write-Host '       想以后优先用 GitHub, 可运行 setup-gitee-sync.bat(它会尝试建立 GitHub 远程)。'
  } elseif (-not (Test-PackUrl $originUrl)) {
    Write-Host ('[提示] 现有 ' + $GhRemote + ' 远程指向其它仓库, 本次不使用它: ' + $originUrl)
    Write-Host ('       若想改用官方 GitHub 仓库, 可执行: git remote set-url ' + $GhRemote + ' ' + $GhUrl)
  } else {
    Write-Host ''
    Write-Host '正在检测 GitHub 是否可用 ...'
    $probe = Get-RemoteProbe $GhRemote
    if ($probe.Ok) {
      $preferGitHub = $true
      $ghBranch = $probe.Branch
      Write-Host ('       GitHub 可用, 目标分支: ' + $ghBranch)
    } elseif ($Source -eq 'github') {
      Write-Fail '[错误] 连不上 GitHub, 或当前网络无法访问它。' @(
        '1) 用浏览器打开 https://github.com/ 确认能不能访问;',
        '2) 若平时需要代理 / VPN 才能上 GitHub, 请先开好再重试;',
        '3) 也可以改用 Gitee 镜像: 在命令后加 -Source gitee。'
      )
    } else {
      Write-Host '[提示] 连不上 GitHub, 本次改用 Gitee 镜像更新(下次仍会先试 GitHub)。'
    }
  }
}

# --- 2. 拉取并应用 ----------------------------------------------------------
$usedSource = ''

if ($preferGitHub) {
  Write-Host ''
  Write-Host ('=== 从 GitHub 拉取最新内容 (分支 ' + $ghBranch + ') ===')
  Invoke-SyncFrom $GhRemote $ghBranch
  if ($script:SyncResult -eq 'ok') {
    $usedSource = 'GitHub'
  } elseif ($script:SyncResult -eq 'apply-fail') {
    Write-Fail '[错误] GitHub 内容已下载, 但写入本客户端失败。' @(
      '如果游戏或启动器还开着, 请完全退出后重试;',
      '若反复失败, 请把本窗口的内容发给开发者。'
    )
  } elseif ($Source -eq 'auto') {
    Write-Host ''
    Write-Host '[提示] 从 GitHub 下载失败, 改用 Gitee 镜像重试 ...'
  } else {
    Write-Fail '[错误] 从 GitHub 拉取失败, 请检查网络后重试。' @(
      '若平时需要代理 / VPN 才能上 GitHub, 请先开好再重试;',
      '也可以改用 Gitee 镜像: 在命令后加 -Source gitee。'
    )
  }
}

if (-not $usedSource) {
  # Gitee 路径: 远程缺失时补建(历史行为), 但不覆盖已有的 gitee 远程。
  if (-not (Get-RemoteUrl $script:GtRemote)) { Ensure-GiteeRemote }

  Write-Host ''
  Write-Host ('=== 从 Gitee 镜像拉取最新内容 (分支 ' + $GtBranch + ') ===')
  Invoke-SyncFrom $GtRemote $GtBranch
  if ($script:SyncResult -eq 'ok') {
    $usedSource = 'Gitee'
  } elseif ($script:SyncResult -eq 'apply-fail') {
    Write-Fail '[错误] Gitee 内容已下载, 但写入本客户端失败。' @(
      '如果游戏或启动器还开着, 请完全退出后重试;',
      '若反复失败, 请把本窗口的内容发给开发者。'
    )
  } elseif ($preferGitHub) {
    Write-Fail '[错误] GitHub 与 Gitee 都无法访问, 本次更新未完成。' @(
      '请检查网络连接后重试;',
      '若只希望用其中一个源, 可显式指定: -Source github 或 -Source gitee。'
    )
  } else {
    Write-Fail '[错误] 从 Gitee 拉取失败, 请检查网络后重试。' @(
      '若反复失败, 请把本窗口的内容发给开发者。'
    )
  }
}

# --- 3. 按清单同步 mods ------------------------------------------------------
Write-Host ''
Write-Host '正在按更新清单下载 / 校验 mods [第三方直链] ...'
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
  Write-Host ('完成! 本客户端已与 ' + $usedSource + ' 同步。')
  Write-Host '以后运行 update-from-gitee.bat 即可拉取更新(仍会优先尝试 GitHub)。'
} else {
  Write-Host ('完成! 本客户端内容已更新到 ' + $usedSource + ' 最新版。')
}
exit 0
