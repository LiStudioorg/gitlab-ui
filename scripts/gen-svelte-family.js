'use strict';
/* gen-svelte-family.js — regenerates the Svelte-family component kits:
 *   dist/svelte  (Svelte 4, scoped <style>, var(--gl-*) tokens)
 *   dist/sveltekit (SvelteKit + Tailwind arbitrary values)
 *   dist/solid   (Solid.js TSX: signals / memo / For / Show)
 *   dist/qwik    (Qwik TSX: component$ / useSignal / $ events / Slot)
 *   dist/astro   (Astro: frontmatter props + Tailwind + inline vanilla script)
 * Pajamas-inspired (MIT, from @gitlab/ui tokens). Repeatable: run `node scripts/gen-svelte-family.js`.
 * Every style reference resolves to a real token from dist/css/variables.css. */
const path = require('path');
const { spec, real, cssText, writeIfChanged, FRAMEWORKS } = require('./gen-lib.js');

const OUT = {
  svelte: FRAMEWORKS.svelte,
  sveltekit: FRAMEWORKS.sveltekit,
  solid: FRAMEWORKS.solid,
  qwik: FRAMEWORKS.qwik,
  astro: FRAMEWORKS.astro,
};

const VAR = (n) => 'var(' + real(n) + ')';
const NAMES = {
  Button: 'GlButton', Input: 'GlInput', Modal: 'GlModal', Table: 'GlTable',
  Tabs: 'GlTabs', Badge: 'GlBadge', Toast: 'GlToast', Dropdown: 'GlDropdown',
  Form: 'GlForm', Alert: 'GlAlert',
};
const COMPONENTS = ['Button', 'Input', 'Modal', 'Table', 'Tabs', 'Badge', 'Toast', 'Dropdown', 'Form', 'Alert'];

const ICON = {
  spin: '<svg class="g-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"></circle><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
  dot: '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg>',
  close: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
  caret: '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  check: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  info: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M8 11V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  warning: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 2.5L14.5 13.5H1.5L8 2.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M8 7v3.5M8 12v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  danger: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  tip: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
};
const ALERT_ICONS_CODE =
  "const ICONS = {\n" +
  "  info: '" + ICON.info + "',\n" +
  "  success: '" + ICON.check + "',\n" +
  "  warning: '" + ICON.warning + "',\n" +
  "  danger: '" + ICON.danger + "',\n" +
  "  tip: '" + ICON.tip + "',\n" +
  "};\n";

const FOCUS = '0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color)';

/* =============================================================== CSS (scoped in Svelte, <style> in Solid/Qwik) == */
const BTN_CSS = `
.g-button {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
  box-sizing: border-box; border: 1px solid var(--tbc); border-radius: var(--gl-button-border-radius);
  background-color: var(--tbg); color: var(--tfg);
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-4); min-width: var(--gl-spacing-scale-20); cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
.g-button:hover { background-color: var(--thbg); color: var(--thfg); border-color: var(--thbc); }
.g-button:active { transform: translateY(1px); }
.g-button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
.g-button:disabled {
  background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color);
  border-color: var(--gl-action-disabled-background-color); cursor: not-allowed;
}
.g-button[data-size='small'] { padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); min-width: 0; font-size: var(--gl-font-size-sm); }
.g-button[data-block='true'] { width: 100%; }
.g-button[data-category='tertiary'], .g-button[data-variant='link'] { background-color: var(--gl-color-alpha-0); border-color: var(--gl-color-alpha-0); }
.g-button[data-variant='link'] { border-radius: 0; padding: 0 var(--gl-spacing-scale-2); min-width: 0; font-weight: var(--gl-font-weight-normal); }
.g-button[data-variant='link']:hover { text-decoration: underline; }
.g-button-icon { display: inline-flex; }
.g-spin { animation: g-spin 0.8s linear infinite; }
@keyframes g-spin { to { transform: rotate(360deg); } }
`.trim();

const INPUT_CSS = `
.g-input {
  width: 100%; box-sizing: border-box; font: inherit; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3); color: var(--gl-text-color-default);
  background-color: var(--gl-control-background-color-default);
  border: 1px solid var(--gl-control-border-color-default); border-radius: var(--gl-control-border-radius);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.g-input::placeholder { color: var(--gl-control-placeholder-color); }
.g-input:hover:not(:disabled):not([readonly]) { border-color: var(--gl-control-border-color-hover); }
.g-input:focus-visible { outline: none; border-color: var(--gl-control-border-color-focus); box-shadow: ${FOCUS}; }
.g-input[data-state='invalid'] { border-color: var(--gl-control-border-color-error); }
.g-input[data-state='invalid']:focus-visible { box-shadow: ${FOCUS}; border-color: var(--gl-control-border-color-error); }
.g-input[data-state='valid'] { box-shadow: inset 0 0 0 1px var(--gl-control-text-color-valid); }
.g-input:disabled { background-color: var(--gl-control-background-color-disabled); color: var(--gl-text-color-disabled); border-color: var(--gl-control-border-color-disabled); cursor: not-allowed; }
.g-input[readonly] { background-color: var(--gl-control-background-color-readonly); }
`.trim();

const MODAL_CSS = `
.g-modal-backdrop {
  position: fixed; inset: 0; z-index: var(--gl-zindex-4); background-color: var(--gl-color-alpha-dark-40);
  display: flex; align-items: flex-start; justify-content: center; padding: var(--gl-spacing-scale-8) var(--gl-spacing-scale-4);
}
.g-modal-dialog {
  background-color: var(--gl-background-color-default); border-radius: var(--gl-modal-border-radius);
  box-shadow: var(--gl-shadow-lg); width: 100%; max-width: var(--gl-spacing-scale-48);
  display: flex; flex-direction: column; max-height: calc(100vh - var(--gl-spacing-scale-9));
}
.g-modal-dialog[data-size='sm'] { max-width: var(--gl-spacing-scale-31); }
.g-modal-dialog[data-size='lg'] { max-width: var(--gl-spacing-scale-80); }
.g-modal-header { display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5) var(--gl-spacing-scale-3); }
.g-modal-title { margin: 0; font-size: var(--gl-heading-scale-500-font-size); font-weight: var(--gl-heading-scale-500-font-weight); color: var(--gl-text-color-heading); }
.g-modal-close { background: none; border: none; cursor: pointer; color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-default); display: inline-flex; }
.g-modal-close:hover { background-color: var(--gl-color-alpha-dark-4); }
.g-modal-body { padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); overflow: auto; color: var(--gl-text-color-default); }
.g-modal-footer { display: flex; flex-wrap: wrap; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); }
@media (max-width: 576px) { .g-modal-footer { flex-direction: column; align-items: stretch; } }
.g-modal-footer button {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
  border-radius: var(--gl-button-border-radius); padding: var(--gl-spacing-scale-3);
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold); cursor: pointer;
}
.g-modal-footer button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
.g-modal-secondary { background-color: var(--gl-action-neutral-background-color-default); color: var(--gl-action-neutral-foreground-color-default); border: 1px solid var(--gl-action-neutral-border-color-default); }
.g-modal-secondary:hover { background-color: var(--gl-action-neutral-background-color-hover); }
.g-modal-primary { border: 1px solid var(--gl-button-confirm-primary-border-color-default); background-color: var(--gl-button-confirm-primary-background-color-default); color: var(--gl-button-confirm-primary-foreground-color-default); }
.g-modal-primary:hover { background-color: var(--gl-button-confirm-primary-background-color-hover); }
.g-modal-primary[data-variant='danger'] { border: 1px solid var(--gl-button-danger-primary-border-color-default); background-color: var(--gl-button-danger-primary-background-color-default); color: var(--gl-button-danger-primary-foreground-color-default); }
.g-modal-primary[data-variant='danger']:hover { background-color: var(--gl-button-danger-primary-background-color-hover); }
`.trim();

const TABLE_CSS = `
.g-table-loading { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-3); }
.g-table-wrap { overflow: auto; }
.g-table { width: 100%; border-collapse: collapse; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
.g-table[data-busy='true'] { opacity: var(--gl-opacity-7); pointer-events: none; }
.g-table th { text-align: left; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-border-color-default); position: sticky; top: 0; background-color: var(--gl-color-alpha-0); }
.g-table th[data-sortable='true'] { cursor: pointer; user-select: none; }
.g-table th[data-sortable='true']:hover { color: var(--gl-text-color-strong); }
.g-table td { padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8); }
.g-table tbody tr:hover td { background-color: var(--gl-table-row-background-color-hover); }
.g-table .g-arrow { color: var(--gl-table-sorting-icon-color); margin-left: var(--gl-spacing-scale-2); }
.g-table .g-empty { text-align: center; padding: var(--gl-spacing-scale-9) var(--gl-spacing-scale-5); color: var(--gl-text-color-subtle); }
.g-spin { animation: g-spin 0.8s linear infinite; }
@keyframes g-spin { to { transform: rotate(360deg); } }
`.trim();

const TABS_CSS = `
.g-tabs-nav { display: flex; gap: var(--gl-spacing-scale-2); overflow-x: auto; border-bottom: 1px solid var(--gl-border-color-default); }
.g-tab { position: relative; display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base); color: var(--gl-text-color-subtle); background: none; border: none; cursor: pointer; white-space: nowrap; }
.g-tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
.g-tab:hover { color: var(--gl-text-color-strong); }
.g-tab:hover::after { background-color: var(--gl-border-color-strong); }
.g-tab[data-active='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.g-tab[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
.g-tab:disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
.g-tab-count { display: inline-flex; align-items: center; border-radius: var(--gl-border-radius-full); background-color: var(--gl-badge-neutral-background-color-default); color: var(--gl-badge-neutral-text-color-default); padding: 0 var(--gl-spacing-scale-2); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); }
.g-tab-pane { padding: var(--gl-spacing-scale-5) 0; color: var(--gl-text-color-default); }
`.trim();

const BADGE_CSS = `
.g-badge { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); text-decoration: none; background-color: var(--gbd); color: var(--gbf); }
a.g-badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
.g-badge[data-disabled='true'] { opacity: var(--gl-opacity-7); pointer-events: none; }
`.trim();

const TOAST_CSS = `
.g-toast {
  position: fixed; bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: var(--gl-zindex-200);
  display: flex; align-items: center; gap: var(--gl-spacing-scale-3); max-width: var(--gl-spacing-scale-48); box-sizing: border-box;
  background-color: var(--gl-feedback-strong-background-color); color: var(--gl-feedback-strong-text-color);
  border-radius: var(--gl-border-radius-full); box-shadow: var(--gl-shadow-md);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base);
  transition: opacity 200ms ease, transform 200ms ease;
}
.g-toast[data-leaving='true'] { opacity: 0; transform: translateY(-8px); }
.g-toast-body { flex: 1; }
.g-toast-action { background: none; border: none; cursor: pointer; padding: 0; color: var(--gl-feedback-strong-link-color); font-weight: var(--gl-font-weight-bold); }
.g-toast-close { background: none; border: none; cursor: pointer; color: var(--gl-feedback-strong-text-color); padding: var(--gl-spacing-scale-1); display: inline-flex; }
`.trim();

const DROPDOWN_CSS = `
.g-dropdown { position: relative; display: inline-block; }
.g-dropdown-toggle { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); background-color: var(--gl-action-neutral-background-color-default); color: var(--gl-action-neutral-foreground-color-default); border: 1px solid var(--gl-action-neutral-border-color-default); border-radius: var(--gl-button-border-radius); padding: var(--gl-spacing-scale-3); font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold); cursor: pointer; }
.g-dropdown-toggle:hover { background-color: var(--gl-action-neutral-background-color-hover); }
.g-dropdown-toggle:focus-visible { outline: none; box-shadow: ${FOCUS}; }
.g-dropdown-toggle .g-caret { display: inline-flex; color: var(--gl-text-color-subtle); }
.g-dropdown-menu { position: absolute; top: calc(100% + var(--gl-spacing-scale-2)); left: 0; min-width: var(--gl-spacing-scale-31); background-color: var(--gl-dropdown-background-color); border: 1px solid var(--gl-dropdown-border-color); border-radius: var(--gl-dropdown-border-radius); box-shadow: var(--gl-shadow-sm); padding: var(--gl-spacing-scale-2); z-index: var(--gl-zindex-3); box-sizing: border-box; }
.g-dropdown-header { padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); }
.g-dropdown-item { display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3); width: 100%; text-align: left; border: none; background: none; cursor: pointer; padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-default); font-size: var(--gl-font-size-base); color: var(--gl-dropdown-option-text-color-default); }
.g-dropdown-item:hover { background-color: var(--gl-dropdown-option-background-color-unselected-hover); }
.g-dropdown-item[data-checked='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); background-color: var(--gl-dropdown-option-background-color-selected-default); }
.g-dropdown-divider { height: 1px; margin: var(--gl-spacing-scale-2); background-color: var(--gl-dropdown-divider-color); }
.g-dropdown-clear { display: block; width: 100%; text-align: left; border: none; background: none; cursor: pointer; padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); color: var(--gl-text-color-link); font-size: var(--gl-font-size-sm); }
.g-dropdown-clear:hover { text-decoration: underline; }
`.trim();

const FORM_CSS = `
.g-form-group { margin-bottom: var(--gl-spacing-scale-5); }
.g-form-label { display: block; font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-base); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-2); }
.g-optional { color: var(--gl-text-color-subtle); font-weight: var(--gl-font-weight-normal); }
.g-feedback { font-size: var(--gl-font-size-sm); margin-top: var(--gl-spacing-scale-2); margin-bottom: 0; }
.g-feedback[data-kind='invalid'] { color: var(--gl-control-text-color-error); }
.g-feedback[data-kind='valid'] { color: var(--gl-control-text-color-valid); }
.g-helper { font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); margin-top: var(--gl-spacing-scale-2); margin-bottom: 0; }
`.trim();

const ALERT_CSS = `
.g-alert { display: flex; gap: var(--gl-spacing-scale-3); border: 1px solid var(--gab); border-radius: var(--gl-alert-border-radius); padding: var(--gl-spacing-scale-4); background-color: var(--gabbg); color: var(--gl-text-color-default); transition: opacity 200ms ease, transform 200ms ease; }
.g-alert[data-leaving='true'] { opacity: 0; transform: translateY(-4px); }
.g-alert[data-sticky='true'] { position: sticky; top: var(--gl-spacing-scale-5); }
.g-alert-icon { display: inline-flex; flex: 0 0 auto; color: var(--gai); }
.g-alert-content { flex: 1; min-width: 0; }
.g-alert-title { margin: 0 0 var(--gl-spacing-scale-1); font-weight: var(--gl-font-weight-bold); color: var(--gat); }
.g-alert-body { margin: 0; color: var(--gl-text-color-default); }
.g-alert-close { background: none; border: none; cursor: pointer; color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-1); border-radius: var(--gl-border-radius-default); align-self: flex-start; display: inline-flex; }
.g-alert-close:hover { background-color: var(--gl-color-alpha-dark-4); }
.g-alert[data-variant='info'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
.g-alert[data-variant='success'] { --gab: var(--gl-alert-success-border-color); --gabbg: var(--gl-alert-success-background-color); --gat: var(--gl-alert-success-title-color); --gai: var(--gl-feedback-success-icon-color); }
.g-alert[data-variant='warning'] { --gab: var(--gl-alert-warning-border-color); --gabbg: var(--gl-alert-warning-background-color); --gat: var(--gl-alert-warning-title-color); --gai: var(--gl-feedback-warning-icon-color); }
.g-alert[data-variant='danger'] { --gab: var(--gl-alert-danger-border-color); --gabbg: var(--gl-alert-danger-background-color); --gat: var(--gl-alert-danger-title-color); --gai: var(--gl-feedback-danger-icon-color); }
.g-alert[data-variant='tip'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
`.trim();

