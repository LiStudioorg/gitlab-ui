/**
 * pages-lib/svelte.js
 * 渲染 SvelteKit 页面（dist/sveltekit/src/routes/<page>/+page.svelte），import ../../../../components 等。
 * 组件从 dist/sveltekit/components 经 $lib 别名或相对路径引入；这里采用相对路径 ../../components。
 * 实际输出路径为 src/routes/<page>/+page.svelte，相对组件目录写作 ../../../../components（由生成器计算）。
 */
const D = require('./shared');

function sidenavMarkup(activeNav) {
  return D.sidenav
    .map((item) => {
      if (item.children) {
        const kids = item.children
          .map(
            (c) =>
              `          <a class="pg-nav-link pg-nav-child${c.active === activeNav ? ' is-active' : ''}" href="${c.href}">${c.label}</a>`
          )
          .join('\n');
        return `        <div class="pg-nav-group">
          <span class="pg-nav-link pg-nav-parent"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons[item.icon]}</svg>${item.label}</span>
          <div class="pg-nav-children">
${kids}
          </div>
        </div>`;
      }
      const cnt = item.count != null ? `<span class="pg-nav-count">${item.count}</span>` : '';
      const act = item.active === activeNav ? ' is-active' : '';
      return `        <a class="pg-nav-link${act}" href="${item.href}"><svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons[item.icon]}</svg>${item.label}${cnt}</a>`;
    })
    .join('\n');
}

function layout({ activeNav, sideTitle, main, scriptBody, styleExtra, extraMarkup }) {
  return `<!-- 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。 -->
<script>
  import { GlButton, GlBadge, GlAlert, GlTabs, GlDropdown, GlInput, GlTable } from '${D._componentImport || '../../../../components/index.js'}';

  let dark = false;
  function toggleDark() {
    dark = !dark;
  }

  const MOON_ICON = ${JSON.stringify(D.icons.moon.replace(/"/g, '&quot;'))};
  const SUN_ICON = ${JSON.stringify(D.icons.sun.replace(/"/g, '&quot;'))};

${scriptBody}
</script>

<div id="gl-root" class:gl-dark={dark} class="pg-page">
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
      <button type="button" class="pg-icon-btn" aria-label="切换暗色模式" title="切换暗色模式" on:click={toggleDark}>
        <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">{@html dark ? SUN_ICON : MOON_ICON}</svg>
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

${extraMarkup || ''}

<style>
.pg-page { min-height: 100vh; background-color: var(--gl-background-color-default); color: var(--gl-text-color-default); font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-24); }
.pg-topbar { position: sticky; top: 0; z-index: var(--gl-zindex-3); display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-4); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5); background-color: var(--gl-background-color-overlap); border-bottom: 1px solid var(--gl-border-color-default); }
.pg-topbar-left { display: flex; align-items: center; gap: var(--gl-spacing-scale-4); min-width: 0; }
.pg-topbar-right { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); }
.pg-topbar-brand { font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-400-fixed); color: var(--gl-text-color-heading); white-space: nowrap; }
.pg-search { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-control-background-color-default); width: min(22rem, 40vw); }
.pg-search input { border: 0; outline: none; background: transparent; color: var(--gl-text-color-default); font-size: var(--gl-font-size-sm); width: 100%; }
.pg-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-full); border: 0; background: transparent; color: var(--gl-text-color-default); cursor: pointer; }
.pg-icon-btn:hover { background-color: var(--gl-color-alpha-dark-4); }
.pg-avatar { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-avatar-circle-border-radius-default); background-color: var(--gl-avatar-fallback-background-color-blue); color: var(--gl-text-color-heading); font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-sm); }
.pg-icon { width: var(--gl-line-height-16); height: var(--gl-line-height-16); flex-shrink: 0; }
.pg-shell { display: flex; align-items: flex-start; }
.pg-sidenav { width: var(--gl-spacing-scale-30); flex-shrink: 0; position: sticky; top: var(--gl-spacing-scale-13); max-height: calc(100vh - var(--gl-spacing-scale-13)); overflow-y: auto; padding: var(--gl-spacing-scale-4); border-right: 1px solid var(--gl-border-color-default); min-height: calc(100vh - var(--gl-spacing-scale-13)); }
.pg-sidenav-project { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2); margin-bottom: var(--gl-spacing-scale-4); }
.pg-sidenav-avatar { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-md); background-color: var(--gl-avatar-fallback-background-color-neutral); }
.pg-sidenav-meta { min-width: 0; }
.pg-sidenav-name { display: block; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pg-sidenav-ns { display: block; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); }
.pg-sidenav-nav { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); }
.pg-nav-link { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-md); color: var(--gl-text-color-default); font-size: var(--gl-font-size-base); text-decoration: none; }
.pg-nav-link:hover { background-color: var(--gl-color-alpha-dark-4); }
.pg-nav-link.is-active { background-color: var(--gl-color-alpha-dark-8); color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.pg-nav-count { margin-left: auto; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); background-color: var(--gl-badge-muted-background-color-default); border-radius: var(--gl-border-radius-full); padding: 0 var(--gl-spacing-scale-2); }
.pg-nav-parent { font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); }
.pg-nav-children { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); margin-bottom: var(--gl-spacing-scale-2); }
.pg-nav-child { padding-left: var(--gl-spacing-scale-9); }
.pg-main { flex: 1 1 auto; min-width: 0; padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-6); }
.pg-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); box-shadow: var(--gl-shadow-sm); }
.pg-h1 { font-size: var(--gl-heading-scale-500-font-size); margin: 0; color: var(--gl-text-color-heading); font-weight: var(--gl-font-weight-heading); }
.pg-subtle { color: var(--gl-text-color-subtle); }
.pg-chip { display: inline-flex; padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); }
.pg-spin { animation: pg-spin 0.8s linear infinite; }
@keyframes pg-spin { to { transform: rotate(360deg); } }
@media (max-width: 639px) {
  .pg-sidenav { display: none; }
}
${styleExtra || ''}
</style>
`;
}

