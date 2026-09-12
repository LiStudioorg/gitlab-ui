# GitLab Pajamas 设计令牌参考

> 来源：`@gitlab/ui`（MIT License），共 1274 个令牌。由 `dist/tokens/build/js/*.js` 与 `dist/index.css` 自动提取。

## 使用说明

1. **作用域**：亮色=`.gl-light-scope, :root {}`；暗色覆盖=`.gl-dark-scope, :root.gl-dark {}`。给根元素加 `gl-dark` class 启用暗色主题。
2. **三层结构**：基础色板（`--blue-500`）→ 核心语义（`--gl-color-*`）→ 组件语义（`--gl-button-*`、`--gl-badge-*`…）。组件令牌通常用 `var(--gl-color-*)` 引用，优先使用组件/核心令牌而非原始色板。
3. **命名**：JS 常量 `GL_BORDER_RADIUS_MD` ↔ CSS 变量 `--gl-border-radius-md`；色板 `GL_BLUE_500` ↔ `--blue-500`。
4. **文件清单**：`css/tokens.css`（亮色）、`css/tokens.dark.css`（暗色）、`js/tokens.js`+`js/tokens.dark.js`、`scss/tokens.scss`、`json/tokens.token.json`（DTCG：`$value`/`$type`/`css_variable`/`dark_value`）。
5. **字体**：品牌字体 GitLab Sans（正文），备用 Inter；等宽 GitLab Mono / JetBrains Mono。
6. 表内「暗色值」仅在暗色主题中与亮色不同时显示；相同则显示 —。

## `COLOR` 族

> 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_COLOR_ALPHA_0` | `--gl-color-alpha-0` | `rgba(0, 0, 0, 0)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_DARK_16` | `--gl-color-alpha-dark-16` | `rgba(5, 5, 6, 0.16)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_DARK_2` | `--gl-color-alpha-dark-2` | `rgba(5, 5, 6, 0.02)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_DARK_24` | `--gl-color-alpha-dark-24` | `rgba(5, 5, 6, 0.24)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_DARK_4` | `--gl-color-alpha-dark-4` | `rgba(5, 5, 6, 0.04)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_DARK_40` | `--gl-color-alpha-dark-40` | `rgba(5, 5, 6, 0.4)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_DARK_6` | `--gl-color-alpha-dark-6` | `rgba(5, 5, 6, 0.06)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_DARK_8` | `--gl-color-alpha-dark-8` | `rgba(5, 5, 6, 0.08)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_16` | `--gl-color-alpha-light-16` | `rgba(255, 255, 255, 0.16)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_2` | `--gl-color-alpha-light-2` | `rgba(255, 255, 255, 0.02)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_24` | `--gl-color-alpha-light-24` | `rgba(255, 255, 255, 0.24)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_36` | `--gl-color-alpha-light-36` | `rgba(255, 255, 255, 0.36)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_4` | `--gl-color-alpha-light-4` | `rgba(255, 255, 255, 0.04)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_40` | `--gl-color-alpha-light-40` | `rgba(255, 255, 255, 0.4)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_6` | `--gl-color-alpha-light-6` | `rgba(255, 255, 255, 0.06)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ALPHA_LIGHT_8` | `--gl-color-alpha-light-8` | `rgba(255, 255, 255, 0.08)` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_100` | `--gl-color-blue-100` | `#cbe2f9` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_200` | `--gl-color-blue-200` | `#9dc7f1` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_300` | `--gl-color-blue-300` | `#63a6e9` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_400` | `--gl-color-blue-400` | `#428fdc` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_50` | `--gl-color-blue-50` | `#e9f3fc` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_500` | `--gl-color-blue-500` | `#1f75cb` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_600` | `--gl-color-blue-600` | `#2f68b4` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_700` | `--gl-color-blue-700` | `#2f5ca0` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_800` | `--gl-color-blue-800` | `#284779` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_900` | `--gl-color-blue-900` | `#213454` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BLUE_950` | `--gl-color-blue-950` | `#1d283e` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_CHARCOAL` | `--gl-color-brand-charcoal` | `#171321` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_GRAY_01` | `--gl-color-brand-gray-01` | `#d1d0d3` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_GRAY_02` | `--gl-color-brand-gray-02` | `#a2a1a6` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_GRAY_03` | `--gl-color-brand-gray-03` | `#74717a` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_GRAY_04` | `--gl-color-brand-gray-04` | `#45424d` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_GRAY_05` | `--gl-color-brand-gray-05` | `#2b2838` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_ORANGE_01G` | `--gl-color-brand-orange-01g` | `#ffd1bf` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_ORANGE_01P` | `--gl-color-brand-orange-01p` | `#fca326` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_ORANGE_02P` | `--gl-color-brand-orange-02p` | `#fc6d26` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_ORANGE_03P` | `--gl-color-brand-orange-03p` | `#e24329` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_PINK_01G` | `--gl-color-brand-pink-01g` | `#ffb9c9` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_PURPLE_01G` | `--gl-color-brand-purple-01g` | `#ceb3ef` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_PURPLE_01P` | `--gl-color-brand-purple-01p` | `#a989f5` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_PURPLE_02P` | `--gl-color-brand-purple-02p` | `#7759c2` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_BRAND_WHITE` | `--gl-color-brand-white` | `#fff` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_100` | `--gl-color-data-aqua-100` | `#93f2ef` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_200` | `--gl-color-data-aqua-200` | `#5edee3` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_300` | `--gl-color-data-aqua-300` | `#32c5d2` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_400` | `--gl-color-data-aqua-400` | `#00acc4` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_50` | `--gl-color-data-aqua-50` | `#b5fefd` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_500` | `--gl-color-data-aqua-500` | `#0090b1` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_600` | `--gl-color-data-aqua-600` | `#007b9b` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_700` | `--gl-color-data-aqua-700` | `#006381` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_800` | `--gl-color-data-aqua-800` | `#00516c` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_900` | `--gl-color-data-aqua-900` | `#004059` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_AQUA_950` | `--gl-color-data-aqua-950` | `#00344b` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_100` | `--gl-color-data-blue-100` | `#d2dcff` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_200` | `--gl-color-data-blue-200` | `#b7c6ff` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_300` | `--gl-color-data-blue-300` | `#97acff` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_400` | `--gl-color-data-blue-400` | `#7992f5` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_50` | `--gl-color-data-blue-50` | `#e9ebff` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_500` | `--gl-color-data-blue-500` | `#617ae2` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_600` | `--gl-color-data-blue-600` | `#4e65cd` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_700` | `--gl-color-data-blue-700` | `#3f51ae` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_800` | `--gl-color-data-blue-800` | `#374291` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_900` | `--gl-color-data-blue-900` | `#303470` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_BLUE_950` | `--gl-color-data-blue-950` | `#2a2b59` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_100` | `--gl-color-data-green-100` | `#c6ed94` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_200` | `--gl-color-data-green-200` | `#b0d97b` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_300` | `--gl-color-data-green-300` | `#94c25e` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_400` | `--gl-color-data-green-400` | `#81ac41` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_50` | `--gl-color-data-green-50` | `#ddfab7` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_500` | `--gl-color-data-green-500` | `#619025` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_600` | `--gl-color-data-green-600` | `#4e7f0e` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_700` | `--gl-color-data-green-700` | `#366800` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_800` | `--gl-color-data-green-800` | `#275600` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_900` | `--gl-color-data-green-900` | `#1a4500` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_GREEN_950` | `--gl-color-data-green-950` | `#133a03` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_100` | `--gl-color-data-magenta-100` | `#ffccdb` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_200` | `--gl-color-data-magenta-200` | `#fcacc5` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_300` | `--gl-color-data-magenta-300` | `#f88aaf` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_400` | `--gl-color-data-magenta-400` | `#e86e9a` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_50` | `--gl-color-data-magenta-50` | `#ffe3eb` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_500` | `--gl-color-data-magenta-500` | `#cf4d81` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_600` | `--gl-color-data-magenta-600` | `#b93d71` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_700` | `--gl-color-data-magenta-700` | `#9a2e5d` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_800` | `--gl-color-data-magenta-800` | `#7c214f` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_900` | `--gl-color-data-magenta-900` | `#661e3a` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_MAGENTA_950` | `--gl-color-data-magenta-950` | `#541d31` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_100` | `--gl-color-data-orange-100` | `#f5d6b3` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_200` | `--gl-color-data-orange-200` | `#eebd8c` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_300` | `--gl-color-data-orange-300` | `#e99b60` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_400` | `--gl-color-data-orange-400` | `#e07e41` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_50` | `--gl-color-data-orange-50` | `#fae8d1` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_500` | `--gl-color-data-orange-500` | `#c95d2e` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_600` | `--gl-color-data-orange-600` | `#b14f18` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_700` | `--gl-color-data-orange-700` | `#92430a` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_800` | `--gl-color-data-orange-800` | `#6f3500` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_900` | `--gl-color-data-orange-900` | `#5e2f05` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_DATA_ORANGE_950` | `--gl-color-data-orange-950` | `#4b2707` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_100` | `--gl-color-green-100` | `#c3e6cd` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_200` | `--gl-color-green-200` | `#91d4a8` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_300` | `--gl-color-green-300` | `#52b87a` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_400` | `--gl-color-green-400` | `#2da160` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_50` | `--gl-color-green-50` | `#ecf4ee` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_500` | `--gl-color-green-500` | `#108548` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_600` | `--gl-color-green-600` | `#2f7549` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_700` | `--gl-color-green-700` | `#306440` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_800` | `--gl-color-green-800` | `#225131` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_900` | `--gl-color-green-900` | `#1e3e28` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_GREEN_950` | `--gl-color-green-950` | `#17291c` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_0` | `--gl-color-neutral-0` | `#fff` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_10` | `--gl-color-neutral-10` | `#f7f7f5` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_100` | `--gl-color-neutral-100` | `#dcdbd9` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_1000` | `--gl-color-neutral-1000` | `#050408` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_200` | `--gl-color-neutral-200` | `#c1bfbe` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_300` | `--gl-color-neutral-300` | `#a5a3a3` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_400` | `--gl-color-neutral-400` | `#8a8888` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_50` | `--gl-color-neutral-50` | `#ecebea` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_500` | `--gl-color-neutral-500` | `#747273` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_600` | `--gl-color-neutral-600` | `#646163` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_700` | `--gl-color-neutral-700` | `#4d4b4e` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_800` | `--gl-color-neutral-800` | `#3a383d` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_900` | `--gl-color-neutral-900` | `#28272d` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_NEUTRAL_950` | `--gl-color-neutral-950` | `#18171d` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_100` | `--gl-color-orange-100` | `#f5d9a8` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_200` | `--gl-color-orange-200` | `#e9be74` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_300` | `--gl-color-orange-300` | `#d99530` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_400` | `--gl-color-orange-400` | `#c17d10` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_50` | `--gl-color-orange-50` | `#fdf1dd` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_500` | `--gl-color-orange-500` | `#ab6100` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_600` | `--gl-color-orange-600` | `#995715` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_700` | `--gl-color-orange-700` | `#894b16` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_800` | `--gl-color-orange-800` | `#693c14` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_900` | `--gl-color-orange-900` | `#532e16` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_ORANGE_950` | `--gl-color-orange-950` | `#382315` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_100` | `--gl-color-purple-100` | `#e1d8f9` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_200` | `--gl-color-purple-200` | `#cbbbf2` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_300` | `--gl-color-purple-300` | `#ac93e6` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_400` | `--gl-color-purple-400` | `#9475db` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_50` | `--gl-color-purple-50` | `#f4f0ff` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_500` | `--gl-color-purple-500` | `#7b58cf` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_600` | `--gl-color-purple-600` | `#6a4fb4` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_700` | `--gl-color-purple-700` | `#5c47a6` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_800` | `--gl-color-purple-800` | `#493c83` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_900` | `--gl-color-purple-900` | `#342d59` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_PURPLE_950` | `--gl-color-purple-950` | `#27243e` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_100` | `--gl-color-red-100` | `#fdd4cd` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_200` | `--gl-color-red-200` | `#fcb5aa` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_300` | `--gl-color-red-300` | `#f6806d` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_400` | `--gl-color-red-400` | `#ec5941` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_50` | `--gl-color-red-50` | `#fcf1ef` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_500` | `--gl-color-red-500` | `#dd2b0e` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_600` | `--gl-color-red-600` | `#c02f12` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_700` | `--gl-color-red-700` | `#a32c12` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_800` | `--gl-color-red-800` | `#812713` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_900` | `--gl-color-red-900` | `#582014` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |
| `GL_COLOR_RED_950` | `--gl-color-red-950` | `#3e1a14` | color | `—` | 核心色彩系统（alpha 透明度、brand 品牌、中性色、状态色、基础色板映射） |

## `ACTION` 族

> 按钮/链接等可执行控件的状态颜色（confirm/danger/neutral/disabled × default/hover/active/focus）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_ACTION_BORDER_RADIUS` | `--gl-action-border-radius` | `0.5rem` | dimension | `—` | 按钮/链接等可执行控件的状态颜色（confirm/danger/neutral/disabled × default/hover/active/focus） |
| `GL_ACTION_CONFIRM_BACKGROUND_COLOR_ACTIVE` | `--gl-action-confirm-background-color-active` | `rgba(5, 5, 6, 0.16)` | color | `rgba(255, 255, 255, 0.08)` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_CONFIRM_BACKGROUND_COLOR_DEFAULT` | `--gl-action-confirm-background-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_CONFIRM_BACKGROUND_COLOR_FOCUS` | `--gl-action-confirm-background-color-focus` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_CONFIRM_BACKGROUND_COLOR_HOVER` | `--gl-action-confirm-background-color-hover` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_CONFIRM_BORDER_COLOR_ACTIVE` | `--gl-action-confirm-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_CONFIRM_BORDER_COLOR_DEFAULT` | `--gl-action-confirm-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_CONFIRM_BORDER_COLOR_FOCUS` | `--gl-action-confirm-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_CONFIRM_BORDER_COLOR_HOVER` | `--gl-action-confirm-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_CONFIRM_FOREGROUND_COLOR_ACTIVE` | `--gl-action-confirm-foreground-color-active` | `#050408` | color | `#fff` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_CONFIRM_FOREGROUND_COLOR_DEFAULT` | `--gl-action-confirm-foreground-color-default` | `#3a383d` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_CONFIRM_FOREGROUND_COLOR_FOCUS` | `--gl-action-confirm-foreground-color-focus` | `#18171d` | color | `#f7f7f5` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_CONFIRM_FOREGROUND_COLOR_HOVER` | `--gl-action-confirm-foreground-color-hover` | `#18171d` | color | `#f7f7f5` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_DANGER_BACKGROUND_COLOR_ACTIVE` | `--gl-action-danger-background-color-active` | `rgba(174, 24, 0, 0.24)` | color | `rgba(236, 89, 65, 0.16)` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_DANGER_BACKGROUND_COLOR_DEFAULT` | `--gl-action-danger-background-color-default` | `rgba(245, 127, 108, 0)` | color | `rgba(236, 89, 65, 0)` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_DANGER_BACKGROUND_COLOR_FOCUS` | `--gl-action-danger-background-color-focus` | `rgba(245, 127, 108, 0.16)` | color | `rgba(236, 89, 65, 0.4)` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_DANGER_BACKGROUND_COLOR_HOVER` | `--gl-action-danger-background-color-hover` | `rgba(245, 127, 108, 0.16)` | color | `rgba(236, 89, 65, 0.4)` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_DANGER_BORDER_COLOR_ACTIVE` | `--gl-action-danger-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_DANGER_BORDER_COLOR_DEFAULT` | `--gl-action-danger-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_DANGER_BORDER_COLOR_FOCUS` | `--gl-action-danger-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_DANGER_BORDER_COLOR_HOVER` | `--gl-action-danger-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_DANGER_FOREGROUND_COLOR_ACTIVE` | `--gl-action-danger-foreground-color-active` | `#3e1a14` | color | `#fdd4cd` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_DANGER_FOREGROUND_COLOR_DEFAULT` | `--gl-action-danger-foreground-color-default` | `#c02f12` | color | `#fcb5aa` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_DANGER_FOREGROUND_COLOR_FOCUS` | `--gl-action-danger-foreground-color-focus` | `#812713` | color | `#fdd4cd` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_DANGER_FOREGROUND_COLOR_HOVER` | `--gl-action-danger-foreground-color-hover` | `#812713` | color | `#fdd4cd` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_DISABLED_BACKGROUND_COLOR` | `--gl-action-disabled-background-color` | `#ecebea` | color | `#28272d` | 按钮/链接等可执行控件的状态颜色（confirm/danger/neutral/disabled × default/hover/active/focus） |
| `GL_ACTION_DISABLED_BORDER_COLOR` | `--gl-action-disabled-border-color` | `#dcdbd9` | color | `#3a383d` | 按钮/链接等可执行控件的状态颜色（confirm/danger/neutral/disabled × default/hover/active/focus） |
| `GL_ACTION_DISABLED_FOREGROUND_COLOR` | `--gl-action-disabled-foreground-color` | `#8a8888` | color | `#747273` | 按钮/链接等可执行控件的状态颜色（confirm/danger/neutral/disabled × default/hover/active/focus） |
| `GL_ACTION_NEUTRAL_BACKGROUND_COLOR_ACTIVE` | `--gl-action-neutral-background-color-active` | `rgba(5, 5, 6, 0.16)` | color | `rgba(255, 255, 255, 0.08)` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_NEUTRAL_BACKGROUND_COLOR_DEFAULT` | `--gl-action-neutral-background-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_NEUTRAL_BACKGROUND_COLOR_FOCUS` | `--gl-action-neutral-background-color-focus` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_NEUTRAL_BACKGROUND_COLOR_HOVER` | `--gl-action-neutral-background-color-hover` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_NEUTRAL_BORDER_COLOR_ACTIVE` | `--gl-action-neutral-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_NEUTRAL_BORDER_COLOR_DEFAULT` | `--gl-action-neutral-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_NEUTRAL_BORDER_COLOR_FOCUS` | `--gl-action-neutral-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_NEUTRAL_BORDER_COLOR_HOVER` | `--gl-action-neutral-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_NEUTRAL_FOREGROUND_COLOR_ACTIVE` | `--gl-action-neutral-foreground-color-active` | `#28272d` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_NEUTRAL_FOREGROUND_COLOR_DEFAULT` | `--gl-action-neutral-foreground-color-default` | `#28272d` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_NEUTRAL_FOREGROUND_COLOR_FOCUS` | `--gl-action-neutral-foreground-color-focus` | `#28272d` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_NEUTRAL_FOREGROUND_COLOR_HOVER` | `--gl-action-neutral-foreground-color-hover` | `#28272d` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_SELECTED_BACKGROUND_COLOR_ACTIVE` | `--gl-action-selected-background-color-active` | `#050408` | color | `#fff` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_SELECTED_BACKGROUND_COLOR_DEFAULT` | `--gl-action-selected-background-color-default` | `#3a383d` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_SELECTED_BACKGROUND_COLOR_DISABLED` | `--gl-action-selected-background-color-disabled` | `#8a8888` | color | `#747273` | 按钮/链接等可执行控件的状态颜色 · 禁用态 |
| `GL_ACTION_SELECTED_BACKGROUND_COLOR_FOCUS` | `--gl-action-selected-background-color-focus` | `#18171d` | color | `#f7f7f5` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_SELECTED_BACKGROUND_COLOR_HOVER` | `--gl-action-selected-background-color-hover` | `#18171d` | color | `#f7f7f5` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_SELECTED_BORDER_COLOR_ACTIVE` | `--gl-action-selected-border-color-active` | `#050408` | color | `#fff` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_SELECTED_BORDER_COLOR_DEFAULT` | `--gl-action-selected-border-color-default` | `#3a383d` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_SELECTED_BORDER_COLOR_FOCUS` | `--gl-action-selected-border-color-focus` | `#18171d` | color | `#f7f7f5` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_SELECTED_BORDER_COLOR_HOVER` | `--gl-action-selected-border-color-hover` | `#18171d` | color | `#f7f7f5` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_SELECTED_FOREGROUND_COLOR_ACTIVE` | `--gl-action-selected-foreground-color-active` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_SELECTED_FOREGROUND_COLOR_DEFAULT` | `--gl-action-selected-foreground-color-default` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_SELECTED_FOREGROUND_COLOR_FOCUS` | `--gl-action-selected-foreground-color-focus` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_SELECTED_FOREGROUND_COLOR_HOVER` | `--gl-action-selected-foreground-color-hover` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_STRONG_CONFIRM_BACKGROUND_COLOR_ACTIVE` | `--gl-action-strong-confirm-background-color-active` | `#2f5ca0` | color | `#428fdc` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_STRONG_CONFIRM_BACKGROUND_COLOR_DEFAULT` | `--gl-action-strong-confirm-background-color-default` | `#1f75cb` | color | `#63a6e9` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_STRONG_CONFIRM_BACKGROUND_COLOR_FOCUS` | `--gl-action-strong-confirm-background-color-focus` | `#2f68b4` | color | `#9dc7f1` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_STRONG_CONFIRM_BACKGROUND_COLOR_HOVER` | `--gl-action-strong-confirm-background-color-hover` | `#2f68b4` | color | `#9dc7f1` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_STRONG_CONFIRM_BORDER_COLOR_ACTIVE` | `--gl-action-strong-confirm-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_STRONG_CONFIRM_BORDER_COLOR_DEFAULT` | `--gl-action-strong-confirm-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_STRONG_CONFIRM_BORDER_COLOR_FOCUS` | `--gl-action-strong-confirm-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_STRONG_CONFIRM_BORDER_COLOR_HOVER` | `--gl-action-strong-confirm-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_STRONG_CONFIRM_FOREGROUND_COLOR_ACTIVE` | `--gl-action-strong-confirm-foreground-color-active` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_STRONG_CONFIRM_FOREGROUND_COLOR_DEFAULT` | `--gl-action-strong-confirm-foreground-color-default` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_STRONG_CONFIRM_FOREGROUND_COLOR_FOCUS` | `--gl-action-strong-confirm-foreground-color-focus` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_STRONG_CONFIRM_FOREGROUND_COLOR_HOVER` | `--gl-action-strong-confirm-foreground-color-hover` | `#fff` | color | `#18171d` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_STRONG_NEUTRAL_BACKGROUND_COLOR_ACTIVE` | `--gl-action-strong-neutral-background-color-active` | `#3a383d` | color | `#747273` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_STRONG_NEUTRAL_BACKGROUND_COLOR_DEFAULT` | `--gl-action-strong-neutral-background-color-default` | `#646163` | color | `#4d4b4e` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_STRONG_NEUTRAL_BACKGROUND_COLOR_FOCUS` | `--gl-action-strong-neutral-background-color-focus` | `#4d4b4e` | color | `#646163` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_STRONG_NEUTRAL_BACKGROUND_COLOR_HOVER` | `--gl-action-strong-neutral-background-color-hover` | `#4d4b4e` | color | `#646163` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_STRONG_NEUTRAL_BORDER_COLOR_ACTIVE` | `--gl-action-strong-neutral-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_STRONG_NEUTRAL_BORDER_COLOR_DEFAULT` | `--gl-action-strong-neutral-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_STRONG_NEUTRAL_BORDER_COLOR_FOCUS` | `--gl-action-strong-neutral-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_STRONG_NEUTRAL_BORDER_COLOR_HOVER` | `--gl-action-strong-neutral-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |
| `GL_ACTION_STRONG_NEUTRAL_FOREGROUND_COLOR_ACTIVE` | `--gl-action-strong-neutral-foreground-color-active` | `#fff` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 激活/按压态 |
| `GL_ACTION_STRONG_NEUTRAL_FOREGROUND_COLOR_DEFAULT` | `--gl-action-strong-neutral-foreground-color-default` | `#fff` | color | `#ecebea` | 按钮/链接等可执行控件的状态颜色 · 默认态 |
| `GL_ACTION_STRONG_NEUTRAL_FOREGROUND_COLOR_FOCUS` | `--gl-action-strong-neutral-foreground-color-focus` | `#fff` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 聚焦态 |
| `GL_ACTION_STRONG_NEUTRAL_FOREGROUND_COLOR_HOVER` | `--gl-action-strong-neutral-foreground-color-hover` | `#fff` | color | `—` | 按钮/链接等可执行控件的状态颜色 · 悬停态 |