const BTN_TOKENS_JS = `function btnTokens() {
  if (variant === 'link') {
    return {
      bg: 'var(--gl-color-alpha-0)',
      fg: 'var(--gl-button-link-text-color-default)',
      bc: 'var(--gl-color-alpha-0)',
      hbg: 'var(--gl-color-alpha-0)',
      hfg: 'var(--gl-button-link-text-color-hover)',
      hbc: 'var(--gl-color-alpha-0)',
    };
  }
  if (category === 'secondary') {
    const v = variant === 'confirm' ? 'confirm' : variant === 'danger' ? 'danger' : 'neutral';
    return {
      bg: 'var(--gl-action-' + v + '-background-color-default)',
      fg: 'var(--gl-action-' + v + '-foreground-color-default)',
      bc: 'var(--gl-action-' + v + '-border-color-default)',
      hbg: 'var(--gl-action-' + v + '-background-color-hover)',
      hfg: 'var(--gl-action-' + v + '-foreground-color-hover)',
      hbc: 'var(--gl-action-' + v + '-border-color-hover)',
    };
  }
  return {
    bg: 'var(--gl-button-' + variant + '-' + category + '-background-color-default)',
    fg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-default)',
    bc: 'var(--gl-button-' + variant + '-' + category + '-border-color-default)',
    hbg: 'var(--gl-button-' + variant + '-' + category + '-background-color-hover)',
    hfg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-hover)',
    hbc: 'var(--gl-button-' + variant + '-' + category + '-border-color-hover)',
  };
}`;

const BTN_STYLE_JS = `const t = btnTokens();
const btnStyle = '--tbg:' + t.bg + ';--tfg:' + t.fg + ';--tbc:' + t.bc + ';--thbg:' + t.hbg + ';--thfg:' + t.hfg + ';--thbc:' + t.hbc + ';';`;

/* =============================================================== SVELTE (classic) == */
function svelteButton() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let category = 'primary';
  export let variant = 'default';
  export let size = 'medium';
  export let disabled = false;
  export let loading = false;
  export let icon = '';
  export let block = false;
  export let type = 'button';

${BTN_TOKENS_JS}

  $: t = btnTokens();
  $: btnStyle =
    '--tbg:' + t.bg + ';--tfg:' + t.fg + ';--tbc:' + t.bc + ';' +
    '--thbg:' + t.hbg + ';--thfg:' + t.hfg + ';--thbc:' + t.hbc + ';';
</script>

<button
  class="g-button"
  style={btnStyle}
  type={type}
  data-category={category}
  data-variant={variant}
  data-size={size}
  data-block={block}
  disabled={disabled || loading}
  aria-busy={loading}
  on:click
>
  {#if loading}
    <span class="g-button-icon" aria-hidden="true">${ICON.spin}</span>
  {:else if icon}
    <span class="g-button-icon" aria-hidden="true">${ICON.dot}</span>
  {/if}
  {#if $$slots.default}
    <span class="g-button-text"><slot></slot></span>
  {/if}
</button>

<style>
${BTN_CSS}
</style>
`;
}

function svelteInput() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let type = 'text';
  export let placeholder = '';
  export let state = null;
  export let disabled = false;
  export let readonly = false;
  export let width = null;
  export let value = '';

  const dispatch = createEventDispatcher();

  const WIDTH = {
    xs: 'var(--gl-spacing-scale-31)',
    sm: 'var(--gl-spacing-scale-37)',
    md: 'var(--gl-spacing-scale-48)',
    lg: 'var(--gl-spacing-scale-62)',
    xl: 'var(--gl-spacing-scale-75)',
  };

  $: widthStyle = width && WIDTH[width] ? 'max-width:' + WIDTH[width] + ';' : '';

  function onInput(e) {
    dispatch('input', { value: e.currentTarget.value });
  }
  function onChange(e) {
    dispatch('change', { value: e.currentTarget.value });
  }
</script>

<input
  class="g-input"
  style={widthStyle}
  data-state={state}
  data-width={width}
  type={type}
  placeholder={placeholder}
  bind:value
  disabled={disabled}
  readonly={readonly || undefined}
  aria-invalid={state === 'invalid'}
  on:input={onInput}
  on:change={onChange}
/>

<style>
${INPUT_CSS}
</style>
`;
}

function svelteModal() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let visible = false;
  export let title = '';
  export let size = 'md';
  export let primaryAction = null;
  export let secondaryAction = null;
  export let onClose = null;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
    if (typeof onClose === 'function') onClose();
  }
  function onKey(e) {
    if (e.key === 'Escape') dispatch('close');
  }
  onMount(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });
</script>

