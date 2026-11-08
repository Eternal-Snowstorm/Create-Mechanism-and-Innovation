<#
  update-cmi.ps1 —— 合作者端「一键从 GitHub 更新到最新版」(Gitee 镜像兜底)

  设计目标: 让不熟悉 Git 的合作者双击 Update-CMI.bat 就能把整合包对齐到
  GitHub 主仓库的最新版; 并且任何意外情况都不丢数据:

    * 本地改过的文件        -> 先备份到 updater\.rollback\<时间戳>-before-github-update\
    * 本地多出来的同名文件  -> 先移入备份(否则 Git 会因"会被覆盖"而拒绝更新)
    * 上次更新中途关窗口    -> 自动清理残留的 rebase / merge / index.lock
    * 网络抖动              -> 自动重试 3 次
    * 不是 Git 仓库(全新解压的包) -> 自动 init + 连接 GitHub, 首次也能直接跑

  更新源: GitHub 优先; 连不上 GitHub(探测或下载失败)时自动改用 Gitee 镜像,
          口径与 updater/sync.ps1 一致(远程名 gitee / 分支 master /
          https://gitee.com/eternalsnowstorm/mechanism-and-innovation)。

  与 updater/sync.ps1 的区别:
    sync.ps1  面向 Gitee 镜像(远程名 gitee / 分支 master), 玩家要先跑 setup 再 update;
    本脚本    面向 GitHub 主仓库(远程名 origin / 分支自动探测), setup 与 update 合一;
              并在 GitHub 不可达时自动回退到 Gitee 镜像, 合作者不需要手动切换源。

  本文件位于 updater/ 下, 随整合包一起分发(已被 Git 跟踪), 玩家双击同目录的 Update-CMI.bat 即可。
  面向合作者的说明见同目录的 CLIENT-README.md; 开发组只想自测时加 -DryRun 即可。

  用法(一般由 Update-CMI.bat 调用):
    powershell -NoProfile -ExecutionPolicy Bypass -File update-cmi.ps1
  可选参数:
    -Root <整合包目录>      手动指定整合包目录(默认自动定位)
    -RemoteUrl <仓库地址>   覆盖远程仓库地址
    -Branch <分支名>        覆盖分支名(默认自动探测 GitHub 的默认分支)
    -DryRun                 只做检查与拉取, 不写入任何内容(开发组自测用)
#>
[CmdletBinding()]
param(
  [string]$Root = '',
  [string]$RemoteUrl = 'https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation.git',
  [string]$Branch = '',
  [string]$ScriptDir = '',
  [switch]$DryRun
)

# 本脚本所在目录:
#   - 用 -File 直接调用时 = $PSScriptRoot;
#   - 由 Update-CMI.bat 以 [scriptblock] 方式调用时 $PSScriptRoot 为空, 由 -ScriptDir 传入。
# 之所以要用后一种调用方式, 是因为 .bat 会用 Get-Content -Encoding UTF8 显式读出脚本,
# 这样即使脚本被某个编辑器存成了"无 BOM 的 UTF-8", 中文提示依然不会乱码。
$script:ClientDir = $PSScriptRoot
if (-not $script:ClientDir) { $script:ClientDir = $ScriptDir }

$ErrorActionPreference = 'Continue'

# 官方 GitHub 地址。只有 -RemoteUrl 仍指向它时, 才允许"连不上就切 Gitee 镜像";
# 否则(开发组把 -RemoteUrl 指到测试仓库)切镜像会拉到完全不相干的内容。
$script:OfficialUrl = 'https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation.git'

# Gitee 镜像兜底(与 updater/sync.ps1 同一口径)。
# 背景: 部分合作者所在网络连不上 GitHub(被墙或受公司网络限制), 但 Gitee 能通;
# 所以探测或下载失败时自动改从镜像拉, 不再让合作者自己去找别的办法。
$script:GiteeRemote = 'gitee'
$script:GiteeUrl    = 'https://gitee.com/eternalsnowstorm/mechanism-and-innovation'
$script:GiteeBranch = 'master'
# 不让慢网络无声卡死: 速度低于 1000 字节/秒 且连续 20 秒没有数据, 才算断线
# (与 sync.ps1 的 $NetOpts 完全一致, 免得两个入口对"网络是否可用"得出不同结论)。
$script:NetOpts = @('-c', 'http.lowSpeedLimit=1000', '-c', 'http.lowSpeedTime=20')

$script:GitExe   = ''
$script:LastCode = 0
$script:LogPath  = ''

# =============================================================================
#  工具函数
# =============================================================================

function Write-Log {
  param([string]$Message = '')
  Write-Host $Message
  if ($script:LogPath) {
    try { Add-Content -LiteralPath $script:LogPath -Value $Message -Encoding UTF8 -ErrorAction SilentlyContinue } catch { }
  }
}

# 调用 git。
#   -ShowOutput : git 的 stdout/stderr 直接显示在窗口上(用于 fetch / checkout 等需要看进度的命令)
#   默认        : 捕获 stdout 作为字符串返回, 并抑制 stderr
# 注意: 这里绝不能用 "2>&1" —— Windows PowerShell 5.1 会把合并过来的原生命令 stderr
#       包装成 ErrorRecord 写进成功流, 产生 "git.exe : ..." 之类的噪声文本。
#       "2>$null" 在本文件里之所以安全, 前提是本脚本顶部用的是 $ErrorActionPreference = 'Continue';
#       若哪天改成 'Stop' 就完全不同了(updater/sync.ps1 正是如此): 那种情况下仅凭 stderr 被重定向
#       就会抛 NativeCommandError 当场终止整个脚本 —— 请照抄 sync.ps1 里 Invoke-GitText 的写法
#       (在函数内部把 $ErrorActionPreference 临时降为 'Continue', 结束再恢复)。
function Invoke-Git {
  param(
    [string[]]$Arguments,
    [switch]$ShowOutput
  )
  if ($ShowOutput) {
    & $script:GitExe @Arguments
    $script:LastCode = $LASTEXITCODE
    return
  }
  $out = & $script:GitExe @Arguments 2>$null
  $script:LastCode = $LASTEXITCODE
  return (($out | Out-String).Trim())
}

# 把多行输出切成"去掉空白行"的数组
function Split-Lines {
  param([string]$Text)
  if (-not $Text) { return @() }
  return @($Text -split "`r?`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ })
}

# 脚本自己的产物目录(日志与回滚备份)。它们本来就在 .gitignore 里, 这里再挡一道:
# 万一分发出去的包里 .gitignore 缺了这两条规则, 备份就会把"上一次的备份"再备份一遍,
# 目录体积会随每次更新翻倍。
function Test-OwnArtifact {
  param([string]$RelPath)
  $p = $RelPath.ToLowerInvariant()
  return ($p.StartsWith('updater/.rollback/') -or $p.StartsWith('updater/logs/'))
}

# 整合包根目录 = 同时有 updater 与 (mods 或 config 或 .git) 的那一层。
# 支持把脚本放在 整合包根 / updater / updater/dev 任意位置(标准位置是 updater/)。
function Get-PackRoot {
  param([string]$StartDir, [int]$MaxUp = 6)
  $dir = $null
  try { $dir = (Get-Item -LiteralPath $StartDir -Force).FullName } catch { return '' }
  for ($i = 0; $i -lt $MaxUp; $i++) {
    if (-not $dir) { break }
    $hasUpdater = Test-Path -LiteralPath (Join-Path $dir 'updater')
    $hasMarker = (Test-Path -LiteralPath (Join-Path $dir 'mods')) -or
                 (Test-Path -LiteralPath (Join-Path $dir 'config')) -or
                 (Test-Path -LiteralPath (Join-Path $dir '.git'))
    if ($hasUpdater -and $hasMarker) { return $dir }
    $parent = Split-Path -Parent $dir
    if (-not $parent -or $parent -eq $dir) { break }
    $dir = $parent
  }
  return ''
}

# 自动定位失败时, 弹窗让合作者自己选(猜不到就返回空串, 由调用方给出文字指引)
function Select-PackRoot {
  param([string]$Title)
  try {
    Add-Type -AssemblyName System.Windows.Forms | Out-Null
    $dlg = New-Object System.Windows.Forms.FolderBrowserDialog
    $dlg.Description = $Title
    $dlg.ShowNewFolderButton = $false
    if ($dlg.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { return $dlg.SelectedPath }
  } catch { }
  return ''
}

# 找 git.exe: 环境变量 > 便携版(脚本/整合包附近) > 常见安装位置 > PATH。
# 这样即使合作者没装 Git, 只要开发组在他机器上放一份便携版 Git 也能跑。
function Resolve-GitExe {
  param([string]$PackRoot)

  if ($env:GIT_EXE -and (Test-Path -LiteralPath $env:GIT_EXE -PathType Leaf)) { return $env:GIT_EXE }

  $dirs = @()
  $d = $script:ClientDir
  for ($i = 0; $i -lt 3 -and $d; $i++) { $dirs += $d; $d = Split-Path -Parent $d }
  $d = $PackRoot
  for ($i = 0; $i -lt 3 -and $d; $i++) { $dirs += $d; $d = Split-Path -Parent $d }

  $cands = @()
  foreach ($x in ($dirs | Select-Object -Unique)) {
    $cands += (Join-Path $x 'git\cmd\git.exe')
    $cands += (Join-Path $x 'git\bin\git.exe')
    $cands += (Join-Path $x 'git\mingw64\bin\git.exe')
  }
  if ($env:ProgramFiles) { $cands += (Join-Path $env:ProgramFiles 'Git\cmd\git.exe') }
  $pf86 = ${env:ProgramFiles(x86)}
  if ($pf86) { $cands += (Join-Path $pf86 'Git\cmd\git.exe') }
  if ($env:LOCALAPPDATA) { $cands += (Join-Path $env:LOCALAPPDATA 'Programs\Git\cmd\git.exe') }

  foreach ($c in $cands) {
    if ($c -and (Test-Path -LiteralPath $c -PathType Leaf)) { return $c }
  }

  $cmd = Get-Command git -ErrorAction SilentlyContinue
  if ($cmd -and $cmd.Source) { return $cmd.Source }
  return ''
}

# 比较远程地址时忽略大小写、结尾斜杠与 ".git" 后缀
function Get-NormalizedUrl {
  param([string]$Url)
  if (-not $Url) { return '' }
  $x = $Url.Trim().TrimEnd('/')
  if ($x.ToLowerInvariant().EndsWith('.git')) { $x = $x.Substring(0, $x.Length - 4) }
  return $x.ToLowerInvariant()
}

# 探测某个远程的默认分支, 连不上返回空串(由调用方决定提示什么)。
#   -Target   远程名(origin / gitee), 或直接是仓库地址
#   -Fallback 探测成功但输出里没有 symref 行时用的分支名
function Get-RemoteDefaultBranch {
  param(
    [string]$Target,
    [string]$Label,
    [string]$Fallback = ''
  )
  for ($i = 1; $i -le 3; $i++) {
    $out = Invoke-Git (@($script:NetOpts + @('ls-remote', '--symref', $Target, 'HEAD')))
    if ($script:LastCode -eq 0 -and $out) {
      $m = [regex]::Match($out, 'ref:\s+refs/heads/([^\s]+)\s+HEAD')
      if ($m.Success) { return $m.Groups[1].Value }
      return $Fallback
    }
    if ($i -lt 3) { Write-Log ('       ' + $Label + ' 连接失败, 3 秒后重试 (' + $i + '/3) ...'); Start-Sleep -Seconds 3 }
  }
  return ''
}

# 把远程的某个分支抓进 refs/remotes/<LocalRefBase>/<BranchName>, 返回是否成功。
# 通过 -LocalRefBase 区分来源: origin = GitHub, gitee = Gitee 镜像。
function Invoke-FetchFrom {
  param(
    [string]$Target,
    [string]$BranchName,
    [string]$LocalRefBase,
    [string]$Label
  )
  $refspec = '+refs/heads/' + $BranchName + ':refs/remotes/' + $LocalRefBase + '/' + $BranchName
  for ($i = 1; $i -le 3; $i++) {
    Write-Log ('       正在从' + $Label + '下载最新版本 (第 ' + $i + '/3 次) ...')
    Invoke-Git (@($script:NetOpts + @('fetch', '--no-tags', '--progress', $Target, $refspec))) -ShowOutput
    if ($script:LastCode -eq 0) { return $true }
    if ($i -lt 3) { Write-Log '       下载中断, 3 秒后重试 ...'; Start-Sleep -Seconds 3 }
  }
  return $false
}

# 决定"从 Gitee 拉"时用哪个 Target:
# 本地已经配好 gitee 远程(玩家先跑过 setup-gitee-sync.bat)就复用那个远程名,
# 否则直接用镜像地址 —— 不往 .git/config 里写新远程, 免得"多出一个远程"把人搞晕。
function Get-GiteeFetchTarget {
  $lines = @(Split-Lines (Invoke-Git @('config', '--get', 'remote.gitee.url')))
  if ($lines.Count -gt 0 -and $lines[0] -and ($lines[0] -match 'mechanism-and-innovation')) { return $script:GiteeRemote }
  return $script:GiteeUrl
}

# 把一个文件复制/移动到备份目录(保持相对路径结构); 超过 200MB 的跳过, 避免备份爆炸
function Backup-OneFile {
  param(
    [string]$PackRoot,
    [string]$RelPath,
    [string]$DestRoot,
    [switch]$Move
  )
  $src = Join-Path $PackRoot ($RelPath -replace '/', '\')
  if (-not (Test-Path -LiteralPath $src -PathType Leaf)) { return $false }
  try {
    $item = Get-Item -LiteralPath $src -Force
    if ($item.Length -gt 200MB) {
      Write-Log ('       [跳过] 文件过大(>200MB), 未备份: ' + $RelPath)
      return $false
    }
    $dst = Join-Path $DestRoot ($RelPath -replace '/', '\')
    $dstDir = Split-Path -Parent $dst
    if (-not (Test-Path -LiteralPath $dstDir)) { New-Item -ItemType Directory -Force -Path $dstDir | Out-Null }
    if ($Move) { Move-Item -LiteralPath $src -Destination $dst -Force }
    else       { Copy-Item -LiteralPath $src -Destination $dst -Force }
    return $true
  } catch {
    Write-Log ('       [跳过] ' + $RelPath + ' —— ' + $_.Exception.Message)
    return $false
  }
}

function Stop-WithError {
  param(
    [string]$Message,
    [string[]]$Hints = @()
  )
  Write-Log ''
  Write-Log '------------------------------------------------------------'
  Write-Log ('[失败] ' + $Message)
  foreach ($h in $Hints) { Write-Log ('       ' + $h) }
  if ($script:LogPath) { Write-Log ('       本次日志: ' + $script:LogPath) }
  Write-Log '------------------------------------------------------------'
  exit 1
}

# =============================================================================
#  主流程
# =============================================================================

Write-Host ''
Write-Host '============================================================'
Write-Host '   CMI 整合包 一键更新 (GitHub 源, Gitee 镜像兜底)'
Write-Host '============================================================'
Write-Host ''

# ---------------------------------------------------------------- 定位整合包
$Root = (Get-PackRoot -StartDir $Root)  # -Root 传空串时返回空
if (-not $Root -and $script:ClientDir) { $Root = Get-PackRoot -StartDir $script:ClientDir }
if (-not $Root) {
  try { $Root = Get-PackRoot -StartDir (Get-Location).Path } catch { $Root = '' }
}
if (-not $Root) {
  Write-Host '[提示] 没能自动找到整合包目录, 请在弹出的窗口里手动选择。'
  $picked = Select-PackRoot -Title '请选择整合包文件夹(里面有 updater、mods 的那一层)'
  if ($picked) { $Root = Get-PackRoot -StartDir $picked }
}
if (-not $Root) {
  Write-Host ''
  Write-Host '[失败] 找不到整合包目录。'
  Write-Host '       请确认整合包里的 updater 文件夹完整(应含 Update-CMI.bat 与 update-cmi.ps1)'
  Write-Host '       (整合包根目录就是有 updater、mods、config 这些文件夹的那一层, 通常叫 .minecraft)'
  Write-Host '       然后重新双击 updater\Update-CMI.bat。'
  exit 1
}

# ---------------------------------------------------------------- 初始化日志
$logDir = Join-Path $Root 'updater\logs'
if (-not (Test-Path -LiteralPath $logDir)) { New-Item -ItemType Directory -Force -Path $logDir -ErrorAction SilentlyContinue | Out-Null }
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$script:LogPath = Join-Path $logDir ('github-update-' + $stamp + '.log')
# 这里必须用 -ErrorAction Stop: 否则"日志目录不可写"只会打印一条英文错误,
# try/catch 抓不住(默认 Continue 下它不是终止错误), 后面每条 Write-Log 都会再报一次, 刷屏。
try {
  Set-Content -LiteralPath $script:LogPath -Encoding UTF8 -ErrorAction Stop -Value @(
    '==== CMI 整合包 GitHub 更新日志 ====',
    ('时间        : ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')),
    ('整合包目录  : ' + $Root),
    ('远程仓库    : ' + $RemoteUrl),
    ('更新源      : GitHub 优先, 连不上时自动改用 Gitee 镜像'),
    ('操作者      : ' + $env:USERNAME + '@' + $env:COMPUTERNAME),
    '----------------------------------'
  )
} catch { $script:LogPath = '' }

Write-Log ('整合包目录: ' + $Root)
if ($DryRun) { Write-Log '[试运行] 本次只检查、只拉取, 不会改动任何文件。' }

# ---------------------------------------------------------------- 1/5 环境
Write-Log ''
Write-Log '[1/5] 检查运行环境 ...'

$script:GitExe = Resolve-GitExe -PackRoot $Root
if (-not $script:GitExe) {
  Stop-WithError '这台电脑上没有找到 Git, 更新需要先装一次 Git。' @(
    '下载地址(免费): https://git-scm.com/download/win',
    '安装时一路点“下一步 / Next”即可, 装完重新双击 Update-CMI.bat。',
    '若已经装过 Git 仍报此错, 请把这个窗口截图发给开发组。'
  )
}
Write-Log ('       Git: ' + $script:GitExe)

$game = @(Get-Process -Name 'javaw', 'java' -ErrorAction SilentlyContinue)
if ($game.Count -gt 0) {
  Write-Log ''
  Write-Log '[注意] 检测到 Java 进程(游戏可能正在运行)。'
  Write-Log '       更新要覆盖 config、kubejs 等文件, 游戏运行中很容易失败。'
  $ans = ''
  try { $ans = Read-Host '       已完全退出游戏请按回车继续; 想稍后再更新请输入 n 并回车' } catch { $ans = '' }
  if ($ans -match '^\s*n') {
    Write-Log '[已取消] 没有做任何修改。'
    exit 0
  }
}

# 避免 "detected dubious ownership in repository" 把新玩家直接卡死(git 2.35+)
$rootForGit = $Root -replace '\\', '/'
$safeList = Invoke-Git @('config', '--global', '--get-all', 'safe.directory')
$safeHit = $false
foreach ($s in (Split-Lines $safeList)) { if ($s -eq $rootForGit.TrimEnd('/')) { $safeHit = $true } }
if (-not $safeHit) { Invoke-Git @('config', '--global', '--add', 'safe.directory', $rootForGit) | Out-Null }

# 之后所有 git 命令都依赖"当前目录 = 整合包根目录", 进不去就必须立刻停,
# 否则会在错误的目录里操作 Git。
try {
  Set-Location -LiteralPath $Root -ErrorAction Stop
} catch {
  Stop-WithError '无法进入整合包目录。' @('请确认该目录存在、可以读写, 并且路径没有写错。')
}

# ---------------------------------------------------------------- 2/5 连接远程
Write-Log ''
Write-Log '[2/5] 连接远程仓库 (GitHub 优先, Gitee 镜像兜底) ...'

$gitDir = Join-Path $Root '.git'
if (-not (Test-Path -LiteralPath $gitDir -PathType Container)) {
  if ($DryRun) {
    Write-Log '       [试运行] 这里会初始化 Git 仓库(已跳过)。'
  } else {
    Write-Log '       首次使用: 正在把整合包目录初始化成 Git 仓库 ...'
    Invoke-Git @('init', '-q') | Out-Null
    if ($script:LastCode -ne 0) { Stop-WithError '初始化 Git 仓库失败。' @('请确认整合包目录可以正常读写。') }
  }
} else {
  Write-Log '       已检测到 Git 仓库。'
}

# 清理上次更新中断留下的状态 —— 不熟悉 Git 的人中途关窗口后,
# 这些残留会让之后每一次同步都失败, 是"越更新越坏"的主要来源。
$brokenDir = Join-Path (Join-Path $Root 'updater\.rollback') ($stamp + '-git-broken-state')
$cleaned = @()

# abort 仍失败时, 绝不能把残留标记留在 .git 里: 只要它还在, 之后每一条 git 命令都会
# 报 "a rebase/merge is in progress", 合作者就会永远卡住。所以统一再检查一次,
# 还在就整体挪进备份目录(不删除, 万一有他需要的东西)。
$stateMarks = @(
  @{ Path = 'rebase-merge';     What = '未完成的 rebase';     Abort = @('rebase', '--abort') },
  @{ Path = 'rebase-apply';     What = '未完成的 rebase';     Abort = @('rebase', '--abort') },
  @{ Path = 'MERGE_HEAD';       What = '未完成的合并';         Abort = @('merge', '--abort') },
  @{ Path = 'CHERRY_PICK_HEAD'; What = '未完成的 cherry-pick'; Abort = @('cherry-pick', '--abort') },
  @{ Path = 'index.lock';       What = '残留的 index.lock';    Abort = $null }
)
foreach ($mark in $stateMarks) {
  $full = Join-Path $gitDir $mark.Path
  if (-not (Test-Path -LiteralPath $full)) { continue }
  if ($mark.Abort) { Invoke-Git $mark.Abort | Out-Null }
  if (Test-Path -LiteralPath $full) {
    try {
      if (-not (Test-Path -LiteralPath $brokenDir)) { New-Item -ItemType Directory -Force -Path $brokenDir -ErrorAction SilentlyContinue | Out-Null }
      Move-Item -LiteralPath $full -Destination (Join-Path $brokenDir $mark.Path) -Force -ErrorAction Stop
      $cleaned += ($mark.What + '(已移入备份)')
    } catch {
      $cleaned += ($mark.What + '(清理失败)')
    }
  } else {
    $cleaned += $mark.What
  }
}
if ($cleaned.Count -gt 0) {
  Write-Log ('       已自动清理上次中断留下的: ' + ($cleaned -join '、'))
}

# 注意: 一律用 @(...) 把结果重新包成数组 —— PowerShell 会把单元素数组解包成字符串,
#       那样后面写 $x[0] 取到的就是"第一个字符"而不是第一行。
$originLines = @(Split-Lines (Invoke-Git @('config', '--get', 'remote.origin.url')))
$originUrl = ''
if ($originLines.Count -gt 0) { $originUrl = $originLines[0] }

if (-not $originUrl) {
  if ($DryRun) {
    Write-Log ('       [试运行] 这里会添加远程 origin -> ' + $RemoteUrl)
  } else {
    Write-Log ('       正在连接远程仓库 ...')
    Invoke-Git @('remote', 'add', 'origin', $RemoteUrl) | Out-Null
    if ($script:LastCode -ne 0) { Stop-WithError '添加远程仓库失败。' }
  }
} elseif ((Get-NormalizedUrl $originUrl) -ne (Get-NormalizedUrl $RemoteUrl)) {
  Write-Log ('       远程地址与 GitHub 不一致, 正在切换:')
  Write-Log ('         旧: ' + $originUrl)
  Write-Log ('         新: ' + $RemoteUrl)
  if (-not $DryRun) {
    Invoke-Git @('remote', 'set-url', 'origin', $RemoteUrl) | Out-Null
    if ($script:LastCode -ne 0) { Stop-WithError '修改远程仓库地址失败。' }
  }
} else {
  Write-Log '       GitHub 远程仓库已连接。'
}

# ---------------------------------------------------------------- 3/5 拉取
Write-Log ''
Write-Log '[3/5] 从远程仓库拉取最新版本 ...'

# 口径与 updater/sync.ps1 一致: GitHub 优先, 连不上(探测失败或下载断流)就自动切 Gitee 镜像。
# 两个源的默认分支名不同(GitHub 是 main, Gitee 镜像是 master), 所以不能共用探测结果。
# 只有 -RemoteUrl 仍指向官方 GitHub 时才允许兜底, 否则切镜像会拉到不相干的内容。
$canFallback  = ((Get-NormalizedUrl $RemoteUrl) -eq (Get-NormalizedUrl $script:OfficialUrl))
$sourceName   = 'GitHub'
$fetchTarget  = 'origin'
$localRefBase = 'origin'
$branchName   = $Branch
$giteeTarget  = ''

# 第一步: 确定分支名。用户没指定分支时, 先问 GitHub 的默认分支;
# 探测失败且允许兜底, 才改问 Gitee 镜像。
if (-not $branchName) {
  $branchName = Get-RemoteDefaultBranch -Target 'origin' -Label 'GitHub' -Fallback 'main'
  if (-not $branchName) {
    if (-not $canFallback) {
      Stop-WithError '连不上 GitHub(网络问题)。' @(
        '1) 用浏览器打开 https://github.com/ 看看能不能访问;',
        '2) 如果平时需要开代理/VPN 才能上 GitHub, 请先开好再运行本程序;',
        '3) 确认后重新双击 Update-CMI.bat 即可。'
      )
    }
    Write-Log '       连不上 GitHub, 改用 Gitee 镜像源 ...'
    $giteeTarget = Get-GiteeFetchTarget
    $branchName = Get-RemoteDefaultBranch -Target $giteeTarget -Label 'Gitee' -Fallback $script:GiteeBranch
    if (-not $branchName) {
      Stop-WithError 'GitHub 与 Gitee 镜像都连不上(网络问题)。' @(
        '1) 先用浏览器分别打开 https://github.com/ 与 https://gitee.com/ 看看能不能访问;',
        '2) 如果平时需要开代理/VPN 才能上 GitHub, 请先开好再运行本程序;',
        '3) 确认后重新双击 Update-CMI.bat 即可。'
      )
    }
    $sourceName   = 'Gitee 镜像'
    $fetchTarget  = $giteeTarget
    $localRefBase = 'gitee'
  }
}
Write-Log ('       目标分支: ' + $branchName + ' (来源: ' + $sourceName + ')')

$remoteRef = 'refs/remotes/' + $localRefBase + '/' + $branchName

# 第二步: 下载。探测通不代表下载能成(慢网/断流很常见), 所以下载失败也要再试镜像一次。
$fetchOk = Invoke-FetchFrom -Target $fetchTarget -BranchName $branchName -LocalRefBase $localRefBase -Label $sourceName
if (-not $fetchOk -and $localRefBase -eq 'origin' -and $canFallback) {
  Write-Log '       从 GitHub 下载失败, 改用 Gitee 镜像源 ...'
  $giteeTarget = Get-GiteeFetchTarget
  $giteeBranch = Get-RemoteDefaultBranch -Target $giteeTarget -Label 'Gitee' -Fallback $script:GiteeBranch
  if ($giteeBranch) {
    $branchName   = $giteeBranch
    $sourceName   = 'Gitee 镜像'
    $fetchTarget  = $giteeTarget
    $localRefBase = 'gitee'
    $remoteRef    = 'refs/remotes/' + $localRefBase + '/' + $branchName
    Write-Log ('       目标分支: ' + $branchName + ' (来源: ' + $sourceName + ')')
    $fetchOk = Invoke-FetchFrom -Target $fetchTarget -BranchName $branchName -LocalRefBase $localRefBase -Label $sourceName
  }
}
if (-not $fetchOk) {
  Stop-WithError '从远程仓库下载失败(GitHub 与 Gitee 镜像都没成功)。' @(
    '请检查网络 / 代理后重新双击 Update-CMI.bat;',
    '若反复失败, 请把本次日志发给开发组。'
  )
}

$newHead = ''
$newLines = @(Split-Lines (Invoke-Git @('rev-parse', '--verify', '-q', $remoteRef)))
if ($newLines.Count -gt 0) { $newHead = $newLines[0] }
$oldHead = ''
$oldLines = @(Split-Lines (Invoke-Git @('rev-parse', '--verify', '-q', 'HEAD')))
if ($oldLines.Count -gt 0) { $oldHead = $oldLines[0] }

if (-not $newHead) { Stop-WithError '没能读到远程版本信息(仓库可能是空的)。' }

# ---------------------------------------------------------------- 4/5 应用
Write-Log ''
$backupDir = ''
if ($oldHead -and $oldHead -eq $newHead) {
  Write-Log '[4/5] 内容已经是最新版, 无需覆盖任何文件。'
} else {
  Write-Log '[4/5] 备份本地改动并写入最新版 ...'

  # (a) 被跟踪文件的本地改动
  $modified = @()
  if ($oldHead) { $modified = @(Split-Lines (Invoke-Git @('diff', '--name-only', 'HEAD'))) }
  # (b) 本地多出来的文件(未被 .gitignore 忽略的)
  $untracked = @(Split-Lines (Invoke-Git @('ls-files', '--others', '--exclude-standard')))
  # 跳过脚本自己的产物(updater/logs、updater/.rollback), 避免"备份里再套备份"
  $modified  = @($modified  | Where-Object { -not (Test-OwnArtifact $_) })
  $untracked = @($untracked | Where-Object { -not (Test-OwnArtifact $_) })

  # 新版里也存在、而本地同样存在的未跟踪文件会让 Git 拒绝覆盖 ——
  # 这是"同步报错"最常见的原因之一, 所以要先把它们挪走(而不是删掉)。
  $treeSet = @{}
  $treeText = Invoke-Git @('ls-tree', '-r', '--name-only', $remoteRef)
  foreach ($t in @(Split-Lines $treeText)) {
    $treeSet[$t.ToLowerInvariant()] = $true
  }
  $conflicts = @()
  $extra     = @()
  foreach ($u in $untracked) {
    if ($treeSet.ContainsKey($u.ToLowerInvariant())) { $conflicts += $u } else { $extra += $u }
  }

  if ($modified.Count -gt 0 -or $extra.Count -gt 0 -or $conflicts.Count -gt 0) {
    $backupDir = Join-Path (Join-Path $Root 'updater\.rollback') ($stamp + '-before-github-update')
    Write-Log ('       本地有改动, 先备份到: ' + $backupDir)
    $n = 0
    foreach ($rel in $modified)  { if (Backup-OneFile -PackRoot $Root -RelPath $rel -DestRoot (Join-Path $backupDir 'modified-from-local'))  { $n++ } }
    foreach ($rel in $extra)     { if (Backup-OneFile -PackRoot $Root -RelPath $rel -DestRoot (Join-Path $backupDir 'extra-from-local'))     { $n++ } }
    $moved = 0
    foreach ($rel in $conflicts) {
      if (Backup-OneFile -PackRoot $Root -RelPath $rel -DestRoot (Join-Path $backupDir 'replaced-by-update') -Move) { $moved++ }
    }
    Write-Log ('       已备份 ' + $n + ' 个文件; 另有 ' + $moved + ' 个同名文件已移入备份以免阻断更新。')
  } else {
    Write-Log '       本地没有需要备份的改动。'
  }

  if ($DryRun) {
    Write-Log '       [试运行] 这里会把内容切换到最新版(已跳过)。'
  } else {
    $hasHead = @(Split-Lines (Invoke-Git @('rev-parse', '--verify', '-q', 'HEAD')))
    if ($hasHead.Count -gt 0) {
      Invoke-Git @('checkout', '-f', '-B', $branchName, $remoteRef) -ShowOutput
    } else {
      Invoke-Git @('checkout', '-f', '-b', $branchName, $remoteRef) -ShowOutput
    }
    if ($script:LastCode -ne 0) {
      Stop-WithError '写入最新版失败。' @(
        '如果游戏还在运行, 请完全退出游戏(连启动器一起关掉)后重试;',
        '若反复失败, 请把本次日志发给开发组。'
      )
    }
    Write-Log '       内容已更新。'
  }
}

$desc = @(Split-Lines (Invoke-Git @('log', '-1', '--date=format:%Y-%m-%d %H:%M', '--pretty=format:%h %ad %s', $remoteRef)))
if ($desc.Count -gt 0) { Write-Log ('       最新版本: ' + $desc[0]) }

# ---------------------------------------------------------------- 5/5 mods
Write-Log ''
Write-Log '[5/5] 按更新清单下载 / 校验 mods ...'

$modsRc = 0
$modsSync = Join-Path $Root 'updater\mods-sync.ps1'
if (-not (Test-Path -LiteralPath $modsSync -PathType Leaf)) {
  Write-Log '       [跳过] 没找到 updater\mods-sync.ps1(老版本包可能没有), 只更新了仓库内容。'
} elseif ($DryRun) {
  Write-Log '       [试运行] 这里会按 update.tsv 下载 / 校验 mods(已跳过)。'
} else {
  & powershell -NoProfile -ExecutionPolicy Bypass -File $modsSync
  $modsRc = $LASTEXITCODE
}

# ---------------------------------------------------------------- 总结
Write-Log ''
Write-Log '============================================================'
if ($oldHead -and ($oldHead -ne $newHead)) {
  $oldShort = $oldHead
  if ($oldShort.Length -gt 7) { $oldShort = $oldShort.Substring(0, 7) }
  Write-Log ('       更新前版本: ' + $oldShort)
}
$newShort = $newHead
if ($newShort.Length -gt 7) { $newShort = $newShort.Substring(0, 7) }
if ($newShort) { Write-Log ('       当前版本  : ' + $newShort) }
Write-Log ('       更新来源  : ' + $sourceName)
if ($backupDir) { Write-Log ('       本地改动备份: ' + $backupDir) }
Write-Log ('       本次日志  : ' + $script:LogPath)

if ($modsRc -ne 0) {
  Write-Log ''
  Write-Log '[提示] 仓库内容已是最新, 但有部分 mod 没能下载成功。'
  Write-Log '       失败的 mod 已自动恢复为旧版本, 游戏仍可正常启动。'
  Write-Log '       请把 updater\logs\ 下最新的日志文件发给开发组;'
  Write-Log '       也可以直接重新双击 Update-CMI.bat 重试(只会补下载失败的那几个)。'
  Write-Log '============================================================'
  exit 1
}

if ($DryRun) {
  Write-Log ''
  Write-Log '[试运行结束] 一切正常, 没有改动任何文件。'
} else {
  Write-Log ''
  Write-Log '[完成] 整合包已是最新版本, 可以启动游戏了。'
  if ($backupDir) {
    Write-Log ('       你自己的改动被保存在备份目录里, 确认游戏正常后可以删除它。')
    if ($oldHead) {
      Write-Log ('       想回到更新前的版本, 可在整合包目录执行: git reset --hard ' + $oldHead)
    }
  }
}
Write-Log '============================================================'
exit 0
