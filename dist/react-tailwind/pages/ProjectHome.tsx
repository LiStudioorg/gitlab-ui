// 由 scripts/gen-pages.js 生成；Pajamas-inspired (MIT)。
import * as React from 'react';
import { useState } from 'react';
import { Button, Badge, Alert, Tabs, Dropdown, Input, Table } from '../components';

const ICONS: Record<string, string> = {"doc":"<path d=\"M4 1.5h5.5L13 5v9.5H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><path d=\"M9 1.5V5h3.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>","branch":"<circle cx=\"4.5\" cy=\"3.5\" r=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><circle cx=\"4.5\" cy=\"12.5\" r=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><circle cx=\"11.5\" cy=\"3.5\" r=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M4.5 5.3v5.4M11.5 5.3v1.2c0 1.6-1.2 2.5-2.8 2.5H6.3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/>","issue":"<circle cx=\"8\" cy=\"8\" r=\"6.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><circle cx=\"8\" cy=\"8\" r=\"2\" fill=\"currentColor\"/>","mr":"<circle cx=\"4.5\" cy=\"3.5\" r=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><circle cx=\"11.5\" cy=\"12.5\" r=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M4.5 5.3v1.2c0 1.6 1.2 2.5 2.8 2.5h2.4M9.7 7l1.8 1.8L13.3 7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>","rocket":"<path d=\"M8 1.8c2.5 1.4 3.8 3.7 3.8 6.4L10 10H6L4.2 8.2c0-2.7 1.3-5 3.8-6.4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><circle cx=\"8\" cy=\"6.2\" r=\"1.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.2\"/><path d=\"M6 10.5l-1.2 3M10 10.5l1.2 3M8 11v3.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>","deploy":"<path d=\"M2 12l3-7 3 4 3-6 3 9z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>","chart":"<path d=\"M2.5 13.5h11M4.5 13V9M8 13V5.5M11.5 13V7.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>","search":"<circle cx=\"7\" cy=\"7\" r=\"4.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M10.5 10.5L14 14\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>","plus":"<path d=\"M8 3v10M3 8h10\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>","star":"<path d=\"M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>","chevronDown":"<path d=\"M4 6l4 4 4-4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>","check":"<path d=\"M3 8.5l3.5 3.5L13 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>","clock":"<circle cx=\"8\" cy=\"8\" r=\"6.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M8 4.5V8l2.5 1.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>","comment":"<path d=\"M14 8a6 6 0 1 1-2.2-4.6L14 2.5l-.6 2.6A6 6 0 0 1 14 8z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>","eye":"<path d=\"M1.5 8S4 3.8 8 3.8 14.5 8 14.5 8 12 12.2 8 12.2 1.5 8 1.5 8z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><circle cx=\"8\" cy=\"8\" r=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/>","more":"<circle cx=\"3.5\" cy=\"8\" r=\"1.2\" fill=\"currentColor\"/><circle cx=\"8\" cy=\"8\" r=\"1.2\" fill=\"currentColor\"/><circle cx=\"12.5\" cy=\"8\" r=\"1.2\" fill=\"currentColor\"/>","spinner":"<circle cx=\"8\" cy=\"8\" r=\"6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" opacity=\"0.35\"/><path d=\"M14 8A6 6 0 0 0 8 2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>","play":"<path d=\"M5 3.5v9l7-4.5z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>","retry":"<path d=\"M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.6h-2.6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>","cancel":"<circle cx=\"8\" cy=\"8\" r=\"6.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M5.5 5.5l5 5M10.5 5.5l-5 5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>","list":"<path d=\"M5.5 4h9M5.5 8h9M5.5 12h9\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><circle cx=\"2.6\" cy=\"4\" r=\"1\" fill=\"currentColor\"/><circle cx=\"2.6\" cy=\"8\" r=\"1\" fill=\"currentColor\"/><circle cx=\"2.6\" cy=\"12\" r=\"1\" fill=\"currentColor\"/>","board":"<rect x=\"2\" y=\"2.5\" width=\"4.6\" height=\"11\" rx=\"1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\"/><rect x=\"9.4\" y=\"2.5\" width=\"4.6\" height=\"7\" rx=\"1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\"/>","moon":"<path d=\"M13.2 9.8A5.5 5.5 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>","sun":"<circle cx=\"8\" cy=\"8\" r=\"3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/>","folder":"<path d=\"M1.5 3.5h4.5l1.5 2h7v8h-13z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>","user":"<circle cx=\"8\" cy=\"5.5\" r=\"2.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/><path d=\"M2.8 13.8c.6-2.6 2.7-4 5.2-4s4.6 1.4 5.2 4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>","logo":"<circle cx=\"8\" cy=\"8\" r=\"6.4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"/><path d=\"M8 1.6v12.8M1.6 8h12.8\" stroke=\"currentColor\" stroke-width=\"1.2\"/><circle cx=\"8\" cy=\"8\" r=\"2\" fill=\"currentColor\"/>"};