{#if visible}
  <div
    class="g-modal-backdrop"
    on:click={(e) => {
      if (e.target === e.currentTarget) dispatch('close');
    }}
  >
    <div class="g-modal-dialog" data-size={size} role="dialog" aria-modal="true" aria-label={title}>
      <header class="g-modal-header">
        <h3 class="g-modal-title">{title}</h3>
        <button type="button" class="g-modal-close" aria-label="Close" on:click={close}>${ICON.close}</button>
      </header>
      <div class="g-modal-body">
        <slot></slot>
      </div>
      {#if primaryAction || secondaryAction}
        <footer class="g-modal-footer">
          {#if secondaryAction}
            <button type="button" class="g-modal-secondary" on:click={() => dispatch('secondary')}>{secondaryAction.text}</button>
          {/if}
          {#if primaryAction}
            <button
              type="button"
              class="g-modal-primary"
              data-variant={primaryAction.variant || 'confirm'}
              on:click={() => dispatch('primary')}
            >{primaryAction.text}</button>
          {/if}
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style>
${MODAL_CSS}
</style>
`;
}

function svelteTable() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];
  export let fields = [];
  export let loading = false;
  export let sortBy = null;
  export let sortDesc = false;

  const dispatch = createEventDispatcher();

  $: sorted = (() => {
    if (!sortBy) return items;
    const arr = items.slice().sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDesc ? arr.reverse() : arr;
  })();

  function onSort(f) {
    if (!f.sortable) return;
    if (sortBy === f.key) {
      sortDesc = !sortDesc;
    } else {
      sortBy = f.key;
      sortDesc = false;
    }
    dispatch('sortchange', { key: sortBy, sortDesc });
  }
</script>

{#if loading}
  <div class="g-table-loading" role="status">${ICON.spin} Loading&hellip;</div>
{/if}
<div class="g-table-wrap">
  <table class="g-table" data-busy={loading}>
    <thead>
      <tr>
        {#each fields as f}
          <th
            data-sortable={f.sortable ? 'true' : 'false'}
            aria-sort={sortBy === f.key ? (sortDesc ? 'descending' : 'ascending') : undefined}
            on:click={() => onSort(f)}
          >
            {f.label}
            {#if sortBy === f.key}
              <span class="g-arrow" aria-hidden="true">{sortDesc ? '&darr;' : '&uarr;'}</span>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if sorted.length}
        {#each sorted as row}
          <tr>
            {#each fields as f}
              <td>{row[f.key] ?? ''}</td>
            {/each}
          </tr>
        {/each}
      {:else}
        <tr>
          <td class="g-empty" colspan={fields.length || 1}>No records found.</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
${TABLE_CSS}
</style>
`;
}

function svelteTabs() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let tabs = [];
  export let active = 0;
  export let onChange = null;

  const dispatch = createEventDispatcher();

  function select(i) {
    const tab = tabs[i];
    if (!tab || tab.disabled) return;
    active = i;
    dispatch('change', { index: i });
    if (typeof onChange === 'function') onChange(i, tab);
  }

  $: pane = tabs[active] ? tabs[active].content : '';
</script>

<div class="g-tabs">
  <nav class="g-tabs-nav" role="tablist" aria-label="Tabs">
    {#each tabs as tab, i}
      <button
        type="button"
        class="g-tab"
        data-active={i === active}
        disabled={tab.disabled || undefined}
        role="tab"
        aria-selected={i === active}
        on:click={() => select(i)}
      >
        {tab.title}
        {#if tab.count != null}
          <span class="g-tab-count">{tab.count}</span>
        {/if}
      </button>
    {/each}
  </nav>
  <div class="g-tab-pane" role="tabpanel">{pane}</div>
</div>

<style>
${TABS_CSS}
</style>
`;
}

function svelteBadge() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let variant = 'neutral';
  export let icon = null;
  export let href = null;
  export let disabled = false;

  $: badgeStyle = (() => {
    const bg = 'var(--gl-badge-' + variant + '-background-color-default)';
    const fg = 'var(--gl-badge-' + variant + '-text-color-default)';
    return '--gbd:' + bg + ';--gbf:' + fg + ';';
  })();
  $: badgeClass = 'g-badge' + (href ? ' g-badge-link' : '');
</script>

{#if href}
  <a class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled} href={href || undefined}>
    {#if icon}<span class="g-badge-icon" aria-hidden="true">${ICON.dot}</span>{/if}
    <span><slot></slot></span>
  </a>
{:else}
  <span class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled}>
    {#if icon}<span class="g-badge-icon" aria-hidden="true">${ICON.dot}</span>{/if}
    <span><slot></slot></span>
  </span>
{/if}

<style>
${BADGE_CSS}
</style>
`;
}

function svelteToast() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let visible = false;
  export let message = '';
  export let action = null;
  export let autoHideDelay = 5000;
  export let onDismiss = null;

  const dispatch = createEventDispatcher();

  let leaving = false;
  let timer = null;

  onMount(() => {
    if (visible) arm();
    return () => stop();
  });

  function arm() {
    stop();
    if (autoHideDelay > 0) timer = setTimeout(hide, autoHideDelay);
  }
  function stop() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function show() {
    visible = true;
    leaving = false;
    arm();
  }
  function hide() {
    stop();
    leaving = true;
    setTimeout(() => {
      leaving = false;
      visible = false;
      dispatch('dismiss');
      if (typeof onDismiss === 'function') onDismiss();
    }, 220);
  }
</script>

{#if visible}
  <div class="g-toast" data-leaving={leaving} role="status">
    <span class="g-toast-body">{message}</span>
    {#if action}
      <button type="button" class="g-toast-action" on:click={() => action.onClick && action.onClick()}>{action.text}</button>
    {/if}
    <button type="button" class="g-toast-close" aria-label="Dismiss" on:click={hide}>${ICON.close}</button>
  </div>
{/if}

<style>
${TOAST_CSS}
</style>
`;
}

function svelteDropdown() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let text = '';
  export let items = [];
  export let showClearAll = false;
  export let onSelect = null;

  const dispatch = createEventDispatcher();

  let open = false;
  let rootEl;

  function onDoc(e) {
    if (open && rootEl && !rootEl.contains(e.target)) open = false;
  }
  function onKey(e) {
    if (e.key === 'Escape') open = false;
  }
  onMount(() => {
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  });

  function toggle() {
    open = !open;
  }
  function select(item, i) {
    const checked = typeof item === 'object' ? !item.checked : true;
    dispatch('select', { index: i, item, checked });
    if (typeof onSelect === 'function') onSelect(item, i, checked);
    open = false;
  }
  function clearAll() {
    dispatch('clear-all');
    open = false;
  }
  function labelOf(item) {
    return typeof item === 'string' ? item : item.text;
  }
  function checkedOf(item) {
    return typeof item === 'object' && !!item.checked;
  }
</script>

<div class="g-dropdown" bind:this={rootEl}>
  <button
    type="button"
    class="g-dropdown-toggle"
    aria-haspopup="true"
    aria-expanded={open}
    on:click={toggle}
  >
    {text}
    <span class="g-caret" aria-hidden="true">${ICON.caret}</span>
  </button>
  {#if open}
    <div class="g-dropdown-menu" role="menu" aria-label="Options">
      <div class="g-dropdown-header">Options</div>
      {#each items as item, i}
        <button
          type="button"
          class="g-dropdown-item"
          data-checked={checkedOf(item)}
          role="menuitemcheckbox"
          aria-checked={checkedOf(item)}
          on:click={() => select(item, i)}
        >
          <span>{labelOf(item)}</span>
          {#if checkedOf(item)}
            <span aria-hidden="true">${ICON.check}</span>
          {/if}
        </button>
      {/each}
      {#if showClearAll}
        <div class="g-dropdown-divider" role="separator"></div>
        <button type="button" class="g-dropdown-clear" on:click={clearAll}>Clear all</button>
      {/if}
    </div>
  {/if}
</div>

<style>
${DROPDOWN_CSS}
</style>
`;
}

function svelteForm() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let label = '';
  export let helper = '';
  export let error = null;
  export let optional = false;
  export let state = null;

  $: feedback = error
    ? { text: error, kind: 'invalid' }
    : state === 'valid'
      ? { text: 'Looks good.', kind: 'valid' }
      : null;
</script>

<div class="g-form-group">
  {#if label}
    <label class="g-form-label">
      {label}
      {#if optional}<span class="g-optional">(optional)</span>{/if}
    </label>
  {/if}
  <slot></slot>
  {#if feedback}
    <p class="g-feedback" data-kind={feedback.kind}>{feedback.text}</p>
  {/if}
  {#if helper}
    <p class="g-helper">{helper}</p>
  {/if}
</div>

<style>
${FORM_CSS}
</style>
`;
}

function svelteAlert() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let variant = 'info';
  export let title = '';
  export let dismissible = true;
  export let sticky = false;

  const dispatch = createEventDispatcher();

  let leaving = false;
  let dismissed = false;

${ALERT_ICONS_CODE}

  $: icon = ICONS[variant] || ICONS.info;
  $: cr = variant === 'danger' || variant === 'warning' || variant === 'success' ? 'alert' : 'status';

  function dismiss() {
    leaving = true;
    setTimeout(() => {
      dismissed = true;
      dispatch('dismiss');
    }, 220);
  }
</script>

{#if !dismissed}
  <div
    class="g-alert"
    data-variant={variant}
    data-sticky={sticky}
    data-leaving={leaving}
    role={cr}
  >
    <span class="g-alert-icon" aria-hidden="true">{@html icon}</span>
    <div class="g-alert-content">
      {#if title}
        <h3 class="g-alert-title">{title}</h3>
      {/if}
      <p class="g-alert-body"><slot></slot></p>
    </div>
    {#if dismissible}
      <button type="button" class="g-alert-close" aria-label="Dismiss" on:click={dismiss}>${ICON.close}</button>
    {/if}
  </div>
{/if}

<style>
${ALERT_CSS}
</style>
`;
}

/* =============================================================== SVELTEKIT (Tailwind) == */
function kitButton() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let category = 'primary';
  export let variant = 'default';
  export let size = 'medium';
  export let disabled = false;
  export let loading = false;
  export let icon = '';
  export let block = false;
  export let type = 'button';

${BTN_TOKENS_JS}

  $: t = btnTokens();
  $: btnStyle =
    '--tbg:' + t.bg + ';--tfg:' + t.fg + ';--tbc:' + t.bc + ';' +
    '--thbg:' + t.hbg + ';--thfg:' + t.hfg + ';--thbc:' + t.hbc + ';';
  $: btnClass = [
    'g-button',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-[var(--gl-spacing-scale-2)]',
    'rounded-[var(--gl-button-border-radius)]',
    'font-bold',
    'leading-[var(--gl-line-height-20)]',
    'cursor-pointer',
    'border',
    size === 'small'
      ? 'px-[var(--gl-spacing-scale-2)] min-w-0 text-[length:var(--gl-font-size-sm)]'
      : 'px-[var(--gl-spacing-scale-4)] min-w-[var(--gl-spacing-scale-20)] text-[length:var(--gl-font-size-base)]',
    block ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' ');
</script>

<button
  class={btnClass}
  style={btnStyle}
  type={type}
  data-category={category}
  data-variant={variant}
  disabled={disabled || loading}
  aria-busy={loading}
  on:click
>
  {#if loading}
    <span class="inline-flex" aria-hidden="true">${ICON.spin}</span>
  {:else if icon}
    <span class="inline-flex" aria-hidden="true">${ICON.dot}</span>
  {/if}
  {#if $$slots.default}
    <span><slot></slot></span>
  {/if}
</button>

<style>
  .g-button {
    background-color: var(--tbg); color: var(--tfg); border-color: var(--tbc);
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
  }
  .g-button:hover { background-color: var(--thbg); color: var(--thfg); border-color: var(--thbc); }
  .g-button:active { transform: translateY(1px); }
  .g-button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
  .g-button:disabled {
    background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color);
    border-color: var(--gl-action-disabled-background-color); cursor: not-allowed;
  }
  .g-button[data-category='tertiary'], .g-button[data-variant='link'] { background-color: var(--gl-color-alpha-0); border-color: var(--gl-color-alpha-0); }
  .g-button[data-variant='link'] { border-radius: 0; padding: 0 var(--gl-spacing-scale-2); min-width: 0; font-weight: var(--gl-font-weight-normal); }
  .g-button[data-variant='link']:hover { text-decoration: underline; }
  .g-spin { animation: g-spin 0.8s linear infinite; }
  @keyframes g-spin { to { transform: rotate(360deg); } }
</style>
`;
}

function kitInput() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let type = 'text';
  export let placeholder = '';
  export let state = null;
  export let disabled = false;
  export let readonly = false;
  export let width = null;
  export let value = '';

  const dispatch = createEventDispatcher();

  const WIDTH = {
    xs: 'var(--gl-spacing-scale-31)',
    sm: 'var(--gl-spacing-scale-37)',
    md: 'var(--gl-spacing-scale-48)',
    lg: 'var(--gl-spacing-scale-62)',
    xl: 'var(--gl-spacing-scale-75)',
  };

  $: widthClass = width && WIDTH[width]
    ? 'max-w-[var(--gl-spacing-scale-48)]'
    : '';
  $: widthStyle = width && WIDTH[width] ? 'max-width:' + WIDTH[width] + ';' : '';
  $: inputClass = [
    'g-input',
    'w-full',
    'rounded-[var(--gl-control-border-radius)]',
    'px-[var(--gl-spacing-scale-3)]',
    'py-[var(--gl-spacing-scale-3)]',
    'text-[length:var(--gl-font-size-base)]',
    'leading-[var(--gl-line-height-20)]',
    'bg-[var(--gl-control-background-color-default)]',
    state === 'invalid' ? 'border-[var(--gl-control-border-color-error)]' : 'border-[var(--gl-control-border-color-default)]',
    state === 'valid' ? 'shadow-[inset_0_0_0_1px_var(--gl-control-text-color-valid)]' : '',
  ]
    .filter(Boolean)
    .join(' ');

  function onInput(e) {
    dispatch('input', { value: e.currentTarget.value });
  }
  function onChange(e) {
    dispatch('change', { value: e.currentTarget.value });
  }
</script>

<input
  class={inputClass}
  style={widthStyle}
  type={type}
  placeholder={placeholder}
  bind:value
  disabled={disabled}
  readonly={readonly || undefined}
  aria-invalid={state === 'invalid'}
  on:input={onInput}
  on:change={onChange}
/>

<style>
  .g-input {
    color: var(--gl-text-color-default);
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }
  .g-input::placeholder { color: var(--gl-control-placeholder-color); }
  .g-input:hover:not(:disabled):not([readonly]) { border-color: var(--gl-control-border-color-hover); }
  .g-input:focus-visible { outline: none; border-color: var(--gl-control-border-color-focus); box-shadow: ${FOCUS}; }
  .g-input:disabled {
    background-color: var(--gl-control-background-color-disabled); color: var(--gl-text-color-disabled);
    border-color: var(--gl-control-border-color-disabled); cursor: not-allowed;
  }
  .g-input[readonly] { background-color: var(--gl-control-background-color-readonly); }
</style>
`;
}

function kitModal() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let visible = false;
  export let title = '';
  export let size = 'md';
  export let primaryAction = null;
  export let secondaryAction = null;
  export let onClose = null;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
    if (typeof onClose === 'function') onClose();
  }
  function onKey(e) {
    if (e.key === 'Escape') dispatch('close');
  }
  onMount(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  $: dialogClass = [
    'g-modal-dialog',
    'w-full',
    'rounded-[var(--gl-modal-border-radius)]',
    'shadow-[var(--gl-shadow-lg)]',
    'flex',
    'flex-col',
    'max-h-[calc(100vh-var(--gl-spacing-scale-9))]',
    'bg-[var(--gl-background-color-default)]',
    size === 'sm' ? 'max-w-[var(--gl-spacing-scale-31)]' : size === 'lg' ? 'max-w-[var(--gl-spacing-scale-80)]' : 'max-w-[var(--gl-spacing-scale-48)]',
  ]
    .filter(Boolean)
    .join(' ');
</script>

{#if visible}
  <div class="g-modal-backdrop fixed inset-0 flex items-start justify-center px-[var(--gl-spacing-scale-4)] pt-[var(--gl-spacing-scale-8)] bg-[var(--gl-color-alpha-dark-40)] z-[var(--gl-zindex-4)]" on:click={(e) => { if (e.target === e.currentTarget) dispatch('close'); }}>
    <div class={dialogClass} role="dialog" aria-modal="true" aria-label={title}>
      <header class="flex items-center justify-between gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-3)] pt-[var(--gl-spacing-scale-4)]">
        <h3 class="m-0 text-[length:var(--gl-heading-scale-500-font-size)] font-bold text-[color:var(--gl-text-color-heading)]">{title}</h3>
        <button type="button" class="inline-flex cursor-pointer rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-4)]" aria-label="Close" on:click={close}>${ICON.close}</button>
      </header>
      <div class="overflow-auto px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-5)] pt-[var(--gl-spacing-scale-3)] text-[color:var(--gl-text-color-default)]">
        <slot></slot>
      </div>
      {#if primaryAction || secondaryAction}
        <footer class="flex flex-wrap gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-5)] pt-[var(--gl-spacing-scale-4)] sm:flex-col sm:items-stretch">
          {#if secondaryAction}
            <button type="button" class="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-button-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)] bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] border border-[var(--gl-action-neutral-border-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)]" on:click={() => dispatch('secondary')}>{secondaryAction.text}</button>
          {/if}
          {#if primaryAction}
            <button
              type="button"
              data-variant={primaryAction.variant || 'confirm'}
              class="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-button-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)]"
              on:click={() => dispatch('primary')}
            >{primaryAction.text}</button>
          {/if}
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style>
  .g-modal-primary { border: 1px solid var(--gl-button-confirm-primary-border-color-default); background-color: var(--gl-button-confirm-primary-background-color-default); color: var(--gl-button-confirm-primary-foreground-color-default); }
  .g-modal-primary:hover { background-color: var(--gl-button-confirm-primary-background-color-hover); }
  .g-modal-primary[data-variant='danger'] { border: 1px solid var(--gl-button-danger-primary-border-color-default); background-color: var(--gl-button-danger-primary-background-color-default); color: var(--gl-button-danger-primary-foreground-color-default); }
  .g-modal-primary[data-variant='danger']:hover { background-color: var(--gl-button-danger-primary-background-color-hover); }
  button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
</style>
`;
}

function kitTable() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];
  export let fields = [];
  export let loading = false;
  export let sortBy = null;
  export let sortDesc = false;

  const dispatch = createEventDispatcher();

  $: sorted = (() => {
    if (!sortBy) return items;
    const arr = items.slice().sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDesc ? arr.reverse() : arr;
  })();

  function onSort(f) {
    if (!f.sortable) return;
    if (sortBy === f.key) {
      sortDesc = !sortDesc;
    } else {
      sortBy = f.key;
      sortDesc = false;
    }
    dispatch('sortchange', { key: sortBy, sortDesc });
  }
</script>

{#if loading}
  <div class="mb-3 flex items-center gap-2 text-[color:var(--gl-text-color-strong)]" role="status">${ICON.spin} Loading&hellip;</div>
{/if}
<div class="overflow-auto">
  <table class="w-full border-collapse text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)] {loading ? 'opacity-[var(--gl-opacity-7)] pointer-events-none' : ''}">
    <thead>
      <tr>
        {#each fields as f}
          <th class="sticky top-0 bg-[var(--gl-color-alpha-0)] p-3 text-left font-bold text-[color:var(--gl-text-color-subtle)] shadow-[inset_0_-1px_0_var(--gl-border-color-default)] {f.sortable ? 'cursor-pointer select-none hover:text-[color:var(--gl-text-color-strong)]' : ''}" data-sortable={f.sortable ? 'true' : 'false'} aria-sort={sortBy === f.key ? (sortDesc ? 'descending' : 'ascending') : undefined} on:click={() => onSort(f)}>
            {f.label}
            {#if sortBy === f.key}
              <span class="ml-[var(--gl-spacing-scale-2)] text-[color:var(--gl-table-sorting-icon-color)]" aria-hidden="true">{sortDesc ? '&darr;' : '&uarr;'}</span>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="group">
      {#if sorted.length}
        {#each sorted as row}
          <tr class="group:hover:bg-[var(--gl-table-row-background-color-hover)]">
            {#each fields as f}
              <td class="p-3 shadow-[inset_0_-1px_0_var(--gl-color-alpha-dark-8)] hover:bg-[var(--gl-table-row-background-color-hover)]">{row[f.key] ?? ''}</td>
            {/each}
          </tr>
        {/each}
      {:else}
        <tr>
          <td class="p-[var(--gl-spacing-scale-9)] px-[var(--gl-spacing-scale-5)] text-center text-[color:var(--gl-text-color-subtle)]" colspan={fields.length || 1}>No records found.</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  .g-spin { animation: g-spin 0.8s linear infinite; }
  @keyframes g-spin { to { transform: rotate(360deg); } }
</style>
`;
}

function kitTabs() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let tabs = [];
  export let active = 0;
  export let onChange = null;

  const dispatch = createEventDispatcher();

  function select(i) {
    const tab = tabs[i];
    if (!tab || tab.disabled) return;
    active = i;
    dispatch('change', { index: i });
    if (typeof onChange === 'function') onChange(i, tab);
  }

  $: pane = tabs[active] ? tabs[active].content : '';
</script>

<div class="g-tabs">
  <nav class="flex gap-[var(--gl-spacing-scale-2)] overflow-x-auto border-b border-[var(--gl-border-color-default)]" role="tablist" aria-label="Tabs">
    {#each tabs as tab, i}
      <button
        type="button"
        class="g-tab relative inline-flex items-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)]"
        data-active={i === active}
        disabled={tab.disabled || undefined}
        role="tab"
        aria-selected={i === active}
        on:click={() => select(i)}
      >
        {tab.title}
        {#if tab.count != null}
          <span class="inline-flex items-center rounded-[var(--gl-border-radius-full)] bg-[var(--gl-badge-neutral-background-color-default)] px-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold leading-[var(--gl-line-height-16)] text-[color:var(--gl-badge-neutral-text-color-default)]">{tab.count}</span>
        {/if}
      </button>
    {/each}
  </nav>
  <div class="pt-[var(--gl-spacing-scale-5)] text-[color:var(--gl-text-color-default)]" role="tabpanel">{pane}</div>
</div>

<style>
  .g-tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
  .g-tab:hover { color: var(--gl-text-color-strong); }
  .g-tab:hover::after { background-color: var(--gl-border-color-strong); }
  .g-tab[data-active='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
  .g-tab[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
  .g-tab:disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
</style>
`;
}

function kitBadge() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let variant = 'neutral';
  export let icon = null;
  export let href = null;
  export let disabled = false;

  $: badgeStyle = (() => {
    const bg = 'var(--gl-badge-' + variant + '-background-color-default)';
    const fg = 'var(--gl-badge-' + variant + '-text-color-default)';
    return '--gbd:' + bg + ';--gbf:' + fg + ';';
  })();
  $: badgeClass = [
    'g-badge',
    'inline-flex',
    'items-center',
    'gap-[var(--gl-spacing-scale-2)]',
    'rounded-[var(--gl-border-radius-full)]',
    'px-[var(--gl-spacing-scale-2)]',
    'py-[var(--gl-spacing-scale-1)]',
    'text-[length:var(--gl-font-size-sm)]',
    'font-bold',
    'leading-[var(--gl-line-height-16)]',
    'no-underline',
    disabled ? 'opacity-[var(--gl-opacity-7)] pointer-events-none' : '',
  ]
    .filter(Boolean)
    .join(' ');
</script>

{#if href}
  <a class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled} href={href || undefined}>
    {#if icon}<span aria-hidden="true">${ICON.dot}</span>{/if}
    <span><slot></slot></span>
  </a>
{:else}
  <span class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled}>
    {#if icon}<span aria-hidden="true">${ICON.dot}</span>{/if}
    <span><slot></slot></span>
  </span>
{/if}

<style>
  .g-badge { background-color: var(--gbd); color: var(--gbf); }
  a.g-badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
</style>
`;
}

function kitToast() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let visible = false;
  export let message = '';
  export let action = null;
  export let autoHideDelay = 5000;
  export let onDismiss = null;

  const dispatch = createEventDispatcher();

  let leaving = false;
  let timer = null;

  onMount(() => {
    if (visible) arm();
    return () => stop();
  });

  function arm() {
    stop();
    if (autoHideDelay > 0) timer = setTimeout(hide, autoHideDelay);
  }
  function stop() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function show() {
    visible = true;
    leaving = false;
    arm();
  }
  function hide() {
    stop();
    leaving = true;
    setTimeout(() => {
      leaving = false;
      visible = false;
      dispatch('dismiss');
      if (typeof onDismiss === 'function') onDismiss();
    }, 220);
  }
</script>

{#if visible}
  <div class="g-toast fixed bottom-[var(--gl-spacing-scale-6)] left-[var(--gl-spacing-scale-6)] z-[var(--gl-zindex-200)] flex max-w-[var(--gl-spacing-scale-48)] items-center gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-border-radius-full)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] bg-[var(--gl-feedback-strong-background-color)] text-[color:var(--gl-feedback-strong-text-color)] shadow-[var(--gl-shadow-md)]" data-leaving={leaving} role="status">
    <span class="flex-1">{message}</span>
    {#if action}
      <button type="button" class="bg-transparent border-0 p-0 font-bold text-[color:var(--gl-feedback-strong-link-color)] cursor-pointer" on:click={() => action.onClick && action.onClick()}>{action.text}</button>
    {/if}
    <button type="button" class="inline-flex bg-transparent border-0 p-[var(--gl-spacing-scale-1)] cursor-pointer text-[color:var(--gl-feedback-strong-text-color)]" aria-label="Dismiss" on:click={hide}>${ICON.close}</button>
  </div>
{/if}

<style>
  .g-toast { transition: opacity 200ms ease, transform 200ms ease; }
  .g-toast[data-leaving='true'] { opacity: 0; transform: translateY(-8px); }
</style>
`;
}

function kitDropdown() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let text = '';
  export let items = [];
  export let showClearAll = false;
  export let onSelect = null;

  const dispatch = createEventDispatcher();

  let open = false;
  let rootEl;

  function onDoc(e) {
    if (open && rootEl && !rootEl.contains(e.target)) open = false;
  }
  function onKey(e) {
    if (e.key === 'Escape') open = false;
  }
  onMount(() => {
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  });

  function toggle() {
    open = !open;
  }
  function select(item, i) {
    const checked = typeof item === 'object' ? !item.checked : true;
    dispatch('select', { index: i, item, checked });
    if (typeof onSelect === 'function') onSelect(item, i, checked);
    open = false;
  }
  function clearAll() {
    dispatch('clear-all');
    open = false;
  }
  function labelOf(item) {
    return typeof item === 'string' ? item : item.text;
  }
  function checkedOf(item) {
    return typeof item === 'object' && !!item.checked;
  }
</script>

<div class="g-dropdown relative inline-block" bind:this={rootEl}>
  <button
    type="button"
    class="inline-flex cursor-pointer items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-button-border-radius)] border border-[var(--gl-action-neutral-border-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)] bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)]"
    aria-haspopup="true"
    aria-expanded={open}
    on:click={toggle}
  >
    {text}
    <span class="inline-flex text-[color:var(--gl-text-color-subtle)]" aria-hidden="true">${ICON.caret}</span>
  </button>
  {#if open}
    <div class="absolute left-0 top-[calc(100%+var(--gl-spacing-scale-2))] z-[var(--gl-zindex-3)] box-border min-w-[var(--gl-spacing-scale-31)] rounded-[var(--gl-dropdown-border-radius)] border border-[var(--gl-dropdown-border-color)] bg-[var(--gl-dropdown-background-color)] p-[var(--gl-spacing-scale-2)] shadow-[var(--gl-shadow-sm)]" role="menu" aria-label="Options">
      <div class="p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-sm)] font-bold text-[color:var(--gl-text-color-subtle)]">Options</div>
      {#each items as item, i}
        <button
          type="button"
          class="flex w-full cursor-pointer items-center justify-between gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-base)] text-[color:var(--gl-dropdown-option-text-color-default)] hover:bg-[var(--gl-dropdown-option-background-color-unselected-hover)] {checkedOf(item) ? 'font-bold text-[color:var(--gl-text-color-strong)] bg-[var(--gl-dropdown-option-background-color-selected-default)]' : ''}"
          data-checked={checkedOf(item)}
          role="menuitemcheckbox"
          aria-checked={checkedOf(item)}
          on:click={() => select(item, i)}
        >
          <span>{labelOf(item)}</span>
          {#if checkedOf(item)}
            <span aria-hidden="true">${ICON.check}</span>
          {/if}
        </button>
      {/each}
      {#if showClearAll}
        <div class="my-[var(--gl-spacing-scale-2)] h-px bg-[var(--gl-dropdown-divider-color)]" role="separator"></div>
        <button type="button" class="block w-full cursor-pointer border-0 bg-transparent p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-link)] hover:underline" on:click={clearAll}>Clear all</button>
      {/if}
    </div>
  {/if}
</div>

<style>
  button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
</style>
`;
}

function kitForm() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let label = '';
  export let helper = '';
  export let error = null;
  export let optional = false;
  export let state = null;

  $: feedback = error
    ? { text: error, kind: 'invalid' }
    : state === 'valid'
      ? { text: 'Looks good.', kind: 'valid' }
      : null;
</script>

<div class="g-form-group mb-[var(--gl-spacing-scale-5)]">
  {#if label}
    <label class="mb-[var(--gl-spacing-scale-2)] block text-[length:var(--gl-font-size-base)] font-bold text-[color:var(--gl-text-color-strong)]">
      {label}
      {#if optional}<span class="font-normal text-[color:var(--gl-text-color-subtle)]">(optional)</span>{/if}
    </label>
  {/if}
  <slot></slot>
  {#if feedback}
    <p class="mt-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] {feedback.kind === 'invalid' ? 'text-[color:var(--gl-control-text-color-error)]' : 'text-[color:var(--gl-control-text-color-valid)]'}">{feedback.text}</p>
  {/if}
  {#if helper}
    <p class="mt-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">{helper}</p>
  {/if}
</div>
`;
}

function kitAlert() {
  return `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let variant = 'info';
  export let title = '';
  export let dismissible = true;
  export let sticky = false;

  const dispatch = createEventDispatcher();

  let leaving = false;
  let dismissed = false;

${ALERT_ICONS_CODE}

  $: icon = ICONS[variant] || ICONS.info;
  $: cr = variant === 'danger' || variant === 'warning' || variant === 'success' ? 'alert' : 'status';

  function dismiss() {
    leaving = true;
    setTimeout(() => {
      dismissed = true;
      dispatch('dismiss');
    }, 220);
  }
</script>

{#if !dismissed}
  <div
    class="g-alert flex gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-alert-border-radius)] p-[var(--gl-spacing-scale-4)]"
    data-variant={variant}
    data-sticky={sticky}
    data-leaving={leaving}
    role={cr}
  >
    <span class="flex flex-none" aria-hidden="true">{@html icon}</span>
    <div class="min-w-0 flex-1">
      {#if title}
        <h3 class="m-0 mb-[var(--gl-spacing-scale-1)] font-bold" style="color: var(--gab);">{title}</h3>
      {/if}
      <p class="m-0 text-[color:var(--gl-text-color-default)]"><slot></slot></p>
    </div>
    {#if dismissible}
      <button type="button" class="inline-flex self-start cursor-pointer rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-1)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-4)]" aria-label="Dismiss" on:click={dismiss}>${ICON.close}</button>
    {/if}
  </div>
{/if}

<style>
  .g-alert { background-color: var(--gabbg); border: 1px solid var(--gab); transition: opacity 200ms ease, transform 200ms ease; }
  .g-alert[data-leaving='true'] { opacity: 0; transform: translateY(-4px); }
  .g-alert[data-sticky='true'] { position: sticky; top: var(--gl-spacing-scale-5); }
  .g-alert[data-variant='info'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
  .g-alert[data-variant='success'] { --gab: var(--gl-alert-success-border-color); --gabbg: var(--gl-alert-success-background-color); --gat: var(--gl-alert-success-title-color); --gai: var(--gl-feedback-success-icon-color); }
  .g-alert[data-variant='warning'] { --gab: var(--gl-alert-warning-border-color); --gabbg: var(--gl-alert-warning-background-color); --gat: var(--gl-alert-warning-title-color); --gai: var(--gl-feedback-warning-icon-color); }
  .g-alert[data-variant='danger'] { --gab: var(--gl-alert-danger-border-color); --gabbg: var(--gl-alert-danger-background-color); --gat: var(--gl-alert-danger-title-color); --gai: var(--gl-feedback-danger-icon-color); }
  .g-alert[data-variant='tip'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
</style>
`;
}

/* =============================================================== SOLID (TSX) == */
function solidButton() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import type { JSX } from 'solid-js';

export interface ButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  type?: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  children?: JSX.Element;
}

export const STYLE = \`
${BTN_CSS}
\`;

function btnTokens(category: string, variant: string) {
  if (variant === 'link') {
    return {
      bg: 'var(--gl-color-alpha-0)',
      fg: 'var(--gl-button-link-text-color-default)',
      bc: 'var(--gl-color-alpha-0)',
      hbg: 'var(--gl-color-alpha-0)',
      hfg: 'var(--gl-button-link-text-color-hover)',
      hbc: 'var(--gl-color-alpha-0)',
    };
  }
  if (category === 'secondary') {
    const v = variant === 'confirm' ? 'confirm' : variant === 'danger' ? 'danger' : 'neutral';
    return {
      bg: 'var(--gl-action-' + v + '-background-color-default)',
      fg: 'var(--gl-action-' + v + '-foreground-color-default)',
      bc: 'var(--gl-action-' + v + '-border-color-default)',
      hbg: 'var(--gl-action-' + v + '-background-color-hover)',
      hfg: 'var(--gl-action-' + v + '-foreground-color-hover)',
      hbc: 'var(--gl-action-' + v + '-border-color-hover)',
    };
  }
  return {
    bg: 'var(--gl-button-' + variant + '-' + category + '-background-color-default)',
    fg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-default)',
    bc: 'var(--gl-button-' + variant + '-' + category + '-border-color-default)',
    hbg: 'var(--gl-button-' + variant + '-' + category + '-background-color-hover)',
    hfg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-hover)',
    hbc: 'var(--gl-button-' + variant + '-' + category + '-border-color-hover)',
  };
}

export function Button(props: ButtonProps) {
  const category = () => props.category ?? 'primary';
  const variant = () => props.variant ?? 'default';
  const size = () => props.size ?? 'medium';
  const t = () => btnTokens(category(), variant());
  const btnStyle = () =>
    '--tbg:' + t().bg + ';--tfg:' + t().fg + ';--tbc:' + t().bc + ';' +
    '--thbg:' + t().hbg + ';--thfg:' + t().hfg + ';--thbc:' + t().hbc + ';';
  return (
    <button
      class="g-button"
      style={btnStyle()}
      type={props.type ?? 'button'}
      data-category={category()}
      data-variant={variant()}
      data-size={size()}
      data-block={props.block}
      disabled={props.disabled || props.loading}
      aria-busy={props.loading}
      onClick={props.onClick}
    >
      {props.loading ? (
        <span class="g-button-icon" aria-hidden="true">${ICON.spin}</span>
      ) : props.icon ? (
        <span class="g-button-icon" aria-hidden="true">${ICON.dot}</span>
      ) : null}
      {props.children ? <span class="g-button-text">{props.children}</span> : null}
    </button>
  );
}

export default Button;
`;
}

function solidInput() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal } from 'solid-js';

export interface InputProps {
  type?: string;
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  'readonly'?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  value?: string;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
}

const WIDTH: Record<string, string> = {
  xs: 'max-width:var(--gl-spacing-scale-31);',
  sm: 'max-width:var(--gl-spacing-scale-37);',
  md: 'max-width:var(--gl-spacing-scale-48);',
  lg: 'max-width:var(--gl-spacing-scale-62);',
  xl: 'max-width:var(--gl-spacing-scale-75);',
};

export function Input(props: InputProps) {
  const [value, setValue] = createSignal(props.value ?? '');
  const state = () => props.state ?? null;
  const width = () => props.width ?? null;
  const widthStyle = () => (width() && WIDTH[width()!] ? WIDTH[width()!] : '');
  return (
    <>
      <input
        class="g-input"
        style={widthStyle()}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        value={value()}
        data-state={state() ?? ''}
        data-width={width() ?? ''}
        disabled={props.disabled}
        readonly={props['readonly']}
        aria-invalid={state() === 'invalid'}
        onInput={(e) => {
          const v = e.currentTarget.value;
          setValue(v);
          props.onInput?.(v);
        }}
        onChange={(e) => props.onChange?.(e.currentTarget.value)}
      />
      <style>{INPUT_CSS}</style>
    </>
  );
}

export default Input;
`;
}

function solidModal() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { Show, onCleanup } from 'solid-js';
import type { JSX } from 'solid-js';

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: { text: string; variant?: 'confirm' | 'danger' } | null;
  secondaryAction?: { text: string } | null;
  onClose?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
  children?: JSX.Element;
}

export function Modal(props: ModalProps) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') props.onClose?.();
  };
  if (props.visible) document.addEventListener('keydown', onKey);
  onCleanup(() => document.removeEventListener('keydown', onKey));
  const size = () => props.size ?? 'md';
  return (
    <Show when={props.visible}>
      <div
        class="g-modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) props.onClose?.();
        }}
      >
        <div class="g-modal-dialog" data-size={size()} role="dialog" aria-modal="true" aria-label={props.title}>
          <header class="g-modal-header">
            <h3 class="g-modal-title">{props.title}</h3>
            <button type="button" class="g-modal-close" aria-label="Close" onClick={() => props.onClose?.()}>${ICON.close}</button>
          </header>
          <div class="g-modal-body">{props.children}</div>
          {props.primaryAction || props.secondaryAction ? (
            <footer class="g-modal-footer">
              {props.secondaryAction ? (
                <button type="button" class="g-modal-secondary" onClick={() => props.onSecondary?.()}>
                  {props.secondaryAction.text}
                </button>
              ) : null}
              {props.primaryAction ? (
                <button
                  type="button"
                  class="g-modal-primary"
                  data-variant={props.primaryAction.variant ?? 'confirm'}
                  onClick={() => props.onPrimary?.()}
                >
                  {props.primaryAction.text}
                </button>
              ) : null}
            </footer>
          ) : null}
        </div>
      </div>
      <style>{MODAL_CSS}</style>
    </Show>
  );
}

export default Modal;
`;
}

function solidTable() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createMemo, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';

export interface Field {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Record<string, unknown>[];
  fields?: Field[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
  onSort?: (key: string, sortDesc: boolean) => void;
}

export function Table(props: TableProps) {
  const items = () => props.items ?? [];
  const fields = () => props.fields ?? [];
  const [sortBy, setSortBy] = createSignal(props.sortBy ?? null);
  const [sortDesc, setSortDesc] = createSignal(props.sortDesc ?? false);

  const sorted = createMemo(() => {
    const key = sortBy();
    if (!key) return items();
    const arr = items().slice().sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDesc() ? arr.reverse() : arr;
  });

  const onSort = (f: Field) => {
    if (!f.sortable) return;
    if (sortBy() === f.key) {
      setSortDesc(!sortDesc());
    } else {
      setSortBy(f.key);
      setSortDesc(false);
    }
    props.onSort?.(sortBy()!, sortDesc());
  };

  return (
    <>
      {props.loading ? (
        <div class="g-table-loading" role="status">${ICON.spin} Loading&hellip;</div>
      ) : null}
      <div class="g-table-wrap">
        <table class="g-table" data-busy={props.loading}>
          <thead>
            <tr>
              {fields().map((f) => (
                <th
                  data-sortable={f.sortable ? 'true' : 'false'}
                  aria-sort={sortBy() === f.key ? (sortDesc() ? 'descending' : 'ascending') : undefined}
                  onClick={() => onSort(f)}
                >
                  {f.label}
                  {sortBy() === f.key ? (
                    <span class="g-arrow" aria-hidden="true">
                      {sortDesc() ? '\\u2193' : '\\u2191'}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted().length ? (
              sorted().map((row) => (
                <tr>
                  {fields().map((f) => (
                    <td>{String(row[f.key] ?? '')}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td class="g-empty" colspan={fields().length || 1}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{TABLE_CSS}</style>
    </>
  );
}

export default Table;
`;
}

function solidTabs() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';

export interface TabMeta {
  title: string;
  count?: number;
  disabled?: boolean;
  content?: string;
}

export interface TabsProps {
  tabs?: TabMeta[];
  active?: number;
  onChange?: (index: number) => void;
}

export function Tabs(props: TabsProps) {
  const tabs = () => props.tabs ?? [];
  const [active, setActive] = createSignal(props.active ?? 0);
  const select = (i: number) => {
    const tab = tabs()[i];
    if (!tab || tab.disabled) return;
    setActive(i);
    props.onChange?.(i);
  };
  const pane = () => {
    const cur = tabs()[active()];
    return cur ? cur.content : '';
  };
  return (
    <div>
      <nav class="g-tabs-nav" role="tablist" aria-label="Tabs">
        {tabs().map((tab, i) => (
          <button
            type="button"
            class="g-tab"
            data-active={i === active()}
            disabled={tab.disabled ? true : undefined}
            role="tab"
            aria-selected={i === active()}
            onClick={() => select(i)}
          >
            {tab.title}
            {tab.count != null ? <span class="g-tab-count">{tab.count}</span> : null}
          </button>
        ))}
      </nav>
      <div class="g-tab-pane" role="tabpanel">
        {pane()}
      </div>
      <style>{TABS_CSS}</style>
    </div>
  );
}

export default Tabs;
`;
}

function solidBadge() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import type { JSX } from 'solid-js';

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
  children?: JSX.Element;
}

export function Badge(props: BadgeProps) {
  const variant = () => props.variant ?? 'neutral';
  const style = () =>
    '--gbd:var(--gl-badge-' + variant() + '-background-color-default);' +
    '--gbf:var(--gl-badge-' + variant() + '-text-color-default);';
  const inner = (
    <>
      {props.icon ? (
        <span class="g-badge-icon" aria-hidden="true">${ICON.dot}</span>
      ) : null}
      <span>{props.children}</span>
    </>
  );
  return props.href ? (
    <a class="g-badge" style={style()} data-variant={variant()} data-disabled={props.disabled} href={props.href}>
      {inner}
      <style>{BADGE_CSS}</style>
    </a>
  ) : (
    <span class="g-badge" style={style()} data-variant={variant()} data-disabled={props.disabled}>
      {inner}
      <style>{BADGE_CSS}</style>
    </span>
  );
}

export default Badge;
`;
}

function solidToast() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal, onCleanup } from 'solid-js';
import type { JSX } from 'solid-js';

export interface ToastProps {
  visible?: boolean;
  message?: string;
  action?: { text: string; onClick?: () => void } | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
}

export function Toast(props: ToastProps) {
  const [visible, setVisible] = createSignal(props.visible ?? false);
  const [leaving, setLeaving] = createSignal(false);
  let timer = 0;

  const arm = () => {
    if (timer) window.clearTimeout(timer);
    const delay = props.autoHideDelay ?? 5000;
    if (delay > 0) timer = window.setTimeout(() => hide(), delay);
  };
  const stop = () => {
    if (timer) {
      window.clearTimeout(timer);
      timer = 0;
    }
  };
  const show = () => {
    setVisible(true);
    setLeaving(false);
    arm();
  };
  const hide = () => {
    stop();
    setLeaving(true);
    window.setTimeout(() => {
      setLeaving(false);
      setVisible(false);
      props.onDismiss?.();
    }, 220);
  };
  if (props.visible) arm();
  onCleanup(stop);

  return (
    <>
      {visible() ? (
        <div class="g-toast" data-leaving={leaving()} role="status">
          <span class="g-toast-body">{props.message}</span>
          {props.action ? (
            <button type="button" class="g-toast-action" onClick={() => props.action!.onClick?.()}>
              {props.action.text}
            </button>
          ) : null}
          <button type="button" class="g-toast-close" aria-label="Dismiss" onClick={hide}>${ICON.close}</button>
        </div>
      ) : null}
      <style>{TOAST_CSS}</style>
    </>
  );
}

export default Toast;
`;
}

function solidDropdown() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal, onCleanup } from 'solid-js';
import type { JSX } from 'solid-js';

export type DropdownItem = string | { text: string; checked?: boolean };

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect?: (index: number, item: DropdownItem, checked: boolean) => void;
  onClearAll?: () => void;
}

export function Dropdown(props: DropdownProps) {
  const [open, setOpen] = createSignal(false);
  let rootEl: HTMLDivElement | undefined;

  const onDoc = (e: Event) => {
    if (open() && rootEl && !rootEl.contains(e.target as Node)) setOpen(false);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };
  document.addEventListener('mousedown', onDoc);
  document.addEventListener('keydown', onKey);
  onCleanup(() => {
    document.removeEventListener('mousedown', onDoc);
    document.removeEventListener('keydown', onKey);
  });

  const labelOf = (item: DropdownItem) => (typeof item === 'string' ? item : item.text);
  const checkedOf = (item: DropdownItem) => typeof item === 'object' && !!item.checked;
  const select = (item: DropdownItem, i: number) => {
    props.onSelect?.(i, item, typeof item === 'object' ? !item.checked : true);
    setOpen(false);
  };
  const clearAll = () => {
    props.onClearAll?.();
    setOpen(false);
  };

  return (
    <div class="g-dropdown" ref={rootEl}>
      <button type="button" class="g-dropdown-toggle" aria-haspopup="true" aria-expanded={open()} onClick={() => setOpen(!open())}>
        {props.text}
        <span class="g-caret" aria-hidden="true">${ICON.caret}</span>
      </button>
      {open() ? (
        <div class="g-dropdown-menu" role="menu" aria-label="Options">
          <div class="g-dropdown-header">Options</div>
          {(props.items ?? []).map((item, i) => (
            <button
              type="button"
              class="g-dropdown-item"
              data-checked={checkedOf(item)}
              role="menuitemcheckbox"
              aria-checked={checkedOf(item)}
              onClick={() => select(item, i)}
            >
              <span>{labelOf(item)}</span>
              {checkedOf(item) ? <span aria-hidden="true">${ICON.check}</span> : null}
            </button>
          ))}
          {props.showClearAll ? (
            <>
              <div class="g-dropdown-divider" role="separator" />
              <button type="button" class="g-dropdown-clear" onClick={clearAll}>
                Clear all
              </button>
            </>
          ) : null}
        </div>
      ) : null}
      <style>{DROPDOWN_CSS}</style>
    </div>
  );
}

export default Dropdown;
`;
}

function solidForm() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import type { JSX } from 'solid-js';

export interface FormProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  state?: 'valid' | 'invalid' | null;
  children?: JSX.Element;
}

export function Form(props: FormProps) {
  const error = () => props.error ?? null;
  const state = () => props.state ?? null;
  const feedback = () =>
    error()
      ? { text: error() as string, kind: 'invalid' }
      : state() === 'valid'
        ? { text: 'Looks good.', kind: 'valid' }
        : null;
  return (
    <>
      <div class="g-form-group">
        {props.label ? (
          <label class="g-form-label">
            {props.label}
            {props.optional ? <span class="g-optional">(optional)</span> : null}
          </label>
        ) : null}
        {props.children}
        {feedback() ? <p class="g-feedback" data-kind={feedback()!.kind}>{feedback()!.text}</p> : null}
        {props.helper ? <p class="g-helper">{props.helper}</p> : null}
      </div>
      <style>{FORM_CSS}</style>
    </>
  );
}

export default Form;
`;
}

function solidAlert() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
  children?: JSX.Element;
}

const ICONS: Record<string, string> = {
  info: '${ICON.info}',
  success: '${ICON.check}',
  warning: '${ICON.warning}',
  danger: '${ICON.danger}',
  tip: '${ICON.tip}',
};

export function Alert(props: AlertProps) {
  const [leaving, setLeaving] = createSignal(false);
  const [dismissed, setDismissed] = createSignal(false);
  const variant = () => props.variant ?? 'info';
  const cr = () => (variant() === 'danger' || variant() === 'warning' || variant() === 'success' ? 'alert' : 'status');
  const dismiss = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setDismissed(true);
      props.onDismiss?.();
    }, 220);
  };
  return (
    <>
      {!dismissed() ? (
        <div class="g-alert" data-variant={variant()} data-sticky={props.sticky} data-leaving={leaving()} role={cr()}>
          <span class="g-alert-icon" aria-hidden="true" innerHTML={ICONS[variant()] ?? ICONS.info} />
          <div class="g-alert-content">
            {props.title ? <h3 class="g-alert-title">{props.title}</h3> : null}
            <p class="g-alert-body">{props.children}</p>
          </div>
          {props.dismissible !== false ? (
            <button type="button" class="g-alert-close" aria-label="Dismiss" onClick={dismiss}>${ICON.close}</button>
          ) : null}
        </div>
      ) : null}
      <style>{ALERT_CSS}</style>
    </>
  );
}

export default Alert;
`;
}

/* =============================================================== QWIK (TSX) == */
function qwikButton() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, Slot } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface ButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  type?: string;
  onClick$?: QRL<(event: MouseEvent, element: HTMLButtonElement) => void>;
}

export const BTN_CSS = \`
${BTN_CSS}
\`;

function btnTokens(category: string, variant: string) {
  if (variant === 'link') {
    return {
      bg: 'var(--gl-color-alpha-0)',
      fg: 'var(--gl-button-link-text-color-default)',
      bc: 'var(--gl-color-alpha-0)',
      hbg: 'var(--gl-color-alpha-0)',
      hfg: 'var(--gl-button-link-text-color-hover)',
      hbc: 'var(--gl-color-alpha-0)',
    };
  }
  if (category === 'secondary') {
    const v = variant === 'confirm' ? 'confirm' : variant === 'danger' ? 'danger' : 'neutral';
    return {
      bg: 'var(--gl-action-' + v + '-background-color-default)',
      fg: 'var(--gl-action-' + v + '-foreground-color-default)',
      bc: 'var(--gl-action-' + v + '-border-color-default)',
      hbg: 'var(--gl-action-' + v + '-background-color-hover)',
      hfg: 'var(--gl-action-' + v + '-foreground-color-hover)',
      hbc: 'var(--gl-action-' + v + '-border-color-hover)',
    };
  }
  return {
    bg: 'var(--gl-button-' + variant + '-' + category + '-background-color-default)',
    fg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-default)',
    bc: 'var(--gl-button-' + variant + '-' + category + '-border-color-default)',
    hbg: 'var(--gl-button-' + variant + '-' + category + '-background-color-hover)',
    hfg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-hover)',
    hbc: 'var(--gl-button-' + variant + '-' + category + '-border-color-hover)',
  };
}

export const GlButton = component$<ButtonProps>((props) => {
  const category = props.category ?? 'primary';
  const variant = props.variant ?? 'default';
  const size = props.size ?? 'medium';
  const t = btnTokens(category, variant);
  const style =
    '--tbg:' + t.bg + ';--tfg:' + t.fg + ';--tbc:' + t.bc + ';' +
    '--thbg:' + t.hbg + ';--thfg:' + t.hfg + ';--thbc:' + t.hbc + ';';
  return (
    <>
      <button
        class="g-button"
        style={style}
        type={props.type ?? 'button'}
        data-category={category}
        data-variant={variant}
        data-size={size}
        data-block={props.block}
        disabled={props.disabled || props.loading}
        aria-busy={props.loading}
        onClick$={props.onClick$}
      >
        {props.loading ? (
          <span class="g-button-icon" aria-hidden="true">${ICON.spin}</span>
        ) : props.icon ? (
          <span class="g-button-icon" aria-hidden="true">${ICON.dot}</span>
        ) : null}
        <Slot />
      </button>
      <style>{BTN_CSS}</style>
    </>
  );
});

export default GlButton;
`;
}

function qwikInput() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal } from '@builder.io/qwik';
import type { QRL, QwikChangeEvent } from '@builder.io/qwik';

export interface InputProps {
  type?: string;
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  'readonly'?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  value?: string;
  onInput$?: QRL<(value: string, event: QwikChangeEvent<HTMLInputElement>) => void>;
  onChange$?: QRL<(value: string) => void>;
}

const WIDTH: Record<string, string> = {
  xs: 'max-width:var(--gl-spacing-scale-31);',
  sm: 'max-width:var(--gl-spacing-scale-37);',
  md: 'max-width:var(--gl-spacing-scale-48);',
  lg: 'max-width:var(--gl-spacing-scale-62);',
  xl: 'max-width:var(--gl-spacing-scale-75);',
};

export const GlInput = component$<InputProps>((props) => {
  const value = useSignal(props.value ?? '');
  const statement = 'g-spin';
  const width = props.width ?? null;
  const widthStyle = width && WIDTH[width] ? WIDTH[width] : '';
  return (
    <>
      <input
        class="g-input"
        style={widthStyle}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        value={value.value}
        data-state={props.state ?? ''}
        data-width={width ?? ''}
        disabled={props.disabled}
        readOnly={props['readonly']}
        aria-invalid={props.state === 'invalid'}
 preventdefault:oninput
        onInput$={(ev) => {
          const v = (ev.target as HTMLInputElement).value;
          value.value = v;
          props.onInput$?.(v, ev);
        }}
        onChange$={(ev) => props.onChange$?.((ev.target as HTMLInputElement).value)}
      />
      <style>{INPUT_CSS}</style>
    </>
  );
});

export default GlInput;
`;
}

function qwikModal() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: { text: string; variant?: 'confirm' | 'danger' } | null;
  secondaryAction?: { text: string } | null;
  onClose$?: QRL<() => void>;
  onPrimary$?: QRL<() => void>;
  onSecondary$?: QRL<() => void>;
}

export const GlModal = component$<ModalProps>((props) => {
  const visible = useSignal(props.visible ?? false);
  useVisibleTask$(({ cleanup }) => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') visible.value = false;
    };
    document.addEventListener('keydown', onKey);
    cleanup(() => document.removeEventListener('keydown', onKey));
  });
  const size = props.size ?? 'md';
  return (
    <>
      {visible.value ? (
        <div
          class="g-modal-backdrop"
          onClick$={(ev) => {
            if (ev.target === ev.currentTarget) visible.value = false;
          }}
        >
          <div class="g-modal-dialog" data-size={size} role="dialog" aria-modal="true" aria-label={props.title}>
            <header class="g-modal-header">
              <h3 class="g-modal-title">{props.title}</h3>
              <button type="button" class="g-modal-close" aria-label="Close" onClick$={() => (visible.value = false)}>${ICON.close}</button>
            </header>
            <div class="g-modal-body">
              <Slot />
            </div>
            {props.primaryAction || props.secondaryAction ? (
              <footer class="g-modal-footer">
                {props.secondaryAction ? (
                  <button type="button" class="g-modal-secondary" onClick$={() => props.onSecondary$?.()}>
                    {props.secondaryAction.text}
                  </button>
                ) : null}
                {props.primaryAction ? (
                  <button type="button" class="g-modal-primary" data-variant={props.primaryAction.variant ?? 'confirm'} onClick$={() => props.onPrimary$?.()}>
                    {props.primaryAction.text}
                  </button>
                ) : null}
              </footer>
            ) : null}
          </div>
        </div>
      ) : null}
      <style>{MODAL_CSS}</style>
    </>
  );
});

export default GlModal;
`;
}

function qwikTable() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useMemo, useSignal } from '@builder.io/qwik';

export interface Field {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Record<string, unknown>[];
  fields?: Field[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
}

export const GL_TABLE_CSS = \`
${TABLE_CSS}
\`;

export const GlTable = component$<TableProps>((props) => {
  const sortBy = useSignal(props.sortBy ?? null);
  const sortDesc = useSignal(props.sortDesc ?? false);
  const items = props.items ?? [];
  const fields = props.fields ?? [];

  const sorted = useMemo(() => {
    const key = sortBy.value;
    if (!key) return items;
    const arr = items.slice().sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDesc.value ? arr.reverse() : arr;
  });

  return (
    <>
      {props.loading ? (
        <div class="g-table-loading" role="status">${ICON.spin} Loading&hellip;</div>
      ) : null}
      <div class="g-table-wrap">
        <table class="g-table" data-busy={props.loading}>
          <thead>
            <tr>
              {fields.map((f) => (
                <th
                  data-sortable={f.sortable ? 'true' : 'false'}
                  aria-sort={sortBy.value === f.key ? (sortDesc.value ? 'descending' : 'ascending') : undefined}
                  onClick$={() => {
                    if (!f.sortable) return;
                    if (sortBy.value === f.key) {
                      sortDesc.value = !sortDesc.value;
                    } else {
                      sortBy.value = f.key;
                      sortDesc.value = false;
                    }
                  }}
                >
                  {f.label}
                  {sortBy.value === f.key ? (
                    <span class="g-arrow" aria-hidden="true">
                      {sortDesc.value ? '\\u2193' : '\\u2191'}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.value.length ? (
              sorted.value.map((row) => (
                <tr>
                  {fields.map((f) => (
                    <td>{String(row[f.key] ?? '')}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td class="g-empty" colspan={fields.length || 1}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{GL_TABLE_CSS}</style>
    </>
  );
});

export default GlTable;
`;
}

function qwikTabs() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface TabMeta {
  title: string;
  count?: number;
  disabled?: boolean;
  content?: string;
}

export interface TabsProps {
  tabs?: TabMeta[];
  active?: number;
  onChange$?: QRL<(index: number) => void>;
}

export const GlTabs = component$<TabsProps>((props) => {
  const tabs = props.tabs ?? [];
  const active = useSignal(props.active ?? 0);
  const pane = () => {
    const cur = tabs[active.value];
    return cur ? cur.content : '';
  };
  return (
    <>
      <div>
        <nav class="g-tabs-nav" role="tablist" aria-label="Tabs">
          {tabs.map((tab, i) => (
            <button
              type="button"
              class="g-tab"
              data-active={i === active.value}
              disabled={tab.disabled ? true : undefined}
              role="tab"
              aria-selected={i === active.value}
              onClick$={() => {
                if (tab.disabled) return;
                active.value = i;
                props.onChange$?.(i);
              }}
            >
              {tab.title}
              {tab.count != null ? <span class="g-tab-count">{tab.count}</span> : null}
            </button>
          ))}
        </nav>
        <div class="g-tab-pane" role="tabpanel">
          {pane()}
        </div>
      </div>
      <style>{TABS_CSS}</style>
    </>
  );
});

export default GlTabs;
`;
}

function qwikBadge() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, Slot } from '@builder.io/qwik';

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
}

export const GlBadge = component$<BadgeProps>((props) => {
  const variant = props.variant ?? 'neutral';
  const style =
    '--gbd:var(--gl-badge-' + variant + '-background-color-default);' +
    '--gbf:var(--gl-badge-' + variant + '-text-color-default);';
  const inner = (
    <>
      {props.icon ? (
        <span class="g-badge-icon" aria-hidden="true">${ICON.dot}</span>
      ) : null}
      <span>
        <Slot />
      </span>
    </>
  );
  return props.href ? (
    <>
      <a class="g-badge" style={style} data-variant={variant} data-disabled={props.disabled} href={props.href}>
        {inner}
      </a>
      <style>{BADGE_CSS}</style>
    </>
  ) : (
    <>
      <span class="g-badge" style={style} data-variant={variant} data-disabled={props.disabled}>
        {inner}
      </span>
      <style>{BADGE_CSS}</style>
    </>
  );
});

export default GlBadge;
`;
}

function qwikToast() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface ToastProps {
  visible?: boolean;
  message?: string;
  action?: { text: string; onClick$?: QRL<() => void> } | null;
  autoHideDelay?: number;
  onDismiss$?: QRL<() => void>;
}

export const GlToast = component$<ToastProps>((props) => {
  const visible = useSignal(props.visible ?? false);
  const leaving = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => visible.value);
    if (!visible.value) return;
    const delay = props.autoHideDelay ?? 5000;
    if (delay > 0 && typeof window !== 'undefined') {
      const id = window.setTimeout(() => {
        leaving.value = true;
        window.setTimeout(() => {
          leaving.value = false;
          visible.value = false;
          props.onDismiss$?.();
        }, 220);
      }, delay);
      return () => window.clearTimeout(id);
    }
  });

  return (
    <>
      {visible.value ? (
        <div class="g-toast" data-leaving={leaving.value} role="status">
          <span class="g-toast-body">{props.message}</span>
          {props.action ? (
            <button type="button" class="g-toast-action" onClick$={() => props.action!.onClick$?.()}>
              {props.action.text}
            </button>
          ) : null}
          <button type="button" class="g-toast-close" aria-label="Dismiss" onClick$={() => (visible.value = false)}>${ICON.close}</button>
        </div>
      ) : null}
      <style>{TOAST_CSS}</style>
    </>
  );
});

export default GlToast;
`;
}

function qwikDropdown() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export type DropdownItem = string | { text: string; checked?: boolean };

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect$?: QRL<(index: number, item: DropdownItem, checked: boolean) => void>;
  onClearAll$?: QRL<() => void>;
}

export const GlDropdown = component$<DropdownProps>((props) => {
  const open = useSignal(false);
  const rootEl = useSignal<HTMLElement>();

  useVisibleTask$(({ cleanup }) => {
    const onDoc = (e: Event) => {
      if (open.value && rootEl.value && !rootEl.value.contains(e.target as Node)) open.value = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') open.value = false;
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    cleanup(() => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    });
  });

  const labelOf = (item: DropdownItem) => (typeof item === 'string' ? item : item.text);
  const checkedOf = (item: DropdownItem) => typeof item === 'object' && !!item.checked;
  const items = props.items ?? [];

  return (
    <>
      <div class="g-dropdown" ref={rootEl}>
        <button type="button" class="g-dropdown-toggle" aria-haspopup="true" aria-expanded={open.value} onClick$={() => (open.value = !open.value)}>
          {props.text}
          <span class="g-caret" aria-hidden="true">${ICON.caret}</span>
        </button>
        {open.value ? (
          <div class="g-dropdown-menu" role="menu" aria-label="Options">
            <div class="g-dropdown-header">Options</div>
            {items.map((item, i) => (
              <button
                type="button"
                class="g-dropdown-item"
                data-checked={checkedOf(item)}
                role="menuitemcheckbox"
                aria-checked={checkedOf(item)}
                onClick$={() => {
                  props.onSelect$?.(i, item, typeof item === 'object' ? !item.checked : true);
                  open.value = false;
                }}
              >
                <span>{labelOf(item)}</span>
                {checkedOf(item) ? <span aria-hidden="true">${ICON.check}</span> : null}
              </button>
            ))}
            {props.showClearAll ? (
              <>
                <div class="g-dropdown-divider" role="separator" />
                <button type="button" class="g-dropdown-clear" onClick$={() => {
                  props.onClearAll$?.();
                  open.value = false;
                }}>
                  Clear all
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <style>{DROPDOWN_CSS}</style>
    </>
  );
});

export default GlDropdown;
`;
}

function qwikForm() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, Slot } from '@builder.io/qwik';

export interface FormProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  state?: 'valid' | 'invalid' | null;
}

export const GlForm = component$<FormProps>((props) => {
  const error = props.error ?? null;
  const state = props.state ?? null;
  const feedback = error
    ? { text: error, kind: 'invalid' }
    : state === 'valid'
      ? { text: 'Looks good.', kind: 'valid' }
      : null;
  return (
    <>
      <div class="g-form-group">
        {props.label ? (
          <label class="g-form-label">
            {props.label}
            {props.optional ? <span class="g-optional">(optional)</span> : null}
          </label>
        ) : null}
        <Slot />
        {feedback ? <p class="g-feedback" data-kind={feedback.kind}>{feedback.text}</p> : null}
        {props.helper ? <p class="g-helper">{props.helper}</p> : null}
      </div>
      <style>{FORM_CSS}</style>
    </>
  );
});

export default GlForm;
`;
}

function qwikAlert() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal, Slot } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss$?: QRL<() => void>;
}

const ICONS: Record<string, string> = {
  info: '${ICON.info}',
  success: '${ICON.check}',
  warning: '${ICON.warning}',
  danger: '${ICON.danger}',
  tip: '${ICON.tip}',
};

export const GlAlert = component$<AlertProps>((props) => {
  const dismissed = useSignal(false);
  const leaving = useSignal(false);
  const variant = props.variant ?? 'info';
  const cr = variant === 'danger' || variant === 'warning' || variant === 'success' ? 'alert' : 'status';
  return (
    <>
      {!dismissed.value ? (
        <div class="g-alert" data-variant={variant} data-sticky={props.sticky} data-leaving={leaving.value} role={cr}>
          <span class="g-alert-icon" aria-hidden="true" innerHTML={ICONS[variant] ?? ICONS.info} />
          <div class="g-alert-content">
            {props.title ? <h3 class="g-alert-title">{props.title}</h3> : null}
            <p class="g-alert-body">
              <Slot />
            </p>
          </div>
          {props.dismissible !== false ? (
            <button
              type="button"
              class="g-alert-close"
              aria-label="Dismiss"
              onClick$={() => {
                leaving.value = true;
                window.setTimeout(() => {
                  dismissed.value = true;
                  props.onDismiss$?.();
                }, 220);
              }}
            >
              ${ICON.close}
            </button>
          ) : null}
        </div>
      ) : null}
      <style>{ALERT_CSS}</style>
    </>
  );
});

export default GlAlert;
`;
}

/* =============================================================== ASTRO == */
const ASTRO_LOC = '<span set:html={iconMarkup} aria-hidden="true"></span>';

function astroButton() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  category = 'primary',
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = '',
  block = false,
} = Astro.props;

function btnTokens() {
  if (variant === 'link') {
    return {
      bg: 'var(--gl-color-alpha-0)',
      fg: 'var(--gl-button-link-text-color-default)',
      bc: 'var(--gl-color-alpha-0)',
      hbg: 'var(--gl-color-alpha-0)',
      hfg: 'var(--gl-button-link-text-color-hover)',
      hbc: 'var(--gl-color-alpha-0)',
    };
  }
  if (category === 'secondary') {
    const v = variant === 'confirm' ? 'confirm' : variant === 'danger' ? 'danger' : 'neutral';
    return {
      bg: 'var(--gl-action-' + v + '-background-color-default)',
      fg: 'var(--gl-action-' + v + '-foreground-color-default)',
      bc: 'var(--gl-action-' + v + '-border-color-default)',
      hbg: 'var(--gl-action-' + v + '-background-color-hover)',
      hfg: 'var(--gl-action-' + v + '-foreground-color-hover)',
      hbc: 'var(--gl-action-' + v + '-border-color-hover)',
    };
  }
  return {
    bg: 'var(--gl-button-' + variant + '-' + category + '-background-color-default)',
    fg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-default)',
    bc: 'var(--gl-button-' + variant + '-' + category + '-border-color-default)',
    hbg: 'var(--gl-button-' + variant + '-' + category + '-background-color-hover)',
    hfg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-hover)',
    hbc: 'var(--gl-button-' + variant + '-' + category + '-border-color-hover)',
  };
}

const t = btnTokens();
const btnStyle = '--tbg:' + t.bg + ';--tfg:' + t.fg + ';--tbc:' + t.bc + ';--thbg:' + t.hbg + ';--thfg:' + t.hfg + ';--thbc:' + t.hbc + ';';
const cls =
  'g-button inline-flex items-center justify-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-button-border-radius)] font-bold leading-[var(--gl-line-height-20)] cursor-pointer border' +
  (size === 'small' ? ' px-[var(--gl-spacing-scale-2)] min-w-0 text-[length:var(--gl-font-size-sm)]' : ' px-[var(--gl-spacing-scale-4)] min-w-[var(--gl-spacing-scale-20)] text-[length:var(--gl-font-size-base)]') +
  (block ? ' w-full' : '');
---
<button
  class={cls}
  style={btnStyle}
  type="button"
  data-category={category}
  data-variant={variant}
  disabled={disabled || loading}
  aria-busy={loading}
>
  {loading && <span class="inline-flex" aria-hidden="true">${ICON.spin}</span>}
  {!loading && icon && <span class="inline-flex" aria-hidden="true">${ICON.dot}</span>}
  <slot />
</button>

<style>
  .g-button {
    background-color: var(--tbg); color: var(--tfg); border-color: var(--tbc);
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
  }
  .g-button:hover { background-color: var(--thbg); color: var(--thfg); border-color: var(--thbc); }
  .g-button:active { transform: translateY(1px); }
  .g-button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
  .g-button:disabled {
    background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color);
    border-color: var(--gl-action-disabled-background-color); cursor: not-allowed;
  }
  .g-button[data-category='tertiary'], .g-button[data-variant='link'] { background-color: var(--gl-color-alpha-0); border-color: var(--gl-color-alpha-0); }
  .g-button[data-variant='link'] { border-radius: 0; padding: 0 var(--gl-spacing-scale-2); min-width: 0; font-weight: var(--gl-font-weight-normal); }
  .g-button[data-variant='link']:hover { text-decoration: underline; }
  .g-spin { animation: g-spin 0.8s linear infinite; }
  @keyframes g-spin { to { transform: rotate(360deg); } }
</style>
`;
}

function astroInput() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  type = 'text',
  placeholder = '',
  state = null,
  disabled = false,
  readonly = false,
  width = null,
  value = '',
} = Astro.props;

const WIDTH = {
  xs: 'var(--gl-spacing-scale-31)',
  sm: 'var(--gl-spacing-scale-37)',
  md: 'var(--gl-spacing-scale-48)',
  lg: 'var(--gl-spacing-scale-62)',
  xl: 'var(--gl-spacing-scale-75)',
};
const widthStyle = width && WIDTH[width] ? 'max-width:' + WIDTH[width] + ';' : '';
---
<input
  class="g-input w-full rounded-[var(--gl-control-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-20)] bg-[var(--gl-control-background-color-default)]"
  style={widthStyle}
  data-state={state}
  type={type}
  placeholder={placeholder}
  value={value}
  disabled={disabled}
  readonly={readonly || undefined}
  aria-invalid={state === 'invalid'}
/>

<style>
  .g-input {
    color: var(--gl-text-color-default);
    border: 1px solid var(--gl-control-border-color-default);
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }
  .g-input::placeholder { color: var(--gl-control-placeholder-color); }
  .g-input:hover:not(:disabled):not([readonly]) { border-color: var(--gl-control-border-color-hover); }
  .g-input:focus-visible { outline: none; border-color: var(--gl-control-border-color-focus); box-shadow: ${FOCUS}; }
  .g-input[data-state='invalid'] { border-color: var(--gl-control-border-color-error); }
  .g-input[data-state='valid'] { box-shadow: inset 0 0 0 1px var(--gl-control-text-color-valid); }
  .g-input:disabled {
    background-color: var(--gl-control-background-color-disabled); color: var(--gl-text-color-disabled);
    border-color: var(--gl-control-border-color-disabled); cursor: not-allowed;
  }
  .g-input[readonly] { background-color: var(--gl-control-background-color-readonly); }
</style>
`;
}

function astroModal() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  visible = false,
  title = '',
  size = 'md',
  primaryAction = null,
  secondaryAction = null,
  onClose = null,
} = Astro.props;

const dialogClass =
  'g-modal-dialog w-full rounded-[var(--gl-modal-border-radius)] shadow-[var(--gl-shadow-lg)] flex flex-col max-h-[calc(100vh-var(--gl-spacing-scale-9))] bg-[var(--gl-background-color-default)]' +
  (size === 'sm' ? ' max-w-[var(--gl-spacing-scale-31)]' : size === 'lg' ? ' max-w-[var(--gl-spacing-scale-80)]' : ' max-w-[var(--gl-spacing-scale-48)]');
---
<div
  class="g-modal-backdrop fixed inset-0 z-[var(--gl-zindex-4)] flex items-start justify-center bg-[var(--gl-color-alpha-dark-40)] px-[var(--gl-spacing-scale-4)] pt-[var(--gl-spacing-scale-8)]"
  data-open={visible}
  data-gl-modal
>
  <div class={dialogClass} role="dialog" aria-modal="true" aria-label={title}>
    <header class="flex items-center justify-between gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-3)] pt-[var(--gl-spacing-scale-4)]">
      <h3 class="m-0 text-[length:var(--gl-heading-scale-500-font-size)] font-bold text-[color:var(--gl-text-color-heading)]">{title}</h3>
      <button type="button" class="g-modal-close inline-flex cursor-pointer rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)]" data-modal-close aria-label="Close">${ICON.close}</button>
    </header>
    <div class="overflow-auto px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-5)] pt-[var(--gl-spacing-scale-3)] text-[color:var(--gl-text-color-default)]">
      <slot />
    </div>
    {primaryAction || secondaryAction ? (
      <footer class="flex flex-wrap gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-5)] pt-[var(--gl-spacing-scale-4)]">
        {secondaryAction && <button type="button" class="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-button-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)] bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] border border-[var(--gl-action-neutral-border-color-default)]" data-modal-close>{secondaryAction.text}</button>}
        {primaryAction && <button type="button" class="g-modal-primary inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-button-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)]" data-variant={primaryAction.variant || 'confirm'}>{primaryAction.text}</button>}
      </footer>
    ) : null}
  </div>
</div>

<style>
  .g-modal-backdrop[data-open='false'] { display: none; }
  .g-modal-backdrop:hover .g-modal-dialog,
  .g-modal-dialog:focus { outline: none; }
  .g-modal-primary { border: 1px solid var(--gl-button-confirm-primary-border-color-default); background-color: var(--gl-button-confirm-primary-background-color-default); color: var(--gl-button-confirm-primary-foreground-color-default); }
  .g-modal-primary:hover { background-color: var(--gl-button-confirm-primary-background-color-hover); }
  .g-modal-primary[data-variant='danger'] { border: 1px solid var(--gl-button-danger-primary-border-color-default); background-color: var(--gl-button-danger-primary-background-color-default); color: var(--gl-button-danger-primary-foreground-color-default); }
  .g-modal-close:hover { background-color: var(--gl-color-alpha-dark-4); }
  button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
</style>

<script is:inline>
  (() => {
    const backdrop = document.querySelector('[data-gl-modal] .g-modal-backdrop');
    if (!backdrop) return;
    const close = () => {
      backdrop.setAttribute('data-open', 'false');
      if (typeof window.__glOnModalClose === 'function') window.__glOnModalClose();
    };
    if (typeof onClose === 'function') window.__glOnModalClose = onClose;
    backdrop.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) close();
    });
    backdrop.querySelectorAll('[data-modal-close]').forEach((b) => b.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        backdrop.setAttribute('data-open', 'false');
      }
    });
  })();
