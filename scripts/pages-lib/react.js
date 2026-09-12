/**
 * pages-lib/react.js
 * 渲染 React + Tailwind 页面（dist/react-tailwind/pages/*.tsx），import ../components。
 */
const D = require('./shared');

/* 侧栏 JSX */
function sidenavJsx(activeNav) {
  return D.sidenav
    .map((item) => {
      if (item.children) {
        const kids = item.children
          .map(
            (c) =>
              `            <a key="${c.label}" className={cx('pg-nav-link pg-nav-child', ${c.active === activeNav ? "'is-active'" : 'undefined'})} href="${c.href}">${c.label}</a>`
          )
          .join('\n');
        return `        <div className="pg-nav-group">
          <span className="pg-nav-link pg-nav-parent"><Icon name="${item.icon}" />${item.label}</span>
          <div className="pg-nav-children">
${kids}
          </div>
        </div>`;
      }
      const cnt = item.count != null ? `<span className="pg-nav-count">${item.count}</span>` : '';
      const act = item.active === activeNav ? ' is-active' : '';
      return `        <a key="${item.label}" className={cx('pg-nav-link', ${item.active === activeNav ? "'is-active'" : 'undefined'})} href="${item.href}"><Icon name="${item.icon}" />${item.label}${cnt}</a>`;
    })
    .join('\n');
}

const ICONS = JSON.stringify(D.icons);

const LAYOUT_CSS = `
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
`;

function layout({ activeNav, sideTitle, main, helpers, styleExtra, stateHooks }) {
  return `// 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。
import * as React from 'react';
import { useState } from 'react';
import { Button, Badge, Alert, Tabs, Dropdown, Input, Table } from '../components';

const ICONS: Record<string, string> = ${ICONS};

const cx = (...cs: Array<string | false | undefined>) => cs.filter(Boolean).join(' ');

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={cx('pg-icon', className)} viewBox="0 0 16 16" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />
  );
}

const MOON = '${D.icons.moon.replace(/"/g, '&quot;')}';
const SUN = '${D.icons.sun.replace(/"/g, '&quot;')}';

export default function Page() {
  const [dark, setDark] = useState(false);
${stateHooks || ''}
  return (
    <div id="gl-root" className={cx('pg-page', dark && 'gl-dark')}>
      {/* 顶部全局导航 */}
      <header className="pg-topbar">
        <div className="pg-topbar-left">
          <span className="pg-topbar-brand">${D.meta.productName}</span>
          <label className="pg-search">
            <Icon name="search" />
            <input type="search" placeholder="搜索或输入命令" aria-label="搜索" />
          </label>
        </div>
        <div className="pg-topbar-right">
          <button
            type="button"
            className="pg-icon-btn"
            aria-label="切换暗色模式"
            title="切换暗色模式"
            onClick={() => setDark(!dark)}
          >
            <svg className="pg-icon" viewBox="0 0 16 16" aria-hidden="true" dangerouslySetInnerHTML={{ __html: dark ? SUN : MOON }} />
          </button>
          <button type="button" className="pg-icon-btn" aria-label="新建">
            <Icon name="plus" />
          </button>
          <span className="pg-avatar" title="${D.user.name}">${D.user.initials}</span>
        </div>
      </header>

      <div className="pg-shell">
        {/* 左侧项目导航 */}
        <aside className="pg-sidenav" aria-label="项目导航">
          <div className="pg-sidenav-project">
            <span className="pg-sidenav-avatar"><Icon name="folder" /></span>
            <span className="min-w-0">
              <span className="pg-sidenav-name">${sideTitle}</span>
              <span className="pg-sidenav-ns">${D.meta.productName}</span>
            </span>
          </div>
          <nav className="pg-sidenav-nav">
${sidenavJsx(activeNav)}
          </nav>
        </aside>

        {/* 主内容 */}
        <main className="pg-main">
${main}
        </main>
      </div>
    </div>
  );
}

${helpers || ''}

const PAGE_CSS = \`${LAYOUT_CSS}${styleExtra || ''}\`;

/* 将页面样式注入一次（无构建依赖的轻量方案） */
if (typeof document !== 'undefined' && !document.getElementById('pg-page-style')) {
  const style = document.createElement('style');
  style.id = 'pg-page-style';
  style.textContent = PAGE_CSS;
  document.head.appendChild(style);
}
`;
}

/* ===================== MergeRequest.tsx ===================== */