## `BUTTON` 族

> 按钮组件全部视觉状态令牌（背景/边框/前景/图标 × 各状态）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_BUTTON_BORDER_RADIUS` | `--gl-button-border-radius` | `0.5rem` | dimension | `—` | 按钮组件全部视觉状态令牌（背景/边框/前景/图标 × 各状态） |
| `GL_BUTTON_CONFIRM_PRIMARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-confirm-primary-background-color-active` | `#050408` | color | `#dcdbd9` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_PRIMARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-confirm-primary-background-color-default` | `#3a383d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_PRIMARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-confirm-primary-background-color-focus` | `#18171d` | color | `#f7f7f5` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_PRIMARY_BACKGROUND_COLOR_HOVER` | `--gl-button-confirm-primary-background-color-hover` | `#18171d` | color | `#f7f7f5` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_PRIMARY_BORDER_COLOR_ACTIVE` | `--gl-button-confirm-primary-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_PRIMARY_BORDER_COLOR_DEFAULT` | `--gl-button-confirm-primary-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_PRIMARY_BORDER_COLOR_FOCUS` | `--gl-button-confirm-primary-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_PRIMARY_BORDER_COLOR_HOVER` | `--gl-button-confirm-primary-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_PRIMARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-confirm-primary-foreground-color-active` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_PRIMARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-confirm-primary-foreground-color-default` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_PRIMARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-confirm-primary-foreground-color-focus` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_PRIMARY_FOREGROUND_COLOR_HOVER` | `--gl-button-confirm-primary-foreground-color-hover` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-confirm-secondary-background-color-active` | `#dcdbd9` | color | `rgba(255, 255, 255, 0.16)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-confirm-secondary-background-color-default` | `#fff` | color | `rgba(255, 255, 255, 0.24)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-confirm-secondary-background-color-focus` | `#ecebea` | color | `rgba(255, 255, 255, 0.4)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BACKGROUND_COLOR_HOVER` | `--gl-button-confirm-secondary-background-color-hover` | `#ecebea` | color | `rgba(255, 255, 255, 0.4)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BORDER_COLOR_ACTIVE` | `--gl-button-confirm-secondary-border-color-active` | `#050408` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BORDER_COLOR_DEFAULT` | `--gl-button-confirm-secondary-border-color-default` | `#3a383d` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BORDER_COLOR_FOCUS` | `--gl-button-confirm-secondary-border-color-focus` | `#18171d` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_SECONDARY_BORDER_COLOR_HOVER` | `--gl-button-confirm-secondary-border-color-hover` | `#18171d` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_SECONDARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-confirm-secondary-foreground-color-active` | `#050408` | color | `#fff` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_SECONDARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-confirm-secondary-foreground-color-default` | `#3a383d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_SECONDARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-confirm-secondary-foreground-color-focus` | `#18171d` | color | `#f7f7f5` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_SECONDARY_FOREGROUND_COLOR_HOVER` | `--gl-button-confirm-secondary-foreground-color-hover` | `#18171d` | color | `#f7f7f5` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-confirm-tertiary-background-color-active` | `rgba(5, 5, 6, 0.16)` | color | `rgba(255, 255, 255, 0.08)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-confirm-tertiary-background-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-confirm-tertiary-background-color-focus` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BACKGROUND_COLOR_HOVER` | `--gl-button-confirm-tertiary-background-color-hover` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BORDER_COLOR_ACTIVE` | `--gl-button-confirm-tertiary-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BORDER_COLOR_DEFAULT` | `--gl-button-confirm-tertiary-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BORDER_COLOR_FOCUS` | `--gl-button-confirm-tertiary-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_TERTIARY_BORDER_COLOR_HOVER` | `--gl-button-confirm-tertiary-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_CONFIRM_TERTIARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-confirm-tertiary-foreground-color-active` | `#050408` | color | `#fff` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_CONFIRM_TERTIARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-confirm-tertiary-foreground-color-default` | `#3a383d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_CONFIRM_TERTIARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-confirm-tertiary-foreground-color-focus` | `#18171d` | color | `#f7f7f5` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_CONFIRM_TERTIARY_FOREGROUND_COLOR_HOVER` | `--gl-button-confirm-tertiary-foreground-color-hover` | `#18171d` | color | `#f7f7f5` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_COUNT_BACKGROUND_COLOR` | `--gl-button-count-background-color` | `rgba(5, 5, 6, 0.08)` | color | `rgba(255, 255, 255, 0.16)` | 按钮组件全部视觉状态令牌（背景/边框/前景/图标 × 各状态） |
| `GL_BUTTON_DANGER_PRIMARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-danger-primary-background-color-active` | `#812713` | color | `#ec5941` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_PRIMARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-danger-primary-background-color-default` | `#dd2b0e` | color | `#f6806d` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_PRIMARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-danger-primary-background-color-focus` | `#c02f12` | color | `#fcb5aa` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_PRIMARY_BACKGROUND_COLOR_HOVER` | `--gl-button-danger-primary-background-color-hover` | `#c02f12` | color | `#fcb5aa` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_PRIMARY_BORDER_COLOR_ACTIVE` | `--gl-button-danger-primary-border-color-active` | `#582014` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_PRIMARY_BORDER_COLOR_DEFAULT` | `--gl-button-danger-primary-border-color-default` | `#c02f12` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_PRIMARY_BORDER_COLOR_FOCUS` | `--gl-button-danger-primary-border-color-focus` | `#812713` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_PRIMARY_BORDER_COLOR_HOVER` | `--gl-button-danger-primary-border-color-hover` | `#812713` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_PRIMARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-danger-primary-foreground-color-active` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_PRIMARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-danger-primary-foreground-color-default` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_PRIMARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-danger-primary-foreground-color-focus` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_PRIMARY_FOREGROUND_COLOR_HOVER` | `--gl-button-danger-primary-foreground-color-hover` | `#fff` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_SECONDARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-danger-secondary-background-color-active` | `#fdd4cd` | color | `rgba(236, 89, 65, 0.32)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_SECONDARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-danger-secondary-background-color-default` | `#fff` | color | `rgba(236, 89, 65, 0.4)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_SECONDARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-danger-secondary-background-color-focus` | `#fcf1ef` | color | `rgba(236, 89, 65, 0.64)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_SECONDARY_BACKGROUND_COLOR_HOVER` | `--gl-button-danger-secondary-background-color-hover` | `#fcf1ef` | color | `rgba(236, 89, 65, 0.64)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_SECONDARY_BORDER_COLOR_ACTIVE` | `--gl-button-danger-secondary-border-color-active` | `#582014` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_SECONDARY_BORDER_COLOR_DEFAULT` | `--gl-button-danger-secondary-border-color-default` | `#dd2b0e` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_SECONDARY_BORDER_COLOR_FOCUS` | `--gl-button-danger-secondary-border-color-focus` | `#a32c12` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_SECONDARY_BORDER_COLOR_HOVER` | `--gl-button-danger-secondary-border-color-hover` | `#a32c12` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_SECONDARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-danger-secondary-foreground-color-active` | `#582014` | color | `#fcf1ef` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_SECONDARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-danger-secondary-foreground-color-default` | `#dd2b0e` | color | `#fdd4cd` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_SECONDARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-danger-secondary-foreground-color-focus` | `#a32c12` | color | `#fcf1ef` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_SECONDARY_FOREGROUND_COLOR_HOVER` | `--gl-button-danger-secondary-foreground-color-hover` | `#a32c12` | color | `#fcf1ef` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_TERTIARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-danger-tertiary-background-color-active` | `rgba(174, 24, 0, 0.24)` | color | `rgba(236, 89, 65, 0.16)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_TERTIARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-danger-tertiary-background-color-default` | `rgba(245, 127, 108, 0)` | color | `rgba(236, 89, 65, 0)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_TERTIARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-danger-tertiary-background-color-focus` | `rgba(245, 127, 108, 0.16)` | color | `rgba(236, 89, 65, 0.4)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_TERTIARY_BACKGROUND_COLOR_HOVER` | `--gl-button-danger-tertiary-background-color-hover` | `rgba(245, 127, 108, 0.16)` | color | `rgba(236, 89, 65, 0.4)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_TERTIARY_BORDER_COLOR_ACTIVE` | `--gl-button-danger-tertiary-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_TERTIARY_BORDER_COLOR_DEFAULT` | `--gl-button-danger-tertiary-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_TERTIARY_BORDER_COLOR_FOCUS` | `--gl-button-danger-tertiary-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_TERTIARY_BORDER_COLOR_HOVER` | `--gl-button-danger-tertiary-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DANGER_TERTIARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-danger-tertiary-foreground-color-active` | `#3e1a14` | color | `#fdd4cd` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DANGER_TERTIARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-danger-tertiary-foreground-color-default` | `#c02f12` | color | `#fcb5aa` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DANGER_TERTIARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-danger-tertiary-foreground-color-focus` | `#812713` | color | `#fdd4cd` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DANGER_TERTIARY_FOREGROUND_COLOR_HOVER` | `--gl-button-danger-tertiary-foreground-color-hover` | `#812713` | color | `#fdd4cd` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DASHED_BORDER_COLOR_ACTIVE` | `--gl-button-dashed-border-color-active` | `#646163` | color | `#a5a3a3` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DASHED_BORDER_COLOR_DEFAULT` | `--gl-button-dashed-border-color-default` | `#8a8888` | color | `—` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DASHED_BORDER_COLOR_FOCUS` | `--gl-button-dashed-border-color-focus` | `#8a8888` | color | `—` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DASHED_BORDER_COLOR_HOVER` | `--gl-button-dashed-border-color-hover` | `#8a8888` | color | `—` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-default-primary-background-color-active` | `#dcdbd9` | color | `rgba(137, 136, 141, 0.32)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-default-primary-background-color-default` | `#fff` | color | `rgba(137, 136, 141, 0.4)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-default-primary-background-color-focus` | `#ecebea` | color | `rgba(137, 136, 141, 0.64)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BACKGROUND_COLOR_HOVER` | `--gl-button-default-primary-background-color-hover` | `#ecebea` | color | `rgba(137, 136, 141, 0.64)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BORDER_COLOR_ACTIVE` | `--gl-button-default-primary-border-color-active` | `#646163` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BORDER_COLOR_DEFAULT` | `--gl-button-default-primary-border-color-default` | `#c1bfbe` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BORDER_COLOR_FOCUS` | `--gl-button-default-primary-border-color-focus` | `#8a8888` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DEFAULT_PRIMARY_BORDER_COLOR_HOVER` | `--gl-button-default-primary-border-color-hover` | `#8a8888` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DEFAULT_PRIMARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-default-primary-foreground-color-active` | `#3a383d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DEFAULT_PRIMARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-default-primary-foreground-color-default` | `#3a383d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DEFAULT_PRIMARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-default-primary-foreground-color-focus` | `#3a383d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DEFAULT_PRIMARY_FOREGROUND_COLOR_HOVER` | `--gl-button-default-primary-foreground-color-hover` | `#3a383d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BACKGROUND_COLOR_ACTIVE` | `--gl-button-default-tertiary-background-color-active` | `rgba(5, 5, 6, 0.16)` | color | `rgba(255, 255, 255, 0.08)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BACKGROUND_COLOR_DEFAULT` | `--gl-button-default-tertiary-background-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BACKGROUND_COLOR_FOCUS` | `--gl-button-default-tertiary-background-color-focus` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BACKGROUND_COLOR_HOVER` | `--gl-button-default-tertiary-background-color-hover` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BORDER_COLOR_ACTIVE` | `--gl-button-default-tertiary-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BORDER_COLOR_DEFAULT` | `--gl-button-default-tertiary-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BORDER_COLOR_FOCUS` | `--gl-button-default-tertiary-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DEFAULT_TERTIARY_BORDER_COLOR_HOVER` | `--gl-button-default-tertiary-border-color-hover` | `rgba(0, 0, 0, 0)` | color | `—` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DEFAULT_TERTIARY_FOREGROUND_COLOR_ACTIVE` | `--gl-button-default-tertiary-foreground-color-active` | `#28272d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_DEFAULT_TERTIARY_FOREGROUND_COLOR_DEFAULT` | `--gl-button-default-tertiary-foreground-color-default` | `#28272d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_DEFAULT_TERTIARY_FOREGROUND_COLOR_FOCUS` | `--gl-button-default-tertiary-foreground-color-focus` | `#28272d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_DEFAULT_TERTIARY_FOREGROUND_COLOR_HOVER` | `--gl-button-default-tertiary-foreground-color-hover` | `#28272d` | color | `#ecebea` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_DISABLED_BACKGROUND_COLOR` | `--gl-button-disabled-background-color` | `#f7f7f5` | color | `rgba(137, 136, 141, 0.16)` | 按钮组件全部视觉状态令牌（背景/边框/前景/图标 × 各状态） |
| `GL_BUTTON_DISABLED_BORDER_COLOR` | `--gl-button-disabled-border-color` | `#dcdbd9` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌（背景/边框/前景/图标 × 各状态） |
| `GL_BUTTON_DISABLED_FOREGROUND_COLOR` | `--gl-button-disabled-foreground-color` | `#747273` | color | `#8a8888` | 按钮组件全部视觉状态令牌（背景/边框/前景/图标 × 各状态） |
| `GL_BUTTON_LINK_BORDER_RADIUS` | `--gl-button-link-border-radius` | `0.25rem` | dimension | `—` | 按钮组件全部视觉状态令牌（背景/边框/前景/图标 × 各状态） |
| `GL_BUTTON_LINK_TEXT_COLOR_ACTIVE` | `--gl-button-link-text-color-active` | `#2f5ca0` | color | `#9dc7f1` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_LINK_TEXT_COLOR_DEFAULT` | `--gl-button-link-text-color-default` | `#2f5ca0` | color | `#9dc7f1` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_LINK_TEXT_COLOR_FOCUS` | `--gl-button-link-text-color-focus` | `#2f5ca0` | color | `#9dc7f1` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_LINK_TEXT_COLOR_HOVER` | `--gl-button-link-text-color-hover` | `#2f5ca0` | color | `#9dc7f1` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_SELECTED_BACKGROUND_COLOR_ACTIVE` | `--gl-button-selected-background-color-active` | `#dcdbd9` | color | `#8a8888` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_SELECTED_BACKGROUND_COLOR_DEFAULT` | `--gl-button-selected-background-color-default` | `#ecebea` | color | `#a5a3a3` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_SELECTED_BACKGROUND_COLOR_FOCUS` | `--gl-button-selected-background-color-focus` | `#ecebea` | color | `#c1bfbe` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_SELECTED_BACKGROUND_COLOR_HOVER` | `--gl-button-selected-background-color-hover` | `#ecebea` | color | `#c1bfbe` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_SELECTED_BORDER_COLOR_ACTIVE` | `--gl-button-selected-border-color-active` | `#646163` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_SELECTED_BORDER_COLOR_DEFAULT` | `--gl-button-selected-border-color-default` | `#a5a3a3` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_SELECTED_BORDER_COLOR_FOCUS` | `--gl-button-selected-border-color-focus` | `#8a8888` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_SELECTED_BORDER_COLOR_HOVER` | `--gl-button-selected-border-color-hover` | `#8a8888` | color | `rgba(0, 0, 0, 0)` | 按钮组件全部视觉状态令牌 · 悬停态 |
| `GL_BUTTON_SELECTED_FOREGROUND_COLOR_ACTIVE` | `--gl-button-selected-foreground-color-active` | `#3a383d` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 激活/按压态 |
| `GL_BUTTON_SELECTED_FOREGROUND_COLOR_DEFAULT` | `--gl-button-selected-foreground-color-default` | `#3a383d` | color | `#28272d` | 按钮组件全部视觉状态令牌 · 默认态 |
| `GL_BUTTON_SELECTED_FOREGROUND_COLOR_FOCUS` | `--gl-button-selected-foreground-color-focus` | `#3a383d` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 聚焦态 |
| `GL_BUTTON_SELECTED_FOREGROUND_COLOR_HOVER` | `--gl-button-selected-foreground-color-hover` | `#3a383d` | color | `#18171d` | 按钮组件全部视觉状态令牌 · 悬停态 |

## `BADGE` 族

