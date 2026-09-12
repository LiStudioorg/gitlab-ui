# 页面骨架：Issues（议题列表 / 看板）

> 复刻对象：GitLab 项目议题列表页（`/-/issues`）与列表筛选项。
> 本文件只描述**结构**，不复制任何实际页面 HTML 或版权内容。

## 整体布局

```
┌──────────────────────────────────────────────────────────────┐
│ [顶部全局导航]                                                  │
├───────────┬────────────────────────────────────────────────────┤
│ [左侧栏]   │  [中间主内容]                            [右侧栏]     │
│ ·代码      │  · 标题行: "议题" + 新建议题(按钮) + 统计             │ ·筛选条件面板  │
│ ·议题      │  · 工具条: 布局切换(列表/看板) · 排序 · 操作下拉 · 搜索 │ │ ·状态·标签    │
│ ·合并请求   │  ├── [Issue 列表]                                 │ │ ·指派者·里程碑│
│ ·CI/CD     │  │  每行: 封面图标 + 标题 + state badge            │ │ ·关注/回复数  │
│    ...     │  │        + 标签chips + 编号 + 作者 + 更新于        │ └───────────── │
│            │  └── 分页                                         │
└───────────┴────────────────────────────────────────────────────┘
```

- 左栏：项目侧栏。
- 中间：议题列表（fluid，最大 ~1100px）。
- 右侧栏：筛选条件面板（可用左侧栏或弹层代替——移动端收起）。

## 页面自上而下结构

1. **标题区**
   - 标题 h1 "议题 Issues"（heading-scale）+ 已打开/已关闭计数徽章（`Open 12` / `Closed 4`，badge 语义色）。
   - **新建议题** 按钮（confirm/primary）。
   - 布局切换：列表模式 / **看板模式**（board）切换（GlButtonGroup，icon-only）。

2. **筛选/搜索工具条**
   - 文本搜索框（GlFormInput，带 search 图标、filters 下拉按钮）。
   - **排序下拉**：最近更新、创建时间、优先级、人气、权重。
   - **批量操作** 下拉：批量指派、批量加标签、批量关闭（选中模式下 "已选 N" + 取消）。
   - 全局筛选 chips 区：活动状态（Open/Closed/All）且支持去重操作。

3. **筛选条件面板（右侧）**
   - **状态**：Open / Closed / 全部。
   - **标签 Labels**：多选 checkbox 列表（各色 chips）。
   - **里程碑 Milestone**：下拉多选。
   - **指派者 Assignee**：头像 + 姓名多选。
   - **权重 / 关注人数 / 模板** 等高级过滤。
   - 每个筛选组可独立清除；有活动筛选时显示"Clear filters"按钮（dropdown 的 clear-all 风格）。

4. **Issue 列表（GlTable 行 或 列表行）**
   每行结构：
   - 选择框（批量操作模式）。
   - **封面图/封面图标**（若有 cover image 缩略图）。
   - 主信息：标题（链接，粗体）+ **状态 badge**（Open=success 绿 / Closed=neutral + 短线、/ 或图标）+ 标签 chips + 里程碑。
   - 次信息（subtitle 灰）：`#编号 · 作者头像 作者 · 更新于 3 天前`。
   - 右侧计数：回复数（comment 图标 + N）、关注数（eye/星标）。

5. **分页**：页面底部分页条。

## 看板模式（Board）

- 看板 **列表（列）= 标签或里程碑**，横向滚动。
- 每列：列头（标签色条 + 名称 + 数量 badge）+ 卡片列。
- 卡：标题 + 编号 + 标签 chips + 负责人头像。
- 交互：拖拽跨列移动（更改变量/状态），新列按钮，过滤器应用在跨列。

## 使用的组件列表

GlButton/GlButtonGroup（布局切换、新建）、GlFormInput（搜索）、GlDropdown/GlDropdownItem（排序、批量操作、筛选组）、GlBadge（状态/计数）、GlLabel（标签 chips）、GlAvatar、GlTabs（状态切换 Open/Closed/All）、GlTable、GlLoadingIcon、GlSkeleton、GlModal（批量删除确认）、GlIcon、GlToast。

## 关键交互状态

| 状态 | 表现 |
|---|---|
| 打开/关闭切换 | 标题左侧状态图标+颜色切换（Open 绿 `--gl-text-success-*` / 关闭灰） |
| 批量选择 | 行显现 checkbox，工具条出现"已选 N"操作 |
| 筛选生效 | 右侧面板高亮，列表即时刷新，空态显示"无匹配议题" |
| 看板拖拽 | 拖动状态时卡片垫灰、目标列高亮边框 |
| 加载 | 行 skeleton 屏 |

## 间距与令牌要点

- 行分隔 `--gl-border-color-subtle`/`default`，行 hover `--gl-table-row-background-color-hover`、点击 `--gl-color-alpha-dark-4`。
- 标题行 `gl-px-0 gl-py-4`；筛选工具条 `gl-py-3`；列表卡片 `gl-bg-white gl-shadow-sm` + `--gl-border-radius-lg`。
- 标签 chips 颜色来自 label 自定义色（引用 `--gl-badge-*` 中性底 + 自定前景），id/副文本用 `--gl-text-subtle-color`。