🛠 键盘背单词工具[qwerty-learner](https://github.com/RealKai42/qwerty-learner)的自定义词库定制器。

**在网页中定制你自己的词库！**

![教程](./public/screenshot0.png)

## 如何使用

本项目托管在netlify上，访问 https://qwerty-picker.netlify.app 即可开始使用。

如果无法连接可能需要代理服务，或者您可以使用源码自部署。

![教程](./public/screenshot1.png)

使用本工具得到JSON文件后，您可以访问[此处](https://github.com/RealKai42/qwerty-learner/blob/master/docs/toBuildDict.md)来导入你自己的词典。

## Q & A

Q: 我很担心我挑选了一半单词退出网站，我的进度会丢失吗？

A: 每次翻页都会在localStorage中保存上一页的进度（⚠️ 不要清理浏览器缓存哦！）。

如果您离开了网站，可以访问路由`/picker`回到之前的词库定制状态（⚠️ 如果重新在主页输入JSON，会覆盖之前的结果）。

Q: 定制词库是不是意味着我只能使用自部署的qwerty-learner？

A: ✅。这是目前qwerty-learner的限制。后续我会fork一下qwerty-learner或者为其贡献PR，增加导入自定义词库的功能。

## TODO

- [] 允许用户上传JSON文件而不是在输入框中输入，避免性能问题
- [] 在网站上补充使用教程
- [] 补充更多快捷键
- [] 实现与qwerty-learner的自动化联动