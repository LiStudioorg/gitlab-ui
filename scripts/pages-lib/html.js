/**
 * pages-lib/html.js
 * 渲染静态单文件 HTML 页面（dist/html/pages/*.html）。
 * 布局：顶部全局导航 + 左侧项目导航 + 主内容（+右栏）。
 * 样式：Tailwind CDN + <style> 内 var(--gl-*) 令牌；暗色：切换根节点 gl-dark。
 */
const D = require('./shared');

/* ---------------- 小工具 ---------------- */

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icon = (name, cls = 'gl-icon') =>
  `<svg class="${cls}" viewBox="0 0 16 16" aria-hidden="true">${D.icons[name] || ''}</svg>`;

const avatar = (name, color = 'blue', size = '2rem') => {
  const initial = esc(name.slice(0, 1));
  return `<span class="gl-avatar" style="width:${size};height:${size};background-color:${D.avatarColors[color] || D.avatarColors.blue}" title="${esc(name)}">${initial}</span>`;
};

const badge = (variant, text) =>
  `<span class="gl-badge gl-badge--${esc(variant)}">${esc(text)}</span>`;

const labelChip = (l) =>
  `<span class="gl-label-chip" style="background-color:${D.labelChipColors[l.color]};color:${D.labelChipText[l.color]}">${esc(l.text)}</span>`;

const spinner = (cls = '') =>
  `<svg class="gl-icon gl-spin ${cls}" viewBox="0 0 16 16" aria-hidden="true">${D.icons.spinner}</svg>`;

/* ---------------- 布局区块 ---------------- */

function sidenavItems(active) {
  return D.sidenav
    .map((item) => {
      if (item.children) {
        const child = item.children
          .map(
            (c) =>
              `<a class="gl-sidenav-link gl-sidenav-child${c.active === active ? ' is-active' : ''}" href="${c.href}">${esc(c.label)}</a>`
          )
          .join('\n          ');
        return `<div class="gl-sidenav-group">
          <span class="gl-sidenav-link gl-sidenav-parent">${icon(item.icon)}${esc(item.label)}</span>
          <div class="gl-sidenav-children">
          ${child}
          </div>
        </div>`;
      }
      const cnt = item.count != null ? `<span class="gl-sidenav-count">${item.count}</span>` : '';
      return `<a class="gl-sidenav-link${item.active === active ? ' is-active' : ''}" href="${item.href}">${icon(item.icon)}${esc(item.label)}${cnt}</a>`;
    })
    .join('\n        ');
}

function layout({ pageId, title, activeNav, sideTitle, sideNamespace, content, right, maxWidth }) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="../../css/variables.css">
<style>
${pageCss()}
</style>
</head>
<body>
<div id="gl-root">
  <!-- 顶部全局导航 -->
  <header class="gl-topbar">
    <div class="flex items-center gap-3 min-w-0">
      <span class="flex items-center text-[color:var(--gl-text-color-heading)]">${icon('logo', 'gl-icon gl-icon-lg')}</span>
      <span class="gl-topbar-brand">${esc(D.meta.productName)}</span>
      <label class="gl-topbar-search">
        ${icon('search')}
        <input type="search" placeholder="搜索或输入命令" aria-label="搜索">
      </label>
    </div>
    <div class="flex items-center gap-2">
      <button type="button" class="gl-icon-btn" data-gl-theme-toggle title="切换暗色模式" aria-label="切换暗色模式" data-icon-moon="${esc(D.icons.moon)}" data-icon-sun="${esc(D.icons.sun)}">${icon('moon', 'gl-icon gl-icon-theme')}</button>
      <button type="button" class="gl-icon-btn" aria-label="新建">${icon('plus')}</button>
      ${avatar(D.user.name, 'blue', 'var(--gl-spacing-scale-8)')}
    </div>
  </header>

  <div class="gl-shell">
    <!-- 左侧项目导航 -->
    <aside class="gl-sidenav" id="gl-sidenav" aria-label="项目导航">
      <div class="gl-sidenav-project">
        <span class="gl-sidenav-avatar">${icon('folder', 'gl-icon')}</span>
        <span class="min-w-0">
          <span class="gl-sidenav-name">${esc(sideTitle)}</span>
          <span class="gl-sidenav-ns">${esc(sideNamespace)}</span>
        </span>
      </div>
      <nav class="gl-sidenav-nav">
        ${sidenavItems(activeNav)}
      </nav>
    </aside>

    <!-- 主内容 -->
    <main class="gl-main" style="max-width:${maxWidth || '75rem'}">
${content}
    </main>
${right ? `    <!-- 右侧面板 -->\n    <aside class="gl-rightbar" aria-label="侧栏信息">\n${right}\n    </aside>` : ''}
  </div>
