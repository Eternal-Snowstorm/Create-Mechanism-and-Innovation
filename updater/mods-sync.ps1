param(
  [string]$Root = '',
  [switch]$DryRun
)
$ErrorActionPreference = 'Stop'

# 注意: 不要强制 [Console]::OutputEncoding, 否则会与本脚本调用方(.bat 的 chcp 936)
# 的控制台代码页冲突, 导致中文乱码。PowerShell 默认跟随控制台代码页, 这正是所需行为。

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
# 用于把"下载失败的新 jar"匹配到它在备份里被替换掉的旧版本。
function Get-ModKey([string]$path) {
  $b = Split-Path -Leaf $path
  $b = $b -replace '\.jar$', ''
  $b = $b -replace '\.disabled$', ''
  $b = $b -replace '[0-9].*$', ''
  $b = $b -replace '[^A-Za-z0-9]*$', ''
  return $b.ToLowerInvariant()
}

# 黑名单: 文件名以 "[]" 开头的 mod 不参与同步(与 dev/make-update-json.sh 的约定一致)。
# 这类文件由玩家自行持有, 既不在 update.tsv 里, 也绝不能被 delete.tsv / replaces
# 流程删除 —— 否则历史 delete.tsv 里一旦混入同样的路径, 每次更新都会把它清掉。
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

# --- 1. 解析清单 --------------------------------------------------------
# 清单为 5 列(TAB 分隔): sha1 | path | url | project | replaces
# 兼容旧的 3 列格式(sha1 | path | url)。
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
  $reps = if ($parts.Count -ge 5) { $parts[4].Trim() } else { '' }
  if (-not (Test-SafePath $p)) { continue }
  $items.Add([pscustomobject]@{ Hash = $h; Path = $p; Url = $u; Reps = $reps })
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
# 文件名以 "[]" 开头的文件, 让玩家自有的黑名单 mod 永远不被删除或替换。
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
#     "Duplicate mods" 直接崩溃启动; 这里按 mod 名主干兜底清理。
#     只扫 mods\*.jar, 并且只清理"与清单中某个 mod 同主干"的文件 ——
#     玩家自己添加的、与清单无关的 mod 不会被碰。
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

  $ok = $false
  try {
    & curl.exe -L --fail --retry 3 --retry-delay 2 --connect-timeout 20 -o $tmp $it.Url
    if ($LASTEXITCODE -ne 0) { throw ("curl 退出码 " + $LASTEXITCODE) }
    $got = Get-Sha1 $tmp
    if ($it.Hash -and ($got -ne $it.Hash.ToLowerInvariant())) {
      Write-LogWarn ("[mods] 失败(sha1 不匹配): " + $it.Path)
      Write-LogWarn ("       期望 sha1: " + $it.Hash)
      Write-LogWarn ("       实际 sha1: " + $got)
      Write-LogWarn ("       下载地址 : " + $it.Url)
    } else {
      Move-Item -Force -LiteralPath $tmp -Destination $dest
      $downloaded++
      Write-Log ("[mods] 完成: " + $it.Path)
      $ok = $true
    }
  } catch {
    Write-LogWarn ("[mods] 失败(下载出错): " + $it.Path)
    Write-LogWarn ("       原因     : " + $_)
    Write-LogWarn ("       下载地址 : " + $it.Url)
  }
  if (-not $ok) {
    if (Test-Path -LiteralPath $tmp) { Remove-Item -Force -LiteralPath $tmp -ErrorAction SilentlyContinue }
    $failed++
    $failList.Add($it)
  }
}

# --- 5. 下载失败的 mod: 恢复它被替换掉的旧版本 --------------------------
$restored = 0
if (($failed -gt 0) -and (-not $DryRun) -and (Test-Path -LiteralPath $backupDir)) {
  Write-Log ''
  Write-Log ("[mods] 检测到 " + $failed + " 个 mod 更新失败, 正在恢复它们的旧版本 ...")
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
      Write-Log '[mods] 失败项的旧版本均已恢复, 无需保留额外备份。'
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
  Write-Log ("[提示] 本次有 " + $failed + " 个 mod 没能更新成功。")
  if ($restored -gt 0) {
    Write-Log ("       相关 mod 的旧版本已自动恢复(" + $restored + " 个文件), 游戏仍可正常启动。")
  }
  Write-Log '       请把下面这个日志文件发送给开发者, 以便我们排查原因:'
  Write-Log ("       " + $logFile)
  Write-Log '============================================================'
  exit 1
}

exit 0
