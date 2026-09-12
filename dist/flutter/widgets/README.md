# Flutter widgets (Pajamas-inspired)

Generated from `scripts/component-spec.js` by `scripts/gen-native.js`.
Widgets reference `../tokens.dart` exclusively (`Pajamas.shared.*` colors and
`Pajamas.spacing*/radius*/fontSize*` sizes); no raw color literals appear in
widget code. The generator patches `tokens.dart` in place only to add missing
getters/constants — it never changes existing values.

## Widgets

- `PajButton` — 主要交互按钮。视觉层级 category=primary|secondary|tertiary；语义 variant=default|confirm|danger|link。
- `PajInput` — 文本输入框。支持校验态 state=valid|invalid|null、宽度档位、占位符、禁用/只读。
- `PajModal` — 模态对话框。尺寸 sm|md|lg，标题 + 正文 + footer 操作按钮（primary/secondary/cancel）。
- `PajTable` — 数据表格。支持排序表头、busy 加载态、行 hover 高亮、空状态。
- `PajTabs` — 标签页导航。激活项带底部指示条，可带计数 badge，支持按钮动作。
- `PajBadge` — 胶囊状态标签。variant=neutral|info|success|warning|danger|tier，可带图标、可链接。
- `PajToast` — 左下角轻量通知。自动隐藏（默认 5s），可带一个操作按钮。
- `PajDropdown` — 下拉菜单。支持头部、勾选项、分割线、清除全部。
- `PajForm` — 表单容器与字段组：label + 输入 + 校验反馈 + 帮助文本，字段间距统一。
- `PajAlert` — 嵌入式提示条。variant=info|success|warning|danger|tip，带图标、标题、可关闭、可吸顶。

## Usage

```dart
import 'package:flutter/material.dart';
import 'widgets/index.dart';

PajButton(
  variant: 'confirm',
  onPressed: () {},
  child: const Text('Save'),
);
```

Pajamas-inspired (MIT).