</div>
<script>
(function () {
  var root = document.getElementById('gl-root');
  var btn = document.querySelector('[data-gl-theme-toggle]');
  if (!btn) return;
  var setIcon = function (dark) {
    var span = btn.querySelector('.gl-icon-theme');
    if (span) span.innerHTML = dark ? btn.getAttribute('data-icon-sun') : btn.getAttribute('data-icon-moon');
  };
  btn.addEventListener('click', function () {
    var dark = root.classList.toggle('gl-dark');
    setIcon(dark);
  });
})();
</script>
</body>
</html>
`;
}

/* ---------------- 页面级 CSS（全部 var(--gl-*)） ---------------- */

function pageCss() {
  return `
*, *::before, *::after { box-sizing: border-box; }
html { font-size: 16px; }
body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-24); color: var(--gl-text-color-default); background-color: var(--gl-background-color-default); }
h1, h2, h3, h4 { margin: 0; color: var(--gl-text-color-heading); font-weight: var(--gl-font-weight-heading); line-height: var(--gl-line-height-heading); }
a { color: var(--gl-text-color-link); text-decoration: none; }
a:hover { text-decoration: underline; }
:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); border-radius: var(--gl-border-radius-sm); }

/* ---- 顶部导航 ---- */
.gl-topbar { position: sticky; top: 0; z-index: var(--gl-zindex-3); display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-4); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5); background-color: var(--gl-background-color-overlap); border-bottom: 1px solid var(--gl-border-color-default); }
.gl-topbar-brand { font-size: var(--gl-font-size-400-fixed); font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); white-space: nowrap; }
.gl-topbar-search { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-control-background-color-default); color: var(--gl-text-color-subtle); width: min(22rem, 40vw); }
.gl-topbar-search input { border: 0; outline: none; background: transparent; color: var(--gl-text-color-default); font-size: var(--gl-font-size-sm); width: 100%; }
.gl-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-full); border: 0; background: transparent; color: var(--gl-text-color-default); cursor: pointer; }
.gl-icon-btn:hover { background-color: var(--gl-color-alpha-dark-4); }
.gl-icon { width: var(--gl-line-height-16); height: var(--gl-line-height-16); flex-shrink: 0; }
.gl-icon-lg { width: var(--gl-line-height-24); height: var(--gl-line-height-24); }
.gl-spin { animation: gl-spin 0.8s linear infinite; }
@keyframes gl-spin { to { transform: rotate(360deg); } }

/* ---- 头像 / 徽章 / 标签 ---- */
.gl-avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: var(--gl-avatar-circle-border-radius-default); color: var(--gl-text-color-heading); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); flex-shrink: 0; border: 1px solid var(--gl-avatar-border-color-default); }
.gl-badge { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-1); padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); white-space: nowrap; }
.gl-badge--neutral { background-color: var(--gl-badge-neutral-background-color-default); color: var(--gl-badge-neutral-text-color-default); }
.gl-badge--info { background-color: var(--gl-badge-info-background-color-default); color: var(--gl-badge-info-text-color-default); }
.gl-badge--success { background-color: var(--gl-badge-success-background-color-default); color: var(--gl-badge-success-text-color-default); }
.gl-badge--warning { background-color: var(--gl-badge-warning-background-color-default); color: var(--gl-badge-warning-text-color-default); }
.gl-badge--danger { background-color: var(--gl-badge-danger-background-color-default); color: var(--gl-badge-danger-text-color-default); }
.gl-badge--tier { background-color: var(--gl-badge-tier-background-color-default); color: var(--gl-badge-tier-text-color-default); }
.gl-label-chip { display: inline-flex; align-items: center; padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); white-space: nowrap; }

/* ---- 左侧导航 ---- */
.gl-shell { display: flex; align-items: flex-start; }
.gl-sidenav { width: var(--gl-spacing-scale-30); flex-shrink: 0; position: sticky; top: var(--gl-spacing-scale-13); max-height: calc(100vh - var(--gl-spacing-scale-13)); overflow-y: auto; padding: var(--gl-spacing-scale-4); border-right: 1px solid var(--gl-border-color-default); min-height: calc(100vh - var(--gl-spacing-scale-13)); }
.gl-sidenav-project { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2); margin-bottom: var(--gl-spacing-scale-4); }
.gl-sidenav-avatar { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-md); background-color: var(--gl-avatar-fallback-background-color-neutral); color: var(--gl-text-color-default); flex-shrink: 0; }
.gl-sidenav-name { display: block; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gl-sidenav-ns { display: block; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gl-sidenav-nav { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); }
.gl-sidenav-link { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-md); color: var(--gl-text-color-default); font-size: var(--gl-font-size-base); }
.gl-sidenav-link:hover { background-color: var(--gl-color-alpha-dark-4); text-decoration: none; }
.gl-sidenav-link.is-active { background-color: var(--gl-color-alpha-dark-8); color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.gl-sidenav-count { margin-left: auto; font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); background-color: var(--gl-badge-muted-background-color-default); border-radius: var(--gl-border-radius-full); padding: 0 var(--gl-spacing-scale-2); line-height: var(--gl-line-height-20); }
.gl-sidenav-parent { font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); }
.gl-sidenav-children { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); margin: var(--gl-spacing-scale-1) 0 var(--gl-spacing-scale-2); }
.gl-sidenav-child { padding-left: var(--gl-spacing-scale-9); font-size: var(--gl-font-size-base); }

