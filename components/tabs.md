# GlTabs / GlTab

## 用途

标签页（Tab 导航），在有限空间内组织相关视图。Wrapper（`gl-tabs-wrapper`）有下边框，激活标签带底部指示条。源码：`src/components/base/tabs/tabs/tabs.vue` + `tabs/tab/tab.vue`。

## GlTabs Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `value` | Number | `0` | 当前激活 tab 索引（v-model） |
| `actionPrimary` / `actionSecondary` / `actionTertiary` | Object | `null` | `{text, attributes?}`，标签栏右侧操作按钮 |
| `contentClass` | String/Array/Object | `null` | 追加到内容区 |
| `navClass` | String/Array/Object | `null` | 追加到 nav |
| `justified` | Boolean | `false` | 等宽拉伸 |
| `syncActiveTabWithQueryParams` | Boolean | `false` | 与 URL query 同步（深链接） |
| `queryParamName` | String | `'tab'` | 同步用的 query 参数名 |

按钮默认样式：primary=`confirm/primary`、secondary=`default/secondary`、tertiary=`default`。事件：`input`、`primary`、`secondary`、`tertiary`。

## GlTab Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `titleLinkClass` | String/Array/Object | `''` | 追加到标题链接 |
| `queryParamValue` | String | `null` | 同步时的 query 值 |
| `tabCount` | Number | `null` | `>=0` 时标题旁显示 `GlBadge variant="neutral"` |
| `tabCountSrText` | String | `null` | 计数无障碍文本 |

## 状态

| 状态 | 处理 |
|---|---|
| active | `.gl-tab-nav-item-active`：`gl-font-bold`，底部指示条 `border-bottom: var(--gl-tab-selected-indicator-color-default)` |
| hover | 指示条 `--gl-border-color-strong` |
| disabled | 文本 `--gl-action-disabled-foreground-color`，不可点击 |
| 触发 | 点击切换触发 `input` 事件；激活态继承 `gl-action-neutral-colors` |

## 类名结构

```
.gl-tabs-wrapper (gl-border-b)
└── .gl-tabs
    ├── .gl-tabs-nav .gl-tabs-nav-scroll
    │   └── .gl-tab-nav-item (gl-px-4 gl-py-5 gl-text-base, ::before=底部指示条)
    │       └── .gl-tab-nav-item-active
    └── .gl-tab-content (gl-py-3 gl-text-base)
        └── <gl-tab> 内容
└── .gl-actions-tabs-start / .gl-actions-tabs-end (动作按钮容器)
```

## 使用的设计令牌

- `--gl-tab-selected-indicator-color-default`
- `--gl-border-color-default`、`--gl-border-color-strong`（hover 指示条）
- `--gl-action-neutral-*`（`gl-action-neutral-colors`）
- `--gl-action-disabled-foreground-color`
- `--gl-background-color-default`（左右滚动 fade）
- `--gl-text-base-*`（字号行高）、`--gl-spacing-scale-{3,4,5}`

## 示例代码

```vue
<template>
  <gl-tabs v-model="active" :sync-active-tab-with-query-params="true">
    <gl-tab title="概览" :tab-count="3">概览内容</gl-tab>
    <gl-tab title="代码">代码内容</gl-tab>
    <gl-tab title="活动" tab-count="12">活动内容</gl-tab>
  </gl-tabs>
</template>
```

## 相关组件

- **GlTab**：单个标签（见上）。
- **GlScrollableTabs**（`tabs/tabs/scrollable_tabs.vue`）：左右滚动版，props 仅 `scrollLeftLabel` / `scrollRightLabel`。