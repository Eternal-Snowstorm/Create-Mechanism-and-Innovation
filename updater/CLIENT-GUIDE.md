# 客户端使用说明(链接远程仓库与同步版本)

玩家在整合包客户端使用本目录脚本,把 **Gitee 镜像仓库**(GitHub 完整历史的镜像)的内容同步到本地整合包根目录(习惯上叫 `.minecraft`,`**名字不限**`),并按更新清单下载 / 校验 mods。

## 一、客户端有哪些可执行文件

| 文件 | 作用 |
|---|---|
| `updater/setup-gitee-sync.bat` / `.sh` | **首次**:链接 Gitee 远程仓库并落地内容 |
| `updater/update-from-gitee.bat` / `.sh` | **日常**:同步最新版本 |
| `updater/sync.ps1` | 上面两个 `.bat` 实际调用的同步逻辑与中文提示(Windows) |
| `updater/mods-sync.ps1` / `.sh` | 由同步逻辑自动调用,按清单下载 / 校验 mods |

> **关于 `.bat` 的编码**:所有 `.bat` 都刻意保持**纯 ASCII**(注释只用英文)。
> 原因是 `cmd.exe` 按**字节偏移**解析批处理文件:文件里若混入中文字节并在中途执行
> `chcp`,多字节字符会让偏移与字符边界错位,后续命令被"吃掉"字符而报错;而把中文
> 存成 UTF-8 又会在代码页 936 的控制台上显示乱码(UTF-8 BOM 更会让首行直接报错)。
> 因此中文注释与提示统一放在 UTF-8 的 `sync.ps1` / `mods-sync.ps1` 中,
> `.bat` 只负责 `chcp` + 调用它们 —— 这样 `.bat` 用**任何编码(含 UTF-8)打开都不会乱码**。

> 客户端目录 = 装着 `updater/` 文件夹的那一层(习惯上叫 `.minecraft`,叫什么名字都行——脚本统一按"`updater` 的上一级"自动定位,与目录名无关)。

## 二、前置条件