</script>
`;
}

function astroTable() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  items = [],
  fields = [],
  loading = false,
  sortBy = null,
  sortDesc = false,
} = Astro.props;
---
{loading ? (
  <div class="mb-3 flex items-center gap-2 text-[color:var(--gl-text-color-strong)]" role="status">${ICON.spin} Loading&hellip;</div>
) : null}
<div class="overflow-auto">
  <table
    class="g-table w-full border-collapse text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)]"
    data-gl-sortable-table
    data-busy={loading}
  >
    <thead>
      <tr>
        {fields.map((f) => (
          <th class="sticky top-0 bg-[var(--gl-color-alpha-0)] p-3 text-left font-bold text-[color:var(--gl-text-color-subtle)] shadow-[inset_0_-1px_0_var(--gl-border-color-default)]" data-sortable={f.sortable ? 'true' : 'false'} data-sort-key={f.sortable ? f.key : undefined}>
            {f.label}
            {sortBy === f.key ? <span class="ml-[var(--gl-spacing-scale-2)] text-[color:var(--gl-table-sorting-icon-color)]" aria-hidden="true">{sortDesc ? '&darr;' : '&uarr;'}</span> : null}
          </th>
        ))}
      </tr>
    </thead>
    <tbody data-rows>
      {items.length ? (
        items.map((row) => (
          <tr>
            {fields.map((f) => <td class="p-3 shadow-[inset_0_-1px_0_var(--gl-color-alpha-dark-8)] hover:bg-[var(--gl-table-row-background-color-hover)]">{row[f.key] ?? ''}</td>)}
          </tr>
        ))
      ) : (
        <tr><td class="p-[var(--gl-spacing-scale-9)] px-[var(--gl-spacing-scale-5)] text-center text-[color:var(--gl-text-color-subtle)]" colspan={fields.length || 1}>No records found.</td></tr>
      )}
    </tbody>
  </table>
</div>

<style>
  .g-spin { animation: g-spin 0.8s linear infinite; }
  @keyframes g-spin { to { transform: rotate(360deg); } }
  .g-table[data-busy='true'] { opacity: var(--gl-opacity-7); pointer-events: none; }
  th[data-sortable='true'] { cursor: pointer; user-select: none; }
  th[data-sortable='true']:hover { color: var(--gl-text-color-strong); }
</style>

<script is:inline>
  (() => {
    const table = document.querySelector('[data-gl-sortable-table]');
    if (!table) return;
    table.querySelectorAll('th[data-sort-key]').forEach((th) => {
      th.addEventListener('click', () => {
        const body = table.querySelector('tbody[data-rows]');
        if (!body) return;
        const rows = Array.from(body.querySelectorAll('tr'));
        const desc = th.dataset.dir === 'asc';
        rows.sort((a, b) => {
          const av = a.children[th.cellIndex].textContent.trim();
          const bv = b.children[th.cellIndex].textContent.trim();
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;
          return desc ? -cmp : cmp;
        });
        rows.forEach((r) => body.appendChild(r));
        th.dataset.dir = desc ? 'desc' : 'asc';
      });
    });
  })();
</script>
`;
}

