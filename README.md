# 墨池 · Inkpond for DSH

[English](README.en.md)

以字为墨，以页为池。为 DeepSeek Harness 会话界面铺一层可交互的汉字水墨背景。

默认是**莲池**：荷叶与荷花之间，鲤鱼缓缓游动。鼠标划过起涟漪，点击空白处落墨。
可切换山水、清明上河，保留输入区留白、明暗主题跟随及自动性能降级。

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/lotus-dark.png" />
  <img src="docs/images/lotus-light.png" alt="DSH 新会话页面中的莲池背景，输入区域保持留白" width="634" />
</picture>

## 兼容性

首版验证基线为 **DSH 0.2.1-rc.3**（macOS 官方桌面应用携带的内核，隔离 Web profile）。
`engines.dsh` 暂时固定该版本；其他版本及 Windows/Linux 尚未验证。
插件依赖会话容器的语义 DOM 标记，宿主 API 或布局改变时需要重新验证后扩大版本范围。

## 安装

从 [GitHub Releases](https://github.com/shin4/inkpond-dsh/releases) 下载 `dsh-inkpond-0.1.0.tgz`。
在 DSH 插件管理页通过本地安装包安装，或使用普通 Web profile：

```bash
dsh plugin --profile web add /absolute/path/to/dsh-inkpond-0.1.0.tgz
```

刷新页面；若宿主未热加载，重启对应实例。桌面版请使用应用实际 profile 或应用内安装入口，
不要假定终端的 `web` profile 就是桌面配置。安装包包含构建产物，不执行安装期编译。

npm 包名计划为 `dsh-inkpond`；尚未发布前请使用 Release 安装包。
GitHub 源码 checkout 需要先 `npm ci && npm run build`，不能直接从未构建源码安装。

## 使用

插件 → 已安装 → dsh-inkpond：

- 默认莲池，亦可选山水、清明上河。
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
DSH 客户端工厂、内嵌字体和许可证。React 由宿主提供，绘制引擎固定使用 `inkpond@0.1.0`。

使用独立 `DSH_HOME` 验证安装包；不要在日常 profile 中进行卸载测试。
已观察到 DSH 本地链接卸载可能清理链接目标的开发依赖，因此推荐始终用 `.tgz` 做安装验收。

详见 [验证记录](docs/verification.md) 和 [发布清单](docs/release.md)。

## 范围与许可

本插件只提供背景和外观设置，没有模型工具、遥测、消息读取或第三方网络请求。
三个字体子集随包提供，无需 CDN。宿主自身的网络行为不由本插件控制。

代码采用 MIT；绘制核心来自 [inkpond](https://github.com/shin4/inkpond)，
字体采用 SIL OFL 1.1，见 [第三方声明](THIRD_PARTY_NOTICES.md)。
独立社区插件，与 DeepSeek 官方无隶属关系。