function mergeRequest() {
  const m = D.mergeRequest;
  const main = `        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="pg-h1">{mr.title}</h1>
              <Badge variant="info">!{mr.id}</Badge>
              <Badge variant={mr.state === 'merged' ? 'success' : mr.state === 'draft' ? 'warning' : 'info'}>
                {mr.state === 'merged' ? '已合并' : mr.state === 'draft' ? '草稿' : '开启中'}
              </Badge>
            </div>
            <p className="pg-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
              <span className="pg-chip" style={{ backgroundColor: 'var(--gl-badge-muted-background-color-default)', color: 'var(--gl-badge-muted-text-color-default)' }}>{mr.source}</span>
              →
              <span className="pg-chip" style={{ backgroundColor: 'var(--gl-badge-muted-background-color-default)', color: 'var(--gl-badge-muted-text-color-default)' }}>{mr.target}</span>
              <span>· 由 {mr.author} 于 {mr.createdAt} 创建</span>
            </p>
          </div>
          {mr.state !== 'merged' && (
            <div className="flex items-center gap-2 flex-wrap">
              <Button category="secondary">编辑</Button>
              <Button category="secondary">转为草稿</Button>
              <Button variant="confirm" disabled={!canMerge} onClick={mergeNow}>合并</Button>
            </div>
          )}
        </div>

        <div className="mt-5">
          <Tabs
            variant="plain"
            tabs={[
              { id: 'overview', label: '概览' },
              { id: 'commits', label: \`提交 (\${mr.commits})\` },
              { id: 'pipelines', label: '流水线' },
              { id: 'changes', label: '变更' },
              { id: 'discussion', label: \`讨论 (\${mr.discussionCount})\` },
            ]}
            defaultActiveId="overview"
          />
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {mr.state === 'merged' ? (
            <Alert variant="success" title="已合并">该合并请求已并入 {mr.target}。</Alert>
          ) : (
            <Alert variant="info" title="检查进行中" dismissible={false}>
              流水线正在运行，完成后可合并（{mr.checksPassed} / {mr.checksTotal} 项检查已通过）。
            </Alert>
          )}

          <section className="pg-card p-5">
            <h2 className="text-[length:var(--gl-font-size-500-fixed)] mb-3" style={{ margin: 0 }}>描述</h2>
            <p className="m-0" style={{ maxWidth: 'var(--gl-spacing-scale-62)' }}>{mr.description}</p>
          </section>

          <section aria-label="讨论时间线" className="flex flex-col gap-4">
            {mr.discussions.map((d) => (
              <article key={d.id} className="pg-card p-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="pg-avatar pg-avatar-sm">{d.author.slice(0, 1)}</span>
                  <span className="font-bold" style={{ color: 'var(--gl-text-color-strong)' }}>{d.author}</span>
                  <span className="pg-subtle text-[length:var(--gl-font-size-sm)]">{d.time}</span>
                  <Badge variant={d.resolved ? 'success' : 'warning'}>{d.resolved ? '已解决' : '待回复'}</Badge>
                </div>
                <p className="mt-2 mb-0">{d.body}</p>
                {d.replies.map((r) => (
                  <div key={r.id} className="mt-4 pl-5" style={{ borderLeft: '1px solid var(--gl-border-color-subtle)' }}>
                    <span className="font-bold text-[length:var(--gl-font-size-base)]">{r.author}</span>
                    <span className="pg-subtle text-[length:var(--gl-font-size-sm)] ml-2">{r.time}</span>
                    <p className="mt-1 mb-0">{r.body}</p>
                  </div>
                ))}
              </article>
            ))}
          </section>

          <section className="pg-card p-5" aria-label="批准状态">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold" style={{ color: 'var(--gl-text-color-strong)' }}>批准</span>
              <Badge variant={mr.approvals.given >= mr.approvals.required ? 'success' : 'warning'}>
                {mr.approvals.given} / {mr.approvals.required} 批准已提交
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              {mr.reviewers.map((r) => (
                <span key={r.name} className="flex items-center gap-2">
                  <span className="pg-avatar pg-avatar-sm" style={{ backgroundColor: avatarBg(r.color) }}>{r.name.slice(0, 1)}</span>
                  <span>{r.name}</span>
                </span>
              ))}
            </div>
          </section>

          <section className="pg-card p-5" aria-label="合并操作">
            <h2 className="text-[length:var(--gl-font-size-500-fixed)] mb-3" style={{ margin: 0 }}>合并设置</h2>
            <div className="mt-3 flex flex-col gap-2">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> 合并后删除源分支</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> 以合并提交方式并入</label>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button variant="confirm" disabled={mr.state === 'merged'}>确认合并</Button>
              <Button category="secondary">关闭合并请求</Button>
            </div>
          </section>
        </div>
`;

  const helpers = `const AVATAR_BG: Record<string, string> = {
  blue: 'var(--gl-avatar-fallback-background-color-blue)',
  green: 'var(--gl-avatar-fallback-background-color-green)',
  neutral: 'var(--gl-avatar-fallback-background-color-neutral)',
};

function avatarBg(color: string) {
  return AVATAR_BG[color] || AVATAR_BG.blue;
}
`;

  const stateHooks = `
  const [mr, setMr] = useState(${JSON.stringify(m, null, 2).split('\n').join('\n  ')});
  const canMerge = mr.pipelineStatus !== 'failed' && mr.state !== 'merged';
  const mergeNow = () => setMr({ ...mr, state: 'merged' });
`;

  const styleExtra = `
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }
`;

  return layout({
    activeNav: 'merge-request',
    sideTitle: D.meta.projects.web,
    main,
    helpers,
    styleExtra,
    stateHooks,
  });
}