/* ---- 主内容 / 右栏 ---- */
.gl-main { flex: 1 1 100%; min-width: 0; padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-6); }
.gl-rightbar { width: var(--gl-spacing-scale-37); flex-shrink: 0; position: sticky; top: var(--gl-spacing-scale-13); max-height: calc(100vh - var(--gl-spacing-scale-13)); overflow-y: auto; padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5) 0; }

/* ---- 通用卡片 / 按钮 / tabs ---- */
.gl-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); box-shadow: var(--gl-shadow-sm); }
.gl-btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-button-border-radius); border: 1px solid transparent; font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-semibold); line-height: var(--gl-line-height-20); cursor: pointer; text-decoration: none; }
.gl-btn:hover { text-decoration: none; }
.gl-btn--default { background-color: var(--gl-button-default-primary-background-color-default); border-color: var(--gl-border-color-default); color: var(--gl-button-default-primary-foreground-color-default); }
.gl-btn--default:hover { background-color: var(--gl-color-alpha-dark-4); }
.gl-btn--confirm { background-color: var(--gl-button-confirm-primary-background-color-default); color: var(--gl-button-confirm-primary-foreground-color-default); }
.gl-btn--confirm:hover { filter: brightness(1.1); }
.gl-btn--danger { background-color: var(--gl-button-danger-primary-background-color-default); color: var(--gl-button-danger-primary-foreground-color-default); }
.gl-btn--link { border: 0; background: transparent; color: var(--gl-button-link-text-color-default); padding: 0 var(--gl-spacing-scale-2); }
.gl-btn--link:hover { text-decoration: underline; }
.gl-btn:disabled { cursor: not-allowed; background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color); border-color: var(--gl-action-disabled-border-color); filter: none; }
.gl-input { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); border: 1px solid var(--gl-control-border-color-default); border-radius: var(--gl-control-border-radius); background-color: var(--gl-control-background-color-default); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); color: var(--gl-text-color-default); }
.gl-input input { border: 0; outline: none; background: transparent; color: var(--gl-text-color-default); width: 100%; font-size: var(--gl-font-size-base); }
.gl-input input::placeholder { color: var(--gl-control-placeholder-color); }
.gl-tabs { display: flex; gap: var(--gl-spacing-scale-2); border-bottom: 1px solid var(--gl-border-color-default); overflow-x: auto; }
.gl-tab { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); border: 0; background: transparent; color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-base); cursor: pointer; position: relative; white-space: nowrap; }
.gl-tab:hover { color: var(--gl-text-color-strong); }
.gl-tab.is-active { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.gl-tab.is-active::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; border-radius: var(--gl-border-radius-xs); background-color: var(--gl-tab-selected-indicator-color-default); }
.gl-tab-count { display: inline-flex; align-items: center; border-radius: var(--gl-border-radius-full); background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default); font-size: var(--gl-font-size-sm); padding: 0 var(--gl-spacing-scale-2); }
.gl-h1 { font-size: var(--gl-heading-scale-500-font-size); }
.gl-subtle { color: var(--gl-text-color-subtle); }
.gl-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: 0; }

