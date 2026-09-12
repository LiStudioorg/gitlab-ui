# GlModal

## 用途

模态对话框，用于需要阻断操作的确认、编辑、展示。基于 Bootstrap-Vue `BModal` 封装（`src/components/base/modal/modal.vue`）。支持三种尺寸、标题、三条操作按钮（primary/secondary/cancel）、Esc/遮罩关闭、v-model 控制显隐。

## Props

| Prop | 类型 | 默认 | 枚举 / 说明 |
|---|---|---|---|
| `modalId` | String | **必填** | 唯一 id |
| `visible` | Boolean | `false` | v-model（event=`change`） |
| `title` | String | `null` | 标题文本 |
| `titleTag` | String | `'h4'` | `h1`–`h6` |
| `headerTag` / `footerTag` | String | `'div'` | 页眉/页脚标签 |
| `actionPrimary` | Object | `null` | `{ text, attributes? }`，渲染为主确认按钮 |
| `actionSecondary` | Object | `null` | `{ text, attributes? }` |
| `actionCancel` | Object | `null` | `{ text, attributes? }` |
| `size` | String | `'md'` | `sm` / `md` / `lg` |
| `modalClass` | String | `''` | 追加 class |
| `dismissLabel` | String | `'Close'` | 关闭按钮 aria-label |
| `ariaLabel` | String | `''` | 无障碍标题 |
| `noFocusOnShow` | Boolean | `false` | 打开时不聚焦 |

## 状态与交互

| 状态 | 行为 |
|---|---|
| open / close | `show()` / `hide()` / `toggle()`；ESC、遮罩点击、右上 × 关闭 |
| 按钮操作 | `actionPrimary`→`confirm/primary`，`actionSecondary`→`confirm/secondary`，`actionCancel`→`default` 样式 |
| 事件 | `change`（v-model）、`primary`、`secondary`、`canceled` |

## 类名结构

```
.gl-modal.modal [.modal-sm | .modal-md | .modal-lg]      ← 尺寸 --gl-modal-small/medium/large-width
├── .modal-content (gl-border-0 gl-shadow-lg gl-bg-overlap, 圆角 var(--gl-modal-border-radius))
├── .modal-header (gl-pb-3 gl-border-none)
│   └── .modal-title.gl-heading-scale-500
├── .modal-body (gl-p-5 gl-py-3 gl-text-base)
└── .modal-footer (gl-flex gl-flex-row gl-p-5, 小屏转 flex-col)
    └── .js-modal-action-primary / -secondary / -cancel
```

遮罩 `.modal-backdrop.gl-bg-overlay`。模糊/淡入过渡由 BModal 提供。

## 使用的设计令牌

- `--gl-modal-border-radius`
- `--gl-modal-small-width`、`--gl-modal-medium-width`、`--gl-modal-large-width`
- `--gl-color-alpha-*`（遮罩 overlay）、`--gl-shadow-lg`
- `--gl-heading-scale-500-*`（标题排版）
- 按钮使用 `--gl-button-*` 家族
- `--gl-spacing-scale-{3,4,5}`（padding）、`--gl-border-size-1`

## 示例代码

```vue
<template>
  <div>
    <gl-button @click="visible = true">打开</gl-button>
    <gl-modal
      :visible="visible"
      modal-id="my-modal"
      title="确认删除"
      :action-primary="{ text: '删除', attributes: { variant: 'danger' } }"
      :action-cancel="{ text: '取消' }"
      @change="visible = $event"
      @primary="onDelete"
    >
      确定要删除这个项目吗？此操作不可撤销。
    </gl-modal>
  </div>
</template>
```

## 子组件

无独立子组件导出；内部用 GlButton、CloseButton（`shared_components/close_button/`）。