> 徽章（尺寸、配色、tone 语义色）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_BADGE_DANGER_BACKGROUND_COLOR_ACTIVE` | `--gl-badge-danger-background-color-active` | `#fcb5aa` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_DANGER_BACKGROUND_COLOR_DEFAULT` | `--gl-badge-danger-background-color-default` | `#fdd4cd` | color | `#f6806d` | 徽章 · 默认态 |
| `GL_BADGE_DANGER_BACKGROUND_COLOR_FOCUS` | `--gl-badge-danger-background-color-focus` | `#fdd4cd` | color | `#f6806d` | 徽章 · 聚焦态 |
| `GL_BADGE_DANGER_BACKGROUND_COLOR_HOVER` | `--gl-badge-danger-background-color-hover` | `#fdd4cd` | color | `#f6806d` | 徽章 · 悬停态 |
| `GL_BADGE_DANGER_BORDER_COLOR_ACTIVE` | `--gl-badge-danger-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_DANGER_BORDER_COLOR_DEFAULT` | `--gl-badge-danger-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 默认态 |
| `GL_BADGE_DANGER_BORDER_COLOR_FOCUS` | `--gl-badge-danger-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 聚焦态 |
| `GL_BADGE_DANGER_BORDER_COLOR_HOVER` | `--gl-badge-danger-border-color-hover` | `#fcb5aa` | color | `—` | 徽章 · 悬停态 |
| `GL_BADGE_DANGER_ICON_COLOR_ACTIVE` | `--gl-badge-danger-icon-color-active` | `#582014` | color | `#3e1a14` | 徽章 · 激活/按压态 |
| `GL_BADGE_DANGER_ICON_COLOR_DEFAULT` | `--gl-badge-danger-icon-color-default` | `#a32c12` | color | `#3e1a14` | 徽章 · 默认态 |
| `GL_BADGE_DANGER_ICON_COLOR_FOCUS` | `--gl-badge-danger-icon-color-focus` | `#812713` | color | `#3e1a14` | 徽章 · 聚焦态 |
| `GL_BADGE_DANGER_ICON_COLOR_HOVER` | `--gl-badge-danger-icon-color-hover` | `#812713` | color | `#3e1a14` | 徽章 · 悬停态 |
| `GL_BADGE_DANGER_TEXT_COLOR_ACTIVE` | `--gl-badge-danger-text-color-active` | `#582014` | color | `#3e1a14` | 徽章 · 激活/按压态 |
| `GL_BADGE_DANGER_TEXT_COLOR_DEFAULT` | `--gl-badge-danger-text-color-default` | `#a32c12` | color | `#3e1a14` | 徽章 · 默认态 |
| `GL_BADGE_DANGER_TEXT_COLOR_FOCUS` | `--gl-badge-danger-text-color-focus` | `#812713` | color | `#3e1a14` | 徽章 · 聚焦态 |
| `GL_BADGE_DANGER_TEXT_COLOR_HOVER` | `--gl-badge-danger-text-color-hover` | `#812713` | color | `#3e1a14` | 徽章 · 悬停态 |
| `GL_BADGE_INFO_BACKGROUND_COLOR_ACTIVE` | `--gl-badge-info-background-color-active` | `#9dc7f1` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_INFO_BACKGROUND_COLOR_DEFAULT` | `--gl-badge-info-background-color-default` | `#cbe2f9` | color | `#63a6e9` | 徽章 · 默认态 |
| `GL_BADGE_INFO_BACKGROUND_COLOR_FOCUS` | `--gl-badge-info-background-color-focus` | `#cbe2f9` | color | `#63a6e9` | 徽章 · 聚焦态 |
| `GL_BADGE_INFO_BACKGROUND_COLOR_HOVER` | `--gl-badge-info-background-color-hover` | `#cbe2f9` | color | `#63a6e9` | 徽章 · 悬停态 |
| `GL_BADGE_INFO_BORDER_COLOR_ACTIVE` | `--gl-badge-info-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_INFO_BORDER_COLOR_DEFAULT` | `--gl-badge-info-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 默认态 |
| `GL_BADGE_INFO_BORDER_COLOR_FOCUS` | `--gl-badge-info-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 聚焦态 |
| `GL_BADGE_INFO_BORDER_COLOR_HOVER` | `--gl-badge-info-border-color-hover` | `#9dc7f1` | color | `—` | 徽章 · 悬停态 |
| `GL_BADGE_INFO_ICON_COLOR_ACTIVE` | `--gl-badge-info-icon-color-active` | `#2f5ca0` | color | `#1d283e` | 徽章 · 激活/按压态 |
| `GL_BADGE_INFO_ICON_COLOR_DEFAULT` | `--gl-badge-info-icon-color-default` | `#1f75cb` | color | `#1d283e` | 徽章 · 默认态 |
| `GL_BADGE_INFO_ICON_COLOR_FOCUS` | `--gl-badge-info-icon-color-focus` | `#2f68b4` | color | `#1d283e` | 徽章 · 聚焦态 |
| `GL_BADGE_INFO_ICON_COLOR_HOVER` | `--gl-badge-info-icon-color-hover` | `#2f68b4` | color | `#1d283e` | 徽章 · 悬停态 |
| `GL_BADGE_INFO_TEXT_COLOR_ACTIVE` | `--gl-badge-info-text-color-active` | `#213454` | color | `#1d283e` | 徽章 · 激活/按压态 |
| `GL_BADGE_INFO_TEXT_COLOR_DEFAULT` | `--gl-badge-info-text-color-default` | `#2f5ca0` | color | `#1d283e` | 徽章 · 默认态 |
| `GL_BADGE_INFO_TEXT_COLOR_FOCUS` | `--gl-badge-info-text-color-focus` | `#284779` | color | `#1d283e` | 徽章 · 聚焦态 |
| `GL_BADGE_INFO_TEXT_COLOR_HOVER` | `--gl-badge-info-text-color-hover` | `#284779` | color | `#1d283e` | 徽章 · 悬停态 |
| `GL_BADGE_MUTED_BACKGROUND_COLOR_ACTIVE` | `--gl-badge-muted-background-color-active` | `#dcdbd9` | color | `#a5a3a3` | 徽章 · 激活/按压态 |
| `GL_BADGE_MUTED_BACKGROUND_COLOR_DEFAULT` | `--gl-badge-muted-background-color-default` | `#ecebea` | color | `#8a8888` | 徽章 · 默认态 |
| `GL_BADGE_MUTED_BACKGROUND_COLOR_FOCUS` | `--gl-badge-muted-background-color-focus` | `#ecebea` | color | `#8a8888` | 徽章 · 聚焦态 |
| `GL_BADGE_MUTED_BACKGROUND_COLOR_HOVER` | `--gl-badge-muted-background-color-hover` | `#ecebea` | color | `#8a8888` | 徽章 · 悬停态 |
| `GL_BADGE_MUTED_BORDER_COLOR_ACTIVE` | `--gl-badge-muted-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_MUTED_BORDER_COLOR_DEFAULT` | `--gl-badge-muted-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 默认态 |
| `GL_BADGE_MUTED_BORDER_COLOR_FOCUS` | `--gl-badge-muted-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 聚焦态 |
| `GL_BADGE_MUTED_BORDER_COLOR_HOVER` | `--gl-badge-muted-border-color-hover` | `#c1bfbe` | color | `#a5a3a3` | 徽章 · 悬停态 |
| `GL_BADGE_MUTED_ICON_COLOR_ACTIVE` | `--gl-badge-muted-icon-color-active` | `#4d4b4e` | color | `#18171d` | 徽章 · 激活/按压态 |
| `GL_BADGE_MUTED_ICON_COLOR_DEFAULT` | `--gl-badge-muted-icon-color-default` | `#747273` | color | `#18171d` | 徽章 · 默认态 |
| `GL_BADGE_MUTED_ICON_COLOR_FOCUS` | `--gl-badge-muted-icon-color-focus` | `#646163` | color | `#18171d` | 徽章 · 聚焦态 |
| `GL_BADGE_MUTED_ICON_COLOR_HOVER` | `--gl-badge-muted-icon-color-hover` | `#646163` | color | `#18171d` | 徽章 · 悬停态 |
| `GL_BADGE_MUTED_TEXT_COLOR_ACTIVE` | `--gl-badge-muted-text-color-active` | `#3a383d` | color | `#18171d` | 徽章 · 激活/按压态 |
| `GL_BADGE_MUTED_TEXT_COLOR_DEFAULT` | `--gl-badge-muted-text-color-default` | `#646163` | color | `#18171d` | 徽章 · 默认态 |
| `GL_BADGE_MUTED_TEXT_COLOR_FOCUS` | `--gl-badge-muted-text-color-focus` | `#4d4b4e` | color | `#18171d` | 徽章 · 聚焦态 |
| `GL_BADGE_MUTED_TEXT_COLOR_HOVER` | `--gl-badge-muted-text-color-hover` | `#4d4b4e` | color | `#18171d` | 徽章 · 悬停态 |
| `GL_BADGE_NEUTRAL_BACKGROUND_COLOR_ACTIVE` | `--gl-badge-neutral-background-color-active` | `#c1bfbe` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_NEUTRAL_BACKGROUND_COLOR_DEFAULT` | `--gl-badge-neutral-background-color-default` | `#dcdbd9` | color | `#a5a3a3` | 徽章 · 默认态 |
| `GL_BADGE_NEUTRAL_BACKGROUND_COLOR_FOCUS` | `--gl-badge-neutral-background-color-focus` | `#dcdbd9` | color | `#a5a3a3` | 徽章 · 聚焦态 |
| `GL_BADGE_NEUTRAL_BACKGROUND_COLOR_HOVER` | `--gl-badge-neutral-background-color-hover` | `#dcdbd9` | color | `#a5a3a3` | 徽章 · 悬停态 |
| `GL_BADGE_NEUTRAL_BORDER_COLOR_ACTIVE` | `--gl-badge-neutral-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_NEUTRAL_BORDER_COLOR_DEFAULT` | `--gl-badge-neutral-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 默认态 |
| `GL_BADGE_NEUTRAL_BORDER_COLOR_FOCUS` | `--gl-badge-neutral-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 聚焦态 |
| `GL_BADGE_NEUTRAL_BORDER_COLOR_HOVER` | `--gl-badge-neutral-border-color-hover` | `#c1bfbe` | color | `—` | 徽章 · 悬停态 |
| `GL_BADGE_NEUTRAL_ICON_COLOR_ACTIVE` | `--gl-badge-neutral-icon-color-active` | `#4d4b4e` | color | `#18171d` | 徽章 · 激活/按压态 |
| `GL_BADGE_NEUTRAL_ICON_COLOR_DEFAULT` | `--gl-badge-neutral-icon-color-default` | `#747273` | color | `#18171d` | 徽章 · 默认态 |
| `GL_BADGE_NEUTRAL_ICON_COLOR_FOCUS` | `--gl-badge-neutral-icon-color-focus` | `#646163` | color | `#18171d` | 徽章 · 聚焦态 |
| `GL_BADGE_NEUTRAL_ICON_COLOR_HOVER` | `--gl-badge-neutral-icon-color-hover` | `#646163` | color | `#18171d` | 徽章 · 悬停态 |
| `GL_BADGE_NEUTRAL_TEXT_COLOR_ACTIVE` | `--gl-badge-neutral-text-color-active` | `#28272d` | color | `#18171d` | 徽章 · 激活/按压态 |
| `GL_BADGE_NEUTRAL_TEXT_COLOR_DEFAULT` | `--gl-badge-neutral-text-color-default` | `#4d4b4e` | color | `#18171d` | 徽章 · 默认态 |
| `GL_BADGE_NEUTRAL_TEXT_COLOR_FOCUS` | `--gl-badge-neutral-text-color-focus` | `#3a383d` | color | `#18171d` | 徽章 · 聚焦态 |
| `GL_BADGE_NEUTRAL_TEXT_COLOR_HOVER` | `--gl-badge-neutral-text-color-hover` | `#3a383d` | color | `#18171d` | 徽章 · 悬停态 |
| `GL_BADGE_SUCCESS_BACKGROUND_COLOR_ACTIVE` | `--gl-badge-success-background-color-active` | `#91d4a8` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_SUCCESS_BACKGROUND_COLOR_DEFAULT` | `--gl-badge-success-background-color-default` | `#c3e6cd` | color | `#52b87a` | 徽章 · 默认态 |
| `GL_BADGE_SUCCESS_BACKGROUND_COLOR_FOCUS` | `--gl-badge-success-background-color-focus` | `#c3e6cd` | color | `#52b87a` | 徽章 · 聚焦态 |
| `GL_BADGE_SUCCESS_BACKGROUND_COLOR_HOVER` | `--gl-badge-success-background-color-hover` | `#c3e6cd` | color | `#52b87a` | 徽章 · 悬停态 |
| `GL_BADGE_SUCCESS_BORDER_COLOR_ACTIVE` | `--gl-badge-success-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_SUCCESS_BORDER_COLOR_DEFAULT` | `--gl-badge-success-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 默认态 |
| `GL_BADGE_SUCCESS_BORDER_COLOR_FOCUS` | `--gl-badge-success-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 聚焦态 |
| `GL_BADGE_SUCCESS_BORDER_COLOR_HOVER` | `--gl-badge-success-border-color-hover` | `#91d4a8` | color | `—` | 徽章 · 悬停态 |
| `GL_BADGE_SUCCESS_ICON_COLOR_ACTIVE` | `--gl-badge-success-icon-color-active` | `#306440` | color | `#17291c` | 徽章 · 激活/按压态 |
| `GL_BADGE_SUCCESS_ICON_COLOR_DEFAULT` | `--gl-badge-success-icon-color-default` | `#108548` | color | `#17291c` | 徽章 · 默认态 |
| `GL_BADGE_SUCCESS_ICON_COLOR_FOCUS` | `--gl-badge-success-icon-color-focus` | `#2f7549` | color | `#17291c` | 徽章 · 聚焦态 |
| `GL_BADGE_SUCCESS_ICON_COLOR_HOVER` | `--gl-badge-success-icon-color-hover` | `#2f7549` | color | `#17291c` | 徽章 · 悬停态 |
| `GL_BADGE_SUCCESS_TEXT_COLOR_ACTIVE` | `--gl-badge-success-text-color-active` | `#1e3e28` | color | `#17291c` | 徽章 · 激活/按压态 |
| `GL_BADGE_SUCCESS_TEXT_COLOR_DEFAULT` | `--gl-badge-success-text-color-default` | `#306440` | color | `#17291c` | 徽章 · 默认态 |
| `GL_BADGE_SUCCESS_TEXT_COLOR_FOCUS` | `--gl-badge-success-text-color-focus` | `#225131` | color | `#17291c` | 徽章 · 聚焦态 |
| `GL_BADGE_SUCCESS_TEXT_COLOR_HOVER` | `--gl-badge-success-text-color-hover` | `#225131` | color | `#17291c` | 徽章 · 悬停态 |
| `GL_BADGE_TIER_BACKGROUND_COLOR_ACTIVE` | `--gl-badge-tier-background-color-active` | `#cbbbf2` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_TIER_BACKGROUND_COLOR_DEFAULT` | `--gl-badge-tier-background-color-default` | `#e1d8f9` | color | `#ac93e6` | 徽章 · 默认态 |
| `GL_BADGE_TIER_BACKGROUND_COLOR_FOCUS` | `--gl-badge-tier-background-color-focus` | `#e1d8f9` | color | `#ac93e6` | 徽章 · 聚焦态 |
| `GL_BADGE_TIER_BACKGROUND_COLOR_HOVER` | `--gl-badge-tier-background-color-hover` | `#e1d8f9` | color | `#ac93e6` | 徽章 · 悬停态 |
| `GL_BADGE_TIER_BORDER_COLOR_ACTIVE` | `--gl-badge-tier-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_TIER_BORDER_COLOR_DEFAULT` | `--gl-badge-tier-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 默认态 |
| `GL_BADGE_TIER_BORDER_COLOR_FOCUS` | `--gl-badge-tier-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 聚焦态 |
| `GL_BADGE_TIER_BORDER_COLOR_HOVER` | `--gl-badge-tier-border-color-hover` | `#cbbbf2` | color | `—` | 徽章 · 悬停态 |
| `GL_BADGE_TIER_ICON_COLOR_ACTIVE` | `--gl-badge-tier-icon-color-active` | `#342d59` | color | `#27243e` | 徽章 · 激活/按压态 |
| `GL_BADGE_TIER_ICON_COLOR_DEFAULT` | `--gl-badge-tier-icon-color-default` | `#5c47a6` | color | `#27243e` | 徽章 · 默认态 |
| `GL_BADGE_TIER_ICON_COLOR_FOCUS` | `--gl-badge-tier-icon-color-focus` | `#493c83` | color | `#27243e` | 徽章 · 聚焦态 |
| `GL_BADGE_TIER_ICON_COLOR_HOVER` | `--gl-badge-tier-icon-color-hover` | `#493c83` | color | `#27243e` | 徽章 · 悬停态 |
| `GL_BADGE_TIER_TEXT_COLOR_ACTIVE` | `--gl-badge-tier-text-color-active` | `#342d59` | color | `#27243e` | 徽章 · 激活/按压态 |
| `GL_BADGE_TIER_TEXT_COLOR_DEFAULT` | `--gl-badge-tier-text-color-default` | `#5c47a6` | color | `#27243e` | 徽章 · 默认态 |
| `GL_BADGE_TIER_TEXT_COLOR_FOCUS` | `--gl-badge-tier-text-color-focus` | `#493c83` | color | `#27243e` | 徽章 · 聚焦态 |
| `GL_BADGE_TIER_TEXT_COLOR_HOVER` | `--gl-badge-tier-text-color-hover` | `#493c83` | color | `#27243e` | 徽章 · 悬停态 |
| `GL_BADGE_WARNING_BACKGROUND_COLOR_ACTIVE` | `--gl-badge-warning-background-color-active` | `#e9be74` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_WARNING_BACKGROUND_COLOR_DEFAULT` | `--gl-badge-warning-background-color-default` | `#f5d9a8` | color | `#d99530` | 徽章 · 默认态 |
| `GL_BADGE_WARNING_BACKGROUND_COLOR_FOCUS` | `--gl-badge-warning-background-color-focus` | `#f5d9a8` | color | `#d99530` | 徽章 · 聚焦态 |
| `GL_BADGE_WARNING_BACKGROUND_COLOR_HOVER` | `--gl-badge-warning-background-color-hover` | `#f5d9a8` | color | `#d99530` | 徽章 · 悬停态 |
| `GL_BADGE_WARNING_BORDER_COLOR_ACTIVE` | `--gl-badge-warning-border-color-active` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 激活/按压态 |
| `GL_BADGE_WARNING_BORDER_COLOR_DEFAULT` | `--gl-badge-warning-border-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 默认态 |
| `GL_BADGE_WARNING_BORDER_COLOR_FOCUS` | `--gl-badge-warning-border-color-focus` | `rgba(0, 0, 0, 0)` | color | `—` | 徽章 · 聚焦态 |
| `GL_BADGE_WARNING_BORDER_COLOR_HOVER` | `--gl-badge-warning-border-color-hover` | `#e9be74` | color | `—` | 徽章 · 悬停态 |
| `GL_BADGE_WARNING_ICON_COLOR_ACTIVE` | `--gl-badge-warning-icon-color-active` | `#894b16` | color | `#382315` | 徽章 · 激活/按压态 |
| `GL_BADGE_WARNING_ICON_COLOR_DEFAULT` | `--gl-badge-warning-icon-color-default` | `#ab6100` | color | `#382315` | 徽章 · 默认态 |
| `GL_BADGE_WARNING_ICON_COLOR_FOCUS` | `--gl-badge-warning-icon-color-focus` | `#995715` | color | `#382315` | 徽章 · 聚焦态 |
| `GL_BADGE_WARNING_ICON_COLOR_HOVER` | `--gl-badge-warning-icon-color-hover` | `#995715` | color | `#382315` | 徽章 · 悬停态 |
| `GL_BADGE_WARNING_TEXT_COLOR_ACTIVE` | `--gl-badge-warning-text-color-active` | `#532e16` | color | `#382315` | 徽章 · 激活/按压态 |
| `GL_BADGE_WARNING_TEXT_COLOR_DEFAULT` | `--gl-badge-warning-text-color-default` | `#894b16` | color | `#382315` | 徽章 · 默认态 |
| `GL_BADGE_WARNING_TEXT_COLOR_FOCUS` | `--gl-badge-warning-text-color-focus` | `#693c14` | color | `#382315` | 徽章 · 聚焦态 |
| `GL_BADGE_WARNING_TEXT_COLOR_HOVER` | `--gl-badge-warning-text-color-hover` | `#693c14` | color | `#382315` | 徽章 · 悬停态 |

## `ALERT` 族