/* ===================== merge-request/+page.svelte ===================== */

function mergeRequest() {
  const m = D.mergeRequest;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="pg-h1">{mr.title}</h1>
            <GlBadge variant="info">!{mr.id}</GlBadge>
            <GlBadge variant={mr.state === 'merged' ? 'success' : mr.state === 'draft' ? 'warning' : 'info'}>
              {mr.state === 'merged' ? '已合并' : mr.state === 'draft' ? '草稿' : '开启中'}
            </GlBadge>
          </div>
          <p class="pg-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
            <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{mr.source}</span>
            →
            <span class="pg-chip" style="background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default)">{mr.target}</span>
            <span>· 由 {mr.author} 于 {mr.createdAt} 创建</span>
          </p>
        </div>
        {#if mr.state !== 'merged'}
        <div class="flex items-center gap-2 flex-wrap">
          <GlButton category="secondary">编辑</GlButton>
          <GlButton category="secondary">转为草稿</GlButton>
          <GlButton variant="confirm" disabled={!canMerge} on:click={mergeNow}>合并</GlButton>
        </div>
        {/if}
      </div>

      <div class="mt-5">
        <GlTabs tabs={mrTabs} active={0} />
      </div>

      <div class="mt-5 flex flex-col gap-5">
        {#if mr.state === 'merged'}
        <GlAlert variant="success" title="已合并">该合并请求已并入 {mr.target}。</GlAlert>
        {:else}
        <GlAlert variant="info" title="检查进行中" dismissible={false}>
          流水线正在运行，完成后可合并（{mr.checksPassed} / {mr.checksTotal} 项检查已通过）。
        </GlAlert>
        {/if}

        <section class="pg-card p-5">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">描述</h2>
          <p class="m-0" style="max-width: var(--gl-spacing-scale-62)">{mr.description}</p>
        </section>

        <section aria-label="讨论时间线" class="flex flex-col gap-4">
          {#each mr.discussions as d (d.id)}
          <article class="pg-card p-5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="pg-avatar pg-avatar-sm">{d.author.slice(0, 1)}</span>
              <span class="font-bold text-[color:var(--gl-text-color-strong)]">{d.author}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">{d.time}</span>
              <GlBadge variant={d.resolved ? 'success' : 'warning'}>{d.resolved ? '已解决' : '待回复'}</GlBadge>
            </div>
            <p class="mt-2 mb-0">{d.body}</p>
            {#each d.replies as r (r.id)}
            <div class="mt-4 pl-5" style="border-left: 1px solid var(--gl-border-color-subtle)">
              <span class="font-bold text-[length:var(--gl-font-size-base)]">{r.author}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)] ml-2">{r.time}</span>
              <p class="mt-1 mb-0">{r.body}</p>
            </div>
            {/each}
          </article>
          {/each}
        </section>

        <section class="pg-card p-5" aria-label="批准状态">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-[color:var(--gl-text-color-strong)]">批准</span>
            <GlBadge variant={mr.approvals.given >= mr.approvals.required ? 'success' : 'warning'}>
              {mr.approvals.given} / {mr.approvals.required} 批准已提交
            </GlBadge>
          </div>
          <div class="mt-3 flex items-center gap-3 flex-wrap">
            {#each mr.reviewers as r (r.name)}
            <span class="flex items-center gap-2">
              <span class="pg-avatar pg-avatar-sm" style={\`background-color: \${avatarBg(r.color)}\`}>{r.name.slice(0, 1)}</span>
              <span>{r.name}</span>
            </span>
            {/each}
          </div>
        </section>

        <section class="pg-card p-5" aria-label="合并操作">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">合并设置</h2>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2"><input type="checkbox" checked /> 合并后删除源分支</label>
            <label class="flex items-center gap-2"><input type="checkbox" /> 以合并提交方式并入</label>
          </div>
          <div class="mt-4 flex gap-2 flex-wrap">
            <GlButton variant="confirm" disabled={mr.state === 'merged'}>确认合并</GlButton>
            <GlButton category="secondary">关闭合并请求</GlButton>
          </div>
        </section>
      </div>
`;

  const scriptBody = `  const mr = ${JSON.stringify(m, null, 2).split('\n').join('\n  ')};

  $: canMerge = mr.pipelineStatus !== 'failed' && mr.state !== 'merged';

  const mrTabs = [
    { title: '概览' },
    { title: '提交', count: mr.commits },
    { title: '流水线' },
    { title: '变更' },
    { title: '讨论', count: mr.discussionCount },
  ];

  function mergeNow() {
    mr.state = 'merged';
  }

  const AVATAR_BG = {
    blue: 'var(--gl-avatar-fallback-background-color-blue)',
    green: 'var(--gl-avatar-fallback-background-color-green)',
    neutral: 'var(--gl-avatar-fallback-background-color-neutral)',
  };
  function avatarBg(color) {
    return AVATAR_BG[color] || AVATAR_BG.blue;
  }
`;

  const styleExtra = `
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }
`;

  return layout({
    activeNav: 'merge-request',
    sideTitle: D.meta.projects.web,
    main,
    scriptBody,
    styleExtra,
  });
}

/* ===================== pipeline/+page.svelte ===================== */

function pipeline() {
  const p = D.pipeline;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="pg-h1">流水线 #{pl.id}</h1>
            <GlBadge variant={pl.status === 'running' ? 'info' : 'success'}>
              {#if pl.status === 'running'}<svg class="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true">${D.icons.spinner}</svg>{/if}
              {pl.status === 'running' ? '运行中' : '已通过'}
            </GlBadge>
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
            {#each pl.stages as st, si}
            <div class="flex items-center gap-4">
              <div class="flex flex-col gap-3">
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">{st.name}</span>
                {#each st.jobs as j (j.name)}
                <button type="button" class="pg-job" data-status={j.status} title={\`\${j.name} · \${statusText(j.status)} · \${j.duration}\`}>
                  {#if j.status === 'running'}
                  <svg class="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true">${D.icons.spinner}</svg>
                  {:else}
                  <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.check}</svg>
                  {/if}
                  <span class="min-w-0 text-left">
                    <span class="block">{j.name}</span>
                    <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">{j.duration}</span>
                  </span>
                </button>
                {/each}
              </div>
              {#if si < pl.stages.length - 1}
              <span class="pg-stage-arrow" aria-hidden="true">→</span>
              {/if}
            </div>
            {/each}
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

        <GlTabs tabs={plTabs} active={0} />

        <section class="pg-card overflow-hidden" aria-label="作业列表">
          <GlTable items={pl.jobs} fields={jobFields} />
        </section>
      </div>
`;

  const scriptBody = `  const pl = ${JSON.stringify(p, null, 2).split('\n').join('\n  ')};

  const plTabs = [
    { title: '概览' },
    { title: '作业', count: pl.jobs.length },
    { title: '图表' },
    { title: '下游流水线' },
  ];

  const jobFields = [
    { key: 'name', label: '作业', sortable: true },
    { key: 'stage', label: '阶段' },
    { key: 'status', label: '状态' },
    { key: 'duration', label: '时长' },
    { key: 'coverage', label: '覆盖率' },
  ];

  const STATUS_TEXT = {
    success: '成功',
    failed: '失败',
    running: '运行中',
    created: '已创建',
    manual: '手动',
    skipped: '已跳过',
  };
  function statusText(s) {
    return STATUS_TEXT[s] || s;
  }
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
    activeNav: 'pipeline',
    sideTitle: D.meta.projects.web,
    main,
    scriptBody,
    styleExtra,
  });
}

/* ===================== project-home/+page.svelte ===================== */

function projectHome() {
  const pr = D.projectHome;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="pg-h1">{pr.namespace} / {pr.name}</h1>
            <GlBadge variant={pr.visibility === 'public' ? 'success' : 'info'}>{pr.visibility === 'public' ? '公开' : '内部'}</GlBadge>
          </div>
          <p class="pg-subtle mt-2 mb-0">{pr.description}</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <GlButton category="secondary">星标 {pr.stars}</GlButton>
          <GlButton category="secondary">克隆</GlButton>
          <GlDropdown text="更多操作" items={moreItems} />
        </div>
      </div>

      <div class="mt-5">
        <GlTabs tabs={homeTabs} active={0} />
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="pg-card p-5" aria-label="README">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">README</h2>
          <h3 class="text-[length:var(--gl-font-size-400-fixed)] mb-2">{pr.readme.heading}</h3>
          {#each pr.readme.paragraphs as t, i (i)}
          <p class="mt-0">{t}</p>
          {/each}
          <hr class="pg-divider" />
          <div class="flex items-center gap-2 flex-wrap pg-subtle text-[length:var(--gl-font-size-sm)]">
            <GlBadge variant={pr.latestPipeline.status === 'running' ? 'info' : 'success'}>
              流水线 #{pr.latestPipeline.id} · {pr.latestPipeline.status === 'running' ? '运行中' : '已通过'}
            </GlBadge>
            <span>最近推送于 {pr.recentCommits[0].time}</span>
          </div>
        </section>

        <section class="pg-card p-5" aria-label="最近提交">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">最近提交</h2>
          <ul class="flex flex-col gap-3 m-0 p-0 list-none">
            {#each pr.recentCommits as c (c.sha)}
            <li class="flex items-center gap-3 flex-wrap">
              <span class="pg-sha">{c.sha.slice(0, 8)}</span>
              <span class="min-w-0">{c.msg}</span>
              <span class="pg-subtle text-[length:var(--gl-font-size-sm)] ml-auto">{c.author} · {c.time}</span>
            </li>
            {/each}
          </ul>
        </section>
      </div>
`;

  const scriptBody = `  const pr = ${JSON.stringify(pr, null, 2).split('\n').join('\n  ')};

  const homeTabs = [
    { title: '概览' },
    { title: '议题', count: 12 },
    { title: '合并请求', count: 3 },
    { title: 'CI/CD' },
    { title: '部署' },
    { title: '分析' },
  ];

  const moreItems = [
    { label: '编辑详情', value: 'edit' },
    { label: '归档项目', value: 'archive' },
  ];
`;

  const styleExtra = `
.pg-sha { font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); background-color: var(--gl-color-alpha-dark-4); border-radius: var(--gl-border-radius-sm); padding: 0 var(--gl-spacing-scale-1); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
`;

  return layout({
    activeNav: 'project-home',
    sideTitle: D.meta.projects.home,
    main,
    scriptBody,
    styleExtra,
  });
}

/* ===================== issues/+page.svelte ===================== */

function issues() {
  const it = D.issues;
  const main = `      <div class="flex items-start justify-between gap-4 flex-wrap">
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
        <GlDropdown text="状态: 进行中" items={stateItems} showClearAll />
        <GlDropdown text="排序: 最近更新" items={sortItems} />
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="pg-card" aria-label="议题列表">
          <ul class="flex flex-col m-0 p-0 list-none">
            {#each it.list as i (i.id)}
            <li class="pg-issue-row">
              <svg class="pg-icon" viewBox="0 0 16 16" aria-hidden="true">${D.icons.issue}</svg>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-bold text-[color:var(--gl-text-color-strong)]">{i.title}</span>
                  <GlBadge variant={i.state === 'opened' ? 'success' : 'neutral'}>{i.state === 'opened' ? '进行中' : '已关闭'}</GlBadge>
                  {#each i.labels as l (l.text)}
                  <span class="pg-chip" style={\`background-color: \${chipBg(l.color)}; color: \${chipFg(l.color)}\`}>{l.text}</span>
                  {/each}
                </div>
                <p class="pg-subtle text-[length:var(--gl-font-size-sm)] mt-1 mb-0">#{i.id} · 由 {i.author} 创建 · 更新于 {i.updated}</p>
              </div>
              <div class="flex items-center gap-4 pg-subtle text-[length:var(--gl-font-size-sm)]">
                <span title="评论数">{i.comments}</span>
                <span title="关注数">{i.watchers}</span>
              </div>
            </li>
            {/each}
          </ul>
        </section>

        <section aria-label="看板视图">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">看板</h2>
          <div class="flex gap-4 overflow-x-auto pb-2">
            {#each it.boardColumns as col (col.label)}
            <div class="pg-board-col">
              <div class="flex items-center gap-2">
                <span class="pg-board-dot" style={\`background-color: \${chipBg(col.color)}\`}></span>
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">{col.label}</span>
                <GlBadge variant="neutral">{col.cards.length}</GlBadge>
              </div>
              {#each col.cards as c (c.id)}
              <div class="pg-board-card" draggable="true">
                <p class="m-0 font-bold text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-strong)]">{c.title}</p>
                <div class="flex items-center gap-2 mt-2 flex-wrap">
                  {#each c.labels as l (l.text)}
                  <span class="pg-chip" style={\`background-color: \${chipBg(l.color)}; color: \${chipFg(l.color)}\`}>{l.text}</span>
                  {/each}
                  <span class="pg-subtle text-[length:var(--gl-font-size-sm)]">#{c.id}</span>
                  <span class="ml-auto pg-avatar pg-avatar-sm">{c.assignee.slice(0, 1)}</span>
                </div>
              </div>
              {/each}
            </div>
            {/each}
          </div>
        </section>
      </div>
`;

  const scriptBody = `  const it = ${JSON.stringify(it, null, 2).split('\n').join('\n  ')};

  const stateItems = [
    { label: '进行中', value: 'opened', checked: true },
    { label: '已关闭', value: 'closed' },
  ];
  const sortItems = [
    { label: '最近更新', value: 'updated' },
    { label: '创建时间', value: 'created' },
    { label: '优先级', value: 'priority' },
    { label: '人气', value: 'popularity' },
  ];

  const CHIP_BG = {
    neutral: 'var(--gl-badge-neutral-background-color-default)',
    info: 'var(--gl-badge-info-background-color-default)',
    success: 'var(--gl-badge-success-background-color-default)',
    warning: 'var(--gl-badge-warning-background-color-default)',
    danger: 'var(--gl-badge-danger-background-color-default)',
    tier: 'var(--gl-badge-tier-background-color-default)',
  };
  const CHIP_FG = {
    neutral: 'var(--gl-badge-neutral-text-color-default)',
    info: 'var(--gl-badge-info-text-color-default)',
    success: 'var(--gl-badge-success-text-color-default)',
    warning: 'var(--gl-badge-warning-text-color-default)',
    danger: 'var(--gl-badge-danger-text-color-default)',
    tier: 'var(--gl-badge-tier-text-color-default)',
  };
  function chipBg(c) {
    return CHIP_BG[c] || CHIP_BG.neutral;
  }
  function chipFg(c) {
    return CHIP_FG[c] || CHIP_FG.neutral;
  }
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
    activeNav: 'issues',
    sideTitle: D.meta.projects.home,
    main,
    scriptBody,
    styleExtra,
  });
}

module.exports = { mergeRequest, pipeline, projectHome, issues };