1. 本机已安装 Git:
   - **Windows**:安装 [Git for Windows](https://gitforwindows.org/)(自带 `curl.exe`)
   - **Linux(Debian/Ubuntu)**:`sudo apt install git curl`
   - **macOS**:系统自带 `curl`,`git` 用 `brew` 或 Xcode 命令行工具
2. 首次运行需要联网。

## 三、首次:链接远程仓库

### Windows

双击 `updater\setup-gitee-sync.bat`;或在 CMD / PowerShell 中运行:

```bat
cd /d "<整合包根目录>"
updater\setup-gitee-sync.bat
```

> `<整合包根目录>` = 装着 `updater/` 与 `.git` 的那一层;习惯上叫 `.minecraft`,实际名字不限。

### Linux / macOS

```bash
cd "<整合包根目录>"
bash updater/setup-gitee-sync.sh
```

作用:如本地还不是 Git 仓库则 `git init`;绑定远程 `https://gitee.com/eternalsnowstorm/mechanism-and-innovation`;拉取并应用 Gitee 内容;按清单校验 / 下载 mods。

## 四、日常:同步最新版本

### Windows

双击 `updater\update-from-gitee.bat`;或命令行:

```bat
cd /d "<整合包根目录>"
updater\update-from-gitee.bat
```

### Linux / macOS

```bash
cd "<整合包根目录>"
bash updater/update-from-gitee.sh
```

一次更新分两步:

1. **Git 同步**:把仓库内容(config / kubejs / 任务线 / 脚本等)对齐到最新版;
2. **mods 同步**(git 结束后自动进行):脚本读取 `updater/update.tsv` 清单,然后

   - 先汇总**"版本发生变动"**与**"已经下架"**的旧 jar,把它们移动备份到
     `updater/.rollback/<时间戳>/`;
   - 再按清单里的**第三方下载直链**下载"更新后的"与"新增的" jar:

     | 来源 | 地址 | 说明 |
     |---|---|---|
     | CurseForge 官方 CDN | `https://edge.forgecdn.net/files/<id>/...` | 绝大多数 mod |
     | Modrinth CDN | `https://cdn.modrinth.com/...` | 少数 Modrinth 来源的 mod |

     > 下载地址由开发端从 `mods/.index` 里的 `file-id` / `url` **现算**,
     > 不经任何中转服务器, 也不需要你配置任何 API key。

   - 每个文件下载后都会做 **sha1 校验**,校验通过才会替换到位(下载写入的是
     `.download` 临时文件,不会破坏正在使用的 jar)。

> 说明:`delete.tsv` 是**累积列表**(记录历来下架的文件),因此列表可能较长,属正常现象;
> 脚本会自动跳过"仍在 `update.tsv` 清单中"的条目,不会误删当前版本需要的 mod。
> 每个 mod 的下载地址都指向它**当前版本**所在的 CDN,跨多个版本一次性更新也能正确补齐。

## 五、下载失败会怎样?

**失败的 mod 不会被留在"半新半旧"的状态**,流程如下:

1. 先把所有将被替换 / 删除的旧 jar 移动备份(此时尚未真正丢弃);
2. 下载新 jar 到 `.download` 临时文件并校验 sha1;
3. 若某个 mod **下载失败**(断网、CDN 波动、文件被游戏占用等):

   - **该 mod 的旧版本会自动恢复回原位**,让它停留在"上一个可用版本",游戏照常能启动;
   - 全过程写入日志 `updater/logs/update-<时间戳>.log`(含每条失败项的下载地址与原因);
   - 窗口与日志末尾会用**中文提示**你把该日志发给开发者。

失败时窗口大致长这样:

```text
============================================================
[提示] 本次有 1 个 mod 没能更新成功。
       相关 mod 的旧版本已自动恢复(1 个文件), 游戏仍可正常启动。
       请把下面这个日志文件发送给开发者, 以便我们排查原因:
       <你的整合包目录>\updater\logs\update-20260101-120000.log
============================================================
```

**你要做的**:把上面提示的那个 `.log` 文件发给开发者就行。

也可以**直接重新运行一次** `update-from-gitee`——脚本只会重新下载失败的那几个 mod,
已经最新的文件会跳过,不会重复下载。

> 若失败时仍有"未恢复"的旧文件备份,它们会保留在 `updater\.rollback\<时间戳>\`,
> 便于手动回滚;确认游戏正常后可以自行删除该目录。

## 六、安全说明

脚本只操作以下目录,**绝不碰** `saves`、`options.txt`、服务器数据等个人文件:

- `mods/`
- `config/`
- `kubejs/`
- `defaultconfigs/`
- `resourcepacks/`

脚本只会删除两类文件:

1. `updater/delete.tsv` 里**已下架**的路径 —— 且会在新清单中再次出现时自动跳过;
2. 清单条目 `replaces` 列里记录**被当前版本取代**的旧 jar(仅当对应新 jar 下载成功时才真正丢弃)。

**黑名单文件永不被删除**:文件名以 `[]` 开头(例如 `mods/[]ysm-2.6.5-forge+mc1.20.1-release.jar`)
的 mod 属于"不同步的自有文件",脚本在统计待删清单时**一律跳过**它们 —— 既不会因为
`delete.tsv` 里的历史记录被删,也不会被 `replaces` 或同名主干清理误伤。

玩家自己额外添加的 mod(不在清单里、也不在 delete.tsv 里)**不会被删除**。

## 七、常见问题

| 现象 | 处理 |
|---|---|
| 提示 Git 未安装 | 安装 Git for Windows(Linux/macOS 用包管理器)后重试 |
| 提示 `curl` 不存在 | Windows 装 Git for Windows 即可自带;Linux 用 `sudo apt install curl` |
| mods 提示"无源" | 该 mod 清单里没有下载地址;若本地已自带可忽略,否则请联系开发者 |
| 下载失败,提示发送日志 | **按提示把 `updater/logs` 下最新的 `.log` 发给开发者**,再重跑一次本脚本即可重试 |
| 想回滚到更新前 | 见 `updater/.rollback/<时间戳>/` 中的备份(仅失败时保留) |
| 更新后游戏缺 mod / 崩溃 | 先看 `updater/logs` 最新日志,确认是否有"失败"条目,并把日志发给开发者 |

## 八、开发者排障提示

- 日志文件默认保留在本地(已被 `.gitignore` 忽略,不会上传到仓库);
- 日志中每条失败都包含:**文件路径、下载地址、失败原因(curl 退出码或 sha1 对比)**;
- 玩家端脚本与开发端清单口径一致:清单 5 列为 `sha1 | path | url | project | replaces`。