function astroTabs() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  tabs = [],
  active = 0,
  onChange = null,
} = Astro.props;
---
<div class="g-tabs" data-gl-tabs>
  <nav class="flex gap-[var(--gl-spacing-scale-2)] overflow-x-auto border-b border-[var(--gl-border-color-default)]" role="tablist" aria-label="Tabs">
    {tabs.map((tab, i) => (
      <button
        type="button"
        class="g-tab relative inline-flex items-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)]"
        data-tab-btn
        data-active={i === active}
        disabled={tab.disabled ? true : undefined}
        role="tab"
        aria-selected={i === active}
      >
        {tab.title}
        {tab.count != null ? <span class="inline-flex items-center rounded-[var(--gl-border-radius-full)] bg-[var(--gl-badge-neutral-background-color-default)] px-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold leading-[var(--gl-line-height-16)] text-[color:var(--gl-badge-neutral-text-color-default)]">{tab.count}</span> : null}
      </button>
    ))}
  </nav>
  {tabs.map((tab, i) => (
    <div class="g-tab-pane pt-[var(--gl-spacing-scale-5)] text-[color:var(--gl-text-color-default)]" data-tab-pane hidden={i !== active} role="tabpanel">
      {tab.content}
    </div>
  ))}
</div>

<style>
  .g-tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
  .g-tab:hover { color: var(--gl-text-color-strong); }
  .g-tab:hover::after { background-color: var(--gl-border-color-strong); }
  .g-tab[data-active='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
  .g-tab[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
  .g-tab:disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
</style>

<script is:inline>
  (() => {
    const tabs = document.querySelector('[data-gl-tabs]');
    if (!tabs) return;
    const btns = Array.from(tabs.querySelectorAll('[data-tab-btn]'));
    const panes = Array.from(tabs.querySelectorAll('[data-tab-pane]'));
    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btns.forEach((b, j) => {
          const on = j === i;
          b.setAttribute('data-active', String(on));
          b.setAttribute('aria-selected', String(on));
        });
        panes.forEach((p, j) => p.toggleAttribute('hidden', j !== i));
        if (typeof onChange === 'function') onChange(i, tabs[i]);
      });
    });
  })();
