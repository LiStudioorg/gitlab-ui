/**
 * pages-lib/pagecss.js
 * 页面公共样式（所有 var(--gl-*) 令牌）。供 html.js / astro.js 复用。
 * 注意：返回的 CSS 引用令牌变量，本身不含 @import；宿主页面需自行引入 variables.css。
 */
module.exports = function pageCss() {
  return `
.pg-page { min-height: 100vh; background-color: var(--gl-background-color-default); color: var(--gl-text-color-default); font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-24); }
.pg-topbar { position: sticky; top: 0; z-index: var(--gl-zindex-3); display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-4); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5); background-color: var(--gl-background-color-overlap); border-bottom: 1px solid var(--gl-border-color-default); }
.pg-topbar-left { display: flex; align-items: center; gap: var(--gl-spacing-scale-4); min-width: 0; }
.pg-topbar-right { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); }
.pg-topbar-brand { font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-400-fixed); color: var(--gl-text-color-heading); white-space: nowrap; }
.pg-search { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-control-background-color-default); width: min(22rem, 40vw); }
.pg-search input { border: 0; outline: none; background: transparent; color: var(--gl-text-color-default); font-size: var(--gl-font-size-sm); width: 100%; }
.pg-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-full); border: 0; background: transparent; color: var(--gl-text-color-default); cursor: pointer; }
.pg-icon-btn:hover { background-color: var(--gl-color-alpha-dark-4); }
.pg-avatar { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-avatar-circle-border-radius-default); background-color: var(--gl-avatar-fallback-background-color-blue); color: var(--gl-text-color-heading); font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-sm); flex-shrink: 0; border: 1px solid var(--gl-avatar-border-color-default); }
.pg-icon { width: var(--gl-line-height-16); height: var(--gl-line-height-16); flex-shrink: 0; }
.pg-shell { display: flex; align-items: flex-start; }
.pg-sidenav { width: var(--gl-spacing-scale-30); flex-shrink: 0; position: sticky; top: var(--gl-spacing-scale-13); max-height: calc(100vh - var(--gl-spacing-scale-13)); overflow-y: auto; padding: var(--gl-spacing-scale-4); border-right: 1px solid var(--gl-border-color-default); min-height: calc(100vh - var(--gl-spacing-scale-13)); }
.pg-sidenav-project { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2); margin-bottom: var(--gl-spacing-scale-4); }
.pg-sidenav-avatar { display: inline-flex; align-items: center; justify-content: center; width: var(--gl-spacing-scale-8); height: var(--gl-spacing-scale-8); border-radius: var(--gl-border-radius-md); background-color: var(--gl-avatar-fallback-background-color-neutral); color: var(--gl-text-color-default); flex-shrink: 0; }
.pg-sidenav-meta { min-width: 0; }
.pg-sidenav-name { display: block; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pg-sidenav-ns { display: block; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); }
.pg-sidenav-nav { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); }
.pg-nav-link { display: flex; align-items: center; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-md); color: var(--gl-text-color-default); font-size: var(--gl-font-size-base); text-decoration: none; }
.pg-nav-link:hover { background-color: var(--gl-color-alpha-dark-4); text-decoration: none; }
.pg-nav-link.is-active { background-color: var(--gl-color-alpha-dark-8); color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.pg-nav-count { margin-left: auto; font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); background-color: var(--gl-badge-muted-background-color-default); border-radius: var(--gl-border-radius-full); padding: 0 var(--gl-spacing-scale-2); line-height: var(--gl-line-height-20); }
.pg-nav-parent { font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); }
.pg-nav-children { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-1); margin: var(--gl-spacing-scale-1) 0 var(--gl-spacing-scale-2); }
.pg-nav-child { padding-left: var(--gl-spacing-scale-9); }
.pg-main { flex: 1 1 auto; min-width: 0; padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-6); }
.pg-rightbar { width: var(--gl-spacing-scale-37); flex-shrink: 0; position: sticky; top: var(--gl-spacing-scale-13); max-height: calc(100vh - var(--gl-spacing-scale-13)); overflow-y: auto; padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5) 0; }
.pg-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); box-shadow: var(--gl-shadow-sm); }
.pg-h1 { font-size: var(--gl-heading-scale-500-font-size); margin: 0; color: var(--gl-text-color-heading); font-weight: var(--gl-font-weight-heading); line-height: var(--gl-line-height-heading); }
.pg-subtle { color: var(--gl-text-color-subtle); }
.pg-chip { display: inline-flex; align-items: center; padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); white-space: nowrap; }
.pg-ref-chip { display: inline-flex; align-items: center; padding: 0 var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-default); background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default); font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); }
.pg-code { background-color: var(--gl-color-alpha-dark-4); border-radius: var(--gl-border-radius-sm); padding: 0 var(--gl-spacing-scale-1); font-family: ui-monospace, monospace; font-size: var(--gl-font-size-sm); color: var(--gl-text-color-strong); }
.pg-spin { animation: pg-spin 0.8s linear infinite; }
@keyframes pg-spin { to { transform: rotate(360deg); } }
.pg-divider { border: 0; border-top: 1px solid var(--gl-border-color-subtle); margin: var(--gl-spacing-scale-4) 0; }
.pg-badge { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-1); padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); white-space: nowrap; }
.pg-badge--neutral { background-color: var(--gl-badge-neutral-background-color-default); color: var(--gl-badge-neutral-text-color-default); }
.pg-badge--info { background-color: var(--gl-badge-info-background-color-default); color: var(--gl-badge-info-text-color-default); }
.pg-badge--success { background-color: var(--gl-badge-success-background-color-default); color: var(--gl-badge-success-text-color-default); }
.pg-badge--warning { background-color: var(--gl-badge-warning-background-color-default); color: var(--gl-badge-warning-text-color-default); }
.pg-badge--danger { background-color: var(--gl-badge-danger-background-color-default); color: var(--gl-badge-danger-text-color-default); }
.pg-badge--tier { background-color: var(--gl-badge-tier-background-color-default); color: var(--gl-badge-tier-text-color-default); }
.pg-btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-button-border-radius); border: 1px solid transparent; font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-semibold); line-height: var(--gl-line-height-20); cursor: pointer; text-decoration: none; }
.pg-btn:hover { text-decoration: none; }
.pg-btn--default { background-color: var(--gl-button-default-primary-background-color-default); border-color: var(--gl-border-color-default); color: var(--gl-button-default-primary-foreground-color-default); }
.pg-btn--default:hover { background-color: var(--gl-color-alpha-dark-4); }
.pg-btn--confirm { background-color: var(--gl-button-confirm-primary-background-color-default); color: var(--gl-button-confirm-primary-foreground-color-default); }
.pg-btn--confirm:hover { filter: brightness(1.1); }
.pg-btn--danger { background-color: var(--gl-button-danger-primary-background-color-default); color: var(--gl-button-danger-primary-foreground-color-default); }
.pg-btn--link { border: 0; background: transparent; color: var(--gl-button-link-text-color-default); padding: 0 var(--gl-spacing-scale-2); }
.pg-btn--link:hover { text-decoration: underline; }
.pg-btn:disabled { cursor: not-allowed; background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color); border-color: var(--gl-action-disabled-border-color); filter: none; }
.pg-input { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); border: 1px solid var(--gl-control-border-color-default); border-radius: var(--gl-control-border-radius); background-color: var(--gl-control-background-color-default); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); color: var(--gl-text-color-default); }
.pg-input input { border: 0; outline: none; background: transparent; color: var(--gl-text-color-default); width: 100%; font-size: var(--gl-font-size-base); }
.pg-input input::placeholder { color: var(--gl-control-placeholder-color); }
.pg-tabs { display: flex; gap: var(--gl-spacing-scale-2); border-bottom: 1px solid var(--gl-border-color-default); overflow-x: auto; }
.pg-tab { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); border: 0; background: transparent; color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-base); cursor: pointer; position: relative; white-space: nowrap; }
.pg-tab:hover { color: var(--gl-text-color-strong); }
.pg-tab.is-active { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.pg-tab.is-active::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; border-radius: var(--gl-border-radius-xs); background-color: var(--gl-tab-selected-indicator-color-default); }
.pg-tab-count { display: inline-flex; align-items: center; border-radius: var(--gl-border-radius-full); background-color: var(--gl-badge-muted-background-color-default); color: var(--gl-badge-muted-text-color-default); font-size: var(--gl-font-size-sm); padding: 0 var(--gl-spacing-scale-2); }
.pg-alert { display: flex; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4); border-radius: var(--gl-alert-border-radius); border: 1px solid var(--gl-alert-info-border-color); background-color: var(--gl-alert-info-background-color); color: var(--gl-alert-info-title-color); }
.pg-job-node { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-3); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-overlap); min-width: var(--gl-spacing-scale-37); cursor: pointer; }
.pg-job-node:hover { box-shadow: var(--gl-shadow-sm); }
.pg-job-node[data-status='success'] { border-color: var(--gl-alert-success-border-color); }
.pg-job-node[data-status='success'] > svg { color: var(--gl-feedback-success-icon-color); }
.pg-job-node[data-status='failed'] { border-color: var(--gl-alert-danger-border-color); }
.pg-job-node[data-status='failed'] > svg { color: var(--gl-feedback-danger-icon-color); }
.pg-job-node[data-status='running'] > svg { color: var(--gl-feedback-info-icon-color); }
.pg-job-node[data-status='manual'] > svg, .pg-job-node[data-status='created'] > svg { color: var(--gl-text-color-subtle); }
.pg-stage-arrow { align-self: center; color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-500-fixed); flex-shrink: 0; }
.pg-table { width: 100%; border-collapse: collapse; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
.pg-table th { text-align: left; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); box-shadow: inset 0 -1px 0 var(--gl-border-color-default); white-space: nowrap; }
.pg-table td { padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.pg-table tbody tr:hover { background-color: var(--gl-table-row-background-color-hover); }
.pg-table tr[data-status='failed'] td:first-child { color: var(--gl-text-color-danger); }
.pg-issue-row { display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5); box-shadow: inset 0 -1px 0 var(--gl-border-color-subtle); }
.pg-issue-row:hover { background-color: var(--gl-table-row-background-color-hover); }
.pg-issue-row > svg { margin-top: var(--gl-spacing-scale-1); color: var(--gl-text-color-subtle); }
.pg-board-col { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-3); width: var(--gl-spacing-scale-62); flex-shrink: 0; padding: var(--gl-spacing-scale-3); border: 1px dashed var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); background-color: var(--gl-background-color-subtle); }
.pg-board-head { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); }
.pg-board-dot { width: var(--gl-line-height-16); height: var(--gl-line-height-16); border-radius: var(--gl-border-radius-full); flex-shrink: 0; }
.pg-board-card { background-color: var(--gl-background-color-overlap); border: 1px solid var(--gl-border-color-default); border-radius: var(--gl-border-radius-lg); padding: var(--gl-spacing-scale-3); box-shadow: var(--gl-shadow-sm); cursor: grab; }
.pg-board-card:hover { border-color: var(--gl-border-color-strong); }
.pg-stat { display: flex; flex-direction: column; }
.pg-stat-num { font-size: var(--gl-font-size-500-fixed); font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-heading); }
.pg-avatar-sm { width: var(--gl-spacing-scale-7); height: var(--gl-spacing-scale-7); }
.pg-desc { max-width: var(--gl-spacing-scale-62); }
.pg-desc p { margin: 0 0 var(--gl-spacing-scale-3); }
@media (max-width: 639px) {
  .pg-sidenav { display: none; }
  .pg-rightbar { width: 100%; position: static; padding: 0 var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); }
  .pg-topbar-search { width: auto; flex: 1 1 auto; }
}
`;
};
