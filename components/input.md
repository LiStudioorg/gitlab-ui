# GlInput（GlFormInput）

## 用途

文本类输入框，表单核心控件。注意：GitLab UI 中无 `GlInput`，实际组件为 `GlFormInput`（`src/components/base/form/form_input/form_input.vue`），用法与 Bootstrap-Vue 的 `b-form-input` 兼容。支持 v-model、校验状态、防抖、格式化、宽度档位。

## Props

| Prop | 类型 | 默认 | 枚举 / 说明 |
|---|---|---|---|
| `value` | Number/String | `''` | v-model（model prop=`value`，event=`input`） |
| `type` | String | `'text'` | `text,password,email,number,url,tel,search,range,color,date,time,...` |
| `width` | String/Object | `null` | `xs` / `sm` / `md` / `lg` / `xl` |
| `state` | Boolean | `null` | `true`→valid，`false`→invalid 样式 |
| `placeholder` | String | `-` | 占位符 |
| `disabled` / `readonly` | Boolean | `false` | 禁用 / 只读 |
| `plaintext` | Boolean | `false` | 无边框纯文本展示 |
| `required` | Boolean | `false` | 必填 |
| `debounce` | Number/String | `-` | 输入防抖 ms |
| `lazy` | Boolean | `false` | 仅 change/blur 时更新值 |
| `trim` | Boolean | `false` | 去除首尾空格 |
| `number` | Boolean | `false` | 输出转为 number |
| `formatter` / `lazyFormatter` | Function/Boolean | `-` | 输入格式化 |
| `autocomplete` | String | `-` | 浏览器自动填充策略 |
| `ariaInvalid` | Boolean/String | `false` | 无障碍错误提示 |
| `id` / `name` / `autofocus` / `form` | - | - | 原生属性 |
| `min` / `max` / `step` | Number/String | `-` | 数值类输入约束 |
| `list` | String | `-` | datalist id |

## 状态

| 状态 | 处理 |
|---|---|
| default | 边框 `inset 0 0 0 $gl-border-size-1 var(--gl-control-border-color-default)`，背景 `--gl-control-background-color-default` |
| hover | 边框 `--gl-control-border-color-hover` |
| focus | `.gl-focus` 焦点环，边框 `--gl-control-border-color-focus` |
| valid / invalid | `.is-valid` / `.is-invalid`，文字色 `--gl-control-text-color-valid` / `--gl-control-text-color-error` |
| disabled / readonly | 背景 `--gl-control-background-color-disabled/readonly`，边框 `--gl-control-border-color-disabled` |
| placeholder | `--gl-control-placeholder-color` |

## 类名结构

```
.gl-form-input.form-control [.is-valid | .is-invalid] [.gl-form-input-{width}]
```

## 使用的设计令牌

- `--gl-control-border-color-{default,hover,focus,error,disabled}`
- `--gl-control-background-color-{default,readonly,disabled}`
- `--gl-control-text-color-{error,valid}`
- `--gl-control-placeholder-color`
- `--gl-focus-ring-outer-color`、`--gl-focus-ring-inner-color`（`.gl-focus`）
- `--gl-spacing-scale-*`（内边距）

## 示例代码

```vue
<template>
  <div>
    <gl-form-input v-model="name" placeholder="项目名称" width="lg" />
    <gl-form-input v-model="email" type="email" :state="emailValid ? true : false" />
  </div>
</template>

<script>
import { GlFormInput } from '@gitlab/ui';
export default { components: { GlFormInput } };
</script>
```

## 相关组件

表单簇还包括：`GlFormTextarea`、`GlFormSelect`、`GlFormRadio`、`GlFormCheckbox`、`GlFormInputGroup`、`GlFormPasswordInput`、`GlFormDate`、`GlFormGroup`、`GlForm`。