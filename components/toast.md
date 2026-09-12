# GlToast

## 用途

轻量持久化通知（toast），位于屏幕左下角堆叠显示，可带一个操作按钮并支持自动隐藏。不是普通组件：通过插件 `GlToastPlugin` 注入 `this.$toast` 命令式调用。源码：`src/components/base/toast/toast.vue` + `toaster.vue`。

## 使用方式

```js
import { GlToast } from '@gitlab/ui';
Vue.use(GlToast);

// 组件内
this.$toast.show('合并请求已创建', {
  action: {
    text: '查看',
    href: '/-/merge_requests/1',
    onClick: (event, toast) => { /* toast.id, toast.hide() */ },
  },
  autoHideDelay: 7000,
  onComplete: () => {},
});
// 返回 { id, hide }
```

## GlToast Props（内部）

| Prop | 类型 | 说明 |
|---|---|---|
| `toastId` | String | 必填，唯一 id |
| `message` | String | 必填，通知文本 |
| `action` | Object | `{text, href?, onClick(e,{id,hide})}` |
| `autoHideDelay` | Number | 自动隐藏毫秒，默认 `5000`，强制下限 `1000` |

## 状态

| 状态 | 处理 |
|---|---|
| 显示 | 淡入 `.fade`/`.show`，固定 `bottom: $gl-spacing-scale-6; left: $gl-spacing-scale-6`（`.b-toaster.b-toaster-bottom-left`，z-index 1100） |
| 隐藏 | 淡出后销毁；`hidden` 事件；支持 View Transitions（`view-transition-name: gl-toast`） |
| 操作 | 点击 action 按钮执行 onClick 后可 `toast.hide()` |

## 类名结构

```
.b-toaster.b-toaster-bottom-left (固定容器, z-index 1100)
└── .toast.gl-toast (gl-rounded-feedback gl-shadow-md gl-py-5 gl-px-6,
                     gl-flex gl-items-center, 背景 var(--gl-feedback-strong-background-color))
    ├── .toast-header
    ├── .toast-body (文本, 颜色 var(--gl-feedback-strong-text-color))
    ├── .gl-toast-action (链接按钮, 颜色 var(--gl-feedback-strong-link-color))
    └── .gl-toast-close-button (CloseButton)
```

## 使用的设计令牌

- `--gl-feedback-strong-background-color`（toast 背景）
- `--gl-feedback-strong-text-color`（正文）
- `--gl-feedback-strong-link-color`（action 链接）
- `--gl-border-radius-full`（`gl-rounded-feedback`）、`--gl-shadow-md`
- `--gl-spacing-scale-{5,6}`（`gl-py-5 gl-px-6`、底部/左侧定位）

## 示例代码

```vue
<script>
export default {
  methods: {
    notify() {
      this.$toast.show('更改已保存', { action: { text: '撤销' } });
    },
  },
};
</script>
```

## 相关

- **GlToastPlugin**：插件（默认导出），注册 `$toast`。
- **GlToaster**（`toaster.vue`）：管理并渲染 toast 列表，`expose ['addToast','hideToast','removeToast']`。
- **GlToastMixin**：可注入其他上下文。