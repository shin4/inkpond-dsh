# 墨池 · Inkpond for DSH

[English](README.en.md)

以字为墨，以页为池。为 DeepSeek Harness 会话界面铺一层可交互的汉字水墨背景。

默认是**莲池**：荷叶与荷花之间，鲤鱼缓缓游动。鼠标划过起涟漪，点击空白处落墨。
可切换山水、清明上河、二十四节气和北冥，保留输入区留白、明暗主题跟随及自动性能降级。

![莲池动态预览：DSH 实际运行画面，1280×720](https://raw.githubusercontent.com/shin4/inkpond-dsh/main/docs/images/lotus-preview.gif)

[查看 16:9 静态截图](https://raw.githubusercontent.com/shin4/inkpond-dsh/main/docs/images/lotus-preview.png) · 实际录屏，约 10 秒，默认莲池与 45% 浓度。

## 兼容性

首版验证基线为 **DSH 0.2.1-rc.3**（macOS 官方桌面应用携带的内核，隔离 Web profile）。
`engines.dsh` 暂时固定该版本；其他版本及 Windows/Linux 尚未验证。
插件依赖会话容器的语义 DOM 标记，宿主 API 或布局改变时需要重新验证后扩大版本范围。

## 安装

### 桌面版或网页版：通过添加插件向导安装（推荐）

1. 打开 DSH 的 **插件 → 添加插件 → 安装第三方插件**（Add plugin）。
2. 在向导的「包名或地址」输入框中填写 npm 包名：

   ```text
   dsh-inkpond
   ```

   如需固定当前版本，填写 `dsh-inkpond@0.2.0`。
3. 在「安装源」中选择 **npm 官方源**，点击 **安装**（Install）。新版本可能尚未同步到镜像源。
4. 安装后新建空白会话，即可看到默认莲池。若宿主提示重启，请完全退出并重新打开 DSH。

此入口直接从 npm 安装，不依赖 1024 Store 或 dshmarket 是否已收录。
无需下载源码或在本机编译。适用版本仍以本文的兼容性说明为准。

### 使用 CLI 安装到 Web profile

```bash
dsh plugin --profile web add dsh-inkpond@0.2.0
```

桌面版推荐使用上述应用内向导，它会安装到当前应用的 profile；
不要假定终端的 `web` profile 就是桌面配置。包发布于 [npm](https://www.npmjs.com/package/dsh-inkpond)。

### 使用 Release 安装包

从 [GitHub Releases](https://github.com/shin4/inkpond-dsh/releases) 下载 `dsh-inkpond-0.2.0.tgz`。
在 DSH 插件管理页填入本地安装包的绝对路径，或使用普通 Web profile：

```bash
dsh plugin --profile web add /absolute/path/to/dsh-inkpond-0.2.0.tgz
```

刷新页面；若宿主未热加载，重启对应实例。安装包包含构建产物，不执行安装期编译。
GitHub 源码 checkout 需要先 `npm ci && npm run build`，不能直接从未构建源码安装。

## 使用

插件 → 已安装 → dsh-inkpond：

- 默认莲池，亦可选山水、清明上河、二十四节气和北冥。节气随当前日期选择画面；北冥呈现海浪与鲸影。
- 默认仅新会话显示；可选择所有会话（长对话兼容性仍需更多实测）。
- 调整淡彩、墨色浓淡，选择跟随系统动画或静态画面。
- 恢复默认会回到莲池、45% 浓度、仅新会话、跟随系统动画。

画布不会接管点击、键盘或发送消息。关闭标签页显示会暂停，减少动画设置会生成静态画面，
高对比度模式会隐藏画布。弱设备会自动降低动画档位。

外观偏好存于当前客户端 origin 的 `localStorage`（`dsh-inkpond.preferences.v1`），
性能档位使用 `dsh-inkpond.tier.v1`。它们不跨浏览器、端口或设备同步。
存储不可用时设置仅在当前页面有效。卸载会清除运行实例、样式与 DOM 标记，保留本地偏好便于重装；
需要彻底清除偏好时可删除上述两个站点存储键。

## 开发

Node.js 22+，npm：

```bash
npm ci
npm run check
npm pack
```

`check` 执行类型检查、单元测试和构建。`npm pack` 生成独立安装包，包含 Host 入口、
DSH 客户端工厂、内嵌字体和许可证。React 由宿主提供，绘制引擎固定使用 本地 inkpond 提交 `c502ef8ba4a898b22f321a5dba3e2255736bc60c`（独立依赖包，详见 `vendor/README.md`）。

使用独立 `DSH_HOME` 验证安装包；不要在日常 profile 中进行卸载测试。
已观察到 DSH 本地链接卸载可能清理链接目标的开发依赖，因此推荐始终用 `.tgz` 做安装验收。

详见 [验证记录](docs/verification.md) 和 [发布清单](docs/release.md)。

## 范围与许可

本插件只提供背景和外观设置，没有模型工具、遥测、消息读取或第三方网络请求。
五个字体子集随包提供，无需 CDN。宿主自身的网络行为不由本插件控制。

代码采用 MIT；绘制核心来自 [inkpond](https://github.com/shin4/inkpond)，
字体采用 SIL OFL 1.1，见 [第三方声明](THIRD_PARTY_NOTICES.md)。
独立社区插件，与 DeepSeek 官方无隶属关系。