> 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_ALERT_BORDER_RADIUS` | `--gl-alert-border-radius` | `0.5rem` | dimension | `—` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_DANGER_BACKGROUND_COLOR` | `--gl-alert-danger-background-color` | `#fcf1ef` | color | `#582014` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_DANGER_BORDER_BOTTOM_COLOR` | `--gl-alert-danger-border-bottom-color` | `rgba(0, 0, 0, 0)` | color | `—` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_DANGER_BORDER_COLOR` | `--gl-alert-danger-border-color` | `#dd2b0e` | color | `#f6806d` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_DANGER_BORDER_TOP_COLOR` | `--gl-alert-danger-border-top-color` | `rgba(0, 0, 0, 0)` | color | `#ec5941` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_DANGER_TITLE_COLOR` | `--gl-alert-danger-title-color` | `#18171d` | color | `#fcb5aa` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_INFO_BACKGROUND_COLOR` | `--gl-alert-info-background-color` | `#e9f3fc` | color | `#1d283e` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_INFO_BORDER_BOTTOM_COLOR` | `--gl-alert-info-border-bottom-color` | `rgba(0, 0, 0, 0)` | color | `—` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_INFO_BORDER_COLOR` | `--gl-alert-info-border-color` | `#9dc7f1` | color | `#2f68b4` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_INFO_BORDER_TOP_COLOR` | `--gl-alert-info-border-top-color` | `rgba(0, 0, 0, 0)` | color | `#428fdc` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_INFO_TITLE_COLOR` | `--gl-alert-info-title-color` | `#18171d` | color | `#9dc7f1` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_NEUTRAL_BACKGROUND_COLOR` | `--gl-alert-neutral-background-color` | `#ecebea` | color | `#28272d` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_NEUTRAL_BORDER_BOTTOM_COLOR` | `--gl-alert-neutral-border-bottom-color` | `rgba(0, 0, 0, 0)` | color | `—` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_NEUTRAL_BORDER_COLOR` | `--gl-alert-neutral-border-color` | `#c1bfbe` | color | `#646163` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_NEUTRAL_BORDER_TOP_COLOR` | `--gl-alert-neutral-border-top-color` | `rgba(0, 0, 0, 0)` | color | `#8a8888` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_NEUTRAL_TITLE_COLOR` | `--gl-alert-neutral-title-color` | `#18171d` | color | `#fff` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_SUCCESS_BACKGROUND_COLOR` | `--gl-alert-success-background-color` | `#ecf4ee` | color | `#1e3e28` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_SUCCESS_BORDER_BOTTOM_COLOR` | `--gl-alert-success-border-bottom-color` | `rgba(0, 0, 0, 0)` | color | `—` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_SUCCESS_BORDER_COLOR` | `--gl-alert-success-border-color` | `#91d4a8` | color | `#2f7549` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_SUCCESS_BORDER_TOP_COLOR` | `--gl-alert-success-border-top-color` | `rgba(0, 0, 0, 0)` | color | `#2da160` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_SUCCESS_TITLE_COLOR` | `--gl-alert-success-title-color` | `#18171d` | color | `#91d4a8` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_WARNING_BACKGROUND_COLOR` | `--gl-alert-warning-background-color` | `#fdf1dd` | color | `#532e16` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_WARNING_BORDER_BOTTOM_COLOR` | `--gl-alert-warning-border-bottom-color` | `rgba(0, 0, 0, 0)` | color | `—` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_WARNING_BORDER_COLOR` | `--gl-alert-warning-border-color` | `#e9be74` | color | `#995715` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_WARNING_BORDER_TOP_COLOR` | `--gl-alert-warning-border-top-color` | `rgba(0, 0, 0, 0)` | color | `#c17d10` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |
| `GL_ALERT_WARNING_TITLE_COLOR` | `--gl-alert-warning-title-color` | `#18171d` | color | `#e9be74` | 告警横幅样式（信息/成功/警告/危险的背景、边框、前景、图标色） |

## `CONTROL` 族

> 表单控件边框/背景/前景色（含 hover/focus/disabled）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_CONTROL_BACKGROUND_COLOR_CONCATENATION` | `--gl-control-background-color-concatenation` | `#f7f7f5` | color | `rgba(255, 255, 255, 0.04)` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |
| `GL_CONTROL_BACKGROUND_COLOR_DEFAULT` | `--gl-control-background-color-default` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 表单控件边框/背景/前景色 · 默认态 |
| `GL_CONTROL_BACKGROUND_COLOR_DISABLED` | `--gl-control-background-color-disabled` | `#f7f7f5` | color | `rgba(255, 255, 255, 0.04)` | 表单控件边框/背景/前景色 · 禁用态 |
| `GL_CONTROL_BACKGROUND_COLOR_READONLY` | `--gl-control-background-color-readonly` | `rgba(5, 5, 6, 0.02)` | color | `rgba(255, 255, 255, 0.08)` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |
| `GL_CONTROL_BACKGROUND_COLOR_SELECTED_DEFAULT` | `--gl-control-background-color-selected-default` | `#3a383d` | color | `#ecebea` | 表单控件边框/背景/前景色 · 默认态 |
| `GL_CONTROL_BACKGROUND_COLOR_SELECTED_FOCUS` | `--gl-control-background-color-selected-focus` | `#18171d` | color | `#f7f7f5` | 表单控件边框/背景/前景色 · 聚焦态 |
| `GL_CONTROL_BACKGROUND_COLOR_SELECTED_HOVER` | `--gl-control-background-color-selected-hover` | `#18171d` | color | `#f7f7f5` | 表单控件边框/背景/前景色 · 悬停态 |
| `GL_CONTROL_BORDER_COLOR_DEFAULT` | `--gl-control-border-color-default` | `#8a8888` | color | `#747273` | 表单控件边框/背景/前景色 · 默认态 |
| `GL_CONTROL_BORDER_COLOR_DISABLED` | `--gl-control-border-color-disabled` | `#dcdbd9` | color | `#3a383d` | 表单控件边框/背景/前景色 · 禁用态 |
| `GL_CONTROL_BORDER_COLOR_ERROR` | `--gl-control-border-color-error` | `#dd2b0e` | color | `#f6806d` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |
| `GL_CONTROL_BORDER_COLOR_FOCUS` | `--gl-control-border-color-focus` | `#28272d` | color | `#ecebea` | 表单控件边框/背景/前景色 · 聚焦态 |
| `GL_CONTROL_BORDER_COLOR_HOVER` | `--gl-control-border-color-hover` | `#646163` | color | `#a5a3a3` | 表单控件边框/背景/前景色 · 悬停态 |
| `GL_CONTROL_BORDER_COLOR_SELECTED_DEFAULT` | `--gl-control-border-color-selected-default` | `#3a383d` | color | `#ecebea` | 表单控件边框/背景/前景色 · 默认态 |
| `GL_CONTROL_BORDER_COLOR_SELECTED_FOCUS` | `--gl-control-border-color-selected-focus` | `#18171d` | color | `#f7f7f5` | 表单控件边框/背景/前景色 · 聚焦态 |
| `GL_CONTROL_BORDER_COLOR_SELECTED_HOVER` | `--gl-control-border-color-selected-hover` | `#18171d` | color | `#f7f7f5` | 表单控件边框/背景/前景色 · 悬停态 |
| `GL_CONTROL_BORDER_RADIUS` | `--gl-control-border-radius` | `0.5rem` | dimension | `—` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |
| `GL_CONTROL_INDICATOR_COLOR_DISABLED` | `--gl-control-indicator-color-disabled` | `#747273` | color | `#8a8888` | 表单控件边框/背景/前景色 · 禁用态 |
| `GL_CONTROL_INDICATOR_COLOR_SELECTED` | `--gl-control-indicator-color-selected` | `#fff` | color | `#18171d` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |
| `GL_CONTROL_PLACEHOLDER_COLOR` | `--gl-control-placeholder-color` | `#747273` | color | `#8a8888` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |
| `GL_CONTROL_TEXT_COLOR_ERROR` | `--gl-control-text-color-error` | `#c02f12` | color | `#f6806d` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |
| `GL_CONTROL_TEXT_COLOR_VALID` | `--gl-control-text-color-valid` | `#2f7549` | color | `#52b87a` | 表单控件边框/背景/前景色（含 hover/focus/disabled） |

## `DROPDOWN` 族

> 下拉菜单（背景、分隔线、边框、阴影）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_DROPDOWN_BACKGROUND_COLOR` | `--gl-dropdown-background-color` | `#fff` | color | `#28272d` | 下拉菜单（背景、分隔线、边框、阴影） |
| `GL_DROPDOWN_BORDER_COLOR` | `--gl-dropdown-border-color` | `#c1bfbe` | color | `#4d4b4e` | 下拉菜单（背景、分隔线、边框、阴影） |
| `GL_DROPDOWN_BORDER_RADIUS` | `--gl-dropdown-border-radius` | `0.5rem` | dimension | `—` | 下拉菜单（背景、分隔线、边框、阴影） |
| `GL_DROPDOWN_DIVIDER_COLOR` | `--gl-dropdown-divider-color` | `#dcdbd9` | color | `#3a383d` | 下拉菜单（背景、分隔线、边框、阴影） |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_SELECTED_ACTIVE` | `--gl-dropdown-option-background-color-selected-active` | `#c1bfbe` | color | `#28272d` | 下拉菜单 · 激活/按压态 |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_SELECTED_DEFAULT` | `--gl-dropdown-option-background-color-selected-default` | `#ecebea` | color | `#3a383d` | 下拉菜单 · 默认态 |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_SELECTED_FOCUS` | `--gl-dropdown-option-background-color-selected-focus` | `#dcdbd9` | color | `#4d4b4e` | 下拉菜单 · 聚焦态 |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_SELECTED_HOVER` | `--gl-dropdown-option-background-color-selected-hover` | `#dcdbd9` | color | `#4d4b4e` | 下拉菜单 · 悬停态 |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_UNSELECTED_ACTIVE` | `--gl-dropdown-option-background-color-unselected-active` | `rgba(5, 5, 6, 0.16)` | color | `rgba(255, 255, 255, 0.08)` | 下拉菜单 · 激活/按压态 |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_UNSELECTED_DEFAULT` | `--gl-dropdown-option-background-color-unselected-default` | `rgba(0, 0, 0, 0)` | color | `—` | 下拉菜单 · 默认态 |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_UNSELECTED_FOCUS` | `--gl-dropdown-option-background-color-unselected-focus` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 下拉菜单 · 聚焦态 |
| `GL_DROPDOWN_OPTION_BACKGROUND_COLOR_UNSELECTED_HOVER` | `--gl-dropdown-option-background-color-unselected-hover` | `rgba(5, 5, 6, 0.06)` | color | `rgba(255, 255, 255, 0.16)` | 下拉菜单 · 悬停态 |
| `GL_DROPDOWN_OPTION_INDICATOR_COLOR_SELECTED_ACTIVE` | `--gl-dropdown-option-indicator-color-selected-active` | `#18171d` | color | `#f7f7f5` | 下拉菜单 · 激活/按压态 |
| `GL_DROPDOWN_OPTION_INDICATOR_COLOR_SELECTED_DEFAULT` | `--gl-dropdown-option-indicator-color-selected-default` | `#3a383d` | color | `#ecebea` | 下拉菜单 · 默认态 |
| `GL_DROPDOWN_OPTION_INDICATOR_COLOR_SELECTED_FOCUS` | `--gl-dropdown-option-indicator-color-selected-focus` | `#18171d` | color | `#f7f7f5` | 下拉菜单 · 聚焦态 |
| `GL_DROPDOWN_OPTION_INDICATOR_COLOR_SELECTED_HOVER` | `--gl-dropdown-option-indicator-color-selected-hover` | `#18171d` | color | `#f7f7f5` | 下拉菜单 · 悬停态 |
| `GL_DROPDOWN_OPTION_TEXT_COLOR_ACTIVE` | `--gl-dropdown-option-text-color-active` | `#28272d` | color | `#ecebea` | 下拉菜单 · 激活/按压态 |
| `GL_DROPDOWN_OPTION_TEXT_COLOR_DEFAULT` | `--gl-dropdown-option-text-color-default` | `#28272d` | color | `#ecebea` | 下拉菜单 · 默认态 |
| `GL_DROPDOWN_OPTION_TEXT_COLOR_DISABLED` | `--gl-dropdown-option-text-color-disabled` | `#8a8888` | color | `#747273` | 下拉菜单 · 禁用态 |
| `GL_DROPDOWN_OPTION_TEXT_COLOR_FOCUS` | `--gl-dropdown-option-text-color-focus` | `#28272d` | color | `#ecebea` | 下拉菜单 · 聚焦态 |
| `GL_DROPDOWN_OPTION_TEXT_COLOR_HOVER` | `--gl-dropdown-option-text-color-hover` | `#28272d` | color | `#ecebea` | 下拉菜单 · 悬停态 |
| `GL_DROPDOWN_SEARCH_BACKGROUND_COLOR` | `--gl-dropdown-search-background-color` | `rgba(5, 5, 6, 0.02)` | color | `rgba(5, 5, 6, 0.16)` | 下拉菜单（背景、分隔线、边框、阴影） |

## `HEADING` 族