</script>
`;
}

function astroBadge() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  variant = 'neutral',
  icon = null,
  href = null,
  disabled = false,
} = Astro.props;

const badgeStyle = '--gbd:var(--gl-badge-' + variant + '-background-color-default);--gbf:var(--gl-badge-' + variant + '-text-color-default);';
const cls = 'g-badge inline-flex items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-border-radius-full)] px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] text-[length:var(--gl-font-size-sm)] font-bold leading-[var(--gl-line-height-16)] no-underline' + (disabled ? ' opacity-[var(--gl-opacity-7)] pointer-events-none' : '');
---
{href ? (
  <a class={cls} style={badgeStyle} data-variant={variant} href={href || undefined}>
    {icon && <span class="g-badge-icon" aria-hidden="true">${ICON.dot}</span>}
    <span><slot /></span>
  </a>
) : (
  <span class={cls} style={badgeStyle} data-variant={variant}>
    {icon && <span class="g-badge-icon" aria-hidden="true">${ICON.dot}</span>}
    <span><slot /></span>
  </span>
)}

<style>
  .g-badge { background-color: var(--gbd); color: var(--gbf); }
  a.g-badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
</style>
`;
}

function astroToast() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  visible = false,
  message = '',
  action = null,
  autoHideDelay = 5000,
  onDismiss = null,
} = Astro.props;
---
<div
  class="g-toast fixed bottom-[var(--gl-spacing-scale-6)] left-[var(--gl-spacing-scale-6)] z-[var(--gl-zindex-200)] flex max-w-[var(--gl-spacing-scale-48)] items-center gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-border-radius-full)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] bg-[var(--gl-feedback-strong-background-color)] text-[color:var(--gl-feedback-strong-text-color)] shadow-[var(--gl-shadow-md)]"
  data-gl-toast
  data-message={message}
  data-auto-hide-delay={autoHideDelay}
  data-visible={visible}
  role="status"
