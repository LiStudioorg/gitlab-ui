# 页面骨架：Merge Request

> 复刻对象：GitLab Merge Request 详情页（gitlab-org/gitlab 的 `/-/merge_requests/:id`）。
> 本文件只描述**结构**，不复制任何实际页面 HTML 或版权内容。

## 整体布局（横向三分区）

```
┌──────────────────────────────────────────────────────────────┐
│ [顶部全局导航]  logo · 搜索 · 创建(+) · 用户菜单                  │  z: 高，全宽
├───────────┬────────────────────────────────────────┬─────────┤
│           │                                        │         │
│ [左侧栏]   │  [中间主内容]                           │ [右侧栏]  │
│ ·项目名    │  · MR 标题栏                           │ ·关于此 MR │
│ ·代码      │  · tabs: 概览/提交/管线/变更/讨论        │  (元信息)  │
│ ·议题      │  · 核心内容区                          │ ·审查者/指派 │
│ ·合并请求   │                                        │ ·标签/里程碑│
│ ·CI/CD    │                                        │         │
└───────────┴────────────────────────────────────────┴─────────┘
```

- 左侧栏：固定宽度（~240px），可折叠为图标条，项目级侧栏导航。
- 中间：自适应（fluid），最大内容宽度，承载 MR 正文与讨论时间线。
- 右侧栏：固定宽度（~320px），MR 元信息面板，移动端折叠为页面顶部区块。
- 全局导航与左侧栏独立于本页面，所有页面共用。

## 中间主内容：自上而下

1. **标题区**
   - MR 标题（h1，`gl-heading-scale-500`）+ 分支引用（`source → target`）+ MR 编号（`!123`）。
   - 状态徽章区：`Draft`（badge neutral/ 或草稿）、`Ready`、`WIP`、`Merged` 等。
   - 操作按钮行（右侧）：编辑、标为草稿切换、**Merge**（confirm 主按钮）、关闭。
   - 负责人头像行：Open/说明链接、作者头像。

2. **Tab 导航**（GlTabs）
   - `概览 Overview` / `提交 Commits`（带计数 badge）/ `管线 Pipelines` / `变更 Changes` / `讨论 Discussion`（带计数 badge）。
   - 用 `:sync-active-tab-with-query-params` 支持深链接。

3. **概览内容**
   - **状态提示条（GlAlert）**：可合并（success）；出现冲突/检查失败（danger/warning）；合并冲突时显示提示与"解决冲突"按钮。
   - **正文区**：MR 描述（markdown 渲染），白卡片，最大宽度 ~730px。
   - **讨论时间线**（竖向分隔）：左右交替的用户评论卡片（作者头像、正文、回复/编辑按钮、讨论线程可折叠）。每个评论：头像 + 时间 + 操作图标。
   - **批准区**：批复人数 "x of y approvals remaining"，审查者列表 badge。
   - **"合并/关闭"操作卡**（页面底部）：合并策略 checkbox（合并后删除源分支/挤压提交/编辑提交信息）+ confirm 按钮。

## 右侧栏元信息面板

- **协助区**：`Merge request` 状态、作者（头像链接）。
- **Reviewers**：审查者头像列表，可 Add。
- **Assignees**：指派者 avatar。
- **Labels**：标签 chips（GlBadge 风格，各色）。
- **Milestone** 里程碑。
- **Time tracking**、**weight** 等。
- **任务完成度**：加权/未加权 checklist 比例。

## 使用的组件列表

GlButton（含 GlButtonGroup）、GlTabs/GlTab、GlBadge、GlAlert、GlAvatar、GlLink、GlLabel、GlDropdown、GlModal（关闭/合并确认）、GlTooltip、GlLoadingIcon、GlIcon、GlMarkdown/或富文本渲染、Git graph 元素、GlSkeleton（加载时）。

## 关键交互状态

| 状态 | 表现 |
|---|---|
| Draft / Ready | 标题旁 badge 切换；Draft 时 Merge 按钮禁用 |
| 有冲突 | Alert(danger) "合并请求存在冲突"，合并按钮禁用 |
| 检查进行中 | 管线状态 spin + "正在运行" |
| 已批准/待批准 | 批准计数 badge 颜色 success/neutral |
| 合并后 | 页面顶部绿色提示条 + 标题旁 `Merged` badge，按钮区消失 |
| 加载 | 内容区 GlSkeleton 骨架屏 |

## 间距与令牌要点

- 主内容行内间距用 `gl-p-5`/`gl-py-5`；卡片为白底 `gl-bg-white` + 圆角 `--gl-border-radius-lg` + 边框 `--gl-border-color-default` 或阴影。
- 标题 h1 用 heading-scale 令牌；正文 `--gl-font-size-base`、行高 base。
- 分隔线 `--gl-borders-epoxy` 族 / `--gl-border-color-subtle`。