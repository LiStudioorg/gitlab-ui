/**
 * pages-lib/shared.js
 * 共享页面数据模型 + 设计令牌工具。
 * 所有框架的页面生成器读取这里的数据，保证 6 个框架 × 4 个页面
 * 的信息结构、文案、令牌一致。全部使用中性命名（无 GitLab/tanuki 字样）。
 */
module.exports = {
  meta: {
    productName: '代码评审平台',
    projects: { home: 'my-project', web: 'acme/web' },
    cssPath: 'css/variables.css', // 相对 dist 根
    cssUrl: '/css/variables.css', // next 等按根引用时使用
  },

  /** 当前登录用户 */
  user: { name: '王小明', initials: '王' },

  /** 左侧项目导航（所有页面共用） */
  sidenav: [
    { icon: 'doc', label: '概览', href: '#overview', group: null, active: 'project-home' },
    { icon: 'branch', label: '代码', href: '#code', group: null },
    { icon: 'issue', label: '议题', href: '#issues', group: null, count: 12, active: 'issues' },
    { icon: 'mr', label: '合并请求', href: '#merge-requests', group: null, count: 3, active: 'merge-request' },
    {
      icon: 'rocket',
      label: 'CI/CD',
      group: 'cicd',
      children: [
        { label: '流水线', href: '#pipelines', active: 'pipeline' },
        { label: '作业', href: '#jobs' },
        { label: '计划任务', href: '#schedules' },
      ],
    },
    { icon: 'deploy', label: '部署', href: '#deploy', group: null },
    { icon: 'chart', label: '分析与监控', href: '#monitor', group: null },
  ],

  /** Merge Request 页面数据 */
  mergeRequest: {
    id: 42,
    title: 'feat: 用户设置页支持键盘快捷键',
    source: 'feat/keyboard-shortcuts',
    target: 'main',
    state: 'ready', // ready | draft | merged
    author: '王小明',
    createdAt: '2026-09-10 14:20',
    branchCommits: 4,
    pipelineStatus: 'running', // running | success | failed
    checksPassed: 5,
    checksTotal: 6,
    description:
      '本合并请求为用户设置页新增全局键盘快捷键：\n\n- `Ctrl+K` 打开快速搜索\n- `g i` 跳转到议题列表\n- `g p` 跳转到合并请求列表\n\n同时在右上角新增快捷键帮助入口，附带文档更新。',
    approvals: { given: 1, required: 2 },
    reviewers: [
      { name: '李雷', color: 'blue' },
      { name: '韩梅梅', color: 'green' },
      { name: '赵大有', color: 'neutral' },
    ],
    assignees: [{ name: '王小明', color: 'blue' }],
    labels: [
      { text: 'backend', color: 'info' },
      { text: 'feature', color: 'success' },
      { text: 'needs docs', color: 'warning' },
    ],
    milestone: 'v3.4',
    discussions: [
      {
        id: 1,
        author: '李雷',
        color: 'blue',
        time: '3 小时前',
        body: '快捷键的注册逻辑建议收敛到一个统一的 hooks 里，避免和设置页状态耦合。',
        resolved: false,
        replies: [
          {
            id: 2,
            author: '王小明',
            color: 'blue',
            time: '2 小时前',
            body: '已拆出 useHotkeys.js，请再看一眼最新提交。',
          },
        ],
      },
      {
        id: 3,
        author: '韩梅梅',
        color: 'green',
        time: '昨天',
        body: '文档更新得很清楚，快捷键冲突检测部分也覆盖了吗？',
        resolved: true,
        replies: [],
      },
    ],
    discussionCount: 2,
    commits: 4,
  },

  /** Pipeline 页面数据 */
  pipeline: {
    id: 183,
    status: 'running', // running | success | failed
    branch: 'feat/keyboard-shortcuts',
    sha: 'a1b2c3d4',
    commitMsg: 'feat: 注册全局快捷键处理器',
    trigger: '王小明',
    duration: '4 分 12 秒',
    queuedAt: '2026-09-12 10:02',
    stages: [
      {
        name: '构建',
        jobs: [
          { name: 'install', status: 'success', duration: '1 分 30 秒' },
          { name: 'build', status: 'success', duration: '2 分 05 秒' },
        ],
      },
      {
        name: '测试',
        jobs: [
          { name: 'unit', status: 'success', duration: '3 分 12 秒' },
          { name: 'lint', status: 'failed', duration: '0 分 48 秒' },
          { name: 'integration', status: 'running', duration: '—' },
        ],
      },
      {
        name: '发布',
        jobs: [
          { name: 'package', status: 'created', duration: '—' },
          { name: 'deploy-staging', status: 'manual', duration: '—' },
        ],
      },
    ],
    jobs: [
      { name: 'install', stage: '构建', status: 'success', duration: '1 分 30 秒', coverage: '—' },
      { name: 'build', stage: '构建', status: 'success', duration: '2 分 05 秒', coverage: '78.4%' },
      { name: 'unit', stage: '测试', status: 'success', duration: '3 分 12 秒', coverage: '86.1%' },
      { name: 'lint', stage: '测试', status: 'failed', duration: '0 分 48 秒', coverage: '—' },
      { name: 'integration', stage: '测试', status: 'running', duration: '进行中', coverage: '—' },
      { name: 'package', stage: '发布', status: 'created', duration: '—', coverage: '—' },
      { name: 'deploy-staging', stage: '发布', status: 'manual', duration: '—', coverage: '—' },
    ],
    counts: { success: 3, failed: 1, running: 1, other: 2 },
  },

  /** 项目首页数据 */
  projectHome: {
    namespace: 'acme',
    name: 'my-project',
    visibility: 'public', // public | internal | private
    description: '一个用于演示设计系统的示例项目（示例数据）。',
    starred: true,
    stars: 128,
    forks: 24,
    commits: 1204,
    branches: 18,
    tags: 36,
    clones: 856,
    readme: {
      heading: 'my-project',
      paragraphs: [
        '这是示例项目的 README 占位内容，用于展示概览页的文档渲染效果。',
        '项目内置统一的间距、颜色与圆角令牌，所有界面颜色均引用 CSS 变量，暗色模式下自动切换。',
      ],
    },
    recentCommits: [
      { sha: 'a1b2c3d4', msg: 'feat: 注册全局快捷键处理器', author: '王小明', time: '2 小时前' },
      { sha: 'e5f6a7b8', msg: 'fix: 修复设置页表单校验提示', author: '李雷', time: '昨天' },
      { sha: 'c9d0e1f2', msg: 'docs: 更新贡献指南', author: '韩梅梅', time: '3 天前' },
      { sha: 'd3e4f5a6', msg: 'chore: 升级依赖到最新补丁版本', author: '赵大有', time: '5 天前' },
    ],
    latestPipeline: { id: 183, status: 'running', branch: 'main' },
  },

  /** Issues 页面数据 */
  issues: {
    openCount: 12,
    closedCount: 4,
    labels: [
      { text: 'bug', color: 'danger', count: 5 },
      { text: 'feature', color: 'success', count: 4 },
      { text: 'documentation', color: 'info', count: 3 },
      { text: 'good first issue', color: 'tier', count: 2 },
    ],
    assignees: [
      { name: '王小明', color: 'blue' },
      { name: '李雷', color: 'blue' },
      { name: '韩梅梅', color: 'green' },
      { name: '赵大有', color: 'neutral' },
    ],
    milestone: 'v3.4',
    list: [
      {
        id: 128,
        title: '暗色模式下徽章对比度不足',
        state: 'opened',
        labels: [
          { text: 'bug', color: 'danger' },
          { text: 'documentation', color: 'info' },
        ],
        author: '李雷',
        updated: '1 小时前',
        comments: 6,
        watchers: 3,
      },
      {
        id: 125,
        title: '看板列支持按里程碑分组',
        state: 'opened',
        labels: [{ text: 'feature', color: 'success' }],
        author: '韩梅梅',
        updated: '3 小时前',
        comments: 2,
        watchers: 8,
      },
      {
        id: 121,
        title: '议题列表空态缺引导按钮',
        state: 'opened',
        labels: [{ text: 'good first issue', color: 'tier' }],
        author: '王小明',
        updated: '昨天',
        comments: 4,
        watchers: 1,
      },
      {
        id: 117,
        title: '流水线图节点连线的虚线样式未对齐',
        state: 'opened',
        labels: [
          { text: 'bug', color: 'danger' },
          { text: 'feature', color: 'success' },
        ],
        author: '赵大有',
        updated: '2 天前',
        comments: 9,
        watchers: 5,
      },
      {
        id: 109,
        title: 'README 示例代码块高亮失败',
        state: 'closed',
        labels: [{ text: 'documentation', color: 'info' }],
        author: '李雷',
        updated: '5 天前',
        comments: 3,
        watchers: 0,
      },
    ],
    boardColumns: [
      {
        label: '待处理',
        color: 'neutral',
        cards: [
          { id: 128, title: '暗色模式下徽章对比度不足', labels: [{ text: 'bug', color: 'danger' }], assignee: '李雷' },
          { id: 121, title: '议题列表空态缺引导按钮', labels: [{ text: 'good first issue', color: 'tier' }], assignee: '王小明' },
        ],
      },
      {
        label: '进行中',
        color: 'info',
        cards: [
          { id: 125, title: '看板列支持按里程碑分组', labels: [{ text: 'feature', color: 'success' }], assignee: '韩梅梅' },
        ],
      },
      {
        label: '已完成',
        color: 'success',
        cards: [
          { id: 117, title: '流水线图节点连线的虚线样式未对齐', labels: [{ text: 'bug', color: 'danger' }], assignee: '赵大有' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 令牌 / 图标助手（框架无关）                                          */
  /* ------------------------------------------------------------------ */

  /** 语义状态 → (文本, badge variant) */
  jobStatus: {
    success: { text: '成功', variant: 'success' },
    failed: { text: '失败', variant: 'danger' },
    running: { text: '运行中', variant: 'info' },
    created: { text: '已创建', variant: 'neutral' },
    manual: { text: '手动', variant: 'warning' },
    skipped: { text: '已跳过', variant: 'neutral' },
  },

  issueState: {
    opened: { text: '进行中', variant: 'success' },
    closed: { text: '已关闭', variant: 'neutral' },
  },

  labelChipColors: {
    neutral: 'var(--gl-badge-neutral-background-color-default)',
    info: 'var(--gl-badge-info-background-color-default)',
    success: 'var(--gl-badge-success-background-color-default)',
    warning: 'var(--gl-badge-warning-background-color-default)',
    danger: 'var(--gl-badge-danger-background-color-default)',
    tier: 'var(--gl-badge-tier-background-color-default)',
  },
  labelChipText: {
    neutral: 'var(--gl-badge-neutral-text-color-default)',
    info: 'var(--gl-badge-info-text-color-default)',
    success: 'var(--gl-badge-success-text-color-default)',
    warning: 'var(--gl-badge-warning-text-color-default)',
    danger: 'var(--gl-badge-danger-text-color-default)',
    tier: 'var(--gl-badge-tier-text-color-default)',
  },

  /** 内联 SVG 图标（中性自绘，16x16 viewBox，无品牌图形） */
  icons: {
    doc: '<path d="M4 1.5h5.5L13 5v9.5H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 1.5V5h3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    branch: '<circle cx="4.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="12.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.3v5.4M11.5 5.3v1.2c0 1.6-1.2 2.5-2.8 2.5H6.3" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    issue: '<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/>',
    mr: '<circle cx="4.5" cy="3.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="12.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 5.3v1.2c0 1.6 1.2 2.5 2.8 2.5h2.4M9.7 7l1.8 1.8L13.3 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    rocket: '<path d="M8 1.8c2.5 1.4 3.8 3.7 3.8 6.4L10 10H6L4.2 8.2c0-2.7 1.3-5 3.8-6.4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="8" cy="6.2" r="1.2" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M6 10.5l-1.2 3M10 10.5l1.2 3M8 11v3.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    deploy: '<path d="M2 12l3-7 3 4 3-6 3 9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    chart: '<path d="M2.5 13.5h11M4.5 13V9M8 13V5.5M11.5 13V7.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    search: '<circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    plus: '<path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    star: '<path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    chevronDown: '<path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="M3 8.5l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    clock: '<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    comment: '<path d="M14 8a6 6 0 1 1-2.2-4.6L14 2.5l-.6 2.6A6 6 0 0 1 14 8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    eye: '<path d="M1.5 8S4 3.8 8 3.8 14.5 8 14.5 8 12 12.2 8 12.2 1.5 8 1.5 8z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    more: '<circle cx="3.5" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="12.5" cy="8" r="1.2" fill="currentColor"/>',
    spinner: '<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8A6 6 0 0 0 8 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    play: '<path d="M5 3.5v9l7-4.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    retry: '<path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.6h-2.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    cancel: '<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    list: '<path d="M5.5 4h9M5.5 8h9M5.5 12h9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="2.6" cy="4" r="1" fill="currentColor"/><circle cx="2.6" cy="8" r="1" fill="currentColor"/><circle cx="2.6" cy="12" r="1" fill="currentColor"/>',
    board: '<rect x="2" y="2.5" width="4.6" height="11" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="9.4" y="2.5" width="4.6" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    moon: '<path d="M13.2 9.8A5.5 5.5 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    sun: '<circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    folder: '<path d="M1.5 3.5h4.5l1.5 2h7v8h-13z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    user: '<circle cx="8" cy="5.5" r="2.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.8 13.8c.6-2.6 2.7-4 5.2-4s4.6 1.4 5.2 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    logo: '<circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 1.6v12.8M1.6 8h12.8" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" fill="currentColor"/>',
  },

  avatarColors: {
    blue: 'var(--gl-avatar-fallback-background-color-blue)',
    green: 'var(--gl-avatar-fallback-background-color-green)',
    neutral: 'var(--gl-avatar-fallback-background-color-neutral)',
  },
};
