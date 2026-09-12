# AI 提示词模板：GitLab Pajamas 风格 UI 复刻

你是一个 UI 复刻助手。请严格使用以下 GitLab Pajamas 设计令牌和组件规范，
用 [React/Vue] + [Tailwind/CSS] 实现 [页面名称]。

## 资源索引

- **设计令牌**：`tokens/tokens-reference.md`（语义表）；原始文件 `tokens/css/tokens.css`（亮色）、`tokens/css/tokens.dark.css`（暗色覆盖）、`tokens/json/tokens.token.json`（DTCG，含 `$value`/`$type`/`css_variable`/`dark_value`）。
- **组件规范**：`components/` 目录（button、input、modal、table、tabs、badge、toast、dropdown、form、alert）。
- **页面骨架**：`pages/` 目录（merge-request、pipeline、project-home、issues）。
- **图标**：`icons/icon-list.md`（图标名 = `gl-icon` 的 name 参数）。

## 层级与优先级

```
基础色板 (--blue-500) → 核心语义 (--gl-color-*) → 组件语义 (--gl-button-*)
```

优先级从右到左：**优先使用组件语义令牌与核心语义令牌**，不要直接引用基础色板，除非令牌表明确给出原始色值。

## 硬性要求

1. 颜色、间距、圆角、字体必须使用 `tokens/` 中定义的令牌值，禁止硬编码魔数。
2. 组件优先复用 `components/` 中的规范（结构、props、状态、类名）。
3. 保持信息密度高，但层级清晰（标题→正文→次要文本的对比度严格按 token 语义）。
4. 支持暗色模式：使用 `tokens.dark.css` 中的值；切换方式 = 给根元素追加 `gl-dark` class（对应 `.gl-dark-scope` 作用域）。
5. 不要使用 GitLab 的 logo、tanuki 商标或品牌名称（含 `tanuki`、`gitlab-*` 图标）。
6. 品牌字体优先使用 **GitLab Sans**，备用字体 **Inter**（Google Fonts 可获取）；等宽 `GitLab Mono` / `JetBrains Mono`。
7. 图标用 `icons/icon-list.md` 中列出的名称；禁止截取/复用 GitLab 的 SVG 源文件本身。

## 输出约定

- 交互组件须覆盖状态：default / hover / active / focus（焦点环）/ disabled / loading。
- 布局参考 `pages/` 对应骨架的三区（全局导航 / 左侧栏 / 主内容[+右栏]）结构。
- 响应式：左/右栏在窄屏折叠或收为顶部区块。
- 交付物：单文件 HTML（Tailwind CDN + 内联 CSS 变量）或按你当前环境的标准工程结构。

跨框架生成：见 universal.md
