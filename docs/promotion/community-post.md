> **非官方项目，由社区成员独立开发和维护，与 DeepSeek 官方无隶属关系。**
> Unofficial project, independently developed and maintained by community members.

项目地址 / Source: https://github.com/shin4/inkpond-dsh

我做了一个 DSH 界面插件「墨池 Inkpond」：用汉字铺出一层可交互的水墨背景。

默认是一只大肥鲸，在汉字海浪里游动，会游向饭碗吃饭、喷米，也会响应指针。
另有莲池、山水、清明上河、二十四节气和北冥，共六个场景。背景保留输入区留白，跟随明暗主题；也可以调整浓度或切换静态画面。

![大肥鲸实际演示：默认 45% 浓度](https://raw.githubusercontent.com/shin4/inkpond-dsh/main/docs/images/whale-preview.gif)

这是一个独立的 DSH bundle，安装后由宿主加载背景与设置组件。不注册模型工具，不读取聊天内容，不发送遥测；字体随包提供。手动检查更新或升级时，由 DSH 宿主访问包源。

**安装 0.3.5：**

1. DSH → 插件 → 添加插件。
2. 填写 `dsh-inkpond@0.3.5`，选择 npm 官方源，点击安装；若提示重启，按提示重启。
3. **新建空白会话**。默认仅新会话显示；已有保存偏好的客户端保留原选择。

Web profile 也可使用：

```bash
dsh plugin --profile web add dsh-inkpond@0.3.5
```

安装要求为 DSH >=0.2.1-rc.3；本帖画面录于 macOS、DSH 0.2.2-rc.1 Web。原生桌面壳及 Windows/Linux 尚未实测，完整兼容性范围见 README。

欢迎反馈画面浓度、输入区可读性，以及你使用的 DSH 版本。MIT 开源，绘制核心来自独立的 [inkpond](https://github.com/shin4/inkpond)，字体采用 SIL OFL。

---

**Inkpond adds interactive Chinese glyph ink-wash backgrounds to DeepSeek Harness.**

Big fat whale is the default: it swims through glyph waves, visits its rice bowl and reacts to the pointer. Five more scenes are included: Lotus pond, Misty hills, Qingming handscroll, 24 solar terms and Northern sea.

Install `dsh-inkpond@0.3.5` through **Plugins → Add plugin → Official npm registry**, then **start a new empty conversation**. Restart if requested. New conversations only by default; saved choices are preserved.

The plugin provides a background and settings through DSH. It does not read messages, register model tools or send telemetry. Fonts ship with the package; manual update requests are handled by the Host.

The capture uses macOS, DSH 0.2.2-rc.1 Web and the default 45% strength. Native desktop shells and Windows/Linux remain unverified. Feedback on readability, strength and host compatibility is welcome.

[English guide](https://github.com/shin4/inkpond-dsh/blob/main/README.en.md) · [npm](https://www.npmjs.com/package/dsh-inkpond)
