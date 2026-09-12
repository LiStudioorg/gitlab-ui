/**
 * pages-lib/astro.js
 * 渲染 Astro 页面（dist/astro/src/pages/<page>.astro），import ../components。
 * Astro 为静态输出；暗色切换等交互用 <script is:inline> 实现。
 */
const D = require('./shared');

const MOON_Q = D.icons.moon.replace(/"/g, '&quot;');
const SUN_Q = D.icons.sun.replace(/"/g, '&quot;');

function sidenavMarkup(activeNav) {
  return D.sidenav
    .map((item) => {
      if (item.children) {
        const kids = item.children
          .map(
            (c) =>
              `        <a class="pg-nav-link pg-nav-child${c.active === activeNav ? ' is-active' : ''}" href="${c.href}">${c.label}</a>`
          )
          .join('\n');
        return `      <div class="pg-nav-group">
        <span class="pg-nav-link pg-nav-parent"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons[item.icon]}</svg>${item.label}</span>
        <div class="pg-nav-children">
${kids}
        </div>
      </div>`;
      }
      const cnt = item.count != null ? `<span class="pg-nav-count">${item.count}</span>` : '';
      const act = item.active === activeNav ? ' is-active' : '';
      return `      <a class="pg-nav-link${act}" href="${item.href}"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons[item.icon]}</svg>${item.label}${cnt}</a>`;
    })
    .join('\n');
}

const THEME_SCRIPT = `<script is:inline>
  (function () {
    var root = document.getElementById('gl-root');
    var btn = document.getElementById('gl-theme-toggle');
    if (!btn || !root) return;
    var MOON = ${JSON.stringify(MOON_Q)};
    var SUN = ${JSON.stringify(SUN_Q)};
    btn.addEventListener('click', function () {
      var dark = root.classList.toggle('gl-dark');
      var span = btn.querySelector('.pg-theme-icon');
      if (span) span.innerHTML = dark ? SUN : MOON;
    });
  })();
</script>`;

const chipHelpers = `const chipBg = (c) => ({
  neutral: 'var(--gl-badge-neutral-background-color-default)',
  info: 'var(--gl-badge-info-background-color-default)',
  success: 'var(--gl-badge-success-background-color-default)',
  warning: 'var(--gl-badge-warning-background-color-default)',
  danger: 'var(--gl-badge-danger-background-color-default)',
  tier: 'var(--gl-badge-tier-background-color-default)',
}[c] || 'var(--gl-badge-neutral-background-color-default)');
const chipFg = (c) => ({
  neutral: 'var(--gl-badge-neutral-text-color-default)',
  info: 'var(--gl-badge-info-text-color-default)',
  success: 'var(--gl-badge-success-text-color-default)',
  warning: 'var(--gl-badge-warning-text-color-default)',
  danger: 'var(--gl-badge-danger-text-color-default)',
  tier: 'var(--gl-badge-tier-text-color-default)',
}[c] || 'var(--gl-badge-neutral-text-color-default)');`;

/* 页面级 CSS（is:global），引用 ../../css/variables.css 的令牌 */
function pageCss() {
  return `<style is:global>
@import '../../../css/variables.css';
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
h1, h2, h3, h4 { margin: 0; }
a { text-decoration: none; }
${require('./pagecss')()}
</style>`;
}

function layout({ title, activeNav, sideTitle, frontmatter, main, styleExtra }) {
  const css = pageCss();
  return `---
// 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。
import GlButton from '../components/Button.astro';
import GlBadge from '../components/Badge.astro';
import GlAlert from '../components/Alert.astro';
import GlTabs from '../components/Tabs.astro';
import GlDropdown from '../components/Dropdown.astro';
import GlInput from '../components/Input.astro';
import GlTable from '../components/Table.astro';

${frontmatter || ''}
---
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body>
<div id="gl-root" class="pg-page">
  <!-- 顶部全局导航 -->
  <header class="pg-topbar">
    <div class="pg-topbar-left">
      <span class="pg-topbar-brand">${D.meta.productName}</span>
      <label class="pg-search">
        <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.search}</svg>
        <input type="search" placeholder="搜索或输入命令" aria-label="搜索" />
      </label>
    </div>
    <div class="pg-topbar-right">
      <button type="button" id="gl-theme-toggle" class="pg-icon-btn" aria-label="切换暗色模式" title="切换暗色模式">
        <span class="pg-theme-icon inline-flex"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.moon}</svg></span>
      </button>
      <button type="button" class="pg-icon-btn" aria-label="新建">
        <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.plus}</svg>
      </button>
      <span class="pg-avatar" title="${D.user.name}">${D.user.initials}</span>
    </div>
  </header>

  <div class="pg-shell">
    <!-- 左侧项目导航 -->
    <aside class="pg-sidenav" aria-label="项目导航">
      <div class="pg-sidenav-project">
        <span class="pg-sidenav-avatar"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.folder}</svg></span>
        <span class="pg-sidenav-meta">
          <span class="pg-sidenav-name">${sideTitle}</span>
          <span class="pg-sidenav-ns">${D.meta.productName}</span>
        </span>
      </div>
      <nav class="pg-sidenav-nav">
${sidenavMarkup(activeNav)}
      </nav>
    </aside>

    <!-- 主内容 -->
    <main class="pg-main">
${main}
    </main>
  </div>
</div>
${THEME_SCRIPT}
${css.replace('</style>', (styleExtra || '') + '\n</style>')}
</body>
</html>
`;
}

/* ===================== merge-request.astro ===================== */

function mergeRequest() {
  const m = D.mergeRequest;
  const frontmatter = `const mr = ${JSON.stringify(m, null, 2)};`;
  const main = `    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div class="min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h1 class="pg-h1">{mr.title}</h1>
          <GlBadge variant="info">!{mr.id}</GlBadge>
          <GlBadge variant="info">开启中</GlBadge>
        </div>
        <p class="pg-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
          <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{mr.source}</span>
          →
          <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{mr.target}</span>
          <span>· 由 {mr.author} 于 {mr.createdAt} 创建</span>
        </p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <GlButton category="secondary">编辑</GlButton>
        <GlButton category="secondary">转为草稿</GlButton>
        <GlButton variant="confirm">合并</GlButton>
      </div>
    </div>

    <div class="mt-5">
      <GlTabs
        client:load
        tabs={[
          { title: '概览' },
          { title: '提交', count: mr.commits },
          { title: '流水线' },
          { title: '变更' },
          { title: '讨论', count: mr.discussionCount },
        ]}
      />
    </div>

    <div class="mt-5 flex flex-col gap-5">
      <GlAlert variant="info" title="检查进行中" dismissible={false}>
        流水线正在运行，完成后可合并（{mr.checksPassed} / {mr.checksTotal} 项检查已通过）。
      </GlAlert>

      <section class="pg-card p-5">
        <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">描述</h2>
        <p class="m-0" style="max-width: var(--gl-spacing-scale-62)">{mr.description}</p>
      </section>

      <section aria-label="讨论时间线" class="flex flex-col gap-4">
        {mr.discussions.map((d) => (
          <article class="pg-card p-5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="pg-avatar pg-avatar-sm">{d.author.slice(0, 1)}</span>
              <span class="font-bold text-[color:var(--gl-text-color-strong)]">{d.author}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">{d.time}</span>
              <GlBadge variant={d.resolved ? 'success' : 'warning'}>{d.resolved ? '已解决' : '待回复'}</GlBadge>
            </div>
            <p class="mt-2 mb-0">{d.body}</p>
            {d.replies.map((r) => (
              <div class="mt-4 pl-5" style="border-left: 1px solid var(--gl-border-color-subtle)">
                <span class="font-bold text-[length:var(--gl-font-size-base)]">{r.author}</span>
                <span class="pg-subtle text-[length:var(--gl-font-size-sm)] ml-2">{r.time}</span>
                <p class="mt-1 mb-0">{r.body}</p>
              </div>
            ))}
          </article>
        ))}
      </section>

      <section class="pg-card p-5" aria-label="批准状态">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-bold text-[color:var(--gl-text-color-strong)]">批准</span>
          <GlBadge variant="warning">{mr.approvals.given} / {mr.approvals.required} 批准已提交</GlBadge>
        </div>
        <div class="mt-3 flex items-center gap-3 flex-wrap">
          {mr.reviewers.map((r) => (
            <span class="flex items-center gap-2">
              <span class="pg-avatar pg-avatar-sm">{r.name.slice(0, 1)}</span>
              <span>{r.name}</span>
            </span>
          ))}
        </div>
      </section>

      <section class="pg-card p-5" aria-label="合并操作">
        <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">合并设置</h2>
        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2"><input type="checkbox" checked /> 合并后删除源分支</label>
          <label class="flex items-center gap-2"><input type="checkbox" /> 以合并提交方式并入</label>
        </div>
        <div class="mt-4 flex gap-2 flex-wrap">
          <GlButton variant="confirm">确认合并</GlButton>
          <GlButton category="secondary">关闭合并请求</GlButton>
        </div>
      </section>
    </div>
`;

  return layout({
    title: '合并请求 · 代码评审平台',
    activeNav: 'merge-request',
    sideTitle: D.meta.projects.web,
    frontmatter,
    main,
  });
}

/* ===================== pipeline.astro ===================== */

function pipeline() {
  const p = D.pipeline;
  const frontmatter = `const pl = ${JSON.stringify(p, null, 2)};
const jobFields = [
  { key: 'name', label: '作业', sortable: true },
  { key: 'stage', label: '阶段' },
  { key: 'status', label: '状态' },
  { key: 'duration', label: '时长' },
  { key: 'coverage', label: '覆盖率' },
];
const statusText = { success: '成功', failed: '失败', running: '运行中', created: '已创建', manual: '手动', skipped: '已跳过' };`;
  const main = `    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div class="min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h1 class="pg-h1">流水线 #{pl.id}</h1>
          <GlBadge variant="info">运行中</GlBadge>
        </div>
        <p class="pg-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
          <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{pl.branch}</span>
          <span>· {pl.sha} {pl.commitMsg}</span>
          <span>· 由 {pl.trigger} 触发 · 已运行 {pl.duration}</span>
        </p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <GlButton category="secondary">重试</GlButton>
        <GlButton category="secondary">取消</GlButton>
        <GlButton variant="confirm">运行流水线</GlButton>
      </div>
    </div>

    <div class="mt-5 flex flex-col gap-5">
      <section class="pg-card p-5" aria-label="流水线阶段图">
        <div class="flex items-center gap-4 overflow-x-auto pb-2">
          {pl.stages.map((st, si) => (
            <div class="flex items-center gap-4">
              <div class="flex flex-col gap-3">
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">{st.name}</span>
                {st.jobs.map((j) => (
                  <button type="button" class="pg-job" data-status={j.status} title={\`\${j.name} · \${statusText[j.status] || j.status} · \${j.duration}\`}>
                    {j.status === 'running' ? (
                      <svg class="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true">${D.icons.spinner}</svg>
                    ) : (
                      <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.check}</svg>
                    )}
                    <span class="min-w-0 text-left">
                      <span class="block">{j.name}</span>
                      <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">{j.duration}</span>
                    </span>
                  </button>
                ))}
              </div>
              {si < pl.stages.length - 1 && <span class="pg-stage-arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
        <hr class="pg-divider" />
        <div class="flex items-center gap-4 flex-wrap text-[length:var(--gl-font-size-sm)] pg-subtle">
          <GlBadge variant="success">成功 {pl.counts.success}</GlBadge>
          <GlBadge variant="danger">失败 {pl.counts.failed}</GlBadge>
          <GlBadge variant="info">运行中 {pl.counts.running}</GlBadge>
          <GlBadge variant="neutral">其他 {pl.counts.other}</GlBadge>
          <span class="ml-auto">总耗时 {pl.duration}</span>
        </div>
      </section>

      <GlTabs
        client:load
        tabs={[
          { title: '概览' },
          { title: '作业', count: pl.jobs.length },
          { title: '图表' },
          { title: '下游流水线' },
        ]}
      />

      <section class="pg-card overflow-hidden" aria-label="作业列表">
        <GlTable items={pl.jobs} fields={jobFields} />
      </section>
    </div>
`;

  const styleExtra = `
.pg-job { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-overlap); min-width: var(--gl-spacing-scale-37); cursor: pointer; }
.pg-job:hover { box-shadow: var(--gl-shadow-sm); }
.pg-job[data-status='success'] { border-color: var(--gl-alert-success-border-color); }
.pg-job[data-status='success'] > svg { color: var(--gl-feedback-success-icon-color); }
.pg-job[data-status='failed'] { border-color: var(--gl-alert-danger-border-color); }
.pg-job[data-status='failed'] > svg { color: var(--gl-feedback-danger-icon-color); }
.pg-job[data-status='running'] > svg { color: var(--gl-feedback-info-icon-color); }
.pg-stage-arrow { color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-500-fixed); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
`;

  return layout({
    title: '流水线 · 持续集成',
    activeNav: 'pipeline',
    sideTitle: D.meta.projects.web,
    frontmatter,
    main,
    styleExtra,
  });
}

/* ===================== project-home.astro ===================== */

function projectHome() {
  const pr = D.projectHome;
  const frontmatter = `const pr = ${JSON.stringify(pr, null, 2)};`;
  const main = `    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div class="min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h1 class="pg-h1">{pr.namespace} / {pr.name}</h1>
          <GlBadge variant="success">公开</GlBadge>
        </div>
        <p class="pg-subtle mt-2 mb-0">{pr.description}</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <GlButton category="secondary">星标 {pr.stars}</GlButton>
        <GlButton category="secondary">克隆</GlButton>
        <GlDropdown text="更多操作" items={[{ text: '编辑详情' }, { text: '归档项目' }]} />
      </div>
    </div>

    <div class="mt-5">
      <GlTabs
        client:load
        tabs={[
          { title: '概览' },
          { title: '议题', count: 12 },
          { title: '合并请求', count: 3 },
          { title: 'CI/CD' },
          { title: '部署' },
          { title: '分析' },
        ]}
      />
    </div>

    <div class="mt-5 flex flex-col gap-5">
      <section class="pg-card p-5" aria-label="README">
        <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">README</h2>
        <h3 class="text-[length:var(--gl-font-size-400-fixed)] mb-2">{pr.readme.heading}</h3>
        {pr.readme.paragraphs.map((t) => <p class="mt-0">{t}</p>)}
        <hr class="pg-divider" />
        <div class="flex items-center gap-2 flex-wrap pg-subtle text-[length:var(--gl-font-size-sm)]">
          <GlBadge variant="info">流水线 #{pr.latestPipeline.id} · 运行中</GlBadge>
          <span>最近推送于 {pr.recentCommits[0].time}</span>
        </div>
      </section>

      <section class="pg-card p-5" aria-label="最近提交">
        <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">最近提交</h2>
        <ul class="flex flex-col gap-3 m-0 p-0 list-none">
          {pr.recentCommits.map((c) => (
            <li class="flex items-center gap-3 flex-wrap">
              <span class="pg-sha">{c.sha.slice(0, 8)}</span>
              <span class="min-w-0">{c.msg}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)] ml-auto">{c.author} · {c.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
`;

  const styleExtra = `
.pg-sha { font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); background-color: var(--gl-color-alpha-dark-4); border-radius: var(--gl-border-radius-sm); padding: 0 var(--gl-spacing-scale-1); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
`;

  return layout({
    title: '项目概览 · my-project',
    activeNav: 'project-home',
    sideTitle: D.meta.projects.home,
    frontmatter,
    main,
    styleExtra,
  });
}

/* ===================== issues.astro ===================== */

function issues() {
  const it = D.issues;
  const frontmatter = `const it = ${JSON.stringify(it, null, 2)};
${chipHelpers}`;
  const main = `    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="pg-h1">议题</h1>
        <GlBadge variant="success">进行中 {it.openCount}</GlBadge>
        <GlBadge variant="neutral">已关闭 {it.closedCount}</GlBadge>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <GlButton category="secondary">列表</GlButton>
        <GlButton category="secondary">看板</GlButton>
        <GlButton variant="confirm">新建议题</GlButton>
      </div>
    </div>

    <div class="mt-5 flex items-center gap-3 flex-wrap" role="search" aria-label="筛选工具条">
      <GlInput type="search" placeholder="按标题或编号搜索" width="md" />
      <GlDropdown text="状态: 进行中" items={[{ text: '进行中', checked: true }, { text: '已关闭' }]} showClearAll />
      <GlDropdown text="排序: 最近更新" items={[{ text: '最近更新' }, { text: '创建时间' }, { text: '优先级' }, { text: '人气' }]} />
    </div>

    <div class="mt-5 flex flex-col gap-5">
      <section class="pg-card" aria-label="议题列表">
        <ul class="flex flex-col m-0 p-0 list-none">
          {it.list.map((i) => (
            <li class="pg-issue-row">
              <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.issue}</svg>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-bold text-[color:var(--gl-text-color-strong)]">{i.title}</span>
                  <GlBadge variant={i.state === 'opened' ? 'success' : 'neutral'}>{i.state === 'opened' ? '进行中' : '已关闭'}</GlBadge>
                  {i.labels.map((l) => (
                    <span class="pg-chip" style={\`background-color: \${chipBg(l.color)}; color: \${chipFg(l.color)}\`}>{l.text}</span>
                  ))}
                </div>
                <p class="pg-subtle text-[length:var(--gl-font-size-sm)] mt-1 mb-0">#{i.id} · 由 {i.author} 创建 · 更新于 {i.updated}</p>
              </div>
              <div class="flex items-center gap-4 pg-subtle text-[length:var(--gl-font-size-sm)]">
                <span title="评论数">{i.comments}</span>
                <span title="关注数">{i.watchers}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="看板视图">
        <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">看板</h2>
        <div class="flex gap-4 overflow-x-auto pb-2">
          {it.boardColumns.map((col) => (
            <div class="pg-board-col">
              <div class="flex items-center gap-2">
                <span class="pg-board-dot" style={\`background-color: \${chipBg(col.color)}\`}></span>
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">{col.label}</span>
                <GlBadge variant="neutral">{col.cards.length}</GlBadge>
              </div>
              {col.cards.map((c) => (
                <div class="pg-board-card" draggable="true">
                  <p class="m-0 font-bold text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-strong)]">{c.title}</p>
                  <div class="flex items-center gap-2 mt-2 flex-wrap">
                    {c.labels.map((l) => (
                      <span class="pg-chip" style={\`background-color: \${chipBg(l.color)}; color: \${chipFg(l.color)}\`}>{l.text}</span>
                    ))}
                    <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">#{c.id}</span>
                    <span class="ml-auto pg-avatar pg-avatar-sm">{c.assignee.slice(0, 1)}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
`;

  const styleExtra = `
.pg-issue-row { display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.pg-issue-row:hover { background-color: var(--gl-table-row-background-color-hover); }
.pg-issue-row > svg { margin-top: var(--gl-spacing-scale-1); color: var(--gl-text-color-subtle); }
.pg-board-col { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-3); width: var(--gl-spacing-scale-62); flex-shrink: 0; padding: var(--gl-spacing-scale-3); border: 1px dashed var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-subtle); }
.pg-board-dot { width: var(--gl-line-height-16); height: var(--gl-line-height-16); border-radius: var(--gl-border-radius-full); flex-shrink: 0; }
.pg-board-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); padding: var(--gl-spacing-scale-3); box-shadow: var(--gl-shadow-sm); cursor: grab; }
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }
`;

  return layout({
    title: '议题 · my-project',
    activeNav: 'issues',
    sideTitle: D.meta.projects.home,
    frontmatter,
    main,
    styleExtra,
  });
}

module.exports = { mergeRequest, pipeline, projectHome, issues };