/* ===================== Pipeline.tsx ===================== */

function pipeline() {
  const p = D.pipeline;
  const main = `        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="pg-h1">流水线 #{pl.id}</h1>
              <Badge variant={pl.status === 'running' ? 'info' : 'success'}>
                {pl.status === 'running' ? '运行中' : '已通过'}
              </Badge>
            </div>
            <p className="pg-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
              <span className="pg-chip" style={{ backgroundColor: 'var(--gl-badge-muted-background-color-default)', color: 'var(--gl-badge-muted-text-color-default)' }}>{pl.branch}</span>
              <span>· {pl.sha} {pl.commitMsg}</span>
              <span>· 由 {pl.trigger} 触发 · 已运行 {pl.duration}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button category="secondary">重试</Button>
            <Button category="secondary">取消</Button>
            <Button variant="confirm">运行流水线</Button>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <section className="pg-card p-5" aria-label="流水线阶段图">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {pl.stages.map((st, si) => (
                <React.Fragment key={st.name}>
                  <div className="flex flex-col gap-3">
                    <span className="font-bold" style={{ color: 'var(--gl-text-color-strong)' }}>{st.name}</span>
                    {st.jobs.map((j) => (
                      <button
                        key={j.name}
                        type="button"
                        className="pg-job"
                        data-status={j.status}
                        title={\`\${j.name} · \${statusText(j.status)} · \${j.duration}\`}
                      >
                        {j.status === 'running' ? (
                          <svg className="pg-icon pg-spin" viewBox="0 0 16 16" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS.spinner }} />
                        ) : (
                          <Icon name={j.status === 'failed' ? 'cancel' : 'check'} />
                        )}
                        <span className="min-w-0 text-left">
                          <span className="block">{j.name}</span>
                          <span className="pg-subtle text-[length:var(--gl-font-size-sm)]">{j.duration}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  {si < pl.stages.length - 1 && <span className="pg-stage-arrow" aria-hidden="true">→</span>}
                </React.Fragment>
              ))}
            </div>
            <hr className="pg-divider" />
            <div className="flex items-center gap-4 flex-wrap text-[length:var(--gl-font-size-sm)] pg-subtle">
              <Badge variant="success">成功 {pl.counts.success}</Badge>
              <Badge variant="danger">失败 {pl.counts.failed}</Badge>
              <Badge variant="info">运行中 {pl.counts.running}</Badge>
              <Badge variant="neutral">其他 {pl.counts.other}</Badge>
              <span className="ml-auto">总耗时 {pl.duration}</span>
            </div>
          </section>

          <Tabs
            variant="plain"
            tabs={[
              { id: 'overview', label: '概览' },
              { id: 'jobs', label: \`作业 (\${pl.jobs.length})\` },
              { id: 'charts', label: '图表' },
              { id: 'downstream', label: '下游流水线' },
            ]}
            defaultActiveId="jobs"
          />

          <section className="pg-card overflow-hidden" aria-label="作业列表">
            <Table items={pl.jobs} fields={jobFields} />
          </section>
        </div>
`;

  const stateHooks = `
  const [pl] = useState(${JSON.stringify(p, null, 2).split('\n').join('\n  ')});
  const jobFields = [
    { key: 'name', label: '作业', sortable: true },
    { key: 'stage', label: '阶段' },
    { key: 'status', label: '状态' },
    { key: 'duration', label: '时长' },
    { key: 'coverage', label: '覆盖率' },
  ];
`;

  const helpers = `const STATUS_TEXT: Record<string, string> = {
  success: '成功',
  failed: '失败',
  running: '运行中',
  created: '已创建',
  manual: '手动',
  skipped: '已跳过',
};

function statusText(s: string) {
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
    helpers,
    styleExtra,
    stateHooks,
  });
}

/* ===================== ProjectHome.tsx ===================== */

function projectHome() {
  const pr = D.projectHome;
  const main = `        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="pg-h1">{pr.namespace} / {pr.name}</h1>
              <Badge variant={pr.visibility === 'public' ? 'success' : 'info'}>{pr.visibility === 'public' ? '公开' : '内部'}</Badge>
            </div>
            <p className="pg-subtle mt-2 mb-0">{pr.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button category="secondary">星标 {pr.stars}</Button>
            <Button category="secondary">克隆</Button>
            <Dropdown text="更多操作" items={[{ label: '编辑详情', value: 'edit' }, { label: '归档项目', value: 'archive' }]} />
          </div>
        </div>

        <div className="mt-5">
          <Tabs
            variant="plain"
            tabs={[
              { id: 'overview', label: '概览' },
              { id: 'issues', label: '议题 (12)' },
              { id: 'mrs', label: '合并请求 (3)' },
              { id: 'cicd', label: 'CI/CD' },
              { id: 'deploy', label: '部署' },
              { id: 'monitor', label: '分析' },
            ]}
            defaultActiveId="overview"
          />
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <section className="pg-card p-5" aria-label="README">
            <h2 className="text-[length:var(--gl-font-size-500-fixed)] mb-3" style={{ margin: 0 }}>README</h2>
            <h3 className="text-[length:var(--gl-font-size-400-fixed)] mb-2" style={{ margin: 0 }}>{pr.readme.heading}</h3>
            {pr.readme.paragraphs.map((t, i) => (
              <p key={i} className="mt-2">{t}</p>
            ))}
            <hr className="pg-divider" />
            <div className="flex items-center gap-2 flex-wrap pg-subtle text-[length:var(--gl-font-size-sm)]">
              <Badge variant={pr.latestPipeline.status === 'running' ? 'info' : 'success'}>
                流水线 #{pr.latestPipeline.id} · {pr.latestPipeline.status === 'running' ? '运行中' : '已通过'}
              </Badge>
              <span>最近推送于 {pr.recentCommits[0].time}</span>
            </div>
          </section>

          <section className="pg-card p-5" aria-label="最近提交">
            <h2 className="text-[length:var(--gl-font-size-500-fixed)] mb-3" style={{ margin: 0 }}>最近提交</h2>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {pr.recentCommits.map((c) => (
                <li key={c.sha} className="flex items-center gap-3 flex-wrap">
                  <span className="pg-sha">{c.sha.slice(0, 8)}</span>
                  <span className="min-w-0 truncate">{c.msg}</span>
                  <span className="pg-subtle text-[length:var(--gl-font-size-sm)] ml-auto">{c.author} · {c.time}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
`;

  const stateHooks = `
  const [pr] = useState(${JSON.stringify(pr, null, 2).split('\n').join('\n  ')});
`;

  const styleExtra = `
.pg-sha { font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); background-color: var(--gl-color-alpha-dark-4); border-radius: var(--gl-border-radius-sm); padding: 0 var(--gl-spacing-scale-1); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
`;

  return layout({
    activeNav: 'project-home',
    sideTitle: D.meta.projects.home,
    main,
    styleExtra,
    stateHooks,
  });
}

/* ===================== Issues.tsx ===================== */

function issues() {
  const it = D.issues;
  const main = `        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="pg-h1">议题</h1>
            <Badge variant="success">进行中 {it.openCount}</Badge>
            <Badge variant="neutral">已关闭 {it.closedCount}</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button category="secondary" icon="list">列表</Button>
            <Button category="secondary" icon="board">看板</Button>
            <Button variant="confirm">新建议题</Button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 flex-wrap" role="search" aria-label="筛选工具条">
          <Input type="search" placeholder="按标题或编号搜索" width="md" />
          <Dropdown
            text="状态: 进行中"
            showClearAll
            items={[
              { label: '进行中', value: 'opened', checked: true },
              { label: '已关闭', value: 'closed' },
            ]}
          />
          <Dropdown
            text="排序: 最近更新"
            items={[
              { label: '最近更新', value: 'updated' },
              { label: '创建时间', value: 'created' },
              { label: '优先级', value: 'priority' },
              { label: '人气', value: 'popularity' },
            ]}
          />
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <section className="pg-card" aria-label="议题列表">
            <ul className="flex flex-col m-0 p-0 list-none">
              {it.list.map((i) => (
                <li key={i.id} className="pg-issue-row">
                  <Icon name="issue" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold" style={{ color: 'var(--gl-text-color-strong)' }}>{i.title}</span>
                      <Badge variant={i.state === 'opened' ? 'success' : 'neutral'}>{i.state === 'opened' ? '进行中' : '已关闭'}</Badge>
                      {i.labels.map((l) => (
                        <span key={l.text} className="pg-chip" style={{ backgroundColor: chipBg(l.color), color: chipFg(l.color) }}>{l.text}</span>
                      ))}
                    </div>
                    <p className="pg-subtle text-[length:var(--gl-font-size-sm)] mt-1 mb-0">#{i.id} · 由 {i.author} 创建 · 更新于 {i.updated}</p>
                  </div>
                  <div className="flex items-center gap-4 pg-subtle text-[length:var(--gl-font-size-sm)]">
                    <span title="评论数">{i.comments}</span>
                    <span title="关注数">{i.watchers}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="看板视图">
            <h2 className="text-[length:var(--gl-font-size-500-fixed)] mb-3" style={{ margin: 0 }}>看板</h2>
            <div className="mt-3 flex gap-4 overflow-x-auto pb-2">
              {it.boardColumns.map((col) => (
                <div key={col.label} className="pg-board-col">
                  <div className="flex items-center gap-2">
                    <span className="pg-board-dot" style={{ backgroundColor: chipBg(col.color) }}></span>
                    <span className="font-bold" style={{ color: 'var(--gl-text-color-strong)' }}>{col.label}</span>
                    <Badge variant="neutral">{col.cards.length}</Badge>
                  </div>
                  {col.cards.map((c) => (
                    <div key={c.id} className="pg-board-card" draggable>
                      <p className="m-0 font-bold text-[length:var(--gl-font-size-base)]" style={{ color: 'var(--gl-text-color-strong)' }}>{c.title}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {c.labels.map((l) => (
                          <span key={l.text} className="pg-chip" style={{ backgroundColor: chipBg(l.color), color: chipFg(l.color) }}>{l.text}</span>
                        ))}
                        <span className="pg-subtle text-[length:var(--gl-font-size-sm)]">#{c.id}</span>
                        <span className="ml-auto pg-avatar pg-avatar-sm">{c.assignee.slice(0, 1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
`;

  const stateHooks = `
  const [it] = useState(${JSON.stringify(it, null, 2).split('\n').join('\n  ')});
`;

  const helpers = `const CHIP_BG: Record<string, string> = {
  neutral: 'var(--gl-badge-neutral-background-color-default)',
  info: 'var(--gl-badge-info-background-color-default)',
  success: 'var(--gl-badge-success-background-color-default)',
  warning: 'var(--gl-badge-warning-background-color-default)',
  danger: 'var(--gl-badge-danger-background-color-default)',
  tier: 'var(--gl-badge-tier-background-color-default)',
};
const CHIP_FG: Record<string, string> = {
  neutral: 'var(--gl-badge-neutral-text-color-default)',
  info: 'var(--gl-badge-info-text-color-default)',
  success: 'var(--gl-badge-success-text-color-default)',
  warning: 'var(--gl-badge-warning-text-color-default)',
  danger: 'var(--gl-badge-danger-text-color-default)',
  tier: 'var(--gl-badge-tier-text-color-default)',
};

function chipBg(c: string) {
  return CHIP_BG[c] || CHIP_BG.neutral;
}
function chipFg(c: string) {
  return CHIP_FG[c] || CHIP_FG.neutral;
}
`;

  const styleExtra = `
.pg-issue-row { display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.pg-issue-row:hover { background-color: var(--gl-table-row-background-color-hover); }
.pg-board-col { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-3); width: var(--gl-spacing-scale-62); flex-shrink: 0; padding: var(--gl-spacing-scale-3); border: 1px dashed var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-subtle); }
.pg-board-dot { width: var(--gl-line-height-16); height: var(--gl-line-height-16); border-radius: var(--gl-border-radius-full); flex-shrink: 0; }
.pg-board-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); padding: var(--gl-spacing-scale-3); box-shadow: var(--gl-shadow-sm); cursor: grab; }
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }
`;

  return layout({
    activeNav: 'issues',
    sideTitle: D.meta.projects.home,
    main,
    helpers,
    styleExtra,
    stateHooks,
  });
}

module.exports = { mergeRequest, pipeline, projectHome, issues };