const cx = (...cs: Array<string | false | undefined>) => cs.filter(Boolean).join(' ');

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={cx('pg-icon', className)} viewBox="0 0 16 16" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />
  );
}

const MOON = '<path d=&quot;M13.2 9.8A5.5 5.5 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7z&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot; stroke-linejoin=&quot;round&quot;/>';
const SUN = '<circle cx=&quot;8&quot; cy=&quot;8&quot; r=&quot;3&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;/><path d=&quot;M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.4&quot; stroke-linecap=&quot;round&quot;/>';

export default function Page() {
  const [dark, setDark] = useState(false);

  const [pr] = useState({
    "namespace": "acme",
    "name": "my-project",
    "visibility": "public",
    "description": "一个用于演示设计系统的示例项目（示例数据）。",
    "starred": true,
    "stars": 128,
    "forks": 24,
    "commits": 1204,
    "branches": 18,
    "tags": 36,
    "clones": 856,
    "readme": {
      "heading": "my-project",
      "paragraphs": [
        "这是示例项目的 README 占位内容，用于展示概览页的文档渲染效果。",
        "项目内置统一的间距、颜色与圆角令牌，所有界面颜色均引用 CSS 变量，暗色模式下自动切换。"
      ]
    },
    "recentCommits": [
      {
        "sha": "a1b2c3d4",
        "msg": "feat: 注册全局快捷键处理器",
        "author": "王小明",
        "time": "2 小时前"
      },
      {
        "sha": "e5f6a7b8",
        "msg": "fix: 修复设置页表单校验提示",
        "author": "李雷",
        "time": "昨天"
      },
      {
        "sha": "c9d0e1f2",
        "msg": "docs: 更新贡献指南",
        "author": "韩梅梅",
        "time": "3 天前"
      },
      {
        "sha": "d3e4f5a6",
        "msg": "chore: 升级依赖到最新补丁版本",
        "author": "赵大有",
        "time": "5 天前"
      }
    ],
    "latestPipeline": {
      "id": 183,
      "status": "running",
      "branch": "main"
    }
  });

  return (
    <div id="gl-root" className={cx('pg-page', dark && 'gl-dark')}>
      {/* 顶部全局导航 */}
      <header className="pg-topbar">
        <div className="pg-topbar-left">
          <span className="pg-topbar-brand">代码评审平台</span>
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
          <span className="pg-avatar" title="王小明">王</span>
        </div>
      </header>

      <div className="pg-shell">
        {/* 左侧项目导航 */}
        <aside className="pg-sidenav" aria-label="项目导航">
          <div className="pg-sidenav-project">
            <span className="pg-sidenav-avatar"><Icon name="folder" /></span>
            <span className="min-w-0">
              <span className="pg-sidenav-name">my-project</span>
              <span className="pg-sidenav-ns">代码评审平台</span>
            </span>
          </div>
          <nav className="pg-sidenav-nav">
        <a key="概览" className={cx('pg-nav-link', 'is-active')} href="#overview"><Icon name="doc" />概览</a>
        <a key="代码" className={cx('pg-nav-link', undefined)} href="#code"><Icon name="branch" />代码</a>
        <a key="议题" className={cx('pg-nav-link', undefined)} href="#issues"><Icon name="issue" />议题<span className="pg-nav-count">12</span></a>
        <a key="合并请求" className={cx('pg-nav-link', undefined)} href="#merge-requests"><Icon name="mr" />合并请求<span className="pg-nav-count">3</span></a>
        <div className="pg-nav-group">
          <span className="pg-nav-link pg-nav-parent"><Icon name="rocket" />CI/CD</span>
          <div className="pg-nav-children">
            <a key="流水线" className={cx('pg-nav-link pg-nav-child', undefined)} href="#pipelines">流水线</a>
            <a key="作业" className={cx('pg-nav-link pg-nav-child', undefined)} href="#jobs">作业</a>
            <a key="计划任务" className={cx('pg-nav-link pg-nav-child', undefined)} href="#schedules">计划任务</a>
          </div>
        </div>
        <a key="部署" className={cx('pg-nav-link', undefined)} href="#deploy"><Icon name="deploy" />部署</a>
        <a key="分析与监控" className={cx('pg-nav-link', undefined)} href="#monitor"><Icon name="chart" />分析与监控</a>
          </nav>
        </aside>

        {/* 主内容 */}
        <main className="pg-main">
        <div className="flex items-start justify-between gap-4 flex-wrap">
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

        </main>
      </div>
    </div>
  );
}



const PAGE_CSS = `
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

.pg-sha { font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); background-color: var(--gl-color-alpha-dark-4); border-radius: var(--gl-border-radius-sm); padding: 0 var(--gl-spacing-scale-1); }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
`;

/* 将页面样式注入一次（无构建依赖的轻量方案） */
if (typeof document !== 'undefined' && !document.getElementById('pg-page-style')) {
  const style = document.createElement('style');
  style.id = 'pg-page-style';
  style.textContent = PAGE_CSS;
  document.head.appendChild(style);
}