/* ---- 页面元素 ---- */
.gl-ref-chip { display: inline-flex; align-items: center; padding: 0 var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-default); background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default); font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); }
.gl-code { background-color: var(--gl-color-alpha-dark-4); border-radius: var(--gl-border-radius-sm); padding: 0 var(--gl-spacing-scale-1); font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-strong); }
.gl-desc { max-width: var(--gl-spacing-scale-62); }
.gl-desc p { margin: 0 0 var(--gl-spacing-scale-3); }
.gl-alert { display: flex; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4); border-radius: var(--gl-alert-border-radius); border: 1px solid var(--gl-alert-info-border-color); background-color: var(--gl-alert-info-background-color); color: var(--gl-alert-info-title-color); }
.gl-job-node { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-overlap); min-width: var(--gl-spacing-scale-37); cursor: pointer; }
.gl-job-node:hover { box-shadow: var(--gl-shadow-sm); }
.gl-job-node[data-status='success'] { border-color: var(--gl-alert-success-border-color); }
.gl-job-node[data-status='success'] > svg { color: var(--gl-feedback-success-icon-color); }
.gl-job-node[data-status='failed'] { border-color: var(--gl-alert-danger-border-color); }
.gl-job-node[data-status='failed'] > svg { color: var(--gl-feedback-danger-icon-color); }
.gl-job-node[data-status='running'] > svg { color: var(--gl-feedback-info-icon-color); }
.gl-job-node[data-status='manual'] > svg, .gl-job-node[data-status='created'] > svg { color: var(--gl-text-color-subtle); }
.gl-stage-arrow { align-self: center; color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-500-fixed); flex-shrink: 0; }
.gl-table { width: 100%; border-collapse: collapse; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
.gl-table th { text-align: left; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); box-shadow: inset 0 -1px 0 var(--gl-border-color-default); white-space: nowrap; }
.gl-table td { padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.gl-table tbody tr:hover { background-color: var(--gl-table-row-background-color-hover); }
.gl-table tr[data-status='failed'] td:first-child { color: var(--gl-text-color-danger); }
.gl-issue-row { display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.gl-issue-row:hover { background-color: var(--gl-table-row-background-color-hover); }
.gl-board-col { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-3); width: var(--gl-spacing-scale-62); flex-shrink: 0; padding: var(--gl-spacing-scale-3); border: 1px dashed var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-subtle); }
.gl-board-head { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); }
.gl-board-dot { width: var(--gl-line-height-16); height: var(--gl-line-height-16); border-radius: var(--gl-border-radius-full); flex-shrink: 0; }
.gl-board-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); padding: var(--gl-spacing-scale-3); box-shadow: var(--gl-shadow-sm); cursor: grab; }
.gl-board-card:hover { border-color: var(--gl-border-color-strong); }
.gl-stat { display: flex; flex-direction: column; }
.gl-stat-num { font-size: var(--gl-font-size-500-fixed); font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); }
@media (max-width: 639px) {
  .gl-sidenav { display: none; }
  .gl-rightbar { width: 100%; position: static; padding: 0 var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); }
  .gl-topbar-search { width: auto; flex: 1 1 auto; }
}
@media (min-width: 640px) {
  .gl-main { flex: 1 1 auto; }
}
`;
}

/* ---------------- 各页面 ---------------- */

function mergeRequestPage() {
  const m = D.mergeRequest;
  const discussions = m.discussions
    .map(
      (d) => `
        <article class="gl-card p-5">
          <div class="flex items-start gap-3">
            ${avatar(d.author, d.color)}
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-bold text-[color:var(--gl-text-color-strong)]">${esc(d.author)}</span>
                <span class="gl-subtle text-[length:var(--gl-font-size-sm)]">${esc(d.time)}</span>
                ${d.resolved ? badge('success', '已解决') : badge('warning', '待回复')}
              </div>
              <p class="mt-2 mb-0">${esc(d.body)}</p>
              <div class="mt-3 flex gap-3">
                <button type="button" class="gl-btn gl-btn--link">${icon('comment')}回复</button>
                ${d.resolved ? '' : `<button type="button" class="gl-btn gl-btn--link">${icon('check')}标记解决</button>`}
              </div>
              ${(d.replies || [])
                .map(
                  (r) => `
              <div class="mt-4 pl-5 border-l" style="border-color: var(--gl-border-color-subtle)">
                <div class="flex items-start gap-3">
                  ${avatar(r.author, r.color, '1.75rem')}
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-[length:var(--gl-font-size-base)]">${esc(r.author)}</span>
                      <span class="gl-subtle text-[length:var(--gl-font-size-sm)]">${esc(r.time)}</span>
                    </div>
                    <p class="mt-1 mb-0">${esc(r.body)}</p>
                  </div>
                </div>
              </div>`
                )
                .join('')}
            </div>
          </div>
        </article>`
    )
    .join('\n');

  const content = `
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="gl-h1">${esc(m.title)}</h1>
            ${badge('info', '!' + m.id)}
          </div>
          <p class="gl-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
            <span class="gl-ref-chip">${esc(m.source)}</span> → <span class="gl-ref-chip">${esc(m.target)}</span>
            <span>· ${esc(m.author)} 于 ${esc(m.createdAt)} 创建</span>
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button type="button" class="gl-btn gl-btn--default">编辑</button>
          <button type="button" class="gl-btn gl-btn--default">转为草稿</button>
          <button type="button" class="gl-btn gl-btn--confirm">${icon('mr')} 合并</button>
        </div>
      </div>

      <div class="gl-tabs mt-5" role="tablist" aria-label="合并请求分区">
        <button type="button" class="gl-tab is-active" role="tab" aria-selected="true">概览</button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">提交<span class="gl-tab-count">${m.commits}</span></button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">流水线</button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">变更</button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">讨论<span class="gl-tab-count">${m.discussionCount}</span></button>
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <div class="gl-alert gl-alert--info" role="status">
          ${spinner()}
          <div class="min-w-0 flex-1">
            <p class="m-0 font-bold text-[color:var(--gl-text-color-strong)]">检查进行中</p>
            <p class="m-0">流水线正在运行，完成后可合并（${m.checksPassed} / ${m.checksTotal} 项检查已通过）。</p>
          </div>
        </div>

        <section class="gl-card p-5">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">描述</h2>
          <div class="gl-desc">
            ${m.description.split('\n\n').map((p) => `<p>${esc(p).replace(/\`([^\`]+)\`/g, '<code>$1</code>').replace(/^- /gm, '&bull; ')}</p>`).join('\n            ')}
          </div>
        </section>

        <section aria-label="讨论时间线" class="flex flex-col gap-4">
          ${discussions}
        </section>

        <section class="gl-card p-5" aria-label="批准状态">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-[color:var(--gl-text-color-strong)]">批准</span>
            ${badge('warning', m.approvals.given + ' / ' + m.approvals.required + ' 批准已提交')}
          </div>
          <div class="mt-3 flex items-center gap-3 flex-wrap">
            ${m.reviewers.map((r) => `<span class="flex items-center gap-2">${avatar(r.name, r.color, '1.75rem')}<span>${esc(r.name)}</span></span>`).join('\n            ')}
          </div>
        </section>

        <section class="gl-card p-5" aria-label="合并操作">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">合并设置</h2>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-2"><input type="checkbox" checked> 合并后删除源分支</label>
            <label class="flex items-center gap-2"><input type="checkbox"> 以合并提交方式并入（保留全部提交）</label>
            <label class="flex items-center gap-2"><input type="checkbox" checked> 合并前需流水线通过</label>
          </div>
          <div class="mt-4 flex gap-2 flex-wrap">
            <button type="button" class="gl-btn gl-btn--confirm" disabled>${spinner('gl-icon')} 合并</button>
            <button type="button" class="gl-btn gl-btn--default">关闭合并请求</button>
          </div>
        </section>
      </div>
