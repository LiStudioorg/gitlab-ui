# gitlab-ui-kit

GitLab Pajamas 设计令牌与组件规范知识库，扩展为多框架 / 多格式适配版本。
任何技术栈（Web / 移动端 / 桌面 / 设计工具）都可以直接套用这套 UI。

> 本项目非 GitLab 官方项目，与 GitLab Inc. 无关联。

## 目录结构

```
gitlab-ui-kit/
├── tokens/            # 原始设计令牌（css/js/scss/json + tokens-reference.md）
├── components/        # 10 个核心组件规范（Markdown）
├── pages/             # 4 个页面骨架（Markdown）
├── icons/             # 图标清单（503 sprite + 187 file icons）
├── prompts/           # AI 提示词（system.md / universal.md）
├── scripts/           # 全部生成脚本（令牌 + 组件 + 页面 + 适配层，幂等可重跑）
├── dist/              # 所有输出产物（40+ 格式 / 框架目录）
├── FORMAT-MAP.md      # 「我要用 XX 技术栈，该读哪个目录」映射表
├── BUILD-REPORT.md    # 构建产物统计报告
└── package.json
```

## 快速开始

```bash
npm install            # 安装上游依赖（用于重新提取令牌）
npm run build          # 一键重建全部 dist/ 产物（scripts/build-all.js）
```

多数场景无需重新构建——直接按 FORMAT-MAP.md 引用 dist/ 下对应目录即可。

## 硬性约定

1. 颜色 / 间距 / 圆角 / 字体一律引用令牌（`var(--gl-*)` 或各语言令牌常量），禁止硬编码。
2. 暗色模式：给根元素加 `gl-dark` class（对应 variables.css 中 `.gl-dark` 作用域）。
3. 不使用 GitLab logo、tanuki 图形、GitLab 商标名、GitLab Sans 字体文件。

## License

本仓库新增内容采用 Apache-2.0，见 LICENSE。

源自 GitLab Pajamas / @gitlab/ui / @gitlab/svgs 的内容仍采用 MIT，见 LICENSE-MIT。

分发时请同时保留 LICENSE、LICENSE-MIT、NOTICE。

本项目非 GitLab 官方项目，与 GitLab Inc. 无关联。
