# 页面骨架：Pipeline

> 复刻对象：GitLab CI/CD Pipeline 页面（`/-/pipelines/:id`）。
> 本文件只描述**结构**，不复制任何实际页面 HTML 或版权内容。

## 整体布局

```
┌──────────────────────────────────────────────────────────────┐
│ [顶部全局导航]                                                  │
├───────────┬────────────────────────────────────────────────────┤
│ [左侧栏]   │  [中间 Pipeline 详情]                              │
│ ·项目名    │  · 标题区: "#123 · Pipeline #123" + 状态 badge      │
│ ·代码      │  · 元信息行: 触发者·分支·commit·时长·省略号菜单        │
│ ·议题      │  ├── [Pipeline 图可视化]                           │
│ ·合并请求   │  │   stage1 → stage2 → stage3 (节点+连线)          │
│ ·CI/CD     │  │   (每个 job 为节点, 成功绿/失败红/跳过灰/进行蓝)    │
│   ·管线     │  └────────────────────────────────────────────── │
│    ...     │  · Tabs: 概览 Jobs 图表 智能测试 等                   │
└───────────┴────────────────────────────────────────────────────┘
```

- 左栏：项目侧栏导航（CI/CD 分组展开，含 Pipelines / Jobs / Schedules 等）。
- 中间：流水线详情（fluid 宽度、最大 ~1200px）。
- 无独立右栏；元信息收进标题下方一行。

## 页面自上而下结构

1. **标题区**
   - **状态徽章**（GlBadge）：各阶段状态聚合——成功 success / 失败 danger / 运行中 running（旋转 GlLoadingIcon）/ 跳过 neutral / 已取消 / 手动。点击 badge 打开"全部 job 状态"浮层。
   - 编号与链接（`地址 · #123`）、**重试 / 取消 / 新建"Run pipeline" / 省略号(More actions) 下拉**按钮。
   - 元信息：触发者头像滤镜、分支 badge（`main` + 图标）、commit 摘要（短 SHA + 首行）、创建时长、持续时长。

2. **Pipeline Graph（DAG 图）**
   - 以**阶段（stage）为列**、从左到右排布；同阶段 job 纵向排列。
   - 每个 **job 节点**：图标 + 名称 + 状态色 + 时长；失败/可变色边框（`--gl-button-*-danger-*` / 绿/灰/蓝）。
   - 节点间**连线**表示依赖；被跳过/手动节点用虚线或灰。
   - 点击节点弹出 **job 摘要 popover**：状态、触发者、时长、相关 commit、链接到 Job 页。
   - 图下方统计条：成功/失败/跳过的 job 计数、花费时长汇总。

3. **Tab 区**（GlTabs）：`概览 Overview`（图）、`Jobs`（job 表格）、`图表 Charts`（构建时间/成功率监控）、`智能测试`、`下游管线`（若多项目）。各 tab 内容：
   - Jobs 表格：GlTable 列 = Job / Stage / 状态 / 时长 / 覆盖率 / 日志；行可点击进入 job 页。
   - 失败 job 行 danger 色文字，运行中显示 spinner，失败时日志按钮提示。

4. **安全/下游提示区**：存在下游 pipeline 时显示链接卡。

## 使用的组件列表

GlButton（retry/cancel/run，secondary/danger）、GlBadge（状态徽章，variant 随状态）、GlLoadingIcon（running 态）、GlDropdown（More actions）、GlTabs/GlTab、GlTable、GlAlert（失败聚合提示）、GlTooltip（节点说明）、GlAvatar（触发者）、GlLink、GlIcon、`gl-pipeline-graph`（自定义图组件：节点/连线）、GlSkeleton（加载）。

## 关键交互状态

| 状态 | 表现 |
|---|---|
| running | 对应 badge/节点转圈（GlLoadingIcon 蓝色），"将自动更新" |
| success | 绿 `success` badge / 节点绿；check-circle 图标 |
| failed | 红 `danger` badge / 节点红；error 图标，聚合警告 Alert "The pipeline for … failed" |
| canceled / skipped / manual | neutral / 灰；手动 job 显示 play 图标"可手动运行" |
| 刷新 | 图轮询自动刷新（~10s），顶部显示上次更新时间 |
| 点击节点 | popover 摘要 + "查看 job" 链接 |

## 间距与令牌要点

- 状态色走语义令牌：success/warning/danger/neutral 直接对应 `--gl-text-success-*`、`--gl-text-danger-*`、`--gl-text-warning-*`、`--gl-text-neutral-*` 及 badge 令牌。
- 图节点：`--gl-button-*-border-radius` 圆角、background `--gl-background-color-strong`，边框 `--gl-border-color-default`。
- 阶段间距 `gl-gap-*` / `--gl-spacing-scale-8`；卡片 `gl-bg-white` + `gl-shadow-sm`。