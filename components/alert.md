# GlAlert

## 用途

页面内嵌入式提示条（非弹窗），用于传达操作结果、警告、错误或提示信息。可带标题、正文、操作按钮、可关闭、可吸顶。源码：`src/components/base/alert/alert.vue`。

## Props

| Prop | 类型 | 默认 | 枚举 / 说明 |
|---|---|---|---|
| `variant` | String | `'info'` | `success` / `warning` / `danger` / `info` / `tip` |
| `title` | String | `''` | 标题（可选） |
| `dismissible` | Boolean | `true` | 可关闭（右上 ×） |
| `dismissLabel` | String | `'Dismiss'` | 关闭按钮 aria-label |
| `primaryButtonText` / `primaryButtonLink` | String | `''` | 主操作按钮（confirm/primary） |
| `secondaryButtonText` / `secondaryButtonLink` | String | `''` | 次操作按钮（default/secondary） |
| `sticky` | Boolean | `false` | `position: sticky; top: 0` 吸顶 |
| `headerLevel` | Number | `2` | 标题级别 `1`–`6` → `h1`–`h6` |
| `politeness` | String | `'polite'` | 无障碍：`off` / `polite` / `assertive` |

## 状态与交互

| 状态 | 处理 |
|---|---|
| 语义角色 | danger/warning/success → `role="alert"`；info/tip → `role="status"` |
| 图标映射 | success=`check-circle`、warning=`warning`、danger=`error`、info=`information-o`、tip=`bulb` |
| 按钮操作 | 触发 `primary-action` / `secondary-action` 事件 |
| 关闭 | 触发 `dismiss` 事件；`.gl-alert-not-dismissible` 时不显示 |
| 聚焦 | `focus()` 方法（expose），标题加 `gl-focus` |

## 类名结构

```
.gl-alert.gl-alert-{variant} [.gl-alert-sticky] [.gl-alert-not-dismissible] [.gl-alert-has-title]
├── .gl-alert-icon-container
│   └── .gl-alert-icon (variant 图标)
├── .gl-alert-content
│   ├── .gl-alert-title
│   └── .gl-alert-body (gl-py-5 gl-text-base, 1px 边框)
└── .gl-alert-actions
    ├── .gl-alert-action (按钮)
    └── .gl-dismiss-btn (关闭)
```

圆角 `border-radius: var(--gl-alert-border-radius)`；每侧间距钩子 `var(--gl-alert-padding-x, 0px)`。

## 使用的设计令牌

- `--gl-alert-border-radius`
- `--gl-alert-{success|warning|danger|info|neutral}-background-color`
- `--gl-alert-{success|warning|danger|info|neutral}-title-color`
- `--gl-alert-{success|warning|danger|info|neutral}-border-color`
- `--gl-feedback-{success|warning|danger|info|neutral}-icon-color`
- 按钮复用 `--gl-button-*`；`--gl-spacing-scale-{3,4,5}`

## 示例代码

```vue
<template>
  <div>
    <gl-alert variant="warning" title="注意" :dismissible="false">
      此分支包含未合并的更改。
    </gl-alert>
    <gl-alert
      variant="danger"
      title="构建失败"
      :primary-button-text="'重试'"
      :secondary-button-text="'查看日志'"
      @primary-action="retry"
      @secondary-action="showLogs"
    >
      job 3 超时。
    </gl-alert>
  </div>
</template>
```

## 子组件

无独立子组件导出；内部用 `GlIcon`、`GlButton`、CloseButton（`shared_components/close_button/`）。