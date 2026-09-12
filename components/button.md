# GlButton

## 用途

GitLab 主要交互组件。用于触发操作、提交表单、导航跳转。支持 3 个视觉层级（category）× 5 种语义（variant）× 2 种尺寸。源码：`src/components/base/button/button.vue`。

## Props

| Prop | 类型 | 默认 | 枚举 / 说明 |
|---|---|---|---|
| `category` | String | `'primary'` | `primary` / `secondary` / `tertiary`（视觉层级：实心 / 浅色描边 / 无底文字） |
| `variant` | String | `'default'` | `default` / `confirm` / `danger` / `link` / `reset`（重置样式） |
| `size` | String | `'medium'` | `small` / `medium`（class `btn-sm` / `btn-md`） |
| `icon` | String | `''` | 图标名（@gitlab/svgs），无文本时渲染纯图标按钮 |
| `selected` | Boolean | `false` | 已选中态（segment filter） |
| `loading` | Boolean | `false` | 显示 GlLoadingIcon 并禁用 |
| `disabled` | Boolean | `false` | 原生禁用 |
| `accessibleDisabled` | Boolean | `true`* | 仅 aria-disabled，仍可聚焦（*默认随配置） |
| `block` | Boolean | `false` | 100% 宽度 |
| `label` | Boolean | `false` | 非交互标签（span） |
| `count` | Number | `null` | `>=0` 时显示数量徽章 |
| `href` / `to` | String/Object | `-` | 有值渲染为链接 |
| `target` / `rel` | String | `null` | 链接属性 |
| `type` | String | `'button'` | `button` / `submit` / `reset` |
| `active` | Boolean | `false` | 模拟激活态 |
| `buttonTextClasses` | Array/Object/String | `''` | 追加到按钮文本 |
| `tag` | String | `'button'` | 自定义渲染标签 |

## 状态

| 状态 | 说明 |
|---|---|
| default | 静态，边框 `--gl-button-{variant}-{category}-border-color-default` |
| hover | 背景/前景/边框过渡，`transition: ... $gl-transition-duration-medium $gl-easing-out-cubic` |
| active / focus | focus-visible 使用 `.gl-focus` 焦点环；点击 `-active` 色 |
| disabled | 全局禁用令牌 `--gl-action-disabled-*`（foreground/background/border） |
| loading | 图标替换为 GlLoadingIcon，按钮保持原 size |
| selected | `--gl-button-selected-*` 色，用于分段式控件 |

## 类名结构

```
btn gl-button btn-{variant} btn-{sm|md} btn-{variant}-{category}
├── .gl-button-icon        (放 GlIcon / GlLoadingIcon)
└── .gl-button-text
└── .gl-button-count       (数量徽章, 纯数字按钮时隐藏文本)
```

按钮圆角 `border-radius: var(--gl-button-border-radius)`；link 变体用 `--gl-button-link-border-radius`。medium 最小尺寸 = `$gl-button-medium-size`，small = `$gl-button-small-size`。

## 使用的设计令牌

- `--gl-button-border-radius`、`--gl-button-link-border-radius`
- `--gl-button-{variant}-{category}-{foreground|background|border}-color-{default|hover|active|focus}`
- `--gl-button-selected-background-color`、`--gl-button-selected-foreground-color`、`--gl-button-selected-border-color`（含 hover/focus/active）
- `--gl-button-count-background-color`、`--gl-button-count-foreground-color`
- `--gl-button-link-text-color-default`
- `--gl-action-disabled-{foreground|background|border}-color`
- `--gl-focus-ring-outer-color`、`--gl-focus-ring-inner-color`（`.gl-focus`）
- `--gl-border-size-1`、`--gl-transition-duration-medium`、`--gl-spacing-scale-{3,4}`、`--gl-opacity-70`

## 示例代码

```vue
<template>
  <div class="gl-flex gl-gap-3">
    <gl-button :icon="'star-o'" category="primary" variant="confirm" @click="save">保存</gl-button>
    <gl-button category="secondary" variant="default" :loading="loading">Secondary</gl-button>
    <gl-button category="tertiary" variant="danger" :disabled="true">删除</gl-button>
    <gl-button size="small" :icon="'pencil'" :aria-label="'Edit'"/>
  </div>
</template>

<script>
import { GlButton } from '@gitlab/ui';
export default { components: { GlButton } };
</script>
```

## 子组件

- **GlButtonGroup**（`base/button_group/`）：props 仅 `vertical: Boolean`，组合按钮分组。