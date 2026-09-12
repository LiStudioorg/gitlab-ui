# 页面骨架：项目首页（Project Home / Overview）

> 复刻对象：GitLab 项目详情首页（`/projects/:id` 的 Overview/README 视图）。
> 本文件只描述**结构**，不复制任何实际页面 HTML 或版权内容。

## 整体布局

```
┌──────────────────────────────────────────────────────────────┐
│ [顶部全局导航]                                                  │
├───────────┬────────────────────────────────────────────────────┤
│ [左侧栏]   │  [中间主内容]                           [右侧栏]     │
│ ·概览      │  · project 标题 + 可见性 badge + 星标/维基等         │ ·项目信息简介  │
│ ·代码      │  · 操作工具条 (Clone下拉/More)                      │ ·README 相关  │
│ ·议题      │  · Tab: 概览/议题/合并请求/CI-CD/部署/操作等(带计数)  │   组件块名单   │
│ ·合并请求   │  ├── 项目动态/README 内容区                         │ ·统计(星标/分叉 │
│    ...     │  └── 最近提交 + 存储库统计                          │  /提交/分支...)│
└───────────┴────────────────────────────────────────────────────┘
```

- 左栏：项目级侧栏（全量：概览、代码、议题、合并请求、CI/CD、部署、监控、包装、项目管理等，带图标）。
- 中间：项目概览主内容（fluid，MAX ~1000px）。
- 右侧栏：项目信息卡（小屏折叠到顶部手风琴）。

## 页面自上而下结构

1. **项目标题区**
   - 项目名（h1，heading-scale）+ **可见性 badge**（私有 Privigte/内部 Internal/公开 Public，GlBadge variant 随类型）+ 命名空间面包屑。
   - 右侧操作：**星标 Star**、编辑详情、**Clone** 按钮（GlDropdown：HTTP/SSH 地址 + 复制按钮）、省略号 More。
   - 快照卡：README 快速预览入口（可选）。

2. **Tab 导航**（GlTabs，带计数）
   - `概览`（`tabCount` 动态）、`议题`、`合并请求`、`CI/CD`、`部署`、`操作`、`监控`、`分析`、`Wiki`、`包寄存器`。
   - 计数用 `gl-tab-item-count`（GlBadge neutral）。

3. **概览内容区**
   - **README / 项目描述**：主白色卡片渲染 markdown（README 为空则提示"添加 README/License/CHANGELOG"）。
   - **最近变更/动态**：最近 commit 列表（短 SHA + 标题 + 时间 + 作者头像），链接到提交历史。
   - **近期合并请求 / 议题**精简块（可选）。
   - **CI/CD 状态摘要**：最近 pipeline 徽章（仅当存在）。

4. **右侧信息卡**（`.gl-card` 列表）
   - 项目描述、Web URL、SSH URL。
   - 统计网格：Star 数、Fork 数、提交数、分支数、Tags、克隆量。
   - **管理快捷**：成员、安全扫描、设置入口链接。
   - **文件视图**：默认分支、README 统计（LANGUAGES、bytes）。

## 使用的组件列表

GlButton、GlButtonGroup、GlDropdown（Clone/More）、GlBadge（可见性/CI 状态）、GlTabs/GlTab、GlAvatar、GlLink、GlLabel、GlIcon、GlTable / 卡片列表（recent activity）、GlSkeleton、GlToast（复制成功提示）。

## 关键交互状态

| 状态 | 表现 |
|---|---|
| 隐私 Change | 可见性 badge 随项目设置切换 variant/颜色 |
| Star/Fork | 计数即时 +1，Fork 弹 GlModal 确认 |
| Clone | 复制成功后 GlToast 底部提示"已复制" |
| CI 未配置 | 错误/中性提示牌：链接到 CI/CD 设置 |
| 加载 | 顶部骨架屏 + 卡内 skeleton |
| README 缺失 | 居中空状态插画（illustration 令牌配色）+ 引导按钮 |

## 间距与令牌要点

- 页面背景 `--gl-background-color-default`，卡片 `--gl-background-color-overlap`（白）+ `--gl-border-radius-lg` + `--gl-shadow-sm`。
- 标题行 `gl-py-4`；Tab 与内容用 `gl-py-5`；卡间距 `gl-mb-5`（--gl-spacing-scale-5）。
- 统计数字用 `--gl-font-size-xlarge` / `--gl-font-weight-bold`；辅助文字 `--gl-text-subtle-color`。