# GlDropdown

## 用途

下拉选择菜单，用于从一组合法值中选择（如筛选、更多操作、列表选择）。基于 Bootstrap-Vue `BDropdown` 封装（`src/components/base/dropdown/dropdown.vue`），支持头部、选中高亮、"清除全部"、split 按钮、子项多态。

## Props

| Prop | 类型 | 默认 | 枚举 / 说明 |
|---|---|---|---|
| `text` | String | `''` | 触发按钮文本 |
| `icon` | String | `null` | 触发按钮图标 |
| `category` | String | `'primary'` | `primary` / `secondary` / `tertiary` |
| `variant` | String | `'default'` | `default` / `confirm` / `danger` / `link` |
| `size` | String | `'medium'` | `small` / `medium` |
| `split` | Boolean | `false` | split button（左主体+右侧箭头） |
| `splitHref` | String | `''` | split 主按钮链接 |
| `disabled` / `loading` / `block` | Boolean | `false` | 禁用 / 加载 / 整宽 |
| `headerText` | String | `''` | 菜单头部文本 |
| `hideHeaderBorder` | Boolean | `true` | 隐藏头部下边线 |
| `showClearAll` | Boolean | `false` | 显示"清除全部" |
| `clearAllText` | String | `'Clear all'` | 清除按钮文本 |
| `showHighlightedItemsTitle` | Boolean | `false` | 显示"已选"分组标题 |
| `highlightedItemsTitle` | String | `'Selected'` | 分组标题 |
| `textSrOnly` | Boolean | `false` | 按钮文本仅屏幕阅读器可见 |
| `right` | Boolean | `false` | 菜单右对齐 |
| `toggleClass` | String/Array/Object | `null` | 追加到 toggle |
| `popperOpts` / `noFlip` | Object/Boolean | `-` | Popper 定位控制 |

## 子组件 Props

| 子组件 | 关键 Props |
|---|---|
| GlDropdownItem | `avatarUrl`、`iconName`、`iconColor`、`isChecked`、`isCheckItem`（勾选）、`secondaryText`、`role` |
| GlDropdownDivider | — |
| GlDropdownHeader | slot 标题文本 |
| GlDropdownText | slot 说明文字 |
| GlDropdownForm | 内嵌表单 |

## 状态

| 状态 | 处理 |
|---|---|
| 展开/收起 | Popper 定位，`.dropdown-menu`（背景 `--gl-bg-dropdown`、阴影 `gl-shadow-x0-y2-b4-s0`、圆角 `var(--gl-dropdown-border-radius)`、最小宽 `$gl-dropdown-width`） |
| 选中项 | `isCheckItem` + `isChecked` 高亮，`iconRightName`/`iconRightAriaLabel` 右侧勾选图标 |
| hover / active | 菜单项使用 `gl-action-neutral-colors` |
| split | toggle 去掉左侧圆角（`gl-rounded-tl-none gl-rounded-bl-none`） |
| clear all | 小号 tertiary link 按钮，class `clear-all gl-px-5` |

## 使用的设计令牌

- `--gl-dropdown-background-color`、`--gl-dropdown-divider-color`、`--gl-dropdown-border-color`、`--gl-dropdown-border-radius`
- 触发按钮复用 `--gl-button-*`、`--gl-action-*` 家族
- `--gl-shadow-{sm|x0-y2-b4-s0}`、`gl-action-neutral-colors`（菜单项 hover/active）
- `--gl-spacing-scale-{2,3,4,5}`、`--gl-zindex-dropdown`

## 示例代码

```vue
<template>
  <gl-dropdown
    text="筛选：全部"
    category="secondary"
    :show-clear-all="true"
    @clear-all="clear"
  >
    <gl-dropdown-item is-check-item :is-checked="true">进行中</gl-dropdown-item>
    <gl-dropdown-item is-check-item>已关闭</gl-dropdown-item>
    <gl-dropdown-divider />
    <gl-dropdown-item @click="exportCsv">导出 CSV</gl-dropdown-item>
  </gl-dropdown>
</template>
```

## 相关

同目录还导出：GlDropdownItem、GlDropdownDivider、GlDropdownHeader、GlDropdownText、GlDropdownForm。内部用 GlButton（category 映射 `btn-{variant}-secondary/tertiary`）、GlIcon、GlLoadingIcon。