`;

  const right = `
      <section class="gl-card p-4 mb-5" aria-label="关于此合并请求">
        <h2 class="text-[length:var(--gl-font-size-400-fixed)] mb-3">关于此合并请求</h2>
        <dl class="flex flex-col gap-3 m-0">
          <div><dt class="gl-subtle text-[length:var(--gl-font-size-sm)]">状态</dt><dd class="m-0">${badge('info', '开启中')}</dd></div>
          <div><dt class="gl-subtle text-[length:var(--gl-font-size-sm)]">作者</dt><dd class="m-0 flex items-center gap-2">${avatar(m.author, 'blue', '1.75rem')}<span>${esc(m.author)}</span></dd></div>
          <div><dt class="gl-subtle text-[length:var(--gl-font-size-sm)]">审查者</dt><dd class="m-0 flex flex-col gap-2">${m.reviewers.map((r) => `<span class="flex items-center gap-2">${avatar(r.name, r.color, '1.75rem')}<span>${esc(r.name)}</span></span>`).join('')}</dd></div>
          <div><dt class="gl-subtle text-[length:var(--gl-font-size-sm)]">指派</dt><dd class="m-0 flex flex-col gap-2">${m.assignees.map((r) => `<span class="flex items-center gap-2">${avatar(r.name, r.color, '1.75rem')}<span>${esc(r.name)}</span></span>`).join('')}</dd></div>
          <div><dt class="gl-subtle text-[length:var(--gl-font-size-sm)]">标签</dt><dd class="m-0 flex flex-wrap gap-2">${m.labels.map(labelChip).join('')}</dd></div>
          <div><dt class="gl-subtle text-[length:var(--gl-font-size-sm)]">里程碑</dt><dd class="m-0">${badge('neutral', m.milestone)}</dd></div>
          <div><dt class="gl-subtle text-[length:var(--gl-font-size-sm)]">任务完成度</dt><dd class="m-0">${badge('neutral', '3 / 5 项')}</dd></div>
        </dl>
      </section>
