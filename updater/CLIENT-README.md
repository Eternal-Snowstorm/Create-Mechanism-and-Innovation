# 合作者 · 一键更新（GitHub 主源 + Gitee 镜像兜底）

> 本文件与 `Update-CMI.bat`、`update-cmi.ps1` 一起放在 **`updater/` 目录下，随整合包分发给合作者**
> （`updater/dev/` 才是被 `.gitignore` 忽略的开发目录）。
> 也就是说：合作者拿到的整合包里本来就有这些文件，**不需要你另外单独发**，
> 唯一需要他做的是双击 `updater\Update-CMI.bat`。

## 〇、目录内容（`updater/` 下与本工具相关的文件）

| 文件 | 作用 |
|---|---|
| `Update-CMI.bat` | 双击入口（纯 ASCII，只负责 `chcp`、开场画面与调用下面那个脚本） |
| `update-cmi.ps1` | 全部同步逻辑与中文提示（GitHub 优先、Gitee 镜像兜底） |
| `CLIENT-README.md` | 本说明 |
| `dev\_bomprobe.ps1` | 开发组自检：检查 `updater\` 与 `updater\dev\` 下的 `.ps1` 是否都是 UTF-8 with BOM |

## 一、给合作者：双击一个文件

1. 打开整合包里的 **`updater`** 文件夹；
2. **双击 `Update-CMI.bat`**，等窗口里出现「完成」，按任意键关掉窗口，然后启动游戏。

> 脚本会自己往上找整合包根目录（有 `updater`、`mods`、`config` 的那一层）；
> 实在找不到时会弹窗让你手动选文件夹。
> `Update-CMI.bat` 与 `update-cmi.ps1` 必须放在**同一个文件夹**里（默认就是 `updater/`）。

## 二、更新源：先 GitHub，连不上自动走 Gitee

脚本不再只认 GitHub 一个源头。顺序是：

1. **先连 GitHub 主仓库** `https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation.git`
   （分支自动探测，目前是 `main`）；
2. **连不上 GitHub 时，自动改用 Gitee 镜像**
   `https://gitee.com/eternalsnowstorm/mechanism-and-innovation`（分支 `master`）。

「连不上」包含两种实测会发生的两种情况，两种都会触发兜底：

- **探测阶段失败**：`git ls-remote` 连不上 GitHub（被墙、公司网络拦截、DNS 污染等），重试 3 次后切 Gitee；
- **下载阶段失败**：探测通了但 `git fetch` 断流/超时（慢网、丢包），同样切 Gitee 重新下载。

兜底的几个细节：

- 本地如果已经配置了名为 `gitee` 的远程，就直接用它；
  没有的话**直接用镜像地址拉取一次**，不会往你的 `.git/config` 里偷偷加远程；
- 兜底口径与 `updater/sync.ps1`（首次建仓入口调用的同步逻辑）完全一致
  （远程 `gitee` / 分支 `master` / 同一组网络超时参数），不会出现「这个入口说网络可用、那个说不可用」；
- 只有 `-RemoteUrl` 仍指向官方 GitHub 地址时才允许兜底 —— 开发组把地址指到测试仓库时不会乱切；
- 窗口里会打印 `目标分支: main (来源: GitHub)` 或 `目标分支: master (来源: Gitee 镜像)`，
  最后的总结里也有 `更新来源: GitHub / Gitee 镜像` 一行，日志同样记录。

## 三、为什么要用这个，而不是让他自己 `git pull`

合作者不用理解 Git。这个脚本把「不熟悉 Git 的人同步时最常踩的坑」全部包掉了：