>
  <span class="flex-1">{message}</span>
  {action && <button type="button" class="bg-transparent border-0 p-0 font-bold cursor-pointer text-[color:var(--gl-feedback-strong-link-color)]">{action.text}</button>}
  <button type="button" class="inline-flex bg-transparent border-0 p-[var(--gl-spacing-scale-1)] cursor-pointer text-[color:var(--gl-feedback-strong-text-color)]" data-dismiss aria-label="Dismiss">${ICON.close}</button>
</div>

<style>
  .g-toast[data-visible='false'] { display: none; }
  .g-toast { transition: opacity 200ms ease, transform 200ms ease; }
  .g-toast[data-leaving='true'] { opacity: 0; transform: translateY(-8px); }
</style>

<script is:inline>
  (() => {
    const toast = document.querySelector('[data-gl-toast]');
    if (!toast) return;
    const delay = Number(toast.dataset.autoHideDelay || 0);
    const close = () => {
      toast.setAttribute('data-leaving', 'true');
      window.setTimeout(() => {
        toast.setAttribute('data-visible', 'false');
      }, 220);
    };
    toast.querySelectorAll('[data-dismiss]').forEach((b) => b.addEventListener('click', close));
    if (delay > 0) window.setTimeout(close, delay);
    if (typeof onDismiss === 'function') toast.addEventListener('gl:dismiss', () => onDismiss());
    toast.addEventListener('transitionend', () => {
      if (toast.getAttribute('data-leaving') === 'true' && toast.getAttribute('data-visible') === 'false') {
        toast.dispatchEvent(new CustomEvent('gl:dismiss'));
      }
    });
  })();
</script>
`;
}

function astroDropdown() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  text = '',
  items = [],
  showClearAll = false,
  onSelect = null,
} = Astro.props;
---
<div class="g-dropdown relative inline-block" data-gl-dropdown>
  <button
    type="button"
    class="inline-flex cursor-pointer items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-button-border-radius)] border border-[var(--gl-action-neutral-border-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)] bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)]"
    data-dropdown-toggle
    aria-haspopup="true"
    aria-expanded="false"
  >
    {text}
    <span class="inline-flex text-[color:var(--gl-text-color-subtle)]" aria-hidden="true">${ICON.caret}</span>
  </button>
  <div class="absolute left-0 top-[calc(100%+var(--gl-spacing-scale-2))] z-[var(--gl-zindex-3)] box-border min-w-[var(--gl-spacing-scale-31)] rounded-[var(--gl-dropdown-border-radius)] border border-[var(--gl-dropdown-border-color)] bg-[var(--gl-dropdown-background-color)] p-[var(--gl-spacing-scale-2)] shadow-[var(--gl-shadow-sm)]" data-dropdown-menu role="menu" aria-label="Options">
    <div class="p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-sm)] font-bold text-[color:var(--gl-text-color-subtle)]">Options</div>
    {items.map((item) => (
      <button type="button" class="flex w-full cursor-pointer items-center justify-between gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-base)] text-[color:var(--gl-dropdown-option-text-color-default)] hover:bg-[var(--gl-dropdown-option-background-color-unselected-hover)]" role="menuitemcheckbox" aria-checked={typeof item === 'object' && !!item.checked}>
        <span>{typeof item === 'string' ? item : item.text}</span>
        {typeof item === 'object' && item.checked ? <span aria-hidden="true">${ICON.check}</span> : null}
      </button>
    ))}
    {showClearAll ? (
      <>
        <div class="my-[var(--gl-spacing-scale-2)] h-px bg-[var(--gl-dropdown-divider-color)]" role="separator" />
        <button type="button" class="block w-full cursor-pointer border-0 bg-transparent p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-link)] hover:underline">Clear all</button>
      </>
    ) : null}
  </div>
</div>

<style>
  button:focus-visible { outline: none; box-shadow: ${FOCUS}; }
</style>

<script is:inline>
  (() => {
    const root = document.querySelector('[data-gl-dropdown]');
    if (!root) return;
    const toggle = root.querySelector('[data-dropdown-toggle]');
    const menu = root.querySelector('[data-dropdown-menu]');
    if (!toggle || !menu) return;
    const open = () => {
      menu.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      menu.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.hasAttribute('hidden') ? open() : close();
    });
    document.addEventListener('mousedown', (e) => {
      if (!root.contains(e.target)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  })();
</script>
`;
}

function astroForm() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  label = '',
  helper = '',
  error = null,
  optional = false,
  state = null,
} = Astro.props;

const feedback = error
  ? { text: error, kind: 'invalid' }
  : state === 'valid'
    ? { text: 'Looks good.', kind: 'valid' }
    : null;
---
<div class="g-form-group mb-[var(--gl-spacing-scale-5)]">
  {label && (
    <label class="mb-[var(--gl-spacing-scale-2)] block text-[length:var(--gl-font-size-base)] font-bold text-[color:var(--gl-text-color-strong)]">
      {label}
      {optional && <span class="font-normal text-[color:var(--gl-text-color-subtle)]">(optional)</span>}
    </label>
  )}
  <slot />
  {feedback && <p class="mt-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] {feedback.kind === 'invalid' ? 'text-[color:var(--gl-control-text-color-error)]' : 'text-[color:var(--gl-control-text-color-valid)]'}">{feedback.text}</p>}
  {helper && <p class="mt-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">{helper}</p>}
</div>
`;
}

function astroAlert() {
  return `---
// Pajamas-inspired (MIT, from @gitlab/ui tokens)
const {
  variant = 'info',
  title = '',
  dismissible = true,
  sticky = false,
  onDismiss = null,
} = Astro.props;

const ICONS = {
  info: '${ICON.info}',
  success: '${ICON.check}',
  warning: '${ICON.warning}',
  danger: '${ICON.danger}',
  tip: '${ICON.tip}',
};
const iconMarkup = ICONS[variant] || ICONS.info;
const cr = variant === 'danger' || variant === 'warning' || variant === 'success' ? 'alert' : 'status';
---
<div
  class="g-alert flex gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-alert-border-radius)] p-[var(--gl-spacing-scale-4)]"
  data-gl-alert
  data-variant={variant}
  data-sticky={sticky}
  role={cr}
