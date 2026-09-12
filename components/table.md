# GlTable

## 用途

数据表格，用于展示结构化记录列表。封装 Bootstrap-Vue `BTable`（`src/components/base/table/table.vue`），自动获得排序、分页、筛选、服务端拉取、busy 加载态、列格式化等能力。轻量场景使用 `GlTableLite`。

## Props（GlTable 自身）

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `items` | Array | `[]` | 行数据 |
| `fields` | Array | `null` | 列定义（`{key,label,sortable,...}`） |
| `stickyHeader` | Boolean | `false` | 表头吸顶（`.gl-table--sticky-header`） |
| `sortBy` | String | `-` | 默认排序列（key） |
| `sortDesc` | Boolean | `false` | 默认降序 |
| `tableClass` | String | - | 追加 class |

**透传到 BTable**的常用能力：`api-url`、`busy`、`current-page`、`per-page`、`filter`/`filter-function`、`selectable`/`selected-variant`、`sort-compare`、`no-sort-reset`、`primary-key`、`empty-text`、`empty-filtered-text`、`show-empty` 等。

## 状态

| 状态 | 处理 |
|---|---|
| busy / 加载中 | 表格上方显示 `<gl-loading-icon>`，行半透明 |
| 排序 | 表头可点击排序列，箭头文本 `↑`/`↓`，颜色 `--gl-table-sorting-icon-color` |
| 行 hover | 背景 `--gl-table-row-background-color-hover` |
| 空数据 | `empty-text` 或自定义 empty 插槽 |
| 分页 | 需搭配 `per-page` / `current-page`，服务端用 `api-url` 拉取 |

## 类名结构

```
.gl-table (.gl-rounded-1) [.gl-table--sticky-header]
├── thead .gl-table-th (排序箭头 .gl-table-th-sort-icon-wrapper, 右对齐 .gl-table-th-align-right)
└── tbody
```

表头下划线：`box-shadow: inset 0 -1px 0 var(--gl-border-color-default)`。

## 使用的设计令牌

- `--gl-table-row-background-color-hover`
- `--gl-table-sorting-icon-color`
- `--gl-color-alpha-0`（表头背景）、`--gl-border-color-default`（表头下划线）
- `--gl-feedback-info-background-color`（selected 行）
- `--gl-text-subtle-color`（次要文本）、`--gl-spacing-scale-*`

## 示例代码

```vue
<template>
  <gl-table
    :items="items"
    :fields="fields"
    :busy="loading"
    :sticky-header="true"
    @row-clicked="go"
  >
    <template #cell(status)="{ value }">
      <gl-badge :variant="statusVariant(value)">{{ value }}</gl-badge>
    </template>
  </gl-table>
</template>

<script>
import { GlTable } from '@gitlab/ui';
export default {
  components: { GlTable },
  computed: {
    fields() {
      return [
        { key: 'name', label: '名称', sortable: true },
        { key: 'status', label: '状态' },
        { key: 'updated_at', label: '更新于', sortable: true },
      ];
    },
  },
};
</script>
```

## 子组件

- **GlTableLite**（`base/table_lite/`）：仅 `tableClass`/`items`/`fields`/`stickyHeader` 四个 props，无服务端/分页等重型能力；静态表格应优先用它（更轻）。