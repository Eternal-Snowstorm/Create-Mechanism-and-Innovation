param(
  [string]$Root = '',
  [switch]$DryRun,
  [string]$Proxy = '',
  [switch]$NoMirror
)
$ErrorActionPreference = 'Stop'

# 注意: 不要强制 [Console]::OutputEncoding, 否则会与本脚本调用方(.bat 的 chcp 936)
# 的控制台代码页冲突, 导致中文乱码. PowerShell 默认跟随控制台代码页, 这正是所需行为. 

# 客户端根目录 = updater 的上一级(文件夹名不必是 .minecraft)
if (-not $Root) { $Root = Split-Path -Parent $PSScriptRoot }
$Root = (Resolve-Path $Root).Path

$manifest   = Join-Path $Root 'updater\update.tsv'
$deleteList = Join-Path $Root 'updater\delete.tsv'
$logDir     = Join-Path $Root 'updater\logs'
$backupRoot = Join-Path $Root 'updater\.rollback'

$stamp   = Get-Date -Format 'yyyyMMdd-HHmmss'
$logFile = Join-Path $logDir ("update-" + $stamp + ".log")

if (-not (Test-Path -LiteralPath $logDir)) { New-Item -ItemType Directory -Force -Path $logDir | Out-Null }
$script:LogPath = $logFile
try {
  Set-Content -LiteralPath $logFile -Encoding UTF8 -Value @(
    '==== CMI 整合包 mods 更新日志 ====',
    ('时间        : ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')),
    ('客户端根目录: ' + $Root),
    ('清单文件    : ' + $manifest),
    '----------------------------------'
  )
} catch { $script:LogPath = '' }

function Write-Log([string]$msg) {
  Write-Host $msg
  if ($script:LogPath) {
    try { Add-Content -LiteralPath $script:LogPath -Value $msg -Encoding UTF8 } catch { }
  }
}
function Write-LogWarn([string]$msg) {
  Write-Host $msg
  if ($script:LogPath) {
    try { Add-Content -LiteralPath $script:LogPath -Value $msg -Encoding UTF8 } catch { }
  }
}

# 安全限制: 只操作以下目录; 绝不触碰 saves/options.txt/服务器数据
$safePrefixes = @('mods/', 'config/', 'kubejs/', 'defaultconfigs/', 'resourcepacks/')

function Test-SafePath([string]$p) {
  if ([string]::IsNullOrWhiteSpace($p)) { return $false }
  if ($p.StartsWith('/') -or $p.StartsWith('\') -or $p.Contains('..')) { return $false }
  foreach ($pre in $safePrefixes) { if ($p.StartsWith($pre)) { return $true } }
  return $false
}

# mod 名主干: 与 make-update-json.sh / mods-sync.sh 保持一致,
# 用于把"下载失败的新 jar"匹配到它在备份里被替换掉的旧版本. 
function Get-ModKey([string]$path) {
  $b = Split-Path -Leaf $path
  $b = $b -replace '\.jar$', ''
  $b = $b -replace '\.disabled$', ''
  $b = $b -replace '[0-9].*$', ''
  $b = $b -replace '[^A-Za-z0-9]*$', ''
  return $b.ToLowerInvariant()
}

# 黑名单: 文件名以 "[]" 开头的 mod 不参与同步(与 dev/make-update-json.sh 的约定一致). 
# 这类文件由玩家自行持有, 既不在 update.tsv 里, 也绝不能被 delete.tsv / replaces
# 流程删除 —— 否则历史 delete.tsv 里一旦混入同样的路径, 每次更新都会把它清掉. 
function Test-ModBlacklisted([string]$p) {
  if ([string]::IsNullOrWhiteSpace($p)) { return $false }
  $leaf = $p.Replace('\', '/')
  $i = $leaf.LastIndexOf('/')
  if ($i -ge 0) { $leaf = $leaf.Substring($i + 1) }
  return $leaf.StartsWith('[]')
}

function Get-Sha1([string]$file) {
  return (Get-FileHash -Algorithm SHA1 -LiteralPath $file).Hash.ToLowerInvariant()
}

# --- 下载容错工具 --------------------------------------------------------
# 设计要点(2026-11-15 玩家日志 curl 退出码 6 事故):
#   1) 单一域名一旦 DNS 不可用, 整批下载会全灭 —— 因此内置备用域名, 原地址失败后自动切换;
#   2) 先做网络预检再动本地文件, 避免"旧版本已移出但新版本下不回来";
#   3) 支持 -Proxy / 环境变量 / Windows 系统代理三种代理来源;
#   4) 失败时把 curl 退出码翻译成中文, 并打印可手动下载的项目页地址.
function Normalize-ProxyUrl([string]$u) {
  if ([string]::IsNullOrWhiteSpace($u)) { return '' }
  $u = $u.Trim()
  if ($u -notmatch '^[a-zA-Z][a-zA-Z0-9+.\-]*://') { $u = 'http://' + $u }
  return $u
}

# 读 Windows 系统代理(HKCU Internet Settings), 兼容 "host:port" 与
# "http=host:port;https=host:port" 两种写法. 未启用代理时返回空串.
function Get-RegistryProxyUrl {
  try {
    $k = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings'
    $p = Get-ItemProperty -Path $k -ErrorAction Stop
    if ($null -eq $p) { return '' }
    if ($p.ProxyEnable -ne 1) { return '' }
    $s = [string]$p.ProxyServer
    if ([string]::IsNullOrWhiteSpace($s)) { return '' }
    if ($s.Contains('=')) {
      $m = @{}
      foreach ($seg in $s.Split(';')) {
        $kv = $seg.Split('=', 2)
        if ($kv.Count -eq 2) { $m[$kv[0].Trim().ToLowerInvariant()] = $kv[1].Trim() }
      }
      if ($m.ContainsKey('https')) { $s = $m['https'] }
      elseif ($m.ContainsKey('http')) { $s = $m['http'] }
      else { return '' }
    }
    return (Normalize-ProxyUrl $s)
  } catch { return '' }
}

function Get-UrlHost([string]$u) {
  if ([string]::IsNullOrWhiteSpace($u)) { return '' }
  try { return ([System.Uri]$u).Host } catch { return '' }
}

# 内建备用域名: 只对 CurseForge 官方 CDN 生效(Modrinth 无公开镜像).
# mediafilez.forgecdn.net 与 edge.forgecdn.net 指向同一批文件, 实测 sha1 一致.
$script:CfMirrors = @{
  'edge.forgecdn.net'       = @('mediafilez.forgecdn.net')
  'mediafilez.forgecdn.net' = @('edge.forgecdn.net')
}

function Get-DownloadCandidates([string]$u) {
  $list = New-Object 'System.Collections.Generic.List[string]'
  if ([string]::IsNullOrWhiteSpace($u)) { return $list.ToArray() }
  [void]$list.Add($u)
  $h = Get-UrlHost $u
  if ($h -and $script:CfMirrors.ContainsKey($h)) {
    foreach ($m in $script:CfMirrors[$h]) {
      $cu = $u.Replace('//' + $h + '/', '//' + $m + '/')
      if (($cu -ne $u) -and (-not $list.Contains($cu))) { [void]$list.Add($cu) }
    }
  }
  return $list.ToArray()
}

# DNS 预检(带缓存): 判定的是"主机名能否解析", 不做 TCP 连接, 速度足够快.
$script:DnsState = @{}
function Test-DownloadHost([string]$h) {
  if ([string]::IsNullOrWhiteSpace($h)) { return $false }
  if ($script:DnsState.ContainsKey($h)) { return $script:DnsState[$h] }
  $ok = $false
  try {
    $a = [System.Net.Dns]::GetHostAddresses($h)
    $ok = ($null -ne $a) -and ($a.Length -gt 0)
  } catch { $ok = $false }
  $script:DnsState[$h] = $ok
  return $ok
}

function Test-CurlNetError([int]$code) {
  $net = @(5, 6, 7, 18, 28, 35, 52, 56)
  return ($net -contains $code)
}

function Get-CurlErrorText([int]$code) {
  $map = @{
    1  = '不支持的协议'
    2  = '初始化失败'
    3  = '下载地址格式不正确'
    5  = '无法解析代理服务器地址(代理设置有误)'
    6  = '无法解析下载域名(网络断开 / DNS 被干扰 / 需要代理)'
    7  = '无法连接下载服务器(网络不通或被防火墙拦截)'
    18 = '下载内容不完整(连接被中途断开)'
    22 = '服务器返回错误状态(文件可能已下架, 或该平台限流)'
    23 = '写入文件失败(磁盘空间不足或文件被占用)'
    28 = '连接超时(网络过慢或被拦截)'
    35 = 'TLS 握手失败(可能被网络中间设备干扰)'
    51 = '服务器证书校验失败'
    52 = '服务器返回空响应'
    55 = '发送数据失败'
    56 = '接收数据失败(连接被重置)'
    60 = 'HTTPS 证书校验失败(系统时间或证书链有问题)'
  }
  if ($map.ContainsKey($code)) { return $map[$code] }
  return '下载出错'
}

# 调用 curl 下载: 返回 Exit(退出码) / Http(HTTP 状态码) / Msg(stderr 文本).
# 注意: PowerShell 5.1 对原生命令做 2>&1 会把 stderr 包装成 ErrorRecord,
# 叠加 $ErrorActionPreference='Stop' 会直接终止脚本 —— 这里临时降级并在 finally 恢复.
function Invoke-CurlFetch([string]$Url, [string]$OutFile, [string]$ProxyUrl) {
  $res = [pscustomobject]@{ Exit = -1; Http = ''; Msg = '' }
  if (-not (Get-Command 'curl.exe' -ErrorAction SilentlyContinue)) {
    $res.Exit = -2
    $res.Msg = '未找到 curl.exe(请安装 Git for Windows, 或改用 Update-CMI.bat)'
    return $res
  }
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $out = New-Object 'System.Collections.Generic.List[string]'
  try {
    $argv = @('-L', '--fail', '-s', '-S', '--retry', '2', '--retry-delay', '2', '--connect-timeout', '20', '--write-out', '%{http_code}')
    if ($ProxyUrl) { $argv += @('--proxy', $ProxyUrl) }
    $argv += @('-o', $OutFile, $Url)
    try {
      foreach ($ln in (& curl.exe @argv 2>&1)) {
        if ($ln -is [System.Management.Automation.ErrorRecord]) { [void]$out.Add([string]$ln.Exception.Message) }
        elseif ($null -ne $ln) { [void]$out.Add(([string]$ln).Trim()) }
      }
    } catch {
      [void]$out.Add([string]$_.Exception.Message)
    }
    $lc = $LASTEXITCODE
    if ($null -eq $lc) { $lc = 0 }
    $res.Exit = [int]$lc
  } finally {
    $ErrorActionPreference = $prev
  }
  if ($out.Count -gt 0) {
    $last = $out[$out.Count - 1]
    if ($last -match '^\d{3}$') { $res.Http = $last; $out.RemoveAt($out.Count - 1) }
  }
  $keep = @()
  foreach ($s in $out) { if ($s -and ($keep -notcontains $s)) { $keep += $s } }
  $res.Msg = ($keep -join ' ').Trim()
  return $res
}

# 失败时给玩家留一条"可以自己动手"的路: 项目页 + 手动放置说明.
function Get-ManualDownloadHint($item) {
  $lines = New-Object 'System.Collections.Generic.List[string]'
  $u = [string]$item.Url
  $proj = [string]$item.Proj
  if ($proj -like 'modrinth:*') {
    $mid = $proj.Substring('modrinth:'.Length)
    if ($mid) { [void]$lines.Add('项目页   : https://modrinth.com/project/' + $mid) }
  } elseif ($u -match '/data/([^/]+)/') {
    [void]$lines.Add('项目页   : https://modrinth.com/project/' + $Matches[1])
  } elseif ($proj -like 'curseforge:*') {
    $cid = $proj.Substring('curseforge:'.Length)
    if ($cid) { [void]$lines.Add('项目页   : https://www.curseforge.com/projects/' + $cid + '  (浏览器打开, 可能需要人机验证)') }
  }
  if ($lines.Count -gt 0) {
    [void]$lines.Add('手动更新 : 在项目页下载同名 jar, 放入 mods/ 目录(先删掉旧的同名文件)')
  }
  return $lines.ToArray()
}

# --- 代理 --------------------------------------------------------------
# 优先级: -Proxy 参数 > 环境变量(curl 自身会读, 这里只做提示) > Windows 系统代理
$script:ProxyUrl = ''
$script:ProxyFrom = ''
if ($Proxy) {
  $script:ProxyUrl = Normalize-ProxyUrl $Proxy
  $script:ProxyFrom = ('命令行 -Proxy ' + $script:ProxyUrl)
} else {
  $envProxy = ''
  foreach ($n in @('HTTPS_PROXY', 'https_proxy', 'HTTP_PROXY', 'http_proxy', 'ALL_PROXY', 'all_proxy')) {
    $v = [Environment]::GetEnvironmentVariable($n)
    if ($v) { $envProxy = $v; break }
  }
  if ($envProxy) {
    $script:ProxyFrom = ('环境变量 ' + $envProxy + ' (curl 自动使用)')
  } else {
    $regProxy = Get-RegistryProxyUrl
    if ($regProxy) {
      $script:ProxyUrl = $regProxy
      $script:ProxyFrom = ('Windows 系统代理 ' + $regProxy)
    }
  }
}
if ($script:ProxyFrom) { Write-Log ('[mods] 代理: ' + $script:ProxyFrom) }
else { Write-Log '[mods] 代理: 未检测到(直连)' }

# --- 1. 解析清单 --------------------------------------------------------
# 清单为 5 列(TAB 分隔): sha1 | path | url | project | replaces
# 兼容旧的 3 列格式(sha1 | path | url). 
if (-not (Test-Path -LiteralPath $manifest)) {
  Write-Log '[mods] 未找到 update.tsv, 跳过 mods 同步'
  exit 0
}

$items = New-Object 'System.Collections.Generic.List[object]'
foreach ($line in Get-Content -LiteralPath $manifest) {
  if ([string]::IsNullOrWhiteSpace($line)) { continue }
  $parts = $line -split ([char]9)
  if ($parts.Count -lt 2) { continue }
  $h = $parts[0].Trim()
  $p = $parts[1].Trim()
  $u = if ($parts.Count -ge 3) { $parts[2].Trim() } else { '' }
  $proj = if ($parts.Count -ge 4) { $parts[3].Trim() } else { '' }
  $reps = if ($parts.Count -ge 5) { $parts[4].Trim() } else { '' }
  if (-not (Test-SafePath $p)) { continue }
  $items.Add([pscustomobject]@{ Hash = $h; Path = $p; Url = $u; Proj = $proj; Reps = $reps })
}

if ($items.Count -eq 0) {
  Write-Log '[mods] 清单为空, 跳过 mods 同步'
  exit 0
}

# 仍在清单中的路径 = 受保护, 绝不删除
$protected = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($it in $items) { [void]$protected.Add($it.Path) }

# --- 2. 汇总待下架 / 待替换的旧 jar -------------------------------------
# 黑名单保护: 下面三处待删来源(delete.tsv / replaces / 同主干自愈)统一跳过
# 文件名以 "[]" 开头的文件, 让玩家自有的黑名单 mod 永远不被删除或替换. 
$script:BlacklistSkipped = 0
$pendingList = New-Object 'System.Collections.Generic.List[string]'
$pendingSeen = New-Object 'System.Collections.Generic.HashSet[string]'

# 2a. delete.tsv(累积的历史下架项)
if (Test-Path -LiteralPath $deleteList) {
  foreach ($line in Get-Content -LiteralPath $deleteList) {
    $p = $line.Trim()
    if (-not (Test-SafePath $p)) { continue }
    if ($protected.Contains($p)) { continue }
    if (Test-ModBlacklisted $p) { $script:BlacklistSkipped++; continue }
    if (-not (Test-Path -LiteralPath (Join-Path $Root $p))) { continue }
    if ($pendingSeen.Add($p)) { $pendingList.Add($p) }
  }
}

# 2b. 清单 replaces 字段(本次"版本更替"中被取代的旧 jar)
foreach ($it in $items) {
  if ([string]::IsNullOrWhiteSpace($it.Reps)) { continue }
  foreach ($op0 in $it.Reps.Split(',')) {
    $op = $op0.Trim()
    if (-not (Test-SafePath $op)) { continue }
    if ($protected.Contains($op)) { continue }
    if (Test-ModBlacklisted $op) { $script:BlacklistSkipped++; continue }
    if (-not (Test-Path -LiteralPath (Join-Path $Root $op))) { continue }
    if ($pendingSeen.Add($op)) { $pendingList.Add($op) }
  }
}

# 2c. 自愈: 清单中的 mod 在 mods\ 下残留的其它版本(同名主干)
#     若历史 delete.tsv 漏记了某个下架项, 新旧两个 jar 会并存, Forge 会以
#     "Duplicate mods" 直接崩溃启动; 这里按 mod 名主干兜底清理. 
#     只扫 mods\*.jar, 并且只清理"与清单中某个 mod 同主干"的文件 ——
#     玩家自己添加的, 与清单无关的 mod 不会被碰. 
$listKeys = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($it in $items) {
  if (-not $it.Path.StartsWith('mods/')) { continue }
  $k = Get-ModKey $it.Path
  if ($k) { [void]$listKeys.Add($k) }
}
$modsDir = Join-Path $Root 'mods'
if (($listKeys.Count -gt 0) -and (Test-Path -LiteralPath $modsDir)) {
  foreach ($f in @(Get-ChildItem -LiteralPath $modsDir -File -Filter '*.jar' -ErrorAction SilentlyContinue)) {
    $rel = 'mods/' + $f.Name
    if ($protected.Contains($rel)) { continue }
    if (Test-ModBlacklisted $rel) { $script:BlacklistSkipped++; continue }
    if (-not $listKeys.Contains((Get-ModKey $rel))) { continue }
    if ($pendingSeen.Add($rel)) { $pendingList.Add($rel) }
  }
}

# --- 2d. 网络预检 ------------------------------------------------------
# 在动任何本地文件之前, 先确认本次要用的下载域名能否解析.
# 若所有域名都解析失败(典型场景: 玩家网络无法访问 CurseForge), 直接中止,
# 避免"旧版本已被移出但新版本下不回来"的破坏性结果.
$allHosts = New-Object 'System.Collections.Generic.List[string]'
foreach ($it in $items) {
  if (-not $it.Url) { continue }
  foreach ($cu in @(Get-DownloadCandidates $it.Url)) {
    $ch = Get-UrlHost $cu
    if ($ch -and (-not $allHosts.Contains($ch))) { [void]$allHosts.Add($ch) }
  }
}
$badHosts = New-Object 'System.Collections.Generic.List[string]'
foreach ($h in $allHosts) {
  if (-not (Test-DownloadHost $h)) { [void]$badHosts.Add($h) }
}
if ($allHosts.Count -gt 0) {
  if ($badHosts.Count -eq 0) {
    Write-Log ('[mods] 网络预检: ' + $allHosts.Count + ' 个下载域名均可解析')
  } else {
    Write-Log ''
    Write-Log ('[mods] 网络预检: ' + $allHosts.Count + ' 个下载域名中 ' + $badHosts.Count + ' 个无法解析')
    foreach ($h in $badHosts) { Write-LogWarn ('       无法解析: ' + $h) }
    Write-Log '       可能原因: 网络未连接 / DNS 解析被干扰 / 需要代理或加速器'
    Write-Log '       有备用域名的会自动切换; 若仍然失败, 请开启代理后重新运行'
  }
}
if (($allHosts.Count -gt 0) -and ($badHosts.Count -eq $allHosts.Count)) {
  Write-Log ''
  Write-LogWarn '[mods] 所有下载域名都无法解析, 本次未改动任何本地文件.'
  Write-LogWarn '       请检查网络连接, 或开启代理后重试(支持 -Proxy 参数 / 系统代理 / 环境变量).'
  if (-not $DryRun) { exit 1 }
}

# --- 3. 备份待删除的旧 jar ---------------------------------------------
$backupDir = Join-Path $backupRoot $stamp
if ($pendingList.Count -gt 0) {
  if ($DryRun) {
    foreach ($p in $pendingList) { Write-Log ("[mods][dry-run] 将删除/替换(会先备份): " + $p) }
  } else {
    foreach ($p in $pendingList) {
      $src = Join-Path $Root $p
      $dst = Join-Path $backupDir $p
      $dstDir = Split-Path -Parent $dst
      if (-not (Test-Path -LiteralPath $dstDir)) { New-Item -ItemType Directory -Force -Path $dstDir | Out-Null }
      try {
        Move-Item -Force -LiteralPath $src -Destination $dst
        Write-Log ("[mods] 已移出旧版本(备份待清理): " + $p)
      } catch {
        Write-LogWarn ("[mods] 旧版本移出失败(可能被占用), 保持原样: " + $p)
      }
    }
  }
}

# --- 4. 按清单下载缺失 / 校验不符的 jar ---------------------------------
$total = 0; $skipped = 0; $downloaded = 0; $failed = 0; $nosource = 0
$netFailed = 0
$failList = New-Object 'System.Collections.Generic.List[object]'

foreach ($it in $items) {
  $total++
  $dest = Join-Path $Root $it.Path

  # 本地已是最新 -> 跳过
  if ((Test-Path -LiteralPath $dest) -and $it.Hash) {
    $cur = ''
    try { $cur = Get-Sha1 $dest } catch { $cur = '' }
    if ($cur -eq $it.Hash.ToLowerInvariant()) { $skipped++; continue }
  }

  # 清单没有下载地址 -> 无法处理
  if (-not $it.Url) {
    $nosource++
    if ($DryRun) { Write-Log ("[mods][dry-run] 缺失且无源: " + $it.Path) }
    else { Write-LogWarn ("[mods] 无源(清单未提供下载地址): " + $it.Path) }
    continue
  }

  if ($DryRun) {
    Write-Log ("[mods][dry-run] 将下载: " + $it.Path)
    Write-Log ("               <- " + $it.Url)
    continue
  }

  $destDir = Split-Path -Parent $dest
  if (-not (Test-Path -LiteralPath $destDir)) { New-Item -ItemType Directory -Force -Path $destDir | Out-Null }
  $tmp = $dest + '.download'
  if (Test-Path -LiteralPath $tmp) { Remove-Item -Force -LiteralPath $tmp -ErrorAction SilentlyContinue }

  Write-Log ("[mods] 下载: " + $it.Path)
  Write-Log ("       <- " + $it.Url)

  # 候选地址 = 清单原地址 + 内建备用域名(-NoMirror 可关闭)
  $cands = @($it.Url)
  if (-not $NoMirror) { $cands = @(Get-DownloadCandidates $it.Url) }

  # 预检判定不可解析的域名直接跳过; 若全部被判坏则仍逐个尝试(预检可能误判)
  $tryList = New-Object 'System.Collections.Generic.List[string]'
  foreach ($cu in $cands) {
    $ch = Get-UrlHost $cu
    if ($ch -and $script:DnsState.ContainsKey($ch) -and (-not $script:DnsState[$ch])) { continue }
    [void]$tryList.Add($cu)
  }
  if ($tryList.Count -eq 0) { foreach ($cu in $cands) { [void]$tryList.Add($cu) } }

  $ok = $false
  $why = ''
  $isNet = $false
  $nTry = 0
  foreach ($cu in $tryList) {
    $nTry++
    if ($nTry -gt 1) { Write-Log ("       <- 改用备用地址: " + $cu) }
    if (Test-Path -LiteralPath $tmp) { Remove-Item -Force -LiteralPath $tmp -ErrorAction SilentlyContinue }
    $res = Invoke-CurlFetch -Url $cu -OutFile $tmp -ProxyUrl $script:ProxyUrl

    if ($res.Http -eq '429') {
      $isNet = $true
      $why = '服务器限流(HTTP 429, 请求过于频繁)'
      continue
    }
    if ($res.Exit -ne 0) {
      $isNet = (Test-CurlNetError $res.Exit)
      $why = ('curl 退出码 ' + $res.Exit + ' (' + (Get-CurlErrorText $res.Exit) + ')')
      if ($res.Msg) { $why = $why + ' - ' + $res.Msg }
      continue
    }
    $got = ''
    try { $got = Get-Sha1 $tmp } catch { $got = '' }
    if ($it.Hash -and ($got -ne $it.Hash.ToLowerInvariant())) {
      $isNet = $false
      $why = ('sha1 不匹配(期望 ' + $it.Hash + ', 实际 ' + $got + ')')
      continue
    }
    try {
      Move-Item -Force -LiteralPath $tmp -Destination $dest
      $downloaded++
      Write-Log ("[mods] 完成: " + $it.Path)
      $ok = $true
      break
    } catch {
      $isNet = $false
      $why = ('无法写入目标文件(可能被游戏占用): ' + $_.Exception.Message)
    }
  }

  if (-not $ok) {
    if (Test-Path -LiteralPath $tmp) { Remove-Item -Force -LiteralPath $tmp -ErrorAction SilentlyContinue }
    Write-LogWarn ("[mods] 失败(下载出错): " + $it.Path)
    Write-LogWarn ("       原因     : " + $why)
    Write-LogWarn ("       下载地址 : " + $it.Url)
    foreach ($cu in $tryList) {
      if ($cu -ne $it.Url) { Write-LogWarn ("       备用地址 : " + $cu) }
    }
    foreach ($hl in @(Get-ManualDownloadHint $it)) { Write-LogWarn ('       ' + $hl) }
    $failed++
    if ($isNet) { $netFailed++ }
    $failList.Add([pscustomobject]@{ Hash = $it.Hash; Path = $it.Path; Url = $it.Url; Proj = $it.Proj; Reps = $it.Reps })
  }
}

# --- 5. 下载失败的 mod: 恢复它被替换掉的旧版本 --------------------------
$restored = 0
$missing = 0
if (($failed -gt 0) -and (-not $DryRun)) {
  Write-Log ''
  Write-Log ("[mods] 检测到 " + $failed + " 个 mod 更新失败, 正在检查可恢复的旧版本 ...")
  foreach ($fit in $failList) {
    $restoredThis = $false

    # 5a. 优先按清单 replaces 精确恢复
    if ($fit.Reps) {
      foreach ($op0 in $fit.Reps.Split(',')) {
        $op = $op0.Trim()
        if (-not $op) { continue }
        $bsrc = Join-Path $backupDir $op
        if (Test-Path -LiteralPath $bsrc) {
          $bdst = Join-Path $Root $op
          $bdstDir = Split-Path -Parent $bdst
          if (-not (Test-Path -LiteralPath $bdstDir)) { New-Item -ItemType Directory -Force -Path $bdstDir | Out-Null }
          try {
            Move-Item -Force -LiteralPath $bsrc -Destination $bdst
            Write-Log ("[mods] 已恢复旧版本: " + $op + "   (因为 " + $fit.Path + " 更新失败)")
            $restored++; $restoredThis = $true
          } catch { }
        }
      }
    }

    # 5b. 没有 replaces 记录时, 按 mod 名主干在备份里找同一 mod 的旧版本
    if (-not $restoredThis) {
      $fkey = Get-ModKey $fit.Path
      if ($fkey) {
        foreach ($cand in $pendingList) {
          if ((Get-ModKey $cand) -ne $fkey) { continue }
          $bsrc = Join-Path $backupDir $cand
          if (Test-Path -LiteralPath $bsrc) {
            $bdst = Join-Path $Root $cand
            $bdstDir = Split-Path -Parent $bdst
            if (-not (Test-Path -LiteralPath $bdstDir)) { New-Item -ItemType Directory -Force -Path $bdstDir | Out-Null }
            try {
              Move-Item -Force -LiteralPath $bsrc -Destination $bdst
              Write-Log ("[mods] 已恢复旧版本: " + $cand + "   (按 mod 名匹配到失败的 " + $fit.Path + ")")
              $restored++; $restoredThis = $true
            } catch { }
          }
          break
        }
      }
    }

    if (-not $restoredThis) {
      $missing++
      Write-Log ("[mods] 该 mod 没有可恢复的旧版本(本就是新增文件), 保持缺失: " + $fit.Path)
    }
  }
}

# --- 6. 清理备份目录 ----------------------------------------------------
if ((-not $DryRun) -and (Test-Path -LiteralPath $backupDir)) {
  if ($failed -eq 0) {
    Remove-Item -Recurse -Force -LiteralPath $backupDir -ErrorAction SilentlyContinue
    if ((Test-Path -LiteralPath $backupRoot) -and ((Get-ChildItem -LiteralPath $backupRoot -Force | Measure-Object).Count -eq 0)) {
      Remove-Item -Force -LiteralPath $backupRoot -ErrorAction SilentlyContinue
    }
  } else {
    $left = @(Get-ChildItem -LiteralPath $backupDir -Recurse -File -Force -ErrorAction SilentlyContinue)
    if ($left.Count -gt 0) {
      Write-Log ("[mods] 部分更新失败, 未恢复的旧文件备份保留在: " + $backupDir)
    } else {
      Write-Log '[mods] 失败项的旧版本均已恢复, 无需保留额外备份. '
    }
  }
}

# --- 7. 汇总与中文提示 --------------------------------------------------
Write-Log ''
Write-Log ("[mods] 完成: 总数 " + $total + ", 已最新 " + $skipped + ", 已下载 " + $downloaded + ", 失败 " + $failed + ", 无源 " + $nosource)
if ($script:BlacklistSkipped -gt 0) {
  Write-Log ("[mods] 黑名单保护: 已跳过 " + $script:BlacklistSkipped + " 个以 [] 开头的文件(不删除/不替换)")
}

if ($DryRun) { Write-Log '[mods] (dry-run 模式, 未做任何实际改动)'; exit 0 }

if ($failed -gt 0) {
  Write-Log ''
  Write-Log '============================================================'
  Write-Log ("[提示] 本次有 " + $failed + " 个 mod 没能更新成功. ")
  if (($restored -gt 0) -and ($missing -eq 0)) {
    Write-Log ("       相关 mod 的旧版本已自动恢复(" + $restored + " 个文件), 游戏仍可正常启动. ")
  }
  if ($missing -gt 0) {
    Write-Log ("       其中 " + $missing + " 个 mod 本地没有旧版本可恢复, 缺失会导致游戏启动失败, 请务必补上. ")
  }
  if ($netFailed -gt 0) {
    Write-Log '       网络类失败的排查顺序: 1) 检查网络连接 2) 开启代理/加速器 3) 按上面的项目页手动下载'
  }
  Write-Log '       请把下面这个日志文件发送给开发者, 以便我们排查原因:'
  Write-Log ("       " + $logFile)
  Write-Log '============================================================'
  exit 1
}

exit 0
