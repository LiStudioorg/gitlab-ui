# 格式映射表 FORMAT-MAP

Pajamas-inspired, tokens from @gitlab/ui (MIT).
标记「暂无」= dist 下尚无该目录，给出推荐获取/组装方式。

| 目录名 | 适用技术栈 | 安装/引入方式 | 示例代码片段（短） |
|---|---|---|---|
| css | CSS Custom Properties | @import "dist/css/variables.css"; （或 <link>） | background: var(--gl-background-color-default); color: var(--gl-text-color-default); |
| scss | Sass / SCSS | 复制或 @import "dist/scss/_variables.scss" | @include gl-focus(); color: $blue-500; |
| less | Less | @import "dist/less/variables.less"; | @blue-500: #1f75cb; color: @blue-500; |
| stylus | Stylus | @import "dist/stylus/variables.styl"; | color: $blue-500 /* 或 blue-500 */ |
| tailwind | Tailwind CSS | presets: [require("dist/tailwind/tailwind.config.js")]（暗色用 dist/adapters/tailwind/preset.js） | class="bg-blue-500 text-white rounded-lg" |
| unocss | UnoCSS | import { defineConfig } from "unocss"; export default defineConfig(require("dist/unocss/uno.config.ts") 的配置) | class="bg-blue-500 text-white" |
| windicss | Windi CSS | windi.config.ts 引用 dist/windicss/windi.config.ts | class="bg-blue-500 p-3" |
| js | ESM JS 主题对象 | import { theme, themeDark, tokens } from "dist/js/theme.js" | theme.colors.blue["500"] // #1f75cb |
| json | JSON 令牌（DTCG） | const t = require("dist/json/tokens.json") | t.count; t.light.BLUE_500.value |
| yaml | YAML 令牌 | yaml 加载 dist/yaml/tokens.yaml（含 light/dark） | light.BLUE_500: { value: "#1f75cb", type: color } |
| style-dictionary | Style Dictionary | npx style-dictionary build --config dist/style-dictionary/config.json | 平台变量由 config.json 输出 |
| figma | Figma（Tokens Studio） | 导入 dist/figma/tokens.json | 颜色/字号令牌自动生成 |
| sketch | Sketch 调色板 | 倒入 dist/sketch/palette.sketchpalette | 色板 128 色 |
| xd | Adobe XD 调色板 | 导入 dist/xd/colors.json | 设计令牌色板 |
| ios | Swift / iOS | 把 Colors.swift + Tokens.swift 加入工程 | Colors.blue500; Tokens.fontSizeBase |
| android | Android | values/*.xml 放入 res/values/ | @color/blue_500 或 @dimen/spacing_scale_3 |
| flutter | Flutter / Dart | import "dist/flutter/tokens.dart" | Colors = Tokens.blue500 |
| react-native | React Native | import { colors, measures } from "dist/react-native/tokens.ts" | colors["blue-500"] |
| compose | Jetpack Compose | 复制 dist/compose/Theme.kt 进工程（package com.example.pajamas） | val c = Theme.colors; Button(colors = ...) 用 Color(0xFF1F75CB) |
| xaml | WPF / UWP XAML | 把 dist/xaml/Tokens.xaml 并入 ResourceDictionary | {StaticResource Tokens.BackgroundColorDefault} |
| html | 原生 HTML | <link rel="stylesheet" href="dist/html/components/base.css"> + 组件 HTML | <button class="gl-button gl-button--primary--confirm"> |
| vue3 | Vue 3（Composition API） | 暂无 dist/vue3 → 用 dist/adapters/vue/useGitLabTheme.ts + dist/css/variables.css + html 组件类名 | <div :class="themeClass">…</div> |
| vue2 | Vue 2（Options API） | 暂无 → 用 dist/adapters/vanilla/theme.js 的 applyTheme + CSS 变量 | this.$nextTick(() => applyTheme(true)) |
| react-css | React + 内联/全局 CSS | 引入 dist/css/variables.css；类名参考 dist/html/components/*.html | style={{ color: "var(--gl-text-color-default)" }} |
| react-css-modules | React + CSS Modules | 暂无 → 从 dist/html/components/*.html 提取样式块转为 .module.css | import s from "./button.module.css"; <button className={s.btn}> |
| react-scss | React + SCSS | 导入 dist/scss/_variables.scss | $primary: $blue-500; background: $primary; |
| react-tailwind | React + Tailwind | presets: [require("dist/tailwind/tailwind.config.js")] + useGitLabTheme() | className="bg-blue-500 text-white" |
| react-styled-components | React + styled-components | 暂无 → 令牌用 var(--gl-*) 留活值 | styled.button`background: var(--gl-button-confirm-primary-background-color-default)` |
| react-emotion | React + Emotion | 暂无 → 同上（object styles + css prop） | css={{ color: "var(--gl-text-color-default)" }} |
| next-shadcn | Next.js + shadcn/ui | 暂无 → 用 dist/adapters/shadcn/registry.json（npx shadcn add <path>） | npx shadcn add dist/adapters/shadcn/registry.json |
| svelte | Svelte | dist/adapters/svelte/gitlabTheme.ts + `$isDark` 响应式主题 | <button on:click={toggleTheme}>{$isDark ? "暗" : "亮"}</button> |
| sveltekit | SvelteKit | 同上，+app.html 里 <link href="dist/css/variables.css"> | import { isDark } from "$lib/gitlabTheme" |
| solid | SolidJS | 暂无 → 用 adapters/vanilla 的 applyTheme + CSS 变量 | onClick={() => applyTheme(!isDarkTheme())} |
| angular | Angular | 暂无 → [ngClass] + applyTheme；全局样式引 variables.css | <div [ngClass]="{ 'gl-dark': dark }"> |
| astro | Astro | 暂无 → 组件用 html/ 参考，样式引 CSS 变量 | <style> .card { background: var(--gl-background-color-section); } </style> |
| qwik | Qwik | 暂无 → 用 @visibleTask 切换 gl-dark | applyTheme(true) |
| web-components | Web Components | import "dist/web-components/index.js" | <gl-button variant="confirm">保存</gl-button> |
| lit | Lit | import { GlButton } from "dist/lit/components/index.js" | <gl-button category="primary" variant="confirm">保存</gl-button> |
| alpine | Alpine.js | 复制 dist/alpine/components/*.html 结构 | <div x-data="{ open: false }"> |
| htmx | htmx | 复制 dist/htmx/components/*.html 结构 | <button hx-post="/api" hx-swap="outerHTML"> |
| bootstrap | Bootstrap（覆盖层） | dist 无独立 bootstrap → 新生成 dist/bootstrap/_theme.scss；在 bootstrap 源码前 $variables 覆盖 | @import "dist/bootstrap/_theme.scss"; |
| antd | Ant Design | import { pajamasAntd } from "dist/antd/theme.ts" | <ConfigProvider theme={{ token: pajamasAntd }}> |
| mui | Material UI | import { pajamasMui } from "dist/mui/theme.ts" | <ThemeProvider theme={pajamasMui}> |
| chakra | Chakra UI | import { pajamasChakra } from "dist/chakra/theme.ts" | theme={pajamasChakra}（ChakraProvider） |
| mantine | Mantine | import { pajamasMantine } from "dist/mantine/theme.ts" | <MantineProvider theme={pajamasMantine}> |
| element-plus | Element Plus | import { pajamasElementColors } from "dist/element-plus/theme.map.ts" | el-config-provider :locale 下用 CSS var 覆盖 |
| naive-ui | Naive UI | import { pajamasNaive } from "dist/naive-ui/theme.ts" | <n-config-provider :theme-overrides="pajamasNaive"> |
| vuetify | Vuetify 3 | import { pajamasVuetifyLight } from "dist/vuetify/theme.ts" | vuetify 配置 themes.light = pajamasVuetifyLight |
| swiftui | SwiftUI | 暂无 → 从 dist/ios/Tokens.swift 移植 Color 常量 | Color("blue500") |
| adapters | 跨框架适配层 | 拷贝 dist/adapters/{react,vue,svelte,vanilla,tailwind,shadcn} 进工程 | useGitLabTheme().toggle(); applyTheme(true) |
