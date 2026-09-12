# Angular components (Pajamas-inspired)

Generated from `scripts/component-spec.js` by `scripts/gen-native.js`.

Every component references design tokens only via CSS custom properties
(`var(--gl-*)`), so it follows the host theme automatically. Load
`dist/css/variables.css` in the host page.

## Components

- `gl-button` — 主要交互按钮。视觉层级 category=primary|secondary|tertiary；语义 variant=default|confirm|danger|link。
- `gl-input` — 文本输入框。支持校验态 state=valid|invalid|null、宽度档位、占位符、禁用/只读。
- `gl-modal` — 模态对话框。尺寸 sm|md|lg，标题 + 正文 + footer 操作按钮（primary/secondary/cancel）。
- `gl-table` — 数据表格。支持排序表头、busy 加载态、行 hover 高亮、空状态。
- `gl-tabs` — 标签页导航。激活项带底部指示条，可带计数 badge，支持按钮动作。
- `gl-badge` — 胶囊状态标签。variant=neutral|info|success|warning|danger|tier，可带图标、可链接。
- `gl-toast` — 左下角轻量通知。自动隐藏（默认 5s），可带一个操作按钮。
- `gl-dropdown` — 下拉菜单。支持头部、勾选项、分割线、清除全部。
- `gl-form` — 表单容器与字段组：label + 输入 + 校验反馈 + 帮助文本，字段间距统一。
- `gl-alert` — 嵌入式提示条。variant=info|success|warning|danger|tip，带图标、标题、可关闭、可吸顶。

## Usage

```ts
import { NgModule } from '@angular/core';
import { GlButtonModule, GlModalModule } from './index';

@NgModule({ imports: [GlButtonModule, GlModalModule] })
export class AppModule {}
```

## Notes

- Outputs: `(glClick)`, `(glChange)`, `(close)`, `(glSort)`, `(glSelect)`,
  `(glClearAll)`, `(glDismiss)`.
- Modal closes on backdrop click, Esc, and the × button.
- Pajamas-inspired (MIT).