> 标题 1–6 与 heading-scale 的字号/字重/颜色/间距

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_HEADING_1_COLOR` | `--gl-heading-1-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FIXED_COLOR` | `--gl-heading-1-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FIXED_FONT_SIZE` | `--gl-heading-1-fixed-font-size` | `1.5rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FIXED_FONT_WEIGHT` | `--gl-heading-1-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FIXED_LETTER_SPACING` | `--gl-heading-1-fixed-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FIXED_LINE_HEIGHT` | `--gl-heading-1-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FIXED_MARGIN_BOTTOM` | `--gl-heading-1-fixed-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FIXED_MARGIN_TOP` | `--gl-heading-1-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FONT_SIZE` | `--gl-heading-1-font-size` | `clamp(1.5rem, 0.8333333333rem + 1.3888888889v…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_FONT_WEIGHT` | `--gl-heading-1-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_LETTER_SPACING` | `--gl-heading-1-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_LINE_HEIGHT` | `--gl-heading-1-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_MARGIN_BOTTOM` | `--gl-heading-1-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_1_MARGIN_TOP` | `--gl-heading-1-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_COLOR` | `--gl-heading-2-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FIXED_COLOR` | `--gl-heading-2-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FIXED_FONT_SIZE` | `--gl-heading-2-fixed-font-size` | `1.3125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FIXED_FONT_WEIGHT` | `--gl-heading-2-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FIXED_LETTER_SPACING` | `--gl-heading-2-fixed-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FIXED_LINE_HEIGHT` | `--gl-heading-2-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FIXED_MARGIN_BOTTOM` | `--gl-heading-2-fixed-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FIXED_MARGIN_TOP` | `--gl-heading-2-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FONT_SIZE` | `--gl-heading-2-font-size` | `clamp(1.3125rem, 0.8680555556rem + 0.92592592…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_FONT_WEIGHT` | `--gl-heading-2-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_LETTER_SPACING` | `--gl-heading-2-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_LINE_HEIGHT` | `--gl-heading-2-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_MARGIN_BOTTOM` | `--gl-heading-2-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_2_MARGIN_TOP` | `--gl-heading-2-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_COLOR` | `--gl-heading-3-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FIXED_COLOR` | `--gl-heading-3-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FIXED_FONT_SIZE` | `--gl-heading-3-fixed-font-size` | `1.125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FIXED_FONT_WEIGHT` | `--gl-heading-3-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FIXED_LETTER_SPACING` | `--gl-heading-3-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FIXED_LINE_HEIGHT` | `--gl-heading-3-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FIXED_MARGIN_BOTTOM` | `--gl-heading-3-fixed-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FIXED_MARGIN_TOP` | `--gl-heading-3-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FONT_SIZE` | `--gl-heading-3-font-size` | `clamp(1.125rem, 0.9027777778rem + 0.462962963…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_FONT_WEIGHT` | `--gl-heading-3-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_LETTER_SPACING` | `--gl-heading-3-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_LINE_HEIGHT` | `--gl-heading-3-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_MARGIN_BOTTOM` | `--gl-heading-3-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_3_MARGIN_TOP` | `--gl-heading-3-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_COLOR` | `--gl-heading-4-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FIXED_COLOR` | `--gl-heading-4-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FIXED_FONT_SIZE` | `--gl-heading-4-fixed-font-size` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FIXED_FONT_WEIGHT` | `--gl-heading-4-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FIXED_LETTER_SPACING` | `--gl-heading-4-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FIXED_LINE_HEIGHT` | `--gl-heading-4-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FIXED_MARGIN_BOTTOM` | `--gl-heading-4-fixed-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FIXED_MARGIN_TOP` | `--gl-heading-4-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FONT_SIZE` | `--gl-heading-4-font-size` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_FONT_WEIGHT` | `--gl-heading-4-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_LETTER_SPACING` | `--gl-heading-4-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_LINE_HEIGHT` | `--gl-heading-4-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_MARGIN_BOTTOM` | `--gl-heading-4-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_4_MARGIN_TOP` | `--gl-heading-4-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_COLOR` | `--gl-heading-5-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FIXED_COLOR` | `--gl-heading-5-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FIXED_FONT_SIZE` | `--gl-heading-5-fixed-font-size` | `0.875rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FIXED_FONT_WEIGHT` | `--gl-heading-5-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FIXED_LETTER_SPACING` | `--gl-heading-5-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FIXED_LINE_HEIGHT` | `--gl-heading-5-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FIXED_MARGIN_BOTTOM` | `--gl-heading-5-fixed-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FIXED_MARGIN_TOP` | `--gl-heading-5-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FONT_SIZE` | `--gl-heading-5-font-size` | `0.875rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_FONT_WEIGHT` | `--gl-heading-5-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_LETTER_SPACING` | `--gl-heading-5-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_LINE_HEIGHT` | `--gl-heading-5-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_MARGIN_BOTTOM` | `--gl-heading-5-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_5_MARGIN_TOP` | `--gl-heading-5-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_COLOR` | `--gl-heading-6-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FIXED_COLOR` | `--gl-heading-6-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FIXED_FONT_SIZE` | `--gl-heading-6-fixed-font-size` | `0.8125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FIXED_FONT_WEIGHT` | `--gl-heading-6-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FIXED_LETTER_SPACING` | `--gl-heading-6-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FIXED_LINE_HEIGHT` | `--gl-heading-6-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FIXED_MARGIN_BOTTOM` | `--gl-heading-6-fixed-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FIXED_MARGIN_TOP` | `--gl-heading-6-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FONT_SIZE` | `--gl-heading-6-font-size` | `0.8125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_FONT_WEIGHT` | `--gl-heading-6-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_LETTER_SPACING` | `--gl-heading-6-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_LINE_HEIGHT` | `--gl-heading-6-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_MARGIN_BOTTOM` | `--gl-heading-6-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_6_MARGIN_TOP` | `--gl-heading-6-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DEFAULT_MARGIN_BOTTOM` | `--gl-heading-default-margin-bottom` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DEFAULT_MARGIN_TOP` | `--gl-heading-default-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DISPLAY_COLOR` | `--gl-heading-display-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DISPLAY_FONT_SIZE` | `--gl-heading-display-font-size` | `clamp(1.75rem, 0.8611111111rem + 1.8518518519…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DISPLAY_FONT_WEIGHT` | `--gl-heading-display-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DISPLAY_LETTER_SPACING` | `--gl-heading-display-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DISPLAY_LINE_HEIGHT` | `--gl-heading-display-line-height` | `1.125` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DISPLAY_MARGIN_BOTTOM` | `--gl-heading-display-margin-bottom` | `1.5rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_DISPLAY_MARGIN_TOP` | `--gl-heading-display-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_COLOR` | `--gl-heading-scale-100-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FIXED_COLOR` | `--gl-heading-scale-100-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FIXED_FONT_SIZE` | `--gl-heading-scale-100-fixed-font-size` | `0.75rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FIXED_FONT_WEIGHT` | `--gl-heading-scale-100-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FIXED_LETTER_SPACING` | `--gl-heading-scale-100-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FIXED_LINE_HEIGHT` | `--gl-heading-scale-100-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FIXED_MARGIN_TOP` | `--gl-heading-scale-100-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FONT_SIZE` | `--gl-heading-scale-100-font-size` | `0.75rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_FONT_WEIGHT` | `--gl-heading-scale-100-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_LETTER_SPACING` | `--gl-heading-scale-100-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_LINE_HEIGHT` | `--gl-heading-scale-100-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_100_MARGIN_TOP` | `--gl-heading-scale-100-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_COLOR` | `--gl-heading-scale-200-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FIXED_COLOR` | `--gl-heading-scale-200-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FIXED_FONT_SIZE` | `--gl-heading-scale-200-fixed-font-size` | `0.8125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FIXED_FONT_WEIGHT` | `--gl-heading-scale-200-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FIXED_LETTER_SPACING` | `--gl-heading-scale-200-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FIXED_LINE_HEIGHT` | `--gl-heading-scale-200-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FIXED_MARGIN_TOP` | `--gl-heading-scale-200-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FONT_SIZE` | `--gl-heading-scale-200-font-size` | `0.8125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_FONT_WEIGHT` | `--gl-heading-scale-200-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_LETTER_SPACING` | `--gl-heading-scale-200-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_LINE_HEIGHT` | `--gl-heading-scale-200-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_200_MARGIN_TOP` | `--gl-heading-scale-200-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_COLOR` | `--gl-heading-scale-300-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FIXED_COLOR` | `--gl-heading-scale-300-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FIXED_FONT_SIZE` | `--gl-heading-scale-300-fixed-font-size` | `0.875rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FIXED_FONT_WEIGHT` | `--gl-heading-scale-300-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FIXED_LETTER_SPACING` | `--gl-heading-scale-300-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FIXED_LINE_HEIGHT` | `--gl-heading-scale-300-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FIXED_MARGIN_TOP` | `--gl-heading-scale-300-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FONT_SIZE` | `--gl-heading-scale-300-font-size` | `0.875rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_FONT_WEIGHT` | `--gl-heading-scale-300-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_LETTER_SPACING` | `--gl-heading-scale-300-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_LINE_HEIGHT` | `--gl-heading-scale-300-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_300_MARGIN_TOP` | `--gl-heading-scale-300-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_COLOR` | `--gl-heading-scale-400-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FIXED_COLOR` | `--gl-heading-scale-400-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FIXED_FONT_SIZE` | `--gl-heading-scale-400-fixed-font-size` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FIXED_FONT_WEIGHT` | `--gl-heading-scale-400-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FIXED_LETTER_SPACING` | `--gl-heading-scale-400-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FIXED_LINE_HEIGHT` | `--gl-heading-scale-400-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FIXED_MARGIN_TOP` | `--gl-heading-scale-400-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FONT_SIZE` | `--gl-heading-scale-400-font-size` | `1rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_FONT_WEIGHT` | `--gl-heading-scale-400-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_LETTER_SPACING` | `--gl-heading-scale-400-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_LINE_HEIGHT` | `--gl-heading-scale-400-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_400_MARGIN_TOP` | `--gl-heading-scale-400-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_COLOR` | `--gl-heading-scale-500-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FIXED_COLOR` | `--gl-heading-scale-500-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FIXED_FONT_SIZE` | `--gl-heading-scale-500-fixed-font-size` | `1.125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FIXED_FONT_WEIGHT` | `--gl-heading-scale-500-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FIXED_LETTER_SPACING` | `--gl-heading-scale-500-fixed-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FIXED_LINE_HEIGHT` | `--gl-heading-scale-500-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FIXED_MARGIN_TOP` | `--gl-heading-scale-500-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FONT_SIZE` | `--gl-heading-scale-500-font-size` | `clamp(1.125rem, 0.9027777778rem + 0.462962963…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_FONT_WEIGHT` | `--gl-heading-scale-500-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_LETTER_SPACING` | `--gl-heading-scale-500-letter-spacing` | `inherit` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_LINE_HEIGHT` | `--gl-heading-scale-500-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_500_MARGIN_TOP` | `--gl-heading-scale-500-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_COLOR` | `--gl-heading-scale-600-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FIXED_COLOR` | `--gl-heading-scale-600-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FIXED_FONT_SIZE` | `--gl-heading-scale-600-fixed-font-size` | `1.3125rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FIXED_FONT_WEIGHT` | `--gl-heading-scale-600-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FIXED_LETTER_SPACING` | `--gl-heading-scale-600-fixed-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FIXED_LINE_HEIGHT` | `--gl-heading-scale-600-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FIXED_MARGIN_TOP` | `--gl-heading-scale-600-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FONT_SIZE` | `--gl-heading-scale-600-font-size` | `clamp(1.3125rem, 0.8680555556rem + 0.92592592…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_FONT_WEIGHT` | `--gl-heading-scale-600-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_LETTER_SPACING` | `--gl-heading-scale-600-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_LINE_HEIGHT` | `--gl-heading-scale-600-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_600_MARGIN_TOP` | `--gl-heading-scale-600-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_COLOR` | `--gl-heading-scale-700-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FIXED_COLOR` | `--gl-heading-scale-700-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FIXED_FONT_SIZE` | `--gl-heading-scale-700-fixed-font-size` | `1.5rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FIXED_FONT_WEIGHT` | `--gl-heading-scale-700-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FIXED_LETTER_SPACING` | `--gl-heading-scale-700-fixed-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FIXED_LINE_HEIGHT` | `--gl-heading-scale-700-fixed-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FIXED_MARGIN_TOP` | `--gl-heading-scale-700-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FONT_SIZE` | `--gl-heading-scale-700-font-size` | `clamp(1.5rem, 0.8333333333rem + 1.3888888889v…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_FONT_WEIGHT` | `--gl-heading-scale-700-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_LETTER_SPACING` | `--gl-heading-scale-700-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_LINE_HEIGHT` | `--gl-heading-scale-700-line-height` | `1.25` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_700_MARGIN_TOP` | `--gl-heading-scale-700-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_COLOR` | `--gl-heading-scale-800-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FIXED_COLOR` | `--gl-heading-scale-800-fixed-color` | `#18171d` | color | `#fff` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FIXED_FONT_SIZE` | `--gl-heading-scale-800-fixed-font-size` | `1.75rem` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FIXED_FONT_WEIGHT` | `--gl-heading-scale-800-fixed-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FIXED_LETTER_SPACING` | `--gl-heading-scale-800-fixed-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FIXED_LINE_HEIGHT` | `--gl-heading-scale-800-fixed-line-height` | `1.125` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FIXED_MARGIN_TOP` | `--gl-heading-scale-800-fixed-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FONT_SIZE` | `--gl-heading-scale-800-font-size` | `clamp(1.75rem, 0.8611111111rem + 1.8518518519…` | string | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_FONT_WEIGHT` | `--gl-heading-scale-800-font-weight` | `600` | fontWeight | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_LETTER_SPACING` | `--gl-heading-scale-800-letter-spacing` | `-0.01em` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_LINE_HEIGHT` | `--gl-heading-scale-800-line-height` | `1.125` | number | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |
| `GL_HEADING_SCALE_800_MARGIN_TOP` | `--gl-heading-scale-800-margin-top` | `0px` | dimension | `—` | 标题 1–6 与 heading-scale 的字号/字重/颜色/间距 |

## `FONT` 族

> 字体族、字号、字重、行高、字距

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_FONT_FAMILY_MONOSPACE` | `--gl-font-family-monospace` | `["var(--default-mono-font, 'GitLab Mono')", "…` | string | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_FAMILY_REGULAR` | `--gl-font-family-regular` | `["var(--default-regular-font, 'GitLab Sans')"…` | string | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_100` | `--gl-font-size-100` | `0.75rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_100_FIXED` | `--gl-font-size-100-fixed` | `0.75rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_200` | `--gl-font-size-200` | `0.8125rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_200_FIXED` | `--gl-font-size-200-fixed` | `0.8125rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_300` | `--gl-font-size-300` | `0.875rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_300_FIXED` | `--gl-font-size-300-fixed` | `0.875rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_400` | `--gl-font-size-400` | `1rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_400_FIXED` | `--gl-font-size-400-fixed` | `1rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_500` | `--gl-font-size-500` | `clamp(1.125rem, 0.9027777778rem + 0.462962963…` | string | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_500_FIXED` | `--gl-font-size-500-fixed` | `1.125rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_600` | `--gl-font-size-600` | `clamp(1.3125rem, 0.8680555556rem + 0.92592592…` | string | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_600_FIXED` | `--gl-font-size-600-fixed` | `1.3125rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_700` | `--gl-font-size-700` | `clamp(1.5rem, 0.8333333333rem + 1.3888888889v…` | string | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_700_FIXED` | `--gl-font-size-700-fixed` | `1.5rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_800` | `--gl-font-size-800` | `clamp(1.75rem, 0.8611111111rem + 1.8518518519…` | string | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_800_FIXED` | `--gl-font-size-800-fixed` | `1.75rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_BASE` | `--gl-font-size-base` | `0.875rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_LG` | `--gl-font-size-lg` | `1rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_MD` | `--gl-font-size-md` | `0.875rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_SM` | `--gl-font-size-sm` | `0.75rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_SIZE_XS` | `--gl-font-size-xs` | `0.625rem` | dimension | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_WEIGHT_100` | `--gl-font-weight-100` | `100` | fontWeight | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_WEIGHT_300` | `--gl-font-weight-300` | `300` | fontWeight | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_WEIGHT_BOLD` | `--gl-font-weight-bold` | `600` | fontWeight | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_WEIGHT_HEADING` | `--gl-font-weight-heading` | `600` | fontWeight | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_WEIGHT_NORMAL` | `--gl-font-weight-normal` | `400` | fontWeight | `—` | 字体族、字号、字重、行高、字距 |
| `GL_FONT_WEIGHT_SEMIBOLD` | `--gl-font-weight-semibold` | `500` | fontWeight | `—` | 字体族、字号、字重、行高、字距 |

## `TEXT` 族

> 文本颜色（strong/default/subtle/disabled 等）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_TEXT_COLOR_DANGER` | `--gl-text-color-danger` | `#c02f12` | color | `#f6806d` | 文本颜色 · 危险 |
| `GL_TEXT_COLOR_DEFAULT` | `--gl-text-color-default` | `#3a383d` | color | `#ecebea` | 文本颜色 · 默认态 |
| `GL_TEXT_COLOR_DISABLED` | `--gl-text-color-disabled` | `#8a8888` | color | `—` | 文本颜色 · 禁用态 |
| `GL_TEXT_COLOR_HEADING` | `--gl-text-color-heading` | `#18171d` | color | `#fff` | 文本颜色（strong/default/subtle/disabled 等） |
| `GL_TEXT_COLOR_LINK` | `--gl-text-color-link` | `#2f5ca0` | color | `#9dc7f1` | 文本颜色（strong/default/subtle/disabled 等） |
| `GL_TEXT_COLOR_STRONG` | `--gl-text-color-strong` | `#18171d` | color | `#fff` | 文本颜色 · 强调 |
| `GL_TEXT_COLOR_SUBTLE` | `--gl-text-color-subtle` | `#646163` | color | `#c1bfbe` | 文本颜色 · 弱化/次强调 |
| `GL_TEXT_COLOR_SUCCESS` | `--gl-text-color-success` | `#2f7549` | color | `#52b87a` | 文本颜色 · 成功 |
| `GL_TEXT_COLOR_WARNING` | `--gl-text-color-warning` | `#995715` | color | `#d99530` | 文本颜色 · 警告 |
| `GL_TEXT_PRIMARY` | `--gl-text-primary` | `#3a383d` | color | `#ecebea` | 文本颜色（strong/default/subtle/disabled 等） |
| `GL_TEXT_SECONDARY` | `--gl-text-secondary` | `#646163` | color | `#c1bfbe` | 文本颜色（strong/default/subtle/disabled 等） |
| `GL_TEXT_TERTIARY` | `--gl-text-tertiary` | `#8a8888` | color | `—` | 文本颜色（strong/default/subtle/disabled 等） |

## `BORDER` 族

> 边框颜色语义（default/subtle/strong/section）与圆角尺

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_BORDER_COLOR_DEFAULT` | `--gl-border-color-default` | `#dcdbd9` | color | `#4d4b4e` | 边框颜色语义 · 默认态 |
| `GL_BORDER_COLOR_SECTION` | `--gl-border-color-section` | `#dcdbd9` | color | `#18171d` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_COLOR_STRONG` | `--gl-border-color-strong` | `#c1bfbe` | color | `#646163` | 边框颜色语义 · 强调 |
| `GL_BORDER_COLOR_SUBTLE` | `--gl-border-color-subtle` | `#ecebea` | color | `#3a383d` | 边框颜色语义 · 弱化/次强调 |
| `GL_BORDER_COLOR_TRANSPARENT` | `--gl-border-color-transparent` | `rgba(0, 0, 0, 0)` | color | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_2XL` | `--gl-border-radius-2xl` | `1rem` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_3XL` | `--gl-border-radius-3xl` | `1.5rem` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_DEFAULT` | `--gl-border-radius-default` | `0.25rem` | dimension | `—` | 边框颜色语义 · 默认态 |
| `GL_BORDER_RADIUS_FULL` | `--gl-border-radius-full` | `9999px` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_LG` | `--gl-border-radius-lg` | `0.5rem` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_MD` | `--gl-border-radius-md` | `0.25rem` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_NONE` | `--gl-border-radius-none` | `0px` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_SM` | `--gl-border-radius-sm` | `0.125rem` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_XL` | `--gl-border-radius-xl` | `0.75rem` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |
| `GL_BORDER_RADIUS_XS` | `--gl-border-radius-xs` | `1px` | dimension | `—` | 边框颜色语义（default/subtle/strong/section）与圆角尺 |

## `SPACING` 族

> 间距尺度（24/16/8/4/2 等增量）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_SPACING_SCALE_0` | `--gl-spacing-scale-0` | `0px` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_1` | `--gl-spacing-scale-1` | `0.125rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_10` | `--gl-spacing-scale-10` | `3.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_11` | `--gl-spacing-scale-11` | `4rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_11_5` | `--gl-spacing-scale-11-5` | `4.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_12` | `--gl-spacing-scale-12` | `5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_13` | `--gl-spacing-scale-13` | `6rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_15` | `--gl-spacing-scale-15` | `7.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_18` | `--gl-spacing-scale-18` | `9rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_2` | `--gl-spacing-scale-2` | `0.25rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_20` | `--gl-spacing-scale-20` | `10rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_26` | `--gl-spacing-scale-26` | `13rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_28` | `--gl-spacing-scale-28` | `14rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_2_5` | `--gl-spacing-scale-2-5` | `0.375rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_3` | `--gl-spacing-scale-3` | `0.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_30` | `--gl-spacing-scale-30` | `15rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_31` | `--gl-spacing-scale-31` | `15.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_33` | `--gl-spacing-scale-33` | `16.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_34` | `--gl-spacing-scale-34` | `17rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_37` | `--gl-spacing-scale-37` | `18.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_4` | `--gl-spacing-scale-4` | `0.75rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_48` | `--gl-spacing-scale-48` | `24rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_5` | `--gl-spacing-scale-5` | `1rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_6` | `--gl-spacing-scale-6` | `1.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_62` | `--gl-spacing-scale-62` | `31rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_7` | `--gl-spacing-scale-7` | `2rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_75` | `--gl-spacing-scale-75` | `37.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_8` | `--gl-spacing-scale-8` | `2.5rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_80` | `--gl-spacing-scale-80` | `40rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_88` | `--gl-spacing-scale-88` | `44rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_9` | `--gl-spacing-scale-9` | `3rem` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |
| `GL_SPACING_SCALE_PX` | `--gl-spacing-scale-px` | `1px` | dimension | `—` | 间距尺度（24/16/8/4/2 等增量） |

## `FEEDBACK` 族

> 表单反馈与校验颜色（success/warning/danger/info 图标色）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_FEEDBACK_BORDER_RADIUS` | `--gl-feedback-border-radius` | `0.5rem` | dimension | `—` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_BRAND_BACKGROUND_COLOR` | `--gl-feedback-brand-background-color` | `#f4f0ff` | color | `#27243e` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_BRAND_BORDER_COLOR` | `--gl-feedback-brand-border-color` | `#cbbbf2` | color | `#6a4fb4` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_BRAND_ICON_COLOR` | `--gl-feedback-brand-icon-color` | `#6a4fb4` | color | `#cbbbf2` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_BRAND_TEXT_COLOR` | `--gl-feedback-brand-text-color` | `#5c47a6` | color | `#cbbbf2` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_DANGER_BACKGROUND_COLOR` | `--gl-feedback-danger-background-color` | `#fcf1ef` | color | `#582014` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_DANGER_BORDER_COLOR` | `--gl-feedback-danger-border-color` | `#dd2b0e` | color | `#f6806d` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_DANGER_ICON_COLOR` | `--gl-feedback-danger-icon-color` | `#c02f12` | color | `#fcb5aa` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_DANGER_TEXT_COLOR` | `--gl-feedback-danger-text-color` | `#a32c12` | color | `#fcb5aa` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_INFO_BACKGROUND_COLOR` | `--gl-feedback-info-background-color` | `#e9f3fc` | color | `#1d283e` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_INFO_BORDER_COLOR` | `--gl-feedback-info-border-color` | `#9dc7f1` | color | `#2f68b4` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_INFO_ICON_COLOR` | `--gl-feedback-info-icon-color` | `#2f68b4` | color | `#9dc7f1` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_INFO_TEXT_COLOR` | `--gl-feedback-info-text-color` | `#2f5ca0` | color | `#9dc7f1` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_NEUTRAL_BACKGROUND_COLOR` | `--gl-feedback-neutral-background-color` | `#ecebea` | color | `#28272d` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_NEUTRAL_BORDER_COLOR` | `--gl-feedback-neutral-border-color` | `#c1bfbe` | color | `#646163` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_NEUTRAL_ICON_COLOR` | `--gl-feedback-neutral-icon-color` | `#646163` | color | `#c1bfbe` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_NEUTRAL_TEXT_COLOR` | `--gl-feedback-neutral-text-color` | `#4d4b4e` | color | `#c1bfbe` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_STRONG_BACKGROUND_COLOR` | `--gl-feedback-strong-background-color` | `#3a383d` | color | `—` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_STRONG_BORDER_COLOR` | `--gl-feedback-strong-border-color` | `#050408` | color | `#a5a3a3` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_STRONG_ICON_COLOR` | `--gl-feedback-strong-icon-color` | `#fff` | color | `—` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_STRONG_LINK_COLOR` | `--gl-feedback-strong-link-color` | `#63a6e9` | color | `—` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_STRONG_TEXT_COLOR` | `--gl-feedback-strong-text-color` | `#fff` | color | `—` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_SUCCESS_BACKGROUND_COLOR` | `--gl-feedback-success-background-color` | `#ecf4ee` | color | `#1e3e28` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_SUCCESS_BORDER_COLOR` | `--gl-feedback-success-border-color` | `#91d4a8` | color | `#2f7549` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_SUCCESS_ICON_COLOR` | `--gl-feedback-success-icon-color` | `#2f7549` | color | `#91d4a8` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_SUCCESS_TEXT_COLOR` | `--gl-feedback-success-text-color` | `#306440` | color | `#91d4a8` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_WARNING_BACKGROUND_COLOR` | `--gl-feedback-warning-background-color` | `#fdf1dd` | color | `#532e16` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_WARNING_BORDER_COLOR` | `--gl-feedback-warning-border-color` | `#e9be74` | color | `#995715` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_WARNING_ICON_COLOR` | `--gl-feedback-warning-icon-color` | `#995715` | color | `#e9be74` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |
| `GL_FEEDBACK_WARNING_TEXT_COLOR` | `--gl-feedback-warning-text-color` | `#894b16` | color | `#e9be74` | 表单反馈与校验颜色（success/warning/danger/info 图标色） |

## `LINK` 族

> 链接文字颜色（default/hover/disabled）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_LINK_MENTION_BACKGROUND_COLOR_CURRENT` | `--gl-link-mention-background-color-current` | `#f5d9a8` | color | `#693c14` | 链接文字颜色（default/hover/disabled） |
| `GL_LINK_MENTION_BACKGROUND_COLOR_DEFAULT` | `--gl-link-mention-background-color-default` | `#cbe2f9` | color | `#284779` | 链接文字颜色 · 默认态 |
| `GL_LINK_MENTION_TEXT_COLOR_CURRENT` | `--gl-link-mention-text-color-current` | `#693c14` | color | `#f5d9a8` | 链接文字颜色（default/hover/disabled） |
| `GL_LINK_MENTION_TEXT_COLOR_DEFAULT` | `--gl-link-mention-text-color-default` | `#284779` | color | `#cbe2f9` | 链接文字颜色 · 默认态 |

## `SHADOW` 族

> 阴影（颜色与强度）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_SHADOW_COLOR_DEFAULT` | `--gl-shadow-color-default` | `rgba(5, 5, 6, 0.16)` | color | `rgba(5, 5, 6, 0.4)` | 阴影 · 默认态 |
| `GL_SHADOW_LG` | `--gl-shadow-lg` | `[{'color': 'rgba(5, 5, 6, 0.16)', 'offsetX': …` | string | `[{'color': 'rgba(5, 5, 6, 0.4)', 'offsetX': 0…` | 阴影（颜色与强度） |
| `GL_SHADOW_MD` | `--gl-shadow-md` | `[{'color': 'rgba(5, 5, 6, 0.16)', 'offsetX': …` | string | `[{'color': 'rgba(5, 5, 6, 0.4)', 'offsetX': 0…` | 阴影（颜色与强度） |
| `GL_SHADOW_SM` | `--gl-shadow-sm` | `[{'color': 'rgba(5, 5, 6, 0.16)', 'offsetX': …` | string | `[{'color': 'rgba(5, 5, 6, 0.4)', 'offsetX': 0…` | 阴影（颜色与强度） |

## `FOCUS` 族

> 焦点环颜色（内圈/外圈）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_FOCUS_RING_INNER_COLOR` | `--gl-focus-ring-inner-color` | `#fff` | color | `#18171d` | 焦点环颜色（内圈/外圈） |
| `GL_FOCUS_RING_OUTER_COLOR` | `--gl-focus-ring-outer-color` | `#1f75cb` | color | `#428fdc` | 焦点环颜色（内圈/外圈） |

## `STATUS` 族

> 状态指示色（success/warning/danger/neutral/notice）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_STATUS_BRAND_BACKGROUND_COLOR` | `--gl-status-brand-background-color` | `#e1d8f9` | color | `#342d59` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_BRAND_ICON_COLOR` | `--gl-status-brand-icon-color` | `#7b58cf` | color | `—` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_BRAND_TEXT_COLOR` | `--gl-status-brand-text-color` | `#5c47a6` | color | `#ac93e6` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_DANGER_BACKGROUND_COLOR` | `--gl-status-danger-background-color` | `#fdd4cd` | color | `#812713` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_DANGER_ICON_COLOR` | `--gl-status-danger-icon-color` | `#dd2b0e` | color | `#f6806d` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_DANGER_TEXT_COLOR` | `--gl-status-danger-text-color` | `#a32c12` | color | `#fcb5aa` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_INFO_BACKGROUND_COLOR` | `--gl-status-info-background-color` | `#cbe2f9` | color | `#284779` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_INFO_ICON_COLOR` | `--gl-status-info-icon-color` | `#1f75cb` | color | `#63a6e9` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_INFO_TEXT_COLOR` | `--gl-status-info-text-color` | `#2f5ca0` | color | `#9dc7f1` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_NEUTRAL_BACKGROUND_COLOR` | `--gl-status-neutral-background-color` | `#dcdbd9` | color | `#3a383d` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_NEUTRAL_ICON_COLOR` | `--gl-status-neutral-icon-color` | `#747273` | color | `#a5a3a3` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_NEUTRAL_TEXT_COLOR` | `--gl-status-neutral-text-color` | `#4d4b4e` | color | `#c1bfbe` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_SUCCESS_BACKGROUND_COLOR` | `--gl-status-success-background-color` | `#c3e6cd` | color | `#225131` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_SUCCESS_ICON_COLOR` | `--gl-status-success-icon-color` | `#108548` | color | `#52b87a` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_SUCCESS_TEXT_COLOR` | `--gl-status-success-text-color` | `#306440` | color | `#91d4a8` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_WARNING_BACKGROUND_COLOR` | `--gl-status-warning-background-color` | `#f5d9a8` | color | `#693c14` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_WARNING_ICON_COLOR` | `--gl-status-warning-icon-color` | `#ab6100` | color | `#d99530` | 状态指示色（success/warning/danger/neutral/notice） |
| `GL_STATUS_WARNING_TEXT_COLOR` | `--gl-status-warning-text-color` | `#894b16` | color | `#e9be74` | 状态指示色（success/warning/danger/neutral/notice） |

## `ICON` 族

> 图标尺寸与配色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_ICON_COLOR_DANGER` | `--gl-icon-color-danger` | `#c02f12` | color | `#f6806d` | 图标尺寸与配色 · 危险 |
| `GL_ICON_COLOR_DEFAULT` | `--gl-icon-color-default` | `#3a383d` | color | `#ecebea` | 图标尺寸与配色 · 默认态 |
| `GL_ICON_COLOR_DISABLED` | `--gl-icon-color-disabled` | `#8a8888` | color | `—` | 图标尺寸与配色 · 禁用态 |
| `GL_ICON_COLOR_INFO` | `--gl-icon-color-info` | `#2f5ca0` | color | `#9dc7f1` | 图标尺寸与配色 · 信息 |
| `GL_ICON_COLOR_LINK` | `--gl-icon-color-link` | `#2f5ca0` | color | `#9dc7f1` | 图标尺寸与配色 |
| `GL_ICON_COLOR_STRONG` | `--gl-icon-color-strong` | `#18171d` | color | `#fff` | 图标尺寸与配色 · 强调 |
| `GL_ICON_COLOR_SUBTLE` | `--gl-icon-color-subtle` | `#646163` | color | `#c1bfbe` | 图标尺寸与配色 · 弱化/次强调 |
| `GL_ICON_COLOR_SUCCESS` | `--gl-icon-color-success` | `#2f7549` | color | `#52b87a` | 图标尺寸与配色 · 成功 |
| `GL_ICON_COLOR_WARNING` | `--gl-icon-color-warning` | `#995715` | color | `#d99530` | 图标尺寸与配色 · 警告 |

## `TOGGLE` 族

> 开关控件全部状态颜色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-background-color-checked-active` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-background-color-checked-default` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_DISABLED` | `--gl-toggle-switch-background-color-checked-disabled` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-background-color-checked-focus` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-background-color-checked-hover` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_DISABLED` | `--gl-toggle-switch-background-color-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-background-color-unchecked-active` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-background-color-unchecked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_DISABLED` | `--gl-toggle-switch-background-color-unchecked-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-background-color-unchecked-focus` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-background-color-unchecked-hover` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-icon-color-checked-active` | `#050408` | color | `#fff` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-icon-color-checked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-icon-color-checked-focus` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-icon-color-checked-hover` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_DISABLED` | `--gl-toggle-switch-icon-color-disabled` | `#ecebea` | color | `#28272d` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-icon-color-unchecked-active` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-icon-color-unchecked-default` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-icon-color-unchecked-focus` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-icon-color-unchecked-hover` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-track-border-color-checked-active` | `#050408` | color | `#fff` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-track-border-color-checked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_DISABLED` | `--gl-toggle-switch-track-border-color-checked-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-track-border-color-checked-focus` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-track-border-color-checked-hover` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_LOADING` | `--gl-toggle-switch-track-border-color-loading` | `#ecebea` | color | `#28272d` | 开关控件全部状态颜色 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-track-border-color-unchecked-active` | `#646163` | color | `#a5a3a3` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-track-border-color-unchecked-default` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_DISABLED` | `--gl-toggle-switch-track-border-color-unchecked-disabled` | `#dcdbd9` | color | `#3a383d` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-track-border-color-unchecked-focus` | `#646163` | color | `#a5a3a3` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-track-border-color-unchecked-hover` | `#646163` | color | `#a5a3a3` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-track-color-checked-active` | `#050408` | color | `#fff` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-track-color-checked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_DISABLED` | `--gl-toggle-switch-track-color-checked-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-track-color-checked-focus` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-track-color-checked-hover` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_LOADING` | `--gl-toggle-switch-track-color-loading` | `#ecebea` | color | `#28272d` | 开关控件全部状态颜色 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-track-color-unchecked-active` | `rgba(5, 5, 6, 0.16)` | color | `rgba(255, 255, 255, 0.08)` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-track-color-unchecked-default` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_DISABLED` | `--gl-toggle-switch-track-color-unchecked-disabled` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-track-color-unchecked-focus` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-track-color-unchecked-hover` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 悬停态 |

## `NAV` 族

> 导航（侧边栏/顶部图标容器背景与状态色）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_NAV_ITEM_BACKGROUND_COLOR_ACTIVE` | `--gl-nav-item-background-color-active` | `#c1bfbe` | color | `#18171d` | 导航 · 激活/按压态 |
| `GL_NAV_ITEM_BACKGROUND_COLOR_DEFAULT` | `--gl-nav-item-background-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 导航 · 默认态 |
| `GL_NAV_ITEM_BACKGROUND_COLOR_FOCUS` | `--gl-nav-item-background-color-focus` | `#dcdbd9` | color | `#28272d` | 导航 · 聚焦态 |
| `GL_NAV_ITEM_BACKGROUND_COLOR_HOVER` | `--gl-nav-item-background-color-hover` | `#dcdbd9` | color | `#28272d` | 导航 · 悬停态 |
| `GL_NAV_ITEM_BORDER_RADIUS` | `--gl-nav-item-border-radius` | `0.5rem` | dimension | `—` | 导航（侧边栏/顶部图标容器背景与状态色） |
| `GL_NAV_ITEM_FONT_SIZE` | `--gl-nav-item-font-size` | `0.875rem` | dimension | `—` | 导航（侧边栏/顶部图标容器背景与状态色） |
| `GL_NAV_ITEM_FONT_WEIGHT` | `--gl-nav-item-font-weight` | `425` | fontWeight | `—` | 导航（侧边栏/顶部图标容器背景与状态色） |
| `GL_NAV_ITEM_FOREGROUND_COLOR_ACTIVE` | `--gl-nav-item-foreground-color-active` | `#18171d` | color | `#fff` | 导航 · 激活/按压态 |
| `GL_NAV_ITEM_FOREGROUND_COLOR_DEFAULT` | `--gl-nav-item-foreground-color-default` | `#646163` | color | `#c1bfbe` | 导航 · 默认态 |
| `GL_NAV_ITEM_FOREGROUND_COLOR_FOCUS` | `--gl-nav-item-foreground-color-focus` | `#18171d` | color | `#fff` | 导航 · 聚焦态 |
| `GL_NAV_ITEM_FOREGROUND_COLOR_HOVER` | `--gl-nav-item-foreground-color-hover` | `#18171d` | color | `#fff` | 导航 · 悬停态 |
| `GL_NAV_ITEM_SELECTED_BACKGROUND_COLOR_ACTIVE` | `--gl-nav-item-selected-background-color-active` | `#c1bfbe` | color | `#18171d` | 导航 · 激活/按压态 |
| `GL_NAV_ITEM_SELECTED_BACKGROUND_COLOR_DEFAULT` | `--gl-nav-item-selected-background-color-default` | `#dcdbd9` | color | `#28272d` | 导航 · 默认态 |
| `GL_NAV_ITEM_SELECTED_BACKGROUND_COLOR_FOCUS` | `--gl-nav-item-selected-background-color-focus` | `#dcdbd9` | color | `#28272d` | 导航 · 聚焦态 |
| `GL_NAV_ITEM_SELECTED_BACKGROUND_COLOR_HOVER` | `--gl-nav-item-selected-background-color-hover` | `#dcdbd9` | color | `#28272d` | 导航 · 悬停态 |
| `GL_NAV_ITEM_SELECTED_FONT_WEIGHT` | `--gl-nav-item-selected-font-weight` | `600` | fontWeight | `—` | 导航（侧边栏/顶部图标容器背景与状态色） |
| `GL_NAV_ITEM_SELECTED_FOREGROUND_COLOR_ACTIVE` | `--gl-nav-item-selected-foreground-color-active` | `#18171d` | color | `#fff` | 导航 · 激活/按压态 |
| `GL_NAV_ITEM_SELECTED_FOREGROUND_COLOR_DEFAULT` | `--gl-nav-item-selected-foreground-color-default` | `#18171d` | color | `#fff` | 导航 · 默认态 |
| `GL_NAV_ITEM_SELECTED_FOREGROUND_COLOR_FOCUS` | `--gl-nav-item-selected-foreground-color-focus` | `#18171d` | color | `#fff` | 导航 · 聚焦态 |
| `GL_NAV_ITEM_SELECTED_FOREGROUND_COLOR_HOVER` | `--gl-nav-item-selected-foreground-color-hover` | `#18171d` | color | `#fff` | 导航 · 悬停态 |

## `AVATAR` 族

> 头像（尺寸、边框、身份标识颜色）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_AVATAR_BORDER_COLOR_DEFAULT` | `--gl-avatar-border-color-default` | `rgba(5, 5, 6, 0.08)` | color | `rgba(255, 255, 255, 0.08)` | 头像 · 默认态 |
| `GL_AVATAR_BORDER_COLOR_HOVER` | `--gl-avatar-border-color-hover` | `rgba(5, 5, 6, 0.24)` | color | `rgba(255, 255, 255, 0.24)` | 头像 · 悬停态 |
| `GL_AVATAR_CIRCLE_BORDER_RADIUS_DEFAULT` | `--gl-avatar-circle-border-radius-default` | `9999px` | dimension | `—` | 头像 · 默认态 |
| `GL_AVATAR_FALLBACK_BACKGROUND_COLOR_BLUE` | `--gl-avatar-fallback-background-color-blue` | `rgba(157, 199, 241, 0.23921568627450981)` | color | `—` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_BACKGROUND_COLOR_GREEN` | `--gl-avatar-fallback-background-color-green` | `rgba(145, 212, 168, 0.23921568627450981)` | color | `—` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_BACKGROUND_COLOR_NEUTRAL` | `--gl-avatar-fallback-background-color-neutral` | `rgba(191, 191, 195, 0.23921568627450981)` | color | `—` | 头像 · 中性 |
| `GL_AVATAR_FALLBACK_BACKGROUND_COLOR_ORANGE` | `--gl-avatar-fallback-background-color-orange` | `rgba(233, 190, 116, 0.23921568627450981)` | color | `—` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_BACKGROUND_COLOR_PURPLE` | `--gl-avatar-fallback-background-color-purple` | `rgba(203, 187, 242, 0.23921568627450981)` | color | `—` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_BACKGROUND_COLOR_RED` | `--gl-avatar-fallback-background-color-red` | `rgba(252, 181, 170, 0.23921568627450981)` | color | `—` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_TEXT_COLOR_BLUE` | `--gl-avatar-fallback-text-color-blue` | `#284779` | color | `#9dc7f1` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_TEXT_COLOR_GREEN` | `--gl-avatar-fallback-text-color-green` | `#225131` | color | `#91d4a8` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_TEXT_COLOR_NEUTRAL` | `--gl-avatar-fallback-text-color-neutral` | `#3a383d` | color | `#c1bfbe` | 头像 · 中性 |
| `GL_AVATAR_FALLBACK_TEXT_COLOR_ORANGE` | `--gl-avatar-fallback-text-color-orange` | `#693c14` | color | `#e9be74` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_TEXT_COLOR_PURPLE` | `--gl-avatar-fallback-text-color-purple` | `#493c83` | color | `#cbbbf2` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_FALLBACK_TEXT_COLOR_RED` | `--gl-avatar-fallback-text-color-red` | `#812713` | color | `#fcb5aa` | 头像（尺寸、边框、身份标识颜色） |
| `GL_AVATAR_SQUARE_BORDER_RADIUS_DEFAULT` | `--gl-avatar-square-border-radius-default` | `0.25rem` | dimension | `—` | 头像 · 默认态 |
| `GL_AVATAR_SQUARE_BORDER_RADIUS_LG` | `--gl-avatar-square-border-radius-lg` | `0.5rem` | dimension | `—` | 头像（尺寸、边框、身份标识颜色） |

## `LABEL` 族

> 标签组件（配色与尺寸）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_LABEL_DARK_BUTTON_BACKGROUND_COLOR_DEFAULT` | `--gl-label-dark-button-background-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 标签组件 · 默认态 |
| `GL_LABEL_DARK_BUTTON_BACKGROUND_COLOR_HOVER` | `--gl-label-dark-button-background-color-hover` | `#fff` | color | `—` | 标签组件 · 悬停态 |
| `GL_LABEL_DARK_BUTTON_ICON_COLOR_DEFAULT` | `--gl-label-dark-button-icon-color-default` | `#fff` | color | `—` | 标签组件 · 默认态 |
| `GL_LABEL_DARK_TEXT_COLOR` | `--gl-label-dark-text-color` | `#fff` | color | `—` | 标签组件（配色与尺寸） |
| `GL_LABEL_LIGHT_BUTTON_BACKGROUND_COLOR_DEFAULT` | `--gl-label-light-button-background-color-default` | `rgba(0, 0, 0, 0)` | color | `—` | 标签组件 · 默认态 |
| `GL_LABEL_LIGHT_BUTTON_BACKGROUND_COLOR_HOVER` | `--gl-label-light-button-background-color-hover` | `#18171d` | color | `—` | 标签组件 · 悬停态 |
| `GL_LABEL_LIGHT_BUTTON_ICON_COLOR_DEFAULT` | `--gl-label-light-button-icon-color-default` | `#18171d` | color | `—` | 标签组件 · 默认态 |
| `GL_LABEL_LIGHT_TEXT_COLOR` | `--gl-label-light-text-color` | `#18171d` | color | `—` | 标签组件（配色与尺寸） |
| `GL_LABEL_SCOPED_BUTTON_BACKGROUND_COLOR_HOVER` | `--gl-label-scoped-button-background-color-hover` | `#18171d` | color | `#fff` | 标签组件 · 悬停态 |
| `GL_LABEL_SCOPED_BUTTON_ICON_COLOR_DEFAULT` | `--gl-label-scoped-button-icon-color-default` | `#18171d` | color | `#fff` | 标签组件 · 默认态 |
| `GL_LABEL_SCOPED_BUTTON_ICON_COLOR_HOVER` | `--gl-label-scoped-button-icon-color-hover` | `#fff` | color | `#18171d` | 标签组件 · 悬停态 |
| `GL_LABEL_SCOPED_TEXT_COLOR` | `--gl-label-scoped-text-color` | `#18171d` | color | `#fff` | 标签组件（配色与尺寸） |

## `TOGGLE` 族

> 开关控件全部状态颜色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-background-color-checked-active` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-background-color-checked-default` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_DISABLED` | `--gl-toggle-switch-background-color-checked-disabled` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-background-color-checked-focus` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-background-color-checked-hover` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_DISABLED` | `--gl-toggle-switch-background-color-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-background-color-unchecked-active` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-background-color-unchecked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_DISABLED` | `--gl-toggle-switch-background-color-unchecked-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-background-color-unchecked-focus` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_BACKGROUND_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-background-color-unchecked-hover` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-icon-color-checked-active` | `#050408` | color | `#fff` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-icon-color-checked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-icon-color-checked-focus` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-icon-color-checked-hover` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_DISABLED` | `--gl-toggle-switch-icon-color-disabled` | `#ecebea` | color | `#28272d` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-icon-color-unchecked-active` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-icon-color-unchecked-default` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-icon-color-unchecked-focus` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_ICON_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-icon-color-unchecked-hover` | `#fff` | color | `#18171d` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-track-border-color-checked-active` | `#050408` | color | `#fff` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-track-border-color-checked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_DISABLED` | `--gl-toggle-switch-track-border-color-checked-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-track-border-color-checked-focus` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-track-border-color-checked-hover` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_LOADING` | `--gl-toggle-switch-track-border-color-loading` | `#ecebea` | color | `#28272d` | 开关控件全部状态颜色 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-track-border-color-unchecked-active` | `#646163` | color | `#a5a3a3` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-track-border-color-unchecked-default` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_DISABLED` | `--gl-toggle-switch-track-border-color-unchecked-disabled` | `#dcdbd9` | color | `#3a383d` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-track-border-color-unchecked-focus` | `#646163` | color | `#a5a3a3` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_BORDER_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-track-border-color-unchecked-hover` | `#646163` | color | `#a5a3a3` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_ACTIVE` | `--gl-toggle-switch-track-color-checked-active` | `#050408` | color | `#fff` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_DEFAULT` | `--gl-toggle-switch-track-color-checked-default` | `#3a383d` | color | `#ecebea` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_DISABLED` | `--gl-toggle-switch-track-color-checked-disabled` | `#8a8888` | color | `#747273` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_FOCUS` | `--gl-toggle-switch-track-color-checked-focus` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_CHECKED_HOVER` | `--gl-toggle-switch-track-color-checked-hover` | `#18171d` | color | `#f7f7f5` | 开关控件全部状态颜色 · 悬停态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_LOADING` | `--gl-toggle-switch-track-color-loading` | `#ecebea` | color | `#28272d` | 开关控件全部状态颜色 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_ACTIVE` | `--gl-toggle-switch-track-color-unchecked-active` | `rgba(5, 5, 6, 0.16)` | color | `rgba(255, 255, 255, 0.08)` | 开关控件全部状态颜色 · 激活/按压态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_DEFAULT` | `--gl-toggle-switch-track-color-unchecked-default` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 默认态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_DISABLED` | `--gl-toggle-switch-track-color-unchecked-disabled` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 禁用态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_FOCUS` | `--gl-toggle-switch-track-color-unchecked-focus` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 聚焦态 |
| `GL_TOGGLE_SWITCH_TRACK_COLOR_UNCHECKED_HOVER` | `--gl-toggle-switch-track-color-unchecked-hover` | `#fff` | color | `rgba(5, 5, 6, 0.4)` | 开关控件全部状态颜色 · 悬停态 |

## `PROGRESS` 族

> 进度条颜色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_PROGRESS_BAR_INDICATOR_COLOR_DANGER` | `--gl-progress-bar-indicator-color-danger` | `#dd2b0e` | color | `#f6806d` | 进度条颜色 · 危险 |
| `GL_PROGRESS_BAR_INDICATOR_COLOR_DEFAULT` | `--gl-progress-bar-indicator-color-default` | `#1f75cb` | color | `#63a6e9` | 进度条颜色 · 默认态 |
| `GL_PROGRESS_BAR_INDICATOR_COLOR_SUCCESS` | `--gl-progress-bar-indicator-color-success` | `#108548` | color | `#52b87a` | 进度条颜色 · 成功 |
| `GL_PROGRESS_BAR_INDICATOR_COLOR_WARNING` | `--gl-progress-bar-indicator-color-warning` | `#ab6100` | color | `#d99530` | 进度条颜色 · 警告 |
| `GL_PROGRESS_BAR_TRACK_COLOR` | `--gl-progress-bar-track-color` | `#c1bfbe` | color | `#4d4b4e` | 进度条颜色 |

## `SPINNER` 族

> 加载指示器颜色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_SPINNER_SEGMENT_COLOR_DEFAULT` | `--gl-spinner-segment-color-default` | `#4d4b4e` | color | `#dcdbd9` | 加载指示器颜色 · 默认态 |
| `GL_SPINNER_SEGMENT_COLOR_LIGHT` | `--gl-spinner-segment-color-light` | `#c1bfbe` | color | `—` | 加载指示器颜色 |
| `GL_SPINNER_TRACK_COLOR_DEFAULT` | `--gl-spinner-track-color-default` | `#dcdbd9` | color | `#646163` | 加载指示器颜色 · 默认态 |
| `GL_SPINNER_TRACK_COLOR_LIGHT` | `--gl-spinner-track-color-light` | `#3a383d` | color | `—` | 加载指示器颜色 |

## `SKELETON` 族

> 骨架屏底色与闪烁色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_SKELETON_LOADER_BACKGROUND_COLOR` | `--gl-skeleton-loader-background-color` | `#dcdbd9` | color | `#3a383d` | 骨架屏底色与闪烁色 |
| `GL_SKELETON_LOADER_SHIMMER_COLOR` | `--gl-skeleton-loader-shimmer-color` | `#ecebea` | color | `#4d4b4e` | 骨架屏底色与闪烁色 |

## `ZINDEX` 族

> 层叠顺序（dropdown/modal/popover/tooltip 等）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_ZINDEX_0` | `--gl-zindex-0` | `0` | string | `—` | 层叠顺序（dropdown/modal/popover/tooltip 等） |
| `GL_ZINDEX_1` | `--gl-zindex-1` | `1` | string | `—` | 层叠顺序（dropdown/modal/popover/tooltip 等） |
| `GL_ZINDEX_2` | `--gl-zindex-2` | `2` | string | `—` | 层叠顺序（dropdown/modal/popover/tooltip 等） |
| `GL_ZINDEX_200` | `--gl-zindex-200` | `200` | string | `—` | 层叠顺序（dropdown/modal/popover/tooltip 等） |
| `GL_ZINDEX_3` | `--gl-zindex-3` | `3` | string | `—` | 层叠顺序（dropdown/modal/popover/tooltip 等） |
| `GL_ZINDEX_4` | `--gl-zindex-4` | `4` | string | `—` | 层叠顺序（dropdown/modal/popover/tooltip 等） |
| `GL_ZINDEX_9999` | `--gl-zindex-9999` | `9999` | string | `—` | 层叠顺序（dropdown/modal/popover/tooltip 等） |

## `OPACITY` 族

> 透明度量表

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_OPACITY_0` | `--gl-opacity-0` | `0` | string | `—` | 透明度量表 |
| `GL_OPACITY_1` | `--gl-opacity-1` | `.1` | string | `—` | 透明度量表 |
| `GL_OPACITY_10` | `--gl-opacity-10` | `1` | string | `—` | 透明度量表 |
| `GL_OPACITY_2` | `--gl-opacity-2` | `.2` | string | `—` | 透明度量表 |
| `GL_OPACITY_3` | `--gl-opacity-3` | `.3` | string | `—` | 透明度量表 |
| `GL_OPACITY_4` | `--gl-opacity-4` | `.4` | string | `—` | 透明度量表 |
| `GL_OPACITY_5` | `--gl-opacity-5` | `.5` | string | `—` | 透明度量表 |
| `GL_OPACITY_6` | `--gl-opacity-6` | `.6` | string | `—` | 透明度量表 |
| `GL_OPACITY_7` | `--gl-opacity-7` | `.7` | string | `—` | 透明度量表 |
| `GL_OPACITY_8` | `--gl-opacity-8` | `.8` | string | `—` | 透明度量表 |
| `GL_OPACITY_9` | `--gl-opacity-9` | `.9` | string | `—` | 透明度量表 |

## `BACKGROUND` 族

> 页面/应用背景色语义

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_BACKGROUND_COLOR_DEFAULT` | `--gl-background-color-default` | `#fff` | color | `#18171d` | 页面/应用背景色语义 · 默认态 |
| `GL_BACKGROUND_COLOR_DISABLED` | `--gl-background-color-disabled` | `#f7f7f5` | color | `#28272d` | 页面/应用背景色语义 · 禁用态 |
| `GL_BACKGROUND_COLOR_OVERLAP` | `--gl-background-color-overlap` | `#fff` | color | `#28272d` | 页面/应用背景色语义 |
| `GL_BACKGROUND_COLOR_OVERLAY` | `--gl-background-color-overlay` | `rgba(5, 5, 6, 0.24)` | color | `rgba(0, 0, 0, 0.64)` | 页面/应用背景色语义 |
| `GL_BACKGROUND_COLOR_SECTION` | `--gl-background-color-section` | `#fff` | color | `#3a383d` | 页面/应用背景色语义 |
| `GL_BACKGROUND_COLOR_STRONG` | `--gl-background-color-strong` | `#ecebea` | color | `#3a383d` | 页面/应用背景色语义 · 强调 |
| `GL_BACKGROUND_COLOR_SUBTLE` | `--gl-background-color-subtle` | `#f7f7f5` | color | `#28272d` | 页面/应用背景色语义 · 弱化/次强调 |

## `APPLICATION` 族

> 应用级全局背景色（页面画布底色）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_APPLICATION_CHROME_BACKGROUND_COLOR` | `--gl-application-chrome-background-color` | `#ecebea` | color | `#050408` | 应用级全局背景色（页面画布底色） |

## `BREADCRUMB` 族

> 面包屑分隔符颜色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_BREADCRUMB_SEPARATOR_COLOR` | `--gl-breadcrumb-separator-color` | `#8a8888` | color | `—` | 面包屑分隔符颜色 |

## `BROADCAST` 族

> 顶部系统公告条（成败/警告/消息类型）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_BLUE` | `--gl-broadcast-banner-background-color-blue` | `#235180` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_DARK` | `--gl-broadcast-banner-background-color-dark` | `#747273` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_GREEN` | `--gl-broadcast-banner-background-color-green` | `#1b653f` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_INDIGO` | `--gl-broadcast-banner-background-color-indigo` | `#41419f` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_LIGHT` | `--gl-broadcast-banner-background-color-light` | `#ecebea` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_LIGHTBLUE` | `--gl-broadcast-banner-background-color-lightblue` | `#4977a5` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_LIGHTGREEN` | `--gl-broadcast-banner-background-color-lightgreen` | `#308258` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_LIGHTINDIGO` | `--gl-broadcast-banner-background-color-lightindigo` | `#6666c4` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_LIGHTRED` | `--gl-broadcast-banner-background-color-lightred` | `#ad4a3b` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BACKGROUND_COLOR_RED` | `--gl-broadcast-banner-background-color-red` | `#8f2110` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_BLUE` | `--gl-broadcast-banner-border-color-blue` | `#0b2640` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_DARK` | `--gl-broadcast-banner-border-color-dark` | `#4d4b4e` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_GREEN` | `--gl-broadcast-banner-border-color-green` | `#0e4328` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_INDIGO` | `--gl-broadcast-banner-border-color-indigo` | `#222261` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_LIGHT` | `--gl-broadcast-banner-border-color-light` | `#dcdbd9` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_LIGHTBLUE` | `--gl-broadcast-banner-border-color-lightblue` | `#235180` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_LIGHTGREEN` | `--gl-broadcast-banner-border-color-lightgreen` | `#1b653f` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_LIGHTINDIGO` | `--gl-broadcast-banner-border-color-lightindigo` | `#41419f` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_LIGHTRED` | `--gl-broadcast-banner-border-color-lightred` | `#8f2110` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_COLOR_RED` | `--gl-broadcast-banner-border-color-red` | `#580d02` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_BORDER_RADIUS` | `--gl-broadcast-banner-border-radius` | `0.25rem` | dimension | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_BLUE` | `--gl-broadcast-banner-icon-color-blue` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_DARK` | `--gl-broadcast-banner-icon-color-dark` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_GREEN` | `--gl-broadcast-banner-icon-color-green` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_INDIGO` | `--gl-broadcast-banner-icon-color-indigo` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_LIGHT` | `--gl-broadcast-banner-icon-color-light` | `#28272d` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_LIGHTBLUE` | `--gl-broadcast-banner-icon-color-lightblue` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_LIGHTGREEN` | `--gl-broadcast-banner-icon-color-lightgreen` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_LIGHTINDIGO` | `--gl-broadcast-banner-icon-color-lightindigo` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_LIGHTRED` | `--gl-broadcast-banner-icon-color-lightred` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_ICON_COLOR_RED` | `--gl-broadcast-banner-icon-color-red` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_BLUE` | `--gl-broadcast-banner-text-color-blue` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_DARK` | `--gl-broadcast-banner-text-color-dark` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_GREEN` | `--gl-broadcast-banner-text-color-green` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_INDIGO` | `--gl-broadcast-banner-text-color-indigo` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_LIGHT` | `--gl-broadcast-banner-text-color-light` | `#28272d` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_LIGHTBLUE` | `--gl-broadcast-banner-text-color-lightblue` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_LIGHTGREEN` | `--gl-broadcast-banner-text-color-lightgreen` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_LIGHTINDIGO` | `--gl-broadcast-banner-text-color-lightindigo` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_LIGHTRED` | `--gl-broadcast-banner-text-color-lightred` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |
| `GL_BROADCAST_BANNER_TEXT_COLOR_RED` | `--gl-broadcast-banner-text-color-red` | `#fff` | color | `—` | 顶部系统公告条（成败/警告/消息类型） |

## `BANNER` 族

> 顶部分区横幅

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_BANNER_INTRO_BORDER_COLOR` | `--gl-banner-intro-border-color` | `#9dc7f1` | color | `#2f5ca0` | 顶部分区横幅 |
| `GL_BANNER_PROMO_BACKGROUND_COLOR` | `--gl-banner-promo-background-color` | `#f4f0ff` | color | `#27243e` | 顶部分区横幅 |
| `GL_BANNER_PROMO_BORDER_COLOR` | `--gl-banner-promo-border-color` | `#cbbbf2` | color | `#5c47a6` | 顶部分区横幅 |

## `CARD` 族

> 卡片圆角

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_CARD_BORDER_RADIUS` | `--gl-card-border-radius` | `0.75rem` | dimension | `—` | 卡片圆角 |

## `DRAWER` 族

> 抽屉面板

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_DRAWER_BORDER_RADIUS` | `--gl-drawer-border-radius` | `1rem` | dimension | `—` | 抽屉面板 |

## `MODAL` 族

> 模态框圆角

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_MODAL_BORDER_RADIUS` | `--gl-modal-border-radius` | `1rem` | dimension | `—` | 模态框圆角 |

## `TABLE` 族

> 表格行背景与边框

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_TABLE_ROW_BACKGROUND_COLOR_HOVER` | `--gl-table-row-background-color-hover` | `#e9f3fc` | color | `#1d283e` | 表格行背景与边框 · 悬停态 |
| `GL_TABLE_SORTING_ICON_COLOR` | `--gl-table-sorting-icon-color` | `#18171d` | color | `#fff` | 表格行背景与边框 |

## `TAB` 族

> 标签页

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_TAB_SELECTED_INDICATOR_COLOR_DEFAULT` | `--gl-tab-selected-indicator-color-default` | `#050408` | color | `#fff` | 标签页 · 默认态 |

## `TOOLTIP` 族

> 工具提示

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_TOOLTIP_TEXT_COLOR_SUBTLE` | `--gl-tooltip-text-color-subtle` | `#c1bfbe` | color | `—` | 工具提示 · 弱化/次强调 |

## `FILTERED` 族

> 筛选标签操作按钮容器

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_FILTERED_SEARCH_TOKEN_DATA_BACKGROUND_COLOR_DEFAULT` | `--gl-filtered-search-token-data-background-color-default` | `#dcdbd9` | color | `#3a383d` | 筛选标签操作按钮容器 · 默认态 |
| `GL_FILTERED_SEARCH_TOKEN_DATA_BACKGROUND_COLOR_HOVER` | `--gl-filtered-search-token-data-background-color-hover` | `#c1bfbe` | color | `#4d4b4e` | 筛选标签操作按钮容器 · 悬停态 |
| `GL_FILTERED_SEARCH_TOKEN_OPERATOR_BACKGROUND_COLOR_DEFAULT` | `--gl-filtered-search-token-operator-background-color-default` | `#ecebea` | color | `#28272d` | 筛选标签操作按钮容器 · 默认态 |
| `GL_FILTERED_SEARCH_TOKEN_OPERATOR_BACKGROUND_COLOR_HOVER` | `--gl-filtered-search-token-operator-background-color-hover` | `#dcdbd9` | color | `#3a383d` | 筛选标签操作按钮容器 · 悬停态 |
| `GL_FILTERED_SEARCH_TOKEN_TYPE_BACKGROUND_COLOR_DEFAULT` | `--gl-filtered-search-token-type-background-color-default` | `#ecebea` | color | `#28272d` | 筛选标签操作按钮容器 · 默认态 |
| `GL_FILTERED_SEARCH_TOKEN_TYPE_BACKGROUND_COLOR_HOVER` | `--gl-filtered-search-token-type-background-color-hover` | `#dcdbd9` | color | `#3a383d` | 筛选标签操作按钮容器 · 悬停态 |

## `DATEPICKER` 族

> 日期选择器

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_DATEPICKER_BACKGROUND_COLOR` | `--gl-datepicker-background-color` | `#fff` | color | `#28272d` | 日期选择器 |
| `GL_DATEPICKER_DATE_TEXT_COLOR_SELECTED` | `--gl-datepicker-date-text-color-selected` | `#fff` | color | `#18171d` | 日期选择器 |

## `HIGHLIGHT` 族

> 文本/代码高亮背景色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_HIGHLIGHT_MATCH_BACKGROUND_COLOR` | `--gl-highlight-match-background-color` | `#ab6100` | color | `#e9be74` | 文本/代码高亮背景色 |
| `GL_HIGHLIGHT_MATCH_TEXT_COLOR` | `--gl-highlight-match-text-color` | `#fff` | color | `#18171d` | 文本/代码高亮背景色 |
| `GL_HIGHLIGHT_TARGET_BACKGROUND_COLOR` | `--gl-highlight-target-background-color` | `#e9f3fc` | color | `#1d283e` | 文本/代码高亮背景色 |
| `GL_HIGHLIGHT_TARGET_BORDER_COLOR` | `--gl-highlight-target-border-color` | `#9dc7f1` | color | `#2f5ca0` | 文本/代码高亮背景色 |

## `LINE` 族

> 分隔线/画线颜色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_LINE_HEIGHT_12` | `--gl-line-height-12` | `0.75rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_16` | `--gl-line-height-16` | `1rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_20` | `--gl-line-height-20` | `1.25rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_24` | `--gl-line-height-24` | `1.5rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_28` | `--gl-line-height-28` | `1.75rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_32` | `--gl-line-height-32` | `2rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_36` | `--gl-line-height-36` | `2.25rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_42` | `--gl-line-height-42` | `2.625rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_44` | `--gl-line-height-44` | `2.75rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_52` | `--gl-line-height-52` | `3.25rem` | dimension | `—` | 分隔线/画线颜色 |
| `GL_LINE_HEIGHT_HEADING` | `--gl-line-height-heading` | `1.25` | number | `—` | 分隔线/画线颜色 |

## `LETTER` 族

> 字距语义

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_LETTER_SPACING_HEADING` | `--gl-letter-spacing-heading` | `-0.01em` | dimension | `—` | 字距语义 |

## `CHART` 族

> 图表语义色映射（引用 data 系列色）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_CHART_AXIS_LINE_COLOR` | `--gl-chart-axis-line-color` | `#c1bfbe` | color | `#4d4b4e` | 图表语义色映射（引用 data 系列色） |
| `GL_CHART_AXIS_POINTER_COLOR` | `--gl-chart-axis-pointer-color` | `#646163` | color | `#c1bfbe` | 图表语义色映射（引用 data 系列色） |
| `GL_CHART_AXIS_TEXT_COLOR` | `--gl-chart-axis-text-color` | `#646163` | color | `#c1bfbe` | 图表语义色映射（引用 data 系列色） |
| `GL_CHART_THRESHOLD_AREA_COLOR` | `--gl-chart-threshold-area-color` | `rgba(221, 43, 14, 0.1)` | color | `—` | 图表语义色映射（引用 data 系列色） |
| `GL_CHART_THRESHOLD_LINE_COLOR` | `--gl-chart-threshold-line-color` | `#dd2b0e` | color | `#c02f12` | 图表语义色映射（引用 data 系列色） |
| `GL_CHART_ZOOM_FILLER_COLOR` | `--gl-chart-zoom-filler-color` | `rgba(5, 5, 6, 0.08)` | color | `rgba(255, 255, 255, 0.16)` | 图表语义色映射（引用 data 系列色） |
| `GL_CHART_ZOOM_HANDLE_COLOR` | `--gl-chart-zoom-handle-color` | `#646163` | color | `#c1bfbe` | 图表语义色映射（引用 data 系列色） |

## `ILLUSTRATION` 族

> 插画/空状态装饰色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_ILLUSTRATION_ACCENT_FILL_COLOR_ORANGE` | `--gl-illustration-accent-fill-color-orange` | `#ff9d73` | color | `#aa563a` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ACCENT_FILL_COLOR_STRONG` | `--gl-illustration-accent-fill-color-strong` | `#aea5d6` | color | `#6f6796` | 插画/空状态装饰色 · 强调 |
| `GL_ILLUSTRATION_ACCENT_FILL_COLOR_SUBTLE` | `--gl-illustration-accent-fill-color-subtle` | `#d0c5e2` | color | `#5c5371` | 插画/空状态装饰色 · 弱化/次强调 |
| `GL_ILLUSTRATION_ACCENT_FILL_COLOR_TEAL` | `--gl-illustration-accent-fill-color-teal` | `#6fdac9` | color | `#3b8581` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ACCENT_STROKE_COLOR_ORANGE` | `--gl-illustration-accent-stroke-color-orange` | `#ff9d73` | color | `#e3865f` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ACCENT_STROKE_COLOR_STRONG` | `--gl-illustration-accent-stroke-color-strong` | `#aea5d6` | color | `—` | 插画/空状态装饰色 · 强调 |
| `GL_ILLUSTRATION_ACCENT_STROKE_COLOR_TEAL` | `--gl-illustration-accent-stroke-color-teal` | `#6fdac9` | color | `#6baea3` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_BASE_FILL_COLOR` | `--gl-illustration-base-fill-color` | `#e7e4f2` | color | `#32303c` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_FILL_COLOR_DEFAULT` | `--gl-illustration-fill-color-default` | `#fff` | color | `#423f4f` | 插画/空状态装饰色 · 默认态 |
| `GL_ILLUSTRATION_ISOMETRIC_ACCENT_FRONT_FILL_COLOR` | `--gl-illustration-isometric-accent-front-fill-color` | `#74717a` | color | `#49474d` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_ACCENT_SIDE_FILL_COLOR` | `--gl-illustration-isometric-accent-side-fill-color` | `#2b2838` | color | `#212023` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_ACCENT_TOP_FILL_COLOR` | `--gl-illustration-isometric-accent-top-fill-color` | `#45424d` | color | `#6d6972` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_BASE_FRONT_FILL_COLOR` | `--gl-illustration-isometric-base-front-fill-color` | `#d5d0e8` | color | `#2b2932` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_BASE_SIDE_FILL_COLOR` | `--gl-illustration-isometric-base-side-fill-color` | `#aea5d6` | color | `#23222b` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_BASE_TOP_FILL_COLOR` | `--gl-illustration-isometric-base-top-fill-color` | `#e7e4f2` | color | `#32303c` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_GLYPH_FRONT_FILL_COLOR` | `--gl-illustration-isometric-glyph-front-fill-color` | `#fff` | color | `#423f4f` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_GLYPH_SHADOW_FILL_COLOR` | `--gl-illustration-isometric-glyph-shadow-fill-color` | `#10b1b1` | color | `#292730` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_GLYPH_SIDE_FILL_COLOR` | `--gl-illustration-isometric-glyph-side-fill-color` | `#6fdac9` | color | `#373441` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_GLYPH_TOP_FILL_COLOR` | `--gl-illustration-isometric-glyph-top-fill-color` | `#c5f4ec` | color | `#5a566c` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_OBJECT_FRONT_FILL_COLOR` | `--gl-illustration-isometric-object-front-fill-color` | `#ffc2a8` | color | `#a54623` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_OBJECT_HIGHLIGHT_FILL_COLOR` | `--gl-illustration-isometric-object-highlight-fill-color` | `#fff` | color | `#423f4f` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_OBJECT_SHADOW_FILL_COLOR` | `--gl-illustration-isometric-object-shadow-fill-color` | `#e24329` | color | `#3d2b2a` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_OBJECT_SIDE_FILL_COLOR` | `--gl-illustration-isometric-object-side-fill-color` | `#ff7b42` | color | `#8f4424` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_OBJECT_TOP_FILL_COLOR` | `--gl-illustration-isometric-object-top-fill-color` | `#ff9d73` | color | `#aa563a` | 插画/空状态装饰色 |
| `GL_ILLUSTRATION_ISOMETRIC_STROKE_COLOR_DEFAULT` | `--gl-illustration-isometric-stroke-color-default` | `#171321` | color | `#e3e3e8` | 插画/空状态装饰色 · 默认态 |
| `GL_ILLUSTRATION_ISOMETRIC_STROKE_WIDTH_DEFAULT` | `--gl-illustration-isometric-stroke-width-default` | `2` | string | `1.5` | 插画/空状态装饰色 · 默认态 |
| `GL_ILLUSTRATION_STATUS_FILL_COLOR_DANGER` | `--gl-illustration-status-fill-color-danger` | `#ff9d73` | color | `#aa563a` | 插画/空状态装饰色 · 危险 |
| `GL_ILLUSTRATION_STATUS_FILL_COLOR_NEUTRAL` | `--gl-illustration-status-fill-color-neutral` | `#aea5d6` | color | `#6f6796` | 插画/空状态装饰色 · 中性 |
| `GL_ILLUSTRATION_STATUS_FILL_COLOR_SUCCESS` | `--gl-illustration-status-fill-color-success` | `#6fdac9` | color | `#3b8581` | 插画/空状态装饰色 · 成功 |
| `GL_ILLUSTRATION_STATUS_FILL_COLOR_WARNING` | `--gl-illustration-status-fill-color-warning` | `#fca326` | color | `#ab752f` | 插画/空状态装饰色 · 警告 |
| `GL_ILLUSTRATION_STROKE_COLOR_DEFAULT` | `--gl-illustration-stroke-color-default` | `#171321` | color | `#e3e3e8` | 插画/空状态装饰色 · 默认态 |
| `GL_ILLUSTRATION_STROKE_WIDTH_DEFAULT` | `--gl-illustration-stroke-width-default` | `2` | string | `1.5` | 插画/空状态装饰色 · 默认态 |

## `TOKEN` 族

> 令牌展示辅助

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GL_TOKEN_BACKGROUND_COLOR` | `--gl-token-background-color` | `#dcdbd9` | color | `#3a383d` | 令牌展示辅助 |
| `GL_TOKEN_BORDER_RADIUS` | `--gl-token-border-radius` | `0.25rem` | dimension | `—` | 令牌展示辅助 |
| `GL_TOKEN_FOREGROUND_COLOR` | `--gl-token-foreground-color` | `#3a383d` | color | `#ecebea` | 令牌展示辅助 |
| `GL_TOKEN_SELECTOR_TOKEN_CONTAINER_TOKEN_BACKGROUND_COLOR_FOCUS` | `--gl-token-selector-token-container-token-background-color-focus` | `#a5a3a3` | color | `#646163` | 令牌展示辅助 · 聚焦态 |

## `BLUE` 族

> 基础色板：蓝色 50–950

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `BLUE_100` | `--blue-100` | `#cbe2f9` | color | `#284779` |  |
| `BLUE_200` | `--blue-200` | `#9dc7f1` | color | `#2f5ca0` |  |
| `BLUE_300` | `--blue-300` | `#63a6e9` | color | `#2f68b4` |  |
| `BLUE_400` | `--blue-400` | `#428fdc` | color | `#1f75cb` |  |
| `BLUE_50` | `--blue-50` | `#e9f3fc` | color | `#213454` |  |
| `BLUE_500` | `--blue-500` | `#1f75cb` | color | `#428fdc` |  |
| `BLUE_600` | `--blue-600` | `#2f68b4` | color | `#63a6e9` |  |
| `BLUE_700` | `--blue-700` | `#2f5ca0` | color | `#9dc7f1` |  |
| `BLUE_800` | `--blue-800` | `#284779` | color | `#cbe2f9` |  |
| `BLUE_900` | `--blue-900` | `#213454` | color | `#e9f3fc` |  |
| `BLUE_950` | `--blue-950` | `#1d283e` | color | `#f2f9ff` |  |

## `GRAY` 族

> 基础色板：灰色 50–950

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GRAY_10` | `--gray-10` | `#f7f7f5` | color | `#18171d` |  |
| `GRAY_100` | `--gray-100` | `#dcdbd9` | color | `#3a383d` |  |
| `GRAY_200` | `--gray-200` | `#c1bfbe` | color | `#4d4b4e` |  |
| `GRAY_300` | `--gray-300` | `#a5a3a3` | color | `#646163` |  |
| `GRAY_400` | `--gray-400` | `#8a8888` | color | `#747273` |  |
| `GRAY_50` | `--gray-50` | `#ecebea` | color | `#28272d` |  |
| `GRAY_500` | `--gray-500` | `#747273` | color | `#8a8888` |  |
| `GRAY_600` | `--gray-600` | `#646163` | color | `#a5a3a3` |  |
| `GRAY_700` | `--gray-700` | `#4d4b4e` | color | `#c1bfbe` |  |
| `GRAY_800` | `--gray-800` | `#3a383d` | color | `#dcdbd9` |  |
| `GRAY_900` | `--gray-900` | `#28272d` | color | `#ecebea` |  |
| `GRAY_950` | `--gray-950` | `#18171d` | color | `#f7f7f5` |  |

## `GREEN` 族

> 基础色板：绿色 50–950

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `GREEN_100` | `--green-100` | `#c3e6cd` | color | `#225131` |  |
| `GREEN_200` | `--green-200` | `#91d4a8` | color | `#306440` |  |
| `GREEN_300` | `--green-300` | `#52b87a` | color | `#2f7549` |  |
| `GREEN_400` | `--green-400` | `#2da160` | color | `#108548` |  |
| `GREEN_50` | `--green-50` | `#ecf4ee` | color | `#1e3e28` |  |
| `GREEN_500` | `--green-500` | `#108548` | color | `#2da160` |  |
| `GREEN_600` | `--green-600` | `#2f7549` | color | `#52b87a` |  |
| `GREEN_700` | `--green-700` | `#306440` | color | `#91d4a8` |  |
| `GREEN_800` | `--green-800` | `#225131` | color | `#c3e6cd` |  |
| `GREEN_900` | `--green-900` | `#1e3e28` | color | `#ecf4ee` |  |
| `GREEN_950` | `--green-950` | `#17291c` | color | `#f1fdf6` |  |

## `ORANGE` 族

> 基础色板：橙色 50–950

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `ORANGE_100` | `--orange-100` | `#f5d9a8` | color | `#693c14` |  |
| `ORANGE_200` | `--orange-200` | `#e9be74` | color | `#894b16` |  |
| `ORANGE_300` | `--orange-300` | `#d99530` | color | `#995715` |  |
| `ORANGE_400` | `--orange-400` | `#c17d10` | color | `#ab6100` |  |
| `ORANGE_50` | `--orange-50` | `#fdf1dd` | color | `#532e16` |  |
| `ORANGE_500` | `--orange-500` | `#ab6100` | color | `#c17d10` |  |
| `ORANGE_600` | `--orange-600` | `#995715` | color | `#d99530` |  |
| `ORANGE_700` | `--orange-700` | `#894b16` | color | `#e9be74` |  |
| `ORANGE_800` | `--orange-800` | `#693c14` | color | `#f5d9a8` |  |
| `ORANGE_900` | `--orange-900` | `#532e16` | color | `#fdf1dd` |  |
| `ORANGE_950` | `--orange-950` | `#382315` | color | `#fff4e1` |  |

## `PURPLE` 族

> 基础色板：紫色 50–950

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `PURPLE_100` | `--purple-100` | `#e1d8f9` | color | `#342d59` |  |
| `PURPLE_200` | `--purple-200` | `#cbbbf2` | color | `#493c83` |  |
| `PURPLE_300` | `--purple-300` | `#ac93e6` | color | `#5c47a6` |  |
| `PURPLE_400` | `--purple-400` | `#9475db` | color | `#6a4fb4` |  |
| `PURPLE_50` | `--purple-50` | `#f4f0ff` | color | `#27243e` |  |
| `PURPLE_500` | `--purple-500` | `#7b58cf` | color | `—` |  |
| `PURPLE_600` | `--purple-600` | `#6a4fb4` | color | `#9475db` |  |
| `PURPLE_700` | `--purple-700` | `#5c47a6` | color | `#ac93e6` |  |
| `PURPLE_800` | `--purple-800` | `#493c83` | color | `#cbbbf2` |  |
| `PURPLE_900` | `--purple-900` | `#342d59` | color | `#e1d8f9` |  |
| `PURPLE_950` | `--purple-950` | `#27243e` | color | `#f4f0ff` |  |

## `RED` 族

> 基础色板：红色 50–950

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `RED_100` | `--red-100` | `#fdd4cd` | color | `#812713` |  |
| `RED_200` | `--red-200` | `#fcb5aa` | color | `#a32c12` |  |
| `RED_300` | `--red-300` | `#f6806d` | color | `#c02f12` |  |
| `RED_400` | `--red-400` | `#ec5941` | color | `#dd2b0e` |  |
| `RED_50` | `--red-50` | `#fcf1ef` | color | `#582014` |  |
| `RED_500` | `--red-500` | `#dd2b0e` | color | `#ec5941` |  |
| `RED_600` | `--red-600` | `#c02f12` | color | `#f6806d` |  |
| `RED_700` | `--red-700` | `#a32c12` | color | `#fcb5aa` |  |
| `RED_800` | `--red-800` | `#812713` | color | `#fdd4cd` |  |
| `RED_900` | `--red-900` | `#582014` | color | `#fcf1ef` |  |
| `RED_950` | `--red-950` | `#3e1a14` | color | `#fff4f3` |  |

## `BRAND` 族

> 品牌色：charcoal、orange-01g/01p、orange gradient（渐变端点）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `BRAND_CHARCOAL` | `--brand-charcoal` | `#171321` | color | `—` |  |
| `BRAND_GRAY_01` | `--brand-gray-01` | `#d1d0d3` | color | `—` |  |
| `BRAND_GRAY_02` | `--brand-gray-02` | `#a2a1a6` | color | `—` |  |
| `BRAND_GRAY_03` | `--brand-gray-03` | `#74717a` | color | `—` |  |
| `BRAND_GRAY_04` | `--brand-gray-04` | `#45424d` | color | `—` |  |
| `BRAND_GRAY_05` | `--brand-gray-05` | `#2b2838` | color | `—` |  |
| `BRAND_ORANGE_01` | `--brand-orange-01` | `#fca326` | color | `—` |  |
| `BRAND_ORANGE_02` | `--brand-orange-02` | `#fc6d26` | color | `—` |  |
| `BRAND_ORANGE_03` | `--brand-orange-03` | `#e24329` | color | `—` |  |
| `BRAND_PURPLE_01` | `--brand-purple-01` | `#a989f5` | color | `—` |  |
| `BRAND_PURPLE_02` | `--brand-purple-02` | `#7759c2` | color | `—` |  |

## `DATA` 族

> 数据可视化系列色（主色 + 分段色调）

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `DATA_VIZ_AQUA_100` | `--data-viz-aqua-100` | `#93f2ef` | color | `#004059` |  |
| `DATA_VIZ_AQUA_200` | `--data-viz-aqua-200` | `#5edee3` | color | `#00516c` |  |
| `DATA_VIZ_AQUA_300` | `--data-viz-aqua-300` | `#32c5d2` | color | `#006381` |  |
| `DATA_VIZ_AQUA_400` | `--data-viz-aqua-400` | `#00acc4` | color | `#007b9b` |  |
| `DATA_VIZ_AQUA_50` | `--data-viz-aqua-50` | `#b5fefd` | color | `#00344b` |  |
| `DATA_VIZ_AQUA_500` | `--data-viz-aqua-500` | `#0090b1` | color | `—` |  |
| `DATA_VIZ_AQUA_600` | `--data-viz-aqua-600` | `#007b9b` | color | `#00acc4` |  |
| `DATA_VIZ_AQUA_700` | `--data-viz-aqua-700` | `#006381` | color | `#32c5d2` |  |
| `DATA_VIZ_AQUA_800` | `--data-viz-aqua-800` | `#00516c` | color | `#5edee3` |  |
| `DATA_VIZ_AQUA_900` | `--data-viz-aqua-900` | `#004059` | color | `#93f2ef` |  |
| `DATA_VIZ_AQUA_950` | `--data-viz-aqua-950` | `#00344b` | color | `#b5fefd` |  |
| `DATA_VIZ_BLUE_100` | `--data-viz-blue-100` | `#d2dcff` | color | `#303470` |  |
| `DATA_VIZ_BLUE_200` | `--data-viz-blue-200` | `#b7c6ff` | color | `#374291` |  |
| `DATA_VIZ_BLUE_300` | `--data-viz-blue-300` | `#97acff` | color | `#3f51ae` |  |
| `DATA_VIZ_BLUE_400` | `--data-viz-blue-400` | `#7992f5` | color | `#4e65cd` |  |
| `DATA_VIZ_BLUE_50` | `--data-viz-blue-50` | `#e9ebff` | color | `#2a2b59` |  |
| `DATA_VIZ_BLUE_500` | `--data-viz-blue-500` | `#617ae2` | color | `—` |  |
| `DATA_VIZ_BLUE_600` | `--data-viz-blue-600` | `#4e65cd` | color | `#7992f5` |  |
| `DATA_VIZ_BLUE_700` | `--data-viz-blue-700` | `#3f51ae` | color | `#97acff` |  |
| `DATA_VIZ_BLUE_800` | `--data-viz-blue-800` | `#374291` | color | `#b7c6ff` |  |
| `DATA_VIZ_BLUE_900` | `--data-viz-blue-900` | `#303470` | color | `#d2dcff` |  |
| `DATA_VIZ_BLUE_950` | `--data-viz-blue-950` | `#2a2b59` | color | `#e9ebff` |  |
| `DATA_VIZ_GREEN_100` | `--data-viz-green-100` | `#c6ed94` | color | `#1a4500` |  |
| `DATA_VIZ_GREEN_200` | `--data-viz-green-200` | `#b0d97b` | color | `#275600` |  |
| `DATA_VIZ_GREEN_300` | `--data-viz-green-300` | `#94c25e` | color | `#366800` |  |
| `DATA_VIZ_GREEN_400` | `--data-viz-green-400` | `#81ac41` | color | `#4e7f0e` |  |
| `DATA_VIZ_GREEN_50` | `--data-viz-green-50` | `#ddfab7` | color | `#133a03` |  |
| `DATA_VIZ_GREEN_500` | `--data-viz-green-500` | `#619025` | color | `—` |  |
| `DATA_VIZ_GREEN_600` | `--data-viz-green-600` | `#4e7f0e` | color | `#81ac41` |  |
| `DATA_VIZ_GREEN_700` | `--data-viz-green-700` | `#366800` | color | `#94c25e` |  |
| `DATA_VIZ_GREEN_800` | `--data-viz-green-800` | `#275600` | color | `#b0d97b` |  |
| `DATA_VIZ_GREEN_900` | `--data-viz-green-900` | `#1a4500` | color | `#c6ed94` |  |
| `DATA_VIZ_GREEN_950` | `--data-viz-green-950` | `#133a03` | color | `#ddfab7` |  |
| `DATA_VIZ_MAGENTA_100` | `--data-viz-magenta-100` | `#ffccdb` | color | `#661e3a` |  |
| `DATA_VIZ_MAGENTA_200` | `--data-viz-magenta-200` | `#fcacc5` | color | `#7c214f` |  |
| `DATA_VIZ_MAGENTA_300` | `--data-viz-magenta-300` | `#f88aaf` | color | `#9a2e5d` |  |
| `DATA_VIZ_MAGENTA_400` | `--data-viz-magenta-400` | `#e86e9a` | color | `#b93d71` |  |
| `DATA_VIZ_MAGENTA_50` | `--data-viz-magenta-50` | `#ffe3eb` | color | `#541d31` |  |
| `DATA_VIZ_MAGENTA_500` | `--data-viz-magenta-500` | `#cf4d81` | color | `—` |  |
| `DATA_VIZ_MAGENTA_600` | `--data-viz-magenta-600` | `#b93d71` | color | `#e86e9a` |  |
| `DATA_VIZ_MAGENTA_700` | `--data-viz-magenta-700` | `#9a2e5d` | color | `#f88aaf` |  |
| `DATA_VIZ_MAGENTA_800` | `--data-viz-magenta-800` | `#7c214f` | color | `#fcacc5` |  |
| `DATA_VIZ_MAGENTA_900` | `--data-viz-magenta-900` | `#661e3a` | color | `#ffccdb` |  |
| `DATA_VIZ_MAGENTA_950` | `--data-viz-magenta-950` | `#541d31` | color | `#ffe3eb` |  |
| `DATA_VIZ_ORANGE_100` | `--data-viz-orange-100` | `#f5d6b3` | color | `#5e2f05` |  |
| `DATA_VIZ_ORANGE_200` | `--data-viz-orange-200` | `#eebd8c` | color | `#6f3500` |  |
| `DATA_VIZ_ORANGE_300` | `--data-viz-orange-300` | `#e99b60` | color | `#92430a` |  |
| `DATA_VIZ_ORANGE_400` | `--data-viz-orange-400` | `#e07e41` | color | `#b14f18` |  |
| `DATA_VIZ_ORANGE_50` | `--data-viz-orange-50` | `#fae8d1` | color | `#4b2707` |  |
| `DATA_VIZ_ORANGE_500` | `--data-viz-orange-500` | `#c95d2e` | color | `—` |  |
| `DATA_VIZ_ORANGE_600` | `--data-viz-orange-600` | `#b14f18` | color | `#e07e41` |  |
| `DATA_VIZ_ORANGE_700` | `--data-viz-orange-700` | `#92430a` | color | `#e99b60` |  |
| `DATA_VIZ_ORANGE_800` | `--data-viz-orange-800` | `#6f3500` | color | `#eebd8c` |  |
| `DATA_VIZ_ORANGE_900` | `--data-viz-orange-900` | `#5e2f05` | color | `#f5d6b3` |  |
| `DATA_VIZ_ORANGE_950` | `--data-viz-orange-950` | `#4b2707` | color | `#fae8d1` |  |

## `BLACK` 族

> 基础色板：黑色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `BLACK` | `--black` | `#050408` | color | `#fff` |  |

## `WHITE` 族

> 基础色板：白色

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `WHITE` | `--white` | `#fff` | color | `#28272d` |  |

## `T` 族

> 旧版透明色令牌（t-gray-a / t-white-a），已被 --gl-color-alpha-* 取代

| 令牌 | CSS 变量 | 值 | 类型 | 暗色值 | 用途 |
|---|---|---|---|---|---|
| `T_GRAY_A_02` | `--t-gray-a-02` | `rgba(5, 5, 6, 0.02)` | color | `—` |  |
| `T_GRAY_A_04` | `--t-gray-a-04` | `rgba(5, 5, 6, 0.04)` | color | `—` |  |
| `T_GRAY_A_06` | `--t-gray-a-06` | `rgba(5, 5, 6, 0.06)` | color | `—` |  |
| `T_GRAY_A_08` | `--t-gray-a-08` | `rgba(5, 5, 6, 0.08)` | color | `—` |  |
| `T_GRAY_A_16` | `--t-gray-a-16` | `rgba(5, 5, 6, 0.16)` | color | `—` |  |
| `T_GRAY_A_24` | `--t-gray-a-24` | `rgba(5, 5, 6, 0.24)` | color | `—` |  |
| `T_WHITE_A_02` | `--t-white-a-02` | `rgba(255, 255, 255, 0.02)` | color | `—` |  |
| `T_WHITE_A_04` | `--t-white-a-04` | `rgba(255, 255, 255, 0.04)` | color | `—` |  |
| `T_WHITE_A_06` | `--t-white-a-06` | `rgba(255, 255, 255, 0.06)` | color | `—` |  |
| `T_WHITE_A_08` | `--t-white-a-08` | `rgba(255, 255, 255, 0.08)` | color | `—` |  |
| `T_WHITE_A_16` | `--t-white-a-16` | `rgba(255, 255, 255, 0.16)` | color | `—` |  |
| `T_WHITE_A_24` | `--t-white-a-24` | `rgba(255, 255, 255, 0.24)` | color | `—` |  |
| `T_WHITE_A_36` | `--t-white-a-36` | `rgba(255, 255, 255, 0.36)` | color | `—` |  |

