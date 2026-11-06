## 修正内容

- **GitHub 仓库地址**：https://github.com/shin4/inkpond-dsh
- **作者自述**：[
以字为墨，以页为池。墨池为 DeepSeek Harness 会话界面铺一层可交互的汉字水墨背景。
默认大肥鲸会游动、去饭碗吃饭、喷米，并响应指针；另有莲池、山水、清明上河、二十四节气和北冥，共六个场景。
可以调整墨色浓淡、跟随明暗主题，或使用静态画面。默认只在新会话显示，安装后请新建空白会话；已有保存偏好会保留。
不读取聊天内容、不注册模型工具、不发送遥测，字体随包提供。手动检查更新或升级时，由 DSH 宿主访问包源。
]
- **简介**：[为 DSH 会话提供可交互的汉字水墨背景，默认大肥鲸，另含莲池、山水、清明上河、二十四节气和北冥；可调浓度与动画，默认仅新会话显示。]
- **安装命令**：dsh plugin --profile web add dsh-inkpond@0.3.5

## 说明

市场已收录 `shin4/inkpond-dsh`，当前 README 摘要仍引用 0.3.2。本次补充作者自述、完整六场景简介与明确的 npm 安装命令。

npm 包名为 `dsh-inkpond`，与仓库名 `inkpond-dsh` 的顺序不同。Web profile 可使用上述命令；应用内也可通过「插件 → 添加插件」，填写 `dsh-inkpond@0.3.5` 并选择 npm 官方源。

0.3.5 已发布：[npm](https://www.npmjs.com/package/dsh-inkpond/v/0.3.5) / [GitHub Release](https://github.com/shin4/inkpond-dsh/releases/tag/v0.3.5)。最低安装要求为 DSH >=0.2.1-rc.3；本轮实测 macOS、DSH 0.2.2-rc.1 Web，完整验证范围见仓库 README。独立社区插件，与 DeepSeek 官方无隶属关系。