`;

  return layout({
    pageId: 'merge-request',
    title: '合并请求 · 代码评审平台',
    activeNav: 'merge-request',
    sideTitle: D.meta.projects.web,
    sideNamespace: D.meta.productName,
    content,
    right,
  });
}

function pipelinePage() {
  const p = D.pipeline;
  const statusBadge =
    p.status === 'running'
      ? `<span class="gl-badge gl-badge--info">${spinner('gl-icon')} 运行中</span>`
      : badge('success', '已通过');

  const stages = p.stages
    .map(
      (st) => `
        <div class="flex flex-col gap-3 min-w-[var(--gl-spacing-scale-37)]">
          <div class="font-bold text-[color:var(--gl-text-color-strong)] flex items-center gap-2">${icon('check', 'gl-icon')}${esc(st.name)}</div>
          ${st.jobs
            .map((j) => {
              const s = D.jobStatus[j.status];
              const isSpin = j.status === 'running';
              const job =
                `<div class="gl-job-node" data-status="${j.status}">` +
                (isSpin ? spinner('gl-icon') : icon(j.status === 'manual' ? 'play' : j.status === 'failed' ? 'cancel' : 'check', 'gl-icon')) +
                `<span class="min-w-0"><span class="block truncate">${esc(j.name)}</span>` +
                `<span class="gl-subtle text-[length:var(--gl-font-size-sm)]">${esc(j.duration)}</span></span></div>`;
              return `<button type="button" class="text-left" title="${esc(j.name)} · ${esc(s.text)} · ${esc(j.duration)}">${job}</button>`;
            })
            .join('\n          ')}
        </div>`
    )
    .join('\n        <span class="gl-stage-arrow" aria-hidden="true">→</span>');

  const jobRows = p.jobs
    .map((j) => {
      const s = D.jobStatus[j.status];
      const spin = j.status === 'running' ? spinner('gl-icon') : '';
      return `
          <tr data-status="${j.status}">
            <td class="font-bold text-[color:var(--gl-text-color-strong)]">${esc(j.name)}</td>
            <td>${esc(j.stage)}</td>
            <td><span class="gl-badge gl-badge--${s.variant}">${spin}${esc(s.text)}</span></td>
            <td>${esc(j.duration)}</td>
            <td>${esc(j.coverage)}</td>
            <td><button type="button" class="gl-btn gl-btn--link">查看日志</button></td>
          </tr>`;
    })
    .join('');

  const content = `
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="gl-h1">流水线 #${p.id}</h1>
            ${statusBadge}
          </div>
          <p class="gl-subtle mt-2 mb-0 flex items-center gap-2 flex-wrap">
            <span class="gl-ref-chip">${esc(p.branch)}</span>
            <span>· <code class="gl-code">${esc(p.sha)}</code> ${esc(p.commitMsg)}</span>
            <span>· 由 ${esc(p.trigger)} 触发 · 已运行 ${esc(p.duration)}</span>
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button type="button" class="gl-btn gl-btn--default">${icon('retry')} 重试</button>
          <button type="button" class="gl-btn gl-btn--default">${icon('cancel')} 取消</button>
          <button type="button" class="gl-btn gl-btn--confirm">${icon('play')} 运行流水线</button>
          <button type="button" class="gl-icon-btn" aria-label="更多操作">${icon('more')}</button>
        </div>
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="gl-card p-5" aria-label="流水线阶段图">
          <div class="flex items-center gap-4 overflow-x-auto pb-2">
        ${stages}
          </div>
          <hr class="gl-divider my-4">
          <div class="flex items-center gap-4 flex-wrap text-[length:var(--gl-font-size-sm)] gl-subtle">
            <span>${badge('success', '成功 ' + p.counts.success)}</span>
            <span>${badge('danger', '失败 ' + p.counts.failed)}</span>
            <span>${badge('info', '运行中 ' + p.counts.running)}</span>
            <span>${badge('neutral', '其他 ' + p.counts.other)}</span>
            <span class="ml-auto">总耗时 ${esc(p.duration)}</span>
          </div>
        </section>

        <div class="gl-tabs" role="tablist" aria-label="流水线分区">
          <button type="button" class="gl-tab is-active" role="tab" aria-selected="true">概览</button>
          <button type="button" class="gl-tab" role="tab" aria-selected="false">作业<span class="gl-tab-count">${p.jobs.length}</span></button>
          <button type="button" class="gl-tab" role="tab" aria-selected="false">图表</button>
          <button type="button" class="gl-tab" role="tab" aria-selected="false">下游流水线</button>
        </div>

        <section class="gl-card overflow-hidden" aria-label="作业列表">
          <table class="gl-table">
            <thead>
              <tr><th>作业</th><th>阶段</th><th>状态</th><th>时长</th><th>覆盖率</th><th>日志</th></tr>
            </thead>
            <tbody>${jobRows}
            </tbody>
          </table>
        </section>
      </div>
`;

  return layout({
    pageId: 'pipeline',
    title: '流水线 · 持续集成',
    activeNav: 'pipeline',
    sideTitle: D.meta.projects.web,
    sideNamespace: D.meta.productName,
    content,
    right: '',
    maxWidth: '62rem',
  });
}

function projectHomePage() {
  const pr = D.projectHome;
  const visBadge = { public: ['success', '公开'], internal: ['info', '内部'], private: ['danger', '私有'] }[pr.visibility];
  const stat = (n, label) =>
    `<div class="gl-stat"><span class="gl-stat-num">${n}</span><span class="gl-subtle text-[length:var(--gl-font-size-sm)]">${label}</span></div>`;

  const content = `
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="gl-h1">${esc(pr.namespace)} / ${esc(pr.name)}</h1>
            ${badge(visBadge[0], visBadge[1])}
          </div>
          <p class="gl-subtle mt-2 mb-0">${esc(pr.description)}</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button type="button" class="gl-btn gl-btn--default">${icon('star')} ${pr.stars}</button>
          <button type="button" class="gl-btn gl-btn--default">克隆</button>
          <button type="button" class="gl-icon-btn" aria-label="更多操作">${icon('more')}</button>
        </div>
      </div>

      <div class="gl-tabs mt-5" role="tablist" aria-label="项目分区">
        <button type="button" class="gl-tab is-active" role="tab" aria-selected="true">概览</button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">议题<span class="gl-tab-count">${D.issues.openCount}</span></button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">合并请求<span class="gl-tab-count">${D.mergeRequest.discussionCount}</span></button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">CI/CD</button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">部署</button>
        <button type="button" class="gl-tab" role="tab" aria-selected="false">分析</button>
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="gl-card p-5" aria-label="README">
          <div class="flex items-center gap-2 mb-3">${icon('doc', 'gl-icon')}<h2 class="text-[length:var(--gl-font-size-500-fixed)]">README</h2></div>
          <h3 class="text-[length:var(--gl-font-size-400-fixed)] mb-2">${esc(pr.readme.heading)}</h3>
          ${pr.readme.paragraphs.map((t) => `<p class="mt-0">${esc(t)}</p>`).join('\n          ')}
          <hr class="gl-divider my-4">
          <div class="flex items-center gap-2 flex-wrap gl-subtle text-[length:var(--gl-font-size-sm)]">
            ${badge(pr.latestPipeline.status === 'running' ? 'info' : 'success', '流水线 #' + pr.latestPipeline.id + ' · ' + (pr.latestPipeline.status === 'running' ? '运行中' : '已通过'))}
            <span>最近推送于 ${esc(pr.recentCommits[0].time)}</span>
          </div>
        </section>

        <section class="gl-card p-5" aria-label="最近提交">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">最近提交</h2>
          <ul class="flex flex-col gap-3 m-0 p-0 list-none">
            ${pr.recentCommits
              .map(
                (c) => `
            <li class="flex items-center gap-3 flex-wrap">
              <code class="gl-code">${esc(c.sha.slice(0, 8))}</code>
              <a href="#commit" class="min-w-0 truncate">${esc(c.msg)}</a>
              <span class="gl-subtle text-[length:var(--gl-font-size-sm)] ml-auto flex items-center gap-2">${avatar(c.author, 'blue', '1.5rem')}${esc(c.author)} · ${esc(c.time)}</span>
            </li>`
              )
              .join('')}
          </ul>
        </section>
      </div>
