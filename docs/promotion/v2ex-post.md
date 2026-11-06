# 给 DeepSeek Harness 做了个汉字水墨背景插件，默认是一只大肥鲸

我给 DeepSeek Harness（DSH）做了个界面插件「墨池 Inkpond」，用汉字组成一层可交互的水墨背景。

默认是一只圆滚滚的大肥鲸，会在汉字海浪里游动、去饭碗吃饭、喷米，也会响应指针。另有莲池、山水、清明上河、二十四节气和北冥，共六个场景。

下面是 macOS、DSH 0.2.2-rc.1 Web 的实际录屏，使用默认的 45% 浓度：

![墨池大肥鲸实录](https://raw.githubusercontent.com/shin4/inkpond-dsh/main/docs/images/whale-preview.gif)

输入区会留白，可以调整墨色浓淡、跟随明暗主题，或者切换成静态画面。默认只在新会话显示，想让背景更安静一些也可以随时关闭。

它只负责背景和外观设置，不读取聊天内容、不注册模型工具，也不发送遥测。字体随包提供；手动检查更新或升级时，由 DSH 宿主访问包源。

如果你已经在用 DSH，安装只需三步：

1. 打开「插件 → 添加插件」。
2. 填入 `dsh-inkpond@0.3.5`，选择 npm 官方源并安装；若提示重启，按提示重启。
3. **新建空白会话**。首次安装默认显示大肥鲸，已有保存偏好的客户端会保留原选择。

Web profile 也可以用：

```bash
dsh plugin --profile web add dsh-inkpond@0.3.5
```

安装要求是 DSH >=0.2.1-rc.3；原生桌面壳及 Windows/Linux 尚未实测，完整验证范围见 README。这是独立社区插件，与 DeepSeek 官方无隶属关系。

源码和安装说明：https://github.com/shin4/inkpond-dsh

40 秒演示：https://www.bilibili.com/video/BV1vT4B6KExv/

代码 MIT，绘制核心保持为独立的 inkpond 引擎，字体采用 SIL OFL。欢迎反馈喜欢哪个场景、浓度是否合适，以及安装时有没有卡住。