| 合作者那边的状况 | 脚本的处理 |
|---|---|
| 从没同步过，本地还不是 Git 仓库 | 自动 `git init` + 连接 GitHub，首次直接就能跑 |
| 自己改过 `config` / `kubejs` 里的文件 | **先整份备份**到 `updater\.rollback\<时间戳>-before-github-update\modified-from-local\`，再对齐最新版（不丢他的改动） |
| 本地多出一些新版也有的同名文件 | 先把这些文件**移入备份**（`replaced-by-update\`），否则 Git 会拒绝覆盖、报"would be overwritten" |
| 上次更新到一半关了窗口 | 自动清理残留的 `rebase` / `merge` / `index.lock`（这是「越更新越坏」的头号原因） |
| 网络抖一下 | 自动重试 3 次，每次间隔 3 秒 |
| **连不上 GitHub（被墙 / 公司网络 / 慢网断流）** | **自动改用 Gitee 镜像源，不用手动切换、不用开代理** |
| 远程地址还指着旧的 Gitee 镜像 | 自动把 `origin` 切到 GitHub |
| Git 报 `dubious ownership` | 自动把整合包目录加入 `safe.directory` |
| 没装 Git | 中文提示 + 官方下载地址；若开发组放了一份便携版 Git 也能自动识别 |

## 四、它会做什么、不会碰什么

**做**：

1. 连接 GitHub 主仓库 `https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation.git`
   （分支自动探测，目前是 `main`）；连不上时自动改用 Gitee 镜像（分支 `master`）；
2. 把 `config` / `kubejs` / 任务线 / 脚本等仓库内容对齐到最新版；
3. 调用仓库里最新的 `updater/mods-sync.ps1`，按 `updater/update.tsv` 清单下载 / 校验 mods
   —— 与首次建仓入口（`setup-gitee-sync`）走的是同一套清单和同一套失败回退机制。

**不碰**：`saves/`、`options.txt`、`screenshots/`、服务器数据等所有被 `.gitignore` 忽略的个人文件。

**日志**：`updater/logs/github-update-<时间戳>.log`（UTF-8，记事本直接能看）。
日志头部记录「更新源: GitHub 优先, 连不上时自动改用 Gitee 镜像」，正文里有实际用的是哪个源。
失败时窗口最后一行会写日志路径，让合作者把那个文件发给你即可。

## 五、前置条件

合作者需要**能访问 GitHub 或 Gitee 其中之一**，并装一次 **Git for Windows**：<https://git-scm.com/download/win>
（安装一路点「下一步」；装完不用管它，脚本只找 `git.exe`）。

- 能上 GitHub → 一切都走 GitHub，和以前一样；
- 上不了 GitHub（被墙 / 公司网络限制）→ **不用开代理**，脚本会自动改用 Gitee 镜像；
- 两个都连不上 → 才会报错，并提示先确认浏览器能否打开这两个站点。

## 六、给开发组：自测与分发

```powershell
# 只检查、只拉取，不改动任何文件（推荐先在你自己机器上跑一遍）：
powershell -NoProfile -ExecutionPolicy Bypass -File updater\update-cmi.ps1 -DryRun

