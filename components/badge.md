# GlBadge

## 用途

紧凑的状态指示标签（胶囊 pill），用于表达对象语义（成功/警告/危险等）、数目统计（tabCount）、属性标签。支持纯文本、带图标、可链接。源码：`src/components/base/badge/badge.vue`。

## Props

| Prop | 类型 | 默认 | 枚举 / 说明 |
|---|---|---|---|
| `variant` | String | `'neutral'` | `neutral` / `info` / `success` / `warning` / `danger` / `tier` |
| `icon` | String | `null` | 图标名（text 前的 icon） |
| `iconSize` | String | `'md'` | `sm`(12px) / `md`(16px) |
| `iconOpticallyAligned` | Boolean | `false` | 圆形图标与文字垂直对中 |
| `tag` | String | `'span'` | 渲染标签 |
| `href` | String | `undefined` | 有值时渲染为 GlLink |
| `rel` | String | `null` | 链接 rel |
| `target` | String | `'_self'` | 链接 target |
| `active` | Boolean | `false` | 激活态 |
| `disabled` | Boolean | `false` | 禁用态 |

## 状态

| 状态 | 处理 |
|---|---|
| default | `badge-pill` 胶囊，圆角全圆，`gl-text-sm`，最小宽度 `$gl-spacing-scale-3` |
| hover（链接时） | 内描边 `box-shadow: inset 0 0 0 $gl-border-size-1 var(--gl-badge-{variant}-border-color-hover)` |
| focus | `.gl-focus` 焦点环（仅链接/可聚焦时） |
| active / disabled | `--gl-badge-{variant}-{color}-color-active` / disabled 令牌 |

## 类名结构

```
.gl-badge.badge.badge-pill.badge-{variant}  (inline-flex, gap: $gl-spacing-scale-2)
├── .gl-badge-icon
└── .gl-badge-content
```

## 使用的设计令牌

每种 variant 一组（`neutral` / `info` / `success` / `warning` / `danger` / `tier`）：

- `--gl-badge-{variant}-text-color-{default,active,disabled}`
- `--gl-badge-{variant}-icon-color-{default,active,disabled}`
- `--gl-badge-{variant}-background-color-{default,active,disabled}`
- `--gl-badge-{variant}-border-color-hover`
- `--gl-spacing-scale-{1,2,3}`、`--gl-border-radius-full`、`--gl-focus-ring-*`

## 示例代码

```vue
<template>
  <div class="gl-flex gl-gap-3">
    <gl-badge variant="success">通过</gl-badge>
    <gl-badge variant="warning">需要关注</gl-badge>
    <gl-badge variant="danger" icon="warning">失败</gl-badge>
    <gl-badge variant="tier">至尊版</gl-badge>
  </div>
</template>
```

## 子组件

无独立子组件；内部用 `GlLink` / `GlIcon`。