`;

  const right = `
      <section class="gl-card p-4 mb-5" aria-label="项目信息">
        <h2 class="text-[length:var(--gl-font-size-400-fixed)] mb-3">项目信息</h2>
        <div class="grid grid-cols-2 gap-3">
          ${stat(pr.stars, '星标')}${stat(pr.forks, '派生')}${stat(pr.commits, '提交')}${stat(pr.branches, '分支')}${stat(pr.tags, '标签')}${stat(pr.clones, '克隆量')}
        </div>
        <hr class="gl-divider my-4">
        <div class="flex flex-col gap-2 text-[length:var(--gl-font-size-sm)]">
          <span class="gl-subtle">默认分支</span><span class="gl-ref-chip">main</span>
          <span class="gl-subtle mt-2">成员</span>
          <span class="flex items-center gap-2">${avatar('李雷', 'blue', '1.75rem')}${avatar('韩梅梅', 'green', '1.75rem')}${avatar('赵大有', 'neutral', '1.75rem')}</span>
        </div>
      </section>
      <section class="gl-card p-4" aria-label="管理入口">
        <h2 class="text-[length:var(--gl-font-size-400-fixed)] mb-3">管理</h2>
        <div class="flex flex-col gap-2">
          <a class="gl-btn gl-btn--link" href="#members">成员管理</a>
          <a class="gl-btn gl-btn--link" href="#security">安全扫描</a>
          <a class="gl-btn gl-btn--link" href="#settings">项目设置</a>
        </div>
      </section>
`;

  return layout({
    pageId: 'project-home',
    title: '项目概览 · my-project',
    activeNav: 'project-home',
    sideTitle: D.meta.projects.home,
    sideNamespace: D.meta.productName,
    content,
    right,
  });
}

function issuesPage() {
  const it = D.issues;
  const rows = it.list
    .map((i) => {
      const st = D.issueState[i.state];
      return `
          <li class="gl-issue-row">
            <div class="pt-1">${icon(i.state === 'opened' ? 'issue' : 'check', 'gl-icon')}</div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <a href="#issue" class="font-bold text-[color:var(--gl-text-color-strong)]">${esc(i.title)}</a>
                ${badge(st.variant, st.text)}
                ${i.labels.map(labelChip).join(' ')}
              </div>
              <p class="gl-subtle text-[length:var(--gl-font-size-sm)] mt-1 mb-0">#${i.id} · 由 ${esc(i.author)} 创建 · 更新于 ${esc(i.updated)}</p>
            </div>
            <div class="flex items-center gap-4 gl-subtle text-[length:var(--gl-font-size-sm)]">
              <span class="flex items-center gap-1" title="评论数">${icon('comment', 'gl-icon')}${i.comments}</span>
              <span class="flex items-center gap-1" title="关注数">${icon('eye', 'gl-icon')}${i.watchers}</span>
            </div>
          </li>`;
    })
    .join('\n');

  const boardColumns = it.boardColumns
    .map(
      (col) => `
        <div class="gl-board-col">
          <div class="gl-board-head">
            <span class="gl-board-dot" style="background-color:${D.labelChipColors[col.color]}"></span>
            <span class="font-bold text-[color:var(--gl-text-color-strong)]">${esc(col.label)}</span>
            ${badge('neutral', col.cards.length)}
          </div>
          ${col.cards
            .map(
              (c) => `
          <div class="gl-board-card" draggable="true">
            <p class="m-0 font-bold text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-strong)]">${esc(c.title)}</p>
            <div class="flex items-center gap-2 mt-2 flex-wrap">
              ${c.labels.map(labelChip).join(' ')}
              <span class="gl-subtle text-[length:var(--gl-font-size-sm)]">#${c.id}</span>
              <span class="ml-auto">${avatar(c.assignee, 'blue', '1.5rem')}</span>
            </div>
          </div>`
            )
            .join('\n          ')}
          <button type="button" class="gl-btn gl-btn--link mt-2 self-start">+ 新建卡片</button>
        </div>`
    )
    .join('\n');

  const content = `
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-3 flex-wrap">
          <h1 class="gl-h1">议题</h1>
          <span class="flex items-center gap-2">${badge('success', '进行中 ' + it.openCount)}${badge('neutral', '已关闭 ' + it.closedCount)}</span>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button type="button" class="gl-icon-btn" title="列表视图" aria-label="列表视图">${icon('list')}</button>
          <button type="button" class="gl-icon-btn" title="看板视图" aria-label="看板视图">${icon('board')}</button>
          <button type="button" class="gl-btn gl-btn--confirm">${icon('plus')} 新建议题</button>
        </div>
      </div>

      <div class="mt-5 flex items-center gap-3 flex-wrap" role="search" aria-label="筛选工具条">
        <label class="gl-input" style="width: min(20rem, 100%)">
          ${icon('search', 'gl-icon')}
          <input type="search" placeholder="按标题或编号搜索" aria-label="搜索议题">
        </label>
        <div class="gl-btn gl-btn--default" role="presentation">状态: 进行中 ${icon('chevronDown', 'gl-icon')}</div>
        <div class="gl-btn gl-btn--default" role="presentation">排序: 最近更新 ${icon('chevronDown', 'gl-icon')}</div>
        <div class="gl-btn gl-btn--default" role="presentation">批量操作 ${icon('chevronDown', 'gl-icon')}</div>
      </div>

      <div class="mt-5 flex flex-col gap-5">
        <section class="gl-card" aria-label="议题列表">
          <ul class="flex flex-col m-0 p-0 list-none">
        ${rows}
          </ul>
          <div class="px-5 py-4 flex items-center justify-between gl-subtle text-[length:var(--gl-font-size-sm)] border-t" style="border-color: var(--gl-border-color-subtle)">
            <span>第 1 / 3 页</span>
            <div class="flex gap-2">
              <button type="button" class="gl-btn gl-btn--default" disabled>上一页</button>
              <button type="button" class="gl-btn gl-btn--default">下一页</button>
            </div>
          </div>
        </section>

        <section aria-label="看板视图">
          <h2 class="text-[length:var(--gl-font-size-500-fixed)] mb-3">看板</h2>
          <div class="flex gap-4 overflow-x-auto pb-2">
        ${boardColumns}
          </div>
        </section>
      </div>
`;

  const right = `
      <section class="gl-card p-4" aria-label="筛选面板">
        <div class="flex items-center justify-between">
          <h2 class="text-[length:var(--gl-font-size-400-fixed)]">筛选</h2>
          <button type="button" class="gl-btn gl-btn--link">清除全部</button>
        </div>
        <div class="mt-3 flex flex-col gap-4">
          <fieldset class="m-0 p-0 border-0">
            <legend class="gl-subtle text-[length:var(--gl-font-size-sm)] p-0 mb-2">状态</legend>
            <label class="flex items-center gap-2 py-1"><input type="radio" name="f-state" checked> 进行中</label>
            <label class="flex items-center gap-2 py-1"><input type="radio" name="f-state"> 已关闭</label>
          </fieldset>
          <fieldset class="m-0 p-0 border-0">
            <legend class="gl-subtle text-[length:var(--gl-font-size-sm)] p-0 mb-2">标签</legend>
            ${it.labels.map((l) => `<label class="flex items-center gap-2 py-1"><input type="checkbox"> ${labelChip(l)}</label>`).join('\n            ')}
          </fieldset>
          <fieldset class="m-0 p-0 border-0">
            <legend class="gl-subtle text-[length:var(--gl-font-size-sm)] p-0 mb-2">指派者</legend>
            ${it.assignees.map((a) => `<label class="flex items-center gap-2 py-1"><input type="checkbox"> ${esc(a.name)}</label>`).join('\n            ')}
          </fieldset>
          <fieldset class="m-0 p-0 border-0">
            <legend class="gl-subtle text-[length:var(--gl-font-size-sm)] p-0 mb-2">里程碑</legend>
            <label class="flex items-center gap-2 py-1"><input type="checkbox" checked> ${esc(it.milestone)}</label>
          </fieldset>
        </div>
      </section>
`;

  return layout({
    pageId: 'issues',
    title: '议题 · my-project',
    activeNav: 'issues',
    sideTitle: D.meta.projects.home,
    sideNamespace: D.meta.productName,
    content,
    right,
  });
}

/* ---------------- 额外页面类 ---------------- */

module.exports = { mergeRequestPage, pipelinePage, projectHomePage, issuesPage };