# 完整跑一次（会真的对齐到最新版并同步 mods）：
updater\Update-CMI.bat
```

想**不联网也能验证兜底分支**：用 Git 的 `insteadOf` 把 GitHub 地址临时改写到本地死端口，
这样 GitHub 必然失败、Gitee 照常走，且不改任何持久配置：

```powershell
$env:GIT_CONFIG_COUNT=1
$env:GIT_CONFIG_KEY_0='url.https://127.0.0.1:1/.insteadOf'
$env:GIT_CONFIG_VALUE_0='https://github.com/'
powershell -NoProfile -ExecutionPolicy Bypass -File updater\update-cmi.ps1 -DryRun
Remove-Item Env:GIT_CONFIG_COUNT,Env:GIT_CONFIG_KEY_0,Env:GIT_CONFIG_VALUE_0
```

预期输出里会出现「连不上 GitHub, 改用 Gitee 镜像源」与「目标分支: master (来源: Gitee 镜像)」。

可选参数：`-Root <整合包目录>`、`-RemoteUrl <仓库地址>`、`-Branch <分支名>`、`-DryRun`。

分发：这三个文件已在 `updater/` 下随整合包仓库分发，`git push` 后玩家 `pull` 即得，
**不需要单独打包发送**；如需临时给某人一份独立副本，把 `updater` 整个目录给他即可。

## 七、编码约定（改这个脚本前必读）

下面这几个坑都已经实际踩过一次，写在这里免得再踩：

1. **`.bat` 保持纯 ASCII**。`cmd.exe` 按字节偏移解析批处理文件，中文 + 中途 `chcp`
   会导致解析错位；而 UTF-8 中文在代码页 936 的控制台上又是乱码。
   （开场那段立方体 ASCII 画面同理，只用斜杠、右大括号、下划线等 ASCII 字符。）

2. **`.bat` 为什么不用 `powershell -File`**：Windows PowerShell 5.1 解析**无 BOM** 的
   `.ps1` 时会按系统 ANSI 代码页（简体中文机器上是 GBK）解码 —— 中文提示全部乱码，
   严重时直接报 `Unexpected token` 语法错误、脚本完全跑不起来。所以入口改成显式读文件：

   ```bat
   powershell -NoProfile -ExecutionPolicy Bypass -Command "$src = Get-Content -LiteralPath '%~dp0update-cmi.ps1' -Raw -Encoding UTF8; & ([scriptblock]::Create($src)) -ScriptDir '%~dp0'"
   ```

   这样**有没有 BOM 都能正确显示中文**。副作用：scriptblock 里 `$PSScriptRoot` 是空的，
   所以用 `-ScriptDir` 把脚本目录传进去（脚本内为 `$script:ClientDir`）。

   > 很多编辑器（以及某些自动格式化工具）保存时会**悄悄丢掉 BOM**，所以不能依赖它。

3. **`.ps1` 仍建议保存成 UTF-8 with BOM**（与 `updater/sync.ps1`、`mods-sync.ps1` 一致）：
   万一有人直接 `powershell -File update-cmi.ps1` 调试，没有 BOM 会立刻乱码。
   命令行补 BOM：

   ```powershell
   $p = 'updater\update-cmi.ps1'
   $t = Get-Content -LiteralPath $p -Raw -Encoding UTF8
   [System.IO.File]::WriteAllText((Resolve-Path $p), $t, (New-Object System.Text.UTF8Encoding $true))
   ```

   改完用 `dev\_bomprobe.ps1` 复查一遍：

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File updater\dev\_bomprobe.ps1
   ```

4. **不要用 `2>&1` 合并原生命令的 stderr**：PowerShell 5.1 会把它们包装成
   `ErrorRecord` 塞进成功流，产生 `git.exe : ...` 噪声。要丢弃 stderr 就用 `2>$null`。

5. **写日志的 cmdlet 记得带 `-ErrorAction`**：默认 `Continue` 下「日志目录不可写」
   并不是终止错误，`try/catch` 抓不住，会退化成每条提示都刷一次英文报错。

## 八、常见问题

| 现象 | 处理 |
|---|---|
| 提示找不到整合包目录 | 确认 `Update-CMI.bat` 与 `update-cmi.ps1` 都在 `updater` 里、且整合包根目录有 `mods` 或 `config`；或接受弹窗手动选择 |
| 提示没找到 Git | 装 Git for Windows；或把便携版 Git 放到整合包旁边名为 `git` 的文件夹里 |
| 提示连不上 GitHub，然后自动切到了 Gitee | 这是预期行为，不用处理；日志里会写「更新来源: Gitee 镜像」 |
| 提示「GitHub 与 Gitee 镜像都连不上」 | 两个源都不通：先确认浏览器能打开 github.com 或 gitee.com；需要代理时开好再运行 |
| 提示「从远程仓库下载失败」 | 两个源下载都断流：检查网络 / 代理，或换个时间再试；把日志发给开发组 |
| 更新后游戏缺 mod / 崩溃 | 看 `updater/logs/` 下最新的两个日志，把失败的条目发给开发组 |
| 想回到更新前的版本 | 日志末尾会打印更新前的 commit；在整合包目录执行 `git reset --hard <那个 commit>`，个人改动见 `updater\.rollback\` 备份 |
