# GlForm / GlFormGroup

## 用途

表单容器与表单字段分组。`GlForm` 为无 props 的 `<form>` 包裹器（`src/components/base/form/form.vue`），`GlFormGroup` 提供 label + 字段 + 校验反馈的垂直组合结构。两者通常与 `GlFormInput`（见 `input.md`）等一起使用。

## GlForm

| Prop | 说明 |
|---|---|
| —（无 props） | `<form>` 标签，透传所有 listeners（`submit` 等） |

## GlFormGroup Props

| Prop | 类型 | 默认 | 枚举 / 说明 |
|---|---|---|---|
| `label` | String | - | 字段标签（透传 BFormGroup） |
| `label-for` | String | - | 关联输入框 id |
| `labelDescription` | String | `''` | 标签下方的副文本（`.label-description`） |
| `optional` | Boolean | `false` | 显示 "(optional)" 可选标记 |
| `optionalText` | String | `'(optional)'` | 可选标记文本 |
| `labelClass` | String/Array/Object | `null` | 追加到 label（基础含 `col-form-label`） |
| `state` | Boolean | `null` | valid/invalid |
| `invalid-feedback` / `valid-feedback` | String | - | 校验信息文本 |
| `description` | String | - | 字段帮助文本 |
| `label-size` | String | - | 标签宽度档 |

## 状态

| 状态 | 处理 |
|---|---|
| valid | 反馈文字 `--gl-control-text-color-valid` |
| invalid | 反馈文字 `--gl-control-text-color-error` |
| optional | 标签后追加 `.<optional-text>`，样式 `--gl-text-subtle` |
| 间距 | 字段组 `gl-mb-5`（`--gl-spacing-scale-5`） |

## 类名结构

```
.gl-form-group (gl-mb-5)
└── .col-form-label (gl-text-base gl-font-bold gl-text-strong)
│   └── .label-description (gl-text-subtle)
│   └── .optional-label
├── .gl-form-input.form-control [.is-valid | .is-invalid]
└── [.valid-feedback | .invalid-feedback]
```

## 使用的设计令牌

- `--gl-control-text-color-{valid,error}`（校验反馈）
- `--gl-control-border-color-{default,hover,focus}`、`--gl-control-background-color-default`
- `--gl-text-strong-color`、`--gl-text-subtle-color`
- `--gl-spacing-scale-{2,3,4,5}`
- `--gl-font-weight-bold`、`--gl-font-size-base`

## 示例代码

```vue
<template>
  <gl-form @submit.prevent="save">
    <gl-form-group
      label="项目名称"
      label-description="注意：创建后不可修改"
      :invalid-feedback="errors.name"
      :state="errors.name ? false : null"
    >
      <gl-form-input v-model="name" :state="errors.name ? false : null" />
    </gl-form-group>

    <gl-form-group label="可见性" optional>
      <gl-form-select v-model="visibility" :options="visibilities" />
    </gl-form-group>

    <gl-button type="submit" variant="confirm">创建项目</gl-button>
  </gl-form>
</template>
```

## 相关组件

同簇：GlFormTextarea、GlFormSelect、GlFormRadio、GlFormCheckbox、GlFormInputGroup、GlFormPasswordInput、GlFormDate、GlFormGroup。