>
  <span class="flex flex-none text-[color:var(--gai)]">${ASTRO_LOC}</span>
  <div class="min-w-0 flex-1">
    {title && <h3 class="m-0 mb-[var(--gl-spacing-scale-1)] font-bold text-[color:var(--gat)]">{title}</h3>}
    <p class="m-0 text-[color:var(--gl-text-color-default)]"><slot /></p>
  </div>
  {dismissible && (
    <button type="button" class="inline-flex self-start cursor-pointer rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-1)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-4)]" data-alert-close aria-label="Dismiss">${ICON.close}</button>
  )}
</div>

<style>
  .g-alert { background-color: var(--gabbg); border: 1px solid var(--gab); transition: opacity 200ms ease, transform 200ms ease; }
  .g-alert[data-leaving='true'] { opacity: 0; transform: translateY(-4px); }
  .g-alert[data-sticky='true'] { position: sticky; top: var(--gl-spacing-scale-5); }
  .g-alert[data-variant='info'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
  .g-alert[data-variant='success'] { --gab: var(--gl-alert-success-border-color); --gabbg: var(--gl-alert-success-background-color); --gat: var(--gl-alert-success-title-color); --gai: var(--gl-feedback-success-icon-color); }
  .g-alert[data-variant='warning'] { --gab: var(--gl-alert-warning-border-color); --gabbg: var(--gl-alert-warning-background-color); --gat: var(--gl-alert-warning-title-color); --gai: var(--gl-feedback-warning-icon-color); }
  .g-alert[data-variant='danger'] { --gab: var(--gl-alert-danger-border-color); --gabbg: var(--gl-alert-danger-background-color); --gat: var(--gl-alert-danger-title-color); --gai: var(--gl-feedback-danger-icon-color); }
  .g-alert[data-variant='tip'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
</style>

<script is:inline>
  (() => {
    const root = document.querySelector('[data-gl-alert]');
    if (!root) return;
    root.querySelectorAll('[data-alert-close]').forEach((b) => {
      b.addEventListener('click', () => {
        root.setAttribute('data-leaving', 'true');
        if (typeof onDismiss === 'function') onDismiss();
        window.setTimeout(() => {
          root.setAttribute('hidden', '');
        }, 220);
      });
    });
    root.setAttribute('data-leaving', 'false');
  })();
</script>
`;
}

/* =============================================================== INDEX / README == */
function svelteIndex() {
  return `// Pajamas-inspired (MIT, from @gitlab/ui tokens)
export { default as GlButton } from './Button.svelte';
export { default as GlInput } from './Input.svelte';
export { default as GlModal } from './Modal.svelte';
export { default as GlTable } from './Table.svelte';
export { default as GlTabs } from './Tabs.svelte';
export { default as GlBadge } from './Badge.svelte';
export { default as GlToast } from './Toast.svelte';
export { default as GlDropdown } from './Dropdown.svelte';
export { default as GlForm } from './Form.svelte';
export { default as GlAlert } from './Alert.svelte';
`;
}

function astroIndex() {
  return (
    '// Pajamas-inspired (MIT, from @gitlab/ui tokens)\n' +
    "export { default as GlButton } from './Button.astro';\n" +
    "export { default as GlInput } from './Input.astro';\n" +
    "export { default as GlModal } from './Modal.astro';\n" +
    "export { default as GlTable } from './Table.astro';\n" +
    "export { default as GlTabs } from './Tabs.astro';\n" +
    "export { default as GlBadge } from './Badge.astro';\n" +
    "export { default as GlToast } from './Toast.astro';\n" +
    "export { default as GlDropdown } from './Dropdown.astro';\n" +
    "export { default as GlForm } from './Form.astro';\n" +
    "export { default as GlAlert } from './Alert.astro';\n"
  );
}

function jsIndexBlock() {
  return `export { default as GlButton } from './Button';
export { default as GlInput } from './Input';
export { default as GlModal } from './Modal';
export { default as GlTable } from './Table';
export { default as GlTabs } from './Tabs';
export { default as GlBadge } from './Badge';
export { default as GlToast } from './Toast';
export { default as GlDropdown } from './Dropdown';
export { default as GlForm } from './Form';
export { default as GlAlert } from './Alert';
`;
}

function specTable() {
  return spec.components
    .map((c) => {
      const name = NAMES[c.id];
      const props = c.props
        .map((p) => p.name + (p.default !== undefined && p.default !== null ? (p.default === '' ? '' : '=' + p.default) : ''))
        .join(' | ');
      return `| \`${name}\` | \`${c.title.replace(/[ /]+$/, '')}\` | ${props} |`;
    })
    .join('\n');
}

function propsList() {
  return spec.components
    .map((c) => {
      const name = NAMES[c.id];
      const props = c.props.map((p) => '`' + p.name + '`').join(', ');
      return `- **${name}** — ${props}`;
    })
    .join('\n');
}

function svelteReadme() {
  const code = `\`\`\`svelte
<script>
  import { GlButton, GlInput, GlAlert } from '../components';
</script>

<GlButton variant="confirm">Save</GlButton>
<GlInput placeholder="Project name" width="lg" />
<GlAlert variant="success" title="Merged">See the diff below.</GlAlert>
\`\`\``;
  const extra = [
    '## Setup',
    '',
    'Svelte 4 style: props are declared with `export let`, interactivity uses',
    'reactive statements (`$:`), `{#if}` / `{#each}` and `createEventDispatcher`.',
    'Each `.svelte` file ships its own scoped `<style>` block that only reads',
    '`var(--gl-*)` custom properties, so drop the components into any Svelte',
    'project after importing `dist/css/variables.css`.',
    '',
    '```bash',
    'svelte-add svelte',
    '# then copy dist/svelte/components/* into src/lib/components/',
    '```',
  ].join('\n');
  return readme('Svelte', code, extra, 'Button.svelte');
}

function sveltekitReadme() {
  const code = `\`\`\`svelte
<!-- In $lib/components/Button.svelte the layout lives in Tailwind classes;
     every value uses var(--gl-*) arbitrary values or inline token vars. -->
<script>
  import { GlButton, GlInput } from '$lib/components';
</script>

<GlButton category="secondary" size="small" on:click={run}>Filter</GlButton>
<GlInput state="invalid" ariaInvalid={true} />
\`\`\``;
  const extra = [
    '## Tailwind setup',
    '',
    'This variant keeps the same reactive Svelte logic as `dist/svelte`, but',
    'replaces the layout CSS with Tailwind utilities and `var(--gl-*)` arbitrary',
    'values such as `bg-[var(--gl-control-background-color-default)]` and',
    '`rounded-[var(--gl-button-border-radius)]`.',
    '',
    'Configure `content` to include the components folder, and import the token',
    'CSS once in `src/routes/+layout.svelte` (or `app.html`):',
    '',
    '```svelte',
    "<script>\\n  import '../css/variables.css';\\n</script>",
    '```',
    '',
    '```js',
    '// tailwind.config.js',
    'export default { content: [\'./src/lib/**/*.svelte\'] }',
    '```',
  ].join('\n');
  return readme('SvelteKit + Tailwind', code, extra, 'Button.svelte');
}

function solidReadme() {
  const code = `\`\`\`tsx
import { Button, Input, Modal } from './components';

function App() {
  return (
    <div>
      <Button variant="confirm" onClick={() => save()}>Save</Button>
      <Input placeholder="Search" width="lg" />
    </div>
  );
}
\`\`\``;
  const extra = [
    '## Authoring notes',
    '',
    '- Reactivity is done with `createSignal` / `createMemo`; the list-based',
    '  components use Solid `<For>` plus conditional `Show` blocks.',
    '- Styles are inline `<style>` tags inside each `.tsx`; colours, radii and',
    '  spacing always resolve through `var(--gl-*)` custom properties.',
    '',
    '```bash',
    'npm i solid-js vite-plugin-solid',
    '# component sources link against dist/css/variables.css',
    '```',
  ].join('\n');
  return readme('Solid.js', code, extra, 'Button.tsx');
}

function qwikReadme() {
  const code = `\`\`\`tsx
import { GlButton, GlModal } from './components';

export default component$(() => {
  const open = useSignal(false);
  return (
    <>
      <GlButton category="primary" variant="confirm" onClick$={() => (open.value = true)}>Open</GlButton>
      <GlModal visible={open.value} title="Confirm" />
    </>
  );
});
\`\`\``;
  const extra = [
    '## Qwik specifics',
    '',
    '- Components are defined with `component$()`, state with `useSignal()`',
    '  and event handlers with `$`-suffixed props (`onClick$`, `onInput$`).',
    '- `<Slot />` projects children; `<style>` tags are emitted per component',
    '  and read only `var(--gl-*)` tokens.',
    '',
    '```bash',
    'npm create qwik@latest',
    '# then copy dist/qwik/components into src/components/',
    '```',
  ].join('\n');
  return readme('Qwik', code, extra, 'Button.tsx');
}

function astroReadme() {
  const code = `\`\`\`astro
---
import { Button, Alert, Table } from '../components/Button.astro'; // one import per component
---
<Button variant="confirm">Save</Button>
<Alert variant="danger" title="Build failed">job 3 timed out.</Alert>
\`\`\``;
  const extra = [
    '## Astro notes',
    '',
    '- Components are mostly pure presentational: props are read in the',
    '  frontmatter and rendered at build time with Tailwind arbitrary values',
    '  (`bg-[var(--gl-...)]`, `rounded-[var(--gl-...)]`).',
    '- Interactive pieces (`Modal`, `Toast`, `Dropdown`, `Tabs`, `Table`) ship a',
    '  tiny inline vanilla `<script is:inline>` (shown/closed via data attributes);',
    '  upgrade to a `client:load` island if you need finer control.',
    '- There is no `index` barrel file in this folder; import the `.astro` file',
    '  you need directly.',
  ].join('\n');
  return readme('Astro + Tailwind', code, extra, 'Button.astro');
}

function readme(framework, code, extra, file) {
  return [
    '# ' + framework + ' components (Pajamas-inspired)',
    '',
    'Ten core components derived from the shared `scripts/component-spec.js`',
    'data model. All colours, radii, spacing and font values resolve through',
    '`var(--gl-*)` design tokens defined in `dist/css/variables.css` — no',
    'hardcoded colours anywhere.',
    '',
    '## Components',
    '',
    '| Export | Source | Props |',
    '|---|---|---|',
    specTable(),
    '',
    '## Usage',
    '',
    code,
    '',
    extra,
    '',
    '## Props reference',
    '',
    propsList(),
    '',
    '## Tokens',
    '',
    'Components read design tokens directly from `variables.css` (`--gl-*`);',
    'size/colour overrides live in the `.g-*` classes and inline style custom',
    'properties per component. See `dist/css/variables.css` for the full map.',
    '',
    '## Regenerate',
    '',
    '`node scripts/gen-svelte-family.js` (idempotent, safe to re-run).',
  ].join('\n');
}

/* =============================================================== write == */
const GENERATORS = {
  svelte: {
    ext: '.svelte',
    comp: {
      Button: svelteButton, Input: svelteInput, Modal: svelteModal, Table: svelteTable,
      Tabs: svelteTabs, Badge: svelteBadge, Toast: svelteToast, Dropdown: svelteDropdown,
      Form: svelteForm, Alert: svelteAlert,
    },
    index: svelteIndex,
    readme: svelteReadme,
    name: 'svelte',
  },
  sveltekit: {
    ext: '.svelte',
    comp: {
      Button: kitButton, Input: kitInput, Modal: kitModal, Table: kitTable,
      Tabs: kitTabs, Badge: kitBadge, Toast: kitToast, Dropdown: kitDropdown,
      Form: kitForm, Alert: kitAlert,
    },
    index: svelteIndex,
    readme: sveltekitReadme,
    name: 'sveltekit',
  },
  solid: {
    ext: '.tsx',
    comp: {
      Button: solidButton, Input: solidInput, Modal: solidModal, Table: solidTable,
      Tabs: solidTabs, Badge: solidBadge, Toast: solidToast, Dropdown: solidDropdown,
      Form: solidForm, Alert: solidAlert,
    },
    index: () => '// Pajamas-inspired (MIT, from @gitlab/ui tokens)\n' + jsIndexBlock(),
    readme: solidReadme,
    name: 'solid',
  },
  qwik: {
    ext: '.tsx',
    comp: {
      Button: qwikButton, Input: qwikInput, Modal: qwikModal, Table: qwikTable,
      Tabs: qwikTabs, Badge: qwikBadge, Toast: qwikToast, Dropdown: qwikDropdown,
      Form: qwikForm, Alert: qwikAlert,
    },
    index: () => '// Pajamas-inspired (MIT, from @gitlab/ui tokens)\n' + jsIndexBlock(),
    readme: qwikReadme,
    name: 'qwik',
  },
  astro: {
    ext: '.astro',
    comp: {
      Button: astroButton, Input: astroInput, Modal: astroModal, Table: astroTable,
      Tabs: astroTabs, Badge: astroBadge, Toast: astroToast, Dropdown: astroDropdown,
      Form: astroForm, Alert: astroAlert,
    },
    index: astroIndex,
    indexFile: '.ts',
    readme: astroReadme,
    name: 'astro',
  },
};

/* ------------------------------------------------- verify generated sources ------------ */
const TOKEN_RE = /var\((--gl-[\w-]+)\)/g;
const BANNER_RE = /^[^\n]*Pajamas-inspired \(MIT, from @gitlab\/ui tokens\)[^\n]*$/gm;
function assertContent(fw, name, content) {
  const lower = content.replace(BANNER_RE, '').toLowerCase();
  if (lower.includes('gitlab')) {
    throw new Error(`[${fw}/${name}] contains "gitlab" — brand reference is forbidden`);
  }
  const hex = content.match(/#[0-9a-fA-F]{3,8}\b/g);
  if (hex) throw new Error(`[${fw}/${name}] hardcoded hex colour: ${hex.join(', ')}`);
  const func = content.match(/\b(?:rgb|rgba|hsl|hsla|hwb)\(/g);
  if (func) throw new Error(`[${fw}/${name}] hardcoded colour function: ${func.join(', ')}`);
  let m;
  TOKEN_RE.lastIndex = 0;
  const refs = new Set();
  while ((m = TOKEN_RE.exec(content)) !== null) refs.add(real(m[1]));
  const missing = [];
  for (const name2 of refs) {
    if (!cssText.includes(name2 + ':')) missing.push(name2);
  }
  if (missing.length) {
    throw new Error(`[${fw}/${name}] references tokens missing in variables.css: ${missing.join(', ')}`);
  }
}

function main() {
  const counts = {};
  let total = 0;
  for (const fw of Object.keys(GENERATORS)) {
    const cfg = GENERATORS[fw];
    const dir = OUT[fw];
    let n = 0;
    for (const name of COMPONENTS) {
      const content = cfg.comp[name]().trim() + '\n';
      assertContent(fw, name + cfg.ext, content);
      writeIfChanged(path.join(dir, name + cfg.ext), content);
      n += 1;
    }
    if (cfg.index) {
      const ext = cfg.indexFile || (cfg.ext === '.tsx' ? '.ts' : '.js');
      const idx = cfg.index().trim() + '\n';
      assertContent(fw, 'index' + ext, idx);
      writeIfChanged(path.join(dir, 'index' + ext), idx);
      n += 1;
    }
    const readmeText = cfg.readme().trim() + '\n';
    assertContent(fw, 'README.md', readmeText);
    writeIfChanged(path.join(dir, 'README.md'), readmeText);
    n += 1;
    counts[fw] = n;
    total += n;
    console.log(`[gen-svelte-family] ${fw}: ${n} files -> ${dir}`);
  }
  console.log(`[gen-svelte-family] wrote ${total} files total across ${Object.keys(counts).length} frameworks.`);
  return { counts, total };
}

main();