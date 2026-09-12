'use strict';
/*
 * gen-vue.js — regenerates Vue 3 + Vue 2 SFC component libraries from the
 * shared component spec (component-spec.js) + real tokens (variables.css).
 *
 * Pajamas-inspired (MIT). Repeatable & idempotent:
 *   node scripts/gen-vue.js            # both frameworks
 *   node scripts/gen-vue.js vue3       # only Vue 3
 *   node scripts/gen-vue.js vue2       # only Vue 2
 *
 * Output layout (12 files each):
 *   dist/vue3/components/{Button,Input,Modal,Table,Tabs,Badge,Toast,Dropdown,Form,Alert}.vue
 *   dist/vue3/components/index.js
 *   dist/vue3/components/README.md
 *   dist/vue2/components/... (same)
 */
const path = require('path');
const { ROOT, cssText, writeIfChanged } = require('./gen-lib.js');
const spec = require('./component-spec.js');

const HEADER = '<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->';

const VUE3_OUT = path.join(ROOT, 'dist', 'vue3', 'components');
const VUE2_OUT = path.join(ROOT, 'dist', 'vue2', 'components');

/* Design tokens referenced by the spec that do not exist 1:1 in variables.css.
 * Substitute with nearest token that does (documented in comments near usage). */
const SUBS = {
  '--gl-modal-small-width': { to: '--gl-spacing-scale-31', note: '--gl-modal-small-width 未在 variables.css 定义，映射 --gl-spacing-scale-31' },
  '--gl-modal-medium-width': { to: '--gl-spacing-scale-48', note: '--gl-modal-medium-width 未在 variables.css 定义，映射 --gl-spacing-scale-48' },
  '--gl-modal-large-width': { to: '--gl-spacing-scale-62', note: '--gl-modal-large-width 未在 variables.css 定义，映射 --gl-spacing-scale-62' },
  '--gl-text-base-font-size': { to: '--gl-font-size-base', note: '--gl-text-base-font-size 未定义，映射 --gl-font-size-base' },
  '--gl-text-sm-font-size': { to: '--gl-font-size-sm', note: '--gl-text-sm-font-size 未定义，映射 --gl-font-size-sm' },
  '--gl-text-base-line-height': { to: '--gl-line-height-20', note: '--gl-text-base-line-height 未定义，映射 --gl-line-height-20' },
  '--gl-text-strong-color': { to: '--gl-text-color-strong', note: '--gl-text-strong-color 未定义，映射 --gl-text-color-strong' },
  '--gl-text-subtle-color': { to: '--gl-text-color-subtle', note: '--gl-text-subtle-color 未定义，映射 --gl-text-color-subtle' },
  '--gl-zindex-modal': { to: '--gl-zindex-4', note: '--gl-zindex-modal 未定义，映射 --gl-zindex-4' },
  '--gl-zindex-toast': { to: '--gl-zindex-200', note: '--gl-zindex-toast 未定义，映射 --gl-zindex-200' },
  '--gl-zindex-dropdown': { to: '--gl-zindex-3', note: '--gl-zindex-dropdown 未定义，映射 --gl-zindex-3' },
};
const real = (name) => (SUBS[name] ? SUBS[name].to : name);
const tok = (name) => `var(${real(name)})`;

/* Small inline SVG glyphs (stroke uses currentColor, filled by CSS color var). */
const SVG = {
  spinner:
    '<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8A6 6 0 0 0 8 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  x: '<svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  check:
    '<svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevron:
    '<svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  globe:
    '<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h12M8 2a10 10 0 0 1 0 12M8 2a10 10 0 0 0 0 12" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  info:
    '<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11.5V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  warning:
    '<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2L15 13.5H1L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5V10M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  tip: `<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};


const FOCUS_RING = `box-shadow: 0 0 0 2px ${tok('--gl-focus-ring-inner-color')}, 0 0 0 4px ${tok('--gl-focus-ring-outer-color')};`;

/* ------------------------------------------------------------------ CSS */
const STYLES = {
  button: `
.gl-button {
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--gl-spacing-scale-2);
  border-radius: ${tok('--gl-button-border-radius')};
  border: 1px solid transparent;
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  cursor: pointer;
  transition: background-color 150ms linear, border-color 150ms linear, color 150ms linear;
}
.gl-button--size-medium { min-height: var(--gl-line-height-32); }
.gl-button--size-small { min-height: var(--gl-line-height-28); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); }
.gl-button--block { display: flex; width: 100%; }
.gl-button:focus-visible { outline: none; ${FOCUS_RING} }
.gl-button:disabled { cursor: not-allowed; }
.gl-button-spinner, .gl-button-glyph { display: inline-flex; }
.gl-button .gl-svg { width: 1rem; height: 1rem; }

/* default variant */
.gl-button--variant-default.gl-button--primary {
  background-color: ${tok('--gl-button-default-primary-background-color-default')};
  border-color: ${tok('--gl-button-default-primary-border-color-default')};
  color: ${tok('--gl-button-default-primary-foreground-color-default')};
}
.gl-button--variant-default.gl-button--primary:hover {
  background-color: ${tok('--gl-button-default-primary-background-color-hover')};
  border-color: ${tok('--gl-button-default-primary-border-color-hover')};
}
.gl-button--variant-default.gl-button--primary:active {
  background-color: ${tok('--gl-button-default-primary-background-color-active')};
  border-color: ${tok('--gl-button-default-primary-border-color-active')};
}
.gl-button--variant-default.gl-button--secondary {
  background-color: ${tok('--gl-button-confirm-secondary-background-color-default')};
  border-color: ${tok('--gl-button-confirm-secondary-border-color-default')};
  color: ${tok('--gl-button-confirm-secondary-foreground-color-default')};
}
.gl-button--variant-default.gl-button--secondary:hover {
  background-color: ${tok('--gl-button-confirm-secondary-background-color-hover')};
  border-color: ${tok('--gl-button-confirm-secondary-border-color-hover')};
}
.gl-button--variant-default.gl-button--tertiary {
  background-color: ${tok('--gl-button-default-tertiary-background-color-default')};
  color: ${tok('--gl-button-default-tertiary-foreground-color-default')};
}
.gl-button--variant-default.gl-button--tertiary:hover {
  background-color: ${tok('--gl-button-default-tertiary-background-color-hover')};
}

/* confirm variant */
.gl-button--variant-confirm.gl-button--primary {
  background-color: ${tok('--gl-button-confirm-primary-background-color-default')};
  color: ${tok('--gl-button-confirm-primary-foreground-color-default')};
}
.gl-button--variant-confirm.gl-button--primary:hover {
  background-color: ${tok('--gl-button-confirm-primary-background-color-hover')};
}
.gl-button--variant-confirm.gl-button--primary:active {
  background-color: ${tok('--gl-button-confirm-primary-background-color-active')};
}
.gl-button--variant-confirm.gl-button--secondary {
  background-color: ${tok('--gl-button-confirm-secondary-background-color-default')};
  border-color: ${tok('--gl-button-confirm-secondary-border-color-default')};
  color: ${tok('--gl-button-confirm-secondary-foreground-color-default')};
}
.gl-button--variant-confirm.gl-button--secondary:hover {
  background-color: ${tok('--gl-button-confirm-secondary-background-color-hover')};
  border-color: ${tok('--gl-button-confirm-secondary-border-color-hover')};
}
.gl-button--variant-confirm.gl-button--tertiary {
  background-color: ${tok('--gl-button-confirm-tertiary-background-color-default')};
  color: ${tok('--gl-button-confirm-tertiary-foreground-color-default')};
}
.gl-button--variant-confirm.gl-button--tertiary:hover {
  background-color: ${tok('--gl-button-confirm-tertiary-background-color-hover')};
}

/* danger variant */
.gl-button--variant-danger.gl-button--primary {
  background-color: ${tok('--gl-button-danger-primary-background-color-default')};
  border-color: ${tok('--gl-button-danger-primary-border-color-default')};
  color: ${tok('--gl-button-danger-primary-foreground-color-default')};
}
.gl-button--variant-danger.gl-button--primary:hover {
  background-color: ${tok('--gl-button-danger-primary-background-color-hover')};
  border-color: ${tok('--gl-button-danger-primary-border-color-hover')};
}
.gl-button--variant-danger.gl-button--primary:active {
  background-color: ${tok('--gl-button-danger-primary-background-color-active')};
  border-color: ${tok('--gl-button-danger-primary-border-color-active')};
}
.gl-button--variant-danger.gl-button--secondary {
  background-color: ${tok('--gl-button-danger-secondary-background-color-default')};
  border-color: ${tok('--gl-button-danger-secondary-border-color-default')};
  color: ${tok('--gl-button-danger-secondary-foreground-color-default')};
}
.gl-button--variant-danger.gl-button--secondary:hover {
  background-color: ${tok('--gl-button-danger-secondary-background-color-hover')};
  border-color: ${tok('--gl-button-danger-secondary-border-color-hover')};
}
.gl-button--variant-danger.gl-button--tertiary {
  background-color: ${tok('--gl-button-danger-tertiary-background-color-default')};
  color: ${tok('--gl-button-danger-tertiary-foreground-color-default')};
}
.gl-button--variant-danger.gl-button--tertiary:hover {
  background-color: ${tok('--gl-button-danger-tertiary-background-color-hover')};
}

/* link variant */
.gl-button--variant-link {
  background-color: ${tok('--gl-button-default-tertiary-background-color-default')};
  border-color: transparent;
  color: ${tok('--gl-button-link-text-color-default')};
  padding-left: var(--gl-spacing-scale-3);
  padding-right: var(--gl-spacing-scale-3);
}
.gl-button--variant-link:hover {
  background-color: ${tok('--gl-button-default-tertiary-background-color-hover')};
  color: ${tok('--gl-button-link-text-color-hover')};
}

.gl-button:disabled {
  background-color: ${tok('--gl-action-disabled-background-color')} !important;
  border-color: ${tok('--gl-action-disabled-border-color')} !important;
  color: ${tok('--gl-action-disabled-foreground-color')} !important;
}
.gl-button-spinner { animation: gl-vue-spin 800ms linear infinite; }
@keyframes gl-vue-spin { to { transform: rotate(360deg); } }
`,

  input: `
.gl-form-input-wrap { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-2); }
.gl-form-input {
  display: block; width: 100%;
  background-color: ${tok('--gl-control-background-color-default')};
  border: 1px solid ${tok('--gl-control-border-color-default')};
  border-radius: ${tok('--gl-control-border-radius')};
  color: var(--gl-text-color-default);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-3);
  transition: border-color 150ms linear, box-shadow 150ms linear;
}
.gl-form-input::placeholder { color: ${tok('--gl-control-placeholder-color')}; }
.gl-form-input:hover:not(:disabled):not([readonly]) { border-color: ${tok('--gl-control-border-color-hover')}; }
.gl-form-input:focus { outline: none; border-color: ${tok('--gl-control-border-color-focus')}; ${FOCUS_RING} }
.gl-form-input:disabled {
  background-color: ${tok('--gl-control-background-color-disabled')};
  border-color: ${tok('--gl-control-border-color-disabled')};
  color: var(--gl-text-color-disabled);
  cursor: not-allowed;
}
.gl-form-input[readonly] { background-color: ${tok('--gl-control-background-color-readonly')}; cursor: default; }
.gl-form-input.is-invalid { border-color: ${tok('--gl-control-border-color-error')}; }
.gl-form-input.is-invalid:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px ${tok('--gl-control-border-color-error')};
}
.gl-form-input.is-valid { border-color: var(--gl-text-color-success); }
.gl-form-input--width-xs { max-width: var(--gl-spacing-scale-31); }
.gl-form-input--width-sm { max-width: var(--gl-spacing-scale-37); }
.gl-form-input--width-md { max-width: var(--gl-spacing-scale-62); }
.gl-form-input--width-lg { max-width: var(--gl-spacing-scale-75); }
.gl-form-input--width-xl, .gl-form-input--width-null { max-width: 100%; }
.gl-form-feedback { margin: 0; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20); }
.gl-form-feedback--valid { color: ${tok('--gl-control-text-color-valid')}; }
.gl-form-feedback--invalid { color: ${tok('--gl-control-text-color-error')}; }
`,

  modal: `
.gl-modal-backdrop {
  position: fixed; inset: 0; z-index: ${tok('--gl-zindex-modal')};
  display: flex; align-items: center; justify-content: center;
  background-color: ${tok('--gl-background-color-overlay')};
}
.gl-modal {
  display: flex; flex-direction: column;
  width: var(--gl-spacing-scale-48);
  max-width: calc(100vw - calc(var(--gl-spacing-scale-6) * 2));
  background-color: var(--gl-background-color-default);
  border-radius: ${tok('--gl-modal-border-radius')};
  box-shadow: ${tok('--gl-shadow-lg')};
  overflow: hidden;
}
.gl-modal--sm { width: var(--gl-spacing-scale-31); }
.gl-modal--lg { width: var(--gl-spacing-scale-62); }
.gl-modal-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: var(--gl-spacing-scale-4);
  padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-5) var(--gl-spacing-scale-3);
}
.gl-modal-title {
  margin: 0;
  font-size: ${tok('--gl-heading-scale-500-fixed-font-size')};
  font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-24);
  color: var(--gl-text-color-heading);
}
.gl-modal-close {
  display: inline-flex; align-items: center; justify-content: center;
  flex: none;
  border: 0; border-radius: var(--gl-border-radius-default);
  background-color: ${tok('--gl-button-default-tertiary-background-color-default')};
  color: var(--gl-text-color-strong);
  cursor: pointer;
  padding: var(--gl-spacing-scale-2);
}
.gl-modal-close:hover { background-color: ${tok('--gl-button-default-tertiary-background-color-hover')}; }
.gl-modal-close:focus-visible { outline: none; ${FOCUS_RING} }
.gl-modal-close .gl-svg { width: 1rem; height: 1rem; }
.gl-modal-body {
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-24);
  color: var(--gl-text-color-default);
}
.gl-modal-footer {
  display: flex; flex-wrap: wrap; gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-5);
  border-top: 1px solid ${tok('--gl-border-color-default')};
}
.gl-modal-footer .gl-button { font-size: var(--gl-font-size-base); cursor: pointer; padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); }
.gl-modal-footer .gl-button--secondary {
  background-color: ${tok('--gl-button-confirm-secondary-background-color-default')};
  border: 1px solid ${tok('--gl-button-confirm-secondary-border-color-default')};
  border-radius: ${tok('--gl-button-border-radius')};
  color: ${tok('--gl-button-confirm-secondary-foreground-color-default')};
}
.gl-modal-footer .gl-button--secondary:hover { background-color: ${tok('--gl-button-confirm-secondary-background-color-hover')}; }
.gl-modal-enter-active, .gl-modal-leave-active { transition: opacity 150ms linear; }
.gl-modal-enter-active .gl-modal, .gl-modal-leave-active .gl-modal { transition: transform 150ms linear, opacity 150ms linear; }
.gl-modal-enter-from, .gl-modal-leave-to { opacity: 0; }
.gl-modal-enter-from .gl-modal, .gl-modal-leave-to .gl-modal { transform: scale(0.98); opacity: 0; }
`,

  table: `
.gl-table { width: 100%; border-collapse: collapse; }
.gl-table th, .gl-table td {
  padding: var(--gl-spacing-scale-3);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  text-align: left;
  color: var(--gl-text-color-default);
}
.gl-table thead th {
  background-color: ${tok('--gl-color-alpha-0')};
  box-shadow: inset 0 -1px 0 ${tok('--gl-border-color-default')};
  color: var(--gl-text-color-strong);
  font-weight: var(--gl-font-weight-bold);
}
.gl-table tbody tr { transition: background-color 100ms linear; cursor: pointer; }
.gl-table tbody tr:hover { background-color: ${tok('--gl-table-row-background-color-hover')}; }
.gl-table .gl-table-sort-btn {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-1);
  padding: 0; border: 0; background: none;
  font: inherit; font-weight: var(--gl-font-weight-bold);
  color: inherit; cursor: pointer;
}
.gl-table .gl-table-sort-btn:focus-visible { outline: none; ${FOCUS_RING} }
.gl-table-sort-icon { color: ${tok('--gl-table-sorting-icon-color')}; font-size: var(--gl-font-size-sm); }
.gl-table td.gl-table-empty, .gl-table td.gl-table-busy {
  padding: var(--gl-spacing-scale-8) var(--gl-spacing-scale-3);
  text-align: center;
  color: var(--gl-text-color-subtle);
}
.gl-table-busy { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); }
.gl-table-busy .gl-svg { width: 1rem; height: 1rem; animation: gl-vue-spin 800ms linear infinite; }
@keyframes gl-vue-spin { to { transform: rotate(360deg); } }
`,

  tabs: `
.gl-tabs-wrapper { border-bottom: 1px solid ${tok('--gl-border-color-default')}; }
.gl-tabs-nav { display: flex; gap: var(--gl-spacing-scale-2); overflow-x: auto; }
.gl-tab-nav-item {
  position: relative;
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  border: 0; background: none;
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  white-space: nowrap;
}
.gl-tab-nav-item:hover { background-color: ${tok('--gl-action-neutral-background-color-hover')}; }
.gl-tab-nav-item:focus-visible { outline: none; ${FOCUS_RING} }
.gl-tab-nav-item::after {
  content: ''; position: absolute; left: var(--gl-spacing-scale-4); right: var(--gl-spacing-scale-4); bottom: 0;
  height: 2px; border-radius: var(--gl-border-radius-full);
  background-color: transparent;
}
.gl-tab-nav-item:hover::after { background-color: ${tok('--gl-border-color-strong')}; }
.gl-tab-nav-item--active { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.gl-tab-nav-item--active::after { background-color: ${tok('--gl-tab-selected-indicator-color-default')}; }
.gl-tab-nav-item--active:hover::after { background-color: ${tok('--gl-tab-selected-indicator-color-default')}; }
.gl-tab-nav-item:disabled, .gl-tab-nav-item--disabled { color: ${tok('--gl-action-disabled-foreground-color')}; cursor: not-allowed; }
.gl-tab-nav-item:disabled::after, .gl-tab-nav-item--disabled::after { display: none; }
.gl-tab-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: var(--gl-line-height-20);
  height: var(--gl-line-height-20);
  padding: 0 var(--gl-spacing-scale-2);
  border-radius: var(--gl-border-radius-full);
  background-color: ${tok('--gl-badge-neutral-background-color-default')};
  color: ${tok('--gl-badge-neutral-text-color-default')};
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-semibold);
}
.gl-tab-content { padding: var(--gl-spacing-scale-5) 0; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
`,

  badge: `
.gl-badge {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-1);
  min-width: var(--gl-spacing-scale-3);
  padding: 1px var(--gl-spacing-scale-2);
  border-radius: ${tok('--gl-border-radius-full')};
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  font-weight: var(--gl-font-weight-semibold);
  text-decoration: none;
}
.gl-badge .gl-svg { width: 0.75rem; height: 0.75rem; }
.gl-badge--neutral { background-color: ${tok('--gl-badge-neutral-background-color-default')}; color: ${tok('--gl-badge-neutral-text-color-default')}; }
.gl-badge--info { background-color: ${tok('--gl-badge-info-background-color-default')}; color: ${tok('--gl-badge-info-text-color-default')}; }
.gl-badge--success { background-color: ${tok('--gl-badge-success-background-color-default')}; color: ${tok('--gl-badge-success-text-color-default')}; }
.gl-badge--warning { background-color: ${tok('--gl-badge-warning-background-color-default')}; color: ${tok('--gl-badge-warning-text-color-default')}; }
.gl-badge--danger { background-color: ${tok('--gl-badge-danger-background-color-default')}; color: ${tok('--gl-badge-danger-text-color-default')}; }
.gl-badge--tier { background-color: ${tok('--gl-badge-tier-background-color-default')}; color: ${tok('--gl-badge-tier-text-color-default')}; }
a.gl-badge--neutral:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-neutral-border-color-hover); }
a.gl-badge--info:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-info-border-color-hover); }
a.gl-badge--success:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-success-border-color-hover); }
a.gl-badge--warning:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-warning-border-color-hover); }
a.gl-badge--danger:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-danger-border-color-hover); }
a.gl-badge--tier:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-tier-border-color-hover); }
`,

  toast: `
.gl-toaster { position: fixed; bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: ${tok('--gl-zindex-toast')}; }
.gl-toast {
  display: flex; align-items: center; gap: var(--gl-spacing-scale-3);
  max-width: var(--gl-spacing-scale-62);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-4);
  background-color: ${tok('--gl-feedback-strong-background-color')};
  color: ${tok('--gl-feedback-strong-text-color')};
  border-radius: ${tok('--gl-border-radius-full')};
  box-shadow: ${tok('--gl-shadow-md')};
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
}
.gl-toast-body { flex: 1; min-width: 0; }
.gl-toast-action {
  flex: none; border: 0; background: none; padding: 0;
  color: ${tok('--gl-feedback-strong-link-color')};
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-semibold);
  text-decoration: underline; cursor: pointer;
}
.gl-toast-close {
  flex: none; display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: var(--gl-border-radius-default);
  background: none; color: inherit; cursor: pointer; padding: var(--gl-spacing-scale-1);
}
.gl-toast-close:hover { background-color: ${tok('--gl-color-alpha-light-4')}; }
.gl-toast-close:focus-visible, .gl-toast-action:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px ${tok('--gl-focus-ring-outer-color')};
}
.gl-toast-enter-active, .gl-toast-leave-active { transition: opacity 150ms linear, transform 150ms linear; }
.gl-toast-enter-from, .gl-toast-leave-to { opacity: 0; transform: translateY(0.25rem); }
`,

  dropdown: `
.gl-dropdown { display: inline-block; position: relative; }
.gl-dropdown-toggle {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
  border: 1px solid ${tok('--gl-button-default-primary-border-color-default')};
  border-radius: ${tok('--gl-button-border-radius')};
  background-color: ${tok('--gl-button-default-primary-background-color-default')};
  color: ${tok('--gl-button-default-primary-foreground-color-default')};
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  cursor: pointer;
}
.gl-dropdown-toggle:hover {
  background-color: ${tok('--gl-button-default-primary-background-color-hover')};
  border-color: ${tok('--gl-button-default-primary-border-color-hover')};
}
.gl-dropdown-toggle:focus-visible { outline: none; ${FOCUS_RING} }
.gl-dropdown-toggle .gl-svg { width: 1rem; height: 1rem; }
.gl-dropdown-menu {
  position: fixed; z-index: ${tok('--gl-zindex-dropdown')};
  display: flex; flex-direction: column;
  min-width: 12rem;
  margin-top: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-2);
  background-color: ${tok('--gl-dropdown-background-color')};
  border: 1px solid ${tok('--gl-dropdown-border-color')};
  border-radius: ${tok('--gl-dropdown-border-radius')};
  box-shadow: ${tok('--gl-shadow-sm')};
}
.gl-dropdown-header {
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-subtle);
}
.gl-dropdown-item {
  display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3);
  width: 100%;
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  border: 0; border-radius: var(--gl-border-radius-default);
  background-color: ${tok('--gl-dropdown-option-background-color-unselected-default')};
  color: ${tok('--gl-dropdown-option-text-color-default')};
  font-size: var(--gl-font-size-base); text-align: left; cursor: pointer;
}
.gl-dropdown-item:hover {
  background-color: ${tok('--gl-dropdown-option-background-color-unselected-hover')};
  color: ${tok('--gl-dropdown-option-text-color-hover')};
}
.gl-dropdown-item--checked {
  background-color: ${tok('--gl-dropdown-option-background-color-selected-default')};
  color: ${tok('--gl-dropdown-option-text-color-default')};
}
.gl-dropdown-item--checked:hover { background-color: ${tok('--gl-dropdown-option-background-color-selected-hover')}; }
.gl-dropdown-item:disabled {
  background: none; color: ${tok('--gl-dropdown-option-text-color-disabled')}; cursor: not-allowed;
}
.gl-dropdown-item:focus-visible { outline: none; ${FOCUS_RING} }
.gl-dropdown-item-check { display: inline-flex; color: ${tok('--gl-dropdown-option-indicator-color-selected-default')}; }
.gl-dropdown-item-check .gl-svg { width: 1rem; height: 1rem; }
.gl-dropdown-divider { height: 1px; margin: var(--gl-spacing-scale-2) 0; background-color: ${tok('--gl-dropdown-divider-color')}; }
.gl-dropdown-clear-all {
  margin-top: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-4);
  align-self: flex-start;
  border: 0; background: none;
  color: ${tok('--gl-button-link-text-color-default')};
  font-size: var(--gl-font-size-sm); cursor: pointer; text-decoration: underline;
}
.gl-dropdown-clear-all:hover { color: ${tok('--gl-button-link-text-color-hover')}; }
.gl-dropdown-clear-all:focus-visible { outline: none; ${FOCUS_RING} }
.gl-dropdown-menu-enter-active { transition: opacity 120ms linear, transform 120ms linear; }
.gl-dropdown-menu-enter-from { opacity: 0; transform: translateY(-0.125rem); }
`,

  form: `
.gl-form { display: flex; flex-direction: column; }
.gl-form-group { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-2); margin-bottom: var(--gl-spacing-scale-5); }
.gl-form-label {
  display: inline-flex; align-items: baseline; gap: var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-strong);
}
.gl-form-optional { color: var(--gl-text-color-subtle); font-weight: var(--gl-font-weight-normal); }
.gl-form-helper { margin: 0; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20); color: var(--gl-text-color-subtle); }
.gl-form-feedback { margin: 0; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20); }
.gl-form-feedback--valid { color: ${tok('--gl-control-text-color-valid')}; }
.gl-form-feedback--invalid { color: ${tok('--gl-control-text-color-error')}; }
`,

  alert: `
.gl-alert {
  display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-4);
  border: 1px solid var(--gl-border-color-default);
  border-radius: ${tok('--gl-alert-border-radius')};
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  color: var(--gl-text-color-default);
}
.gl-alert--sticky { position: sticky; top: var(--gl-spacing-scale-4); z-index: var(--gl-zindex-2); }
.gl-alert-icon { display: inline-flex; flex: none; margin-top: 1px; }
.gl-alert-icon .gl-svg { width: 1rem; height: 1rem; }
.gl-alert-content { flex: 1; min-width: 0; }
.gl-alert-title {
  margin: 0 0 var(--gl-spacing-scale-1);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  font-weight: var(--gl-font-weight-bold);
}
.gl-alert-close {
  flex: none; display: inline-flex; align-items: center; justify-content: center;
  margin: -var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-2);
  border: 0; border-radius: var(--gl-border-radius-default);
  background: none; color: inherit; cursor: pointer;
}
.gl-alert-close:hover { background-color: ${tok('--gl-color-alpha-dark-4')}; }
.gl-alert-close:focus-visible { outline: none; ${FOCUS_RING} }
.gl-alert-close .gl-svg { width: 1rem; height: 1rem; }
.gl-alert--info { background-color: ${tok('--gl-alert-info-background-color')}; border-color: ${tok('--gl-alert-info-border-color')}; }
.gl-alert--info .gl-alert-title { color: ${tok('--gl-alert-info-title-color')}; }
.gl-alert--info .gl-alert-icon { color: ${tok('--gl-feedback-info-icon-color')}; }
.gl-alert--success { background-color: ${tok('--gl-alert-success-background-color')}; border-color: ${tok('--gl-alert-success-border-color')}; }
.gl-alert--success .gl-alert-title { color: ${tok('--gl-alert-success-title-color')}; }
.gl-alert--success .gl-alert-icon { color: ${tok('--gl-feedback-success-icon-color')}; }
.gl-alert--warning { background-color: ${tok('--gl-alert-warning-background-color')}; border-color: ${tok('--gl-alert-warning-border-color')}; }
.gl-alert--warning .gl-alert-title { color: ${tok('--gl-alert-warning-title-color')}; }
.gl-alert--warning .gl-alert-icon { color: ${tok('--gl-feedback-warning-icon-color')}; }
.gl-alert--danger { background-color: ${tok('--gl-alert-danger-background-color')}; border-color: ${tok('--gl-alert-danger-border-color')}; }
.gl-alert--danger .gl-alert-title { color: ${tok('--gl-alert-danger-title-color')}; }
.gl-alert--danger .gl-alert-icon { color: ${tok('--gl-feedback-danger-icon-color')}; }
.gl-alert--tip { background-color: var(--gl-feedback-brand-background-color); border-color: var(--gl-feedback-brand-border-color); }
.gl-alert--tip .gl-alert-title { color: var(--gl-feedback-brand-text-color); }
.gl-alert--tip .gl-alert-icon { color: ${tok('--gl-feedback-brand-icon-color')}; }
`,
};

/* ---------------------------------------------------------- components */
const COMPONENTS = ['button', 'input', 'modal', 'table', 'tabs', 'badge', 'toast', 'dropdown', 'form', 'alert'];
const EXPORT_NAME = {
  button: 'GlButton', input: 'GlInput', modal: 'GlModal', table: 'GlTable', tabs: 'GlTabs', badge: 'GlBadge',
  toast: 'GlToast', dropdown: 'GlDropdown', form: 'GlForm', alert: 'GlAlert',
};
const FILE_NAME = {
  button: 'Button', input: 'Input', modal: 'Modal', table: 'Table', tabs: 'Tabs', badge: 'Badge',
  toast: 'Toast', dropdown: 'Dropdown', form: 'Form', alert: 'Alert',
};

function sfcV3(id) {
  let tpl;
  let script;
  if (id === 'button') {
    tpl = `
<template>
  <button
    type="button"
    class="gl-button"
    :class="classes"
    :disabled="disabled"
    :aria-busy="loading ? 'true' : undefined"
    @click="onClick"
  >
    <span v-if="loading" class="gl-button-spinner" aria-hidden="true">${SVG.spinner}</span>
    <span v-if="icon" class="gl-button-glyph" aria-hidden="true">${SVG.globe}</span>
    <span class="gl-button-label"><slot /></span>
  </button>
</template>`;
    script = `
<script setup>
import { computed } from 'vue';

const props = defineProps({
  category: { type: String, default: 'primary' },
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'medium' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  block: { type: Boolean, default: false },
});
const emit = defineEmits(['click']);

const classes = computed(() => [
  'gl-button--' + props.category,
  'gl-button--variant-' + props.variant,
  'gl-button--size-' + props.size,
  { 'gl-button--block': props.block },
]);

function onClick() {
  if (props.disabled || props.loading) return;
  emit('click');
}
</script>`;
  } else if (id === 'input') {
    tpl = `
<template>
  <div class="gl-form-input-wrap">
    <input
      class="gl-form-input"
      :class="classes"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="state === 'invalid' ? 'true' : undefined"
      @input="onInput"
    />
    <p v-if="state === 'invalid'" class="gl-form-feedback gl-form-feedback--invalid" role="alert">
      <slot name="invalidFeedback">Invalid value.</slot>
    </p>
    <p v-else-if="state === 'valid'" class="gl-form-feedback gl-form-feedback--valid">
      <slot name="validFeedback">Looks good.</slot>
    </p>
  </div>
</template>`;
    script = `
<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  state: { type: String, default: null, validator: (v) => v === null || v === 'valid' || v === 'invalid' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  width: { type: String, default: null, validator: (v) => v === null || ['xs', 'sm', 'md', 'lg', 'xl'].includes(v) },
});
const emit = defineEmits(['update:modelValue']);

const classes = computed(() => [
  { 'is-valid': props.state === 'valid' },
  { 'is-invalid': props.state === 'invalid' },
  props.width ? 'gl-form-input--width-' + props.width : 'gl-form-input--width-null',
]);

function onInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>`;
  } else if (id === 'modal') {
    tpl = `
<template>
  <Teleport to="body">
    <Transition name="gl-modal">
      <div v-if="visible" class="gl-modal-backdrop" @click.self="close">
        <div
          class="gl-modal"
          :class="'gl-modal--' + size"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gl-modal-title"
        >
          <header class="gl-modal-header">
            <!-- ${SUBS['--gl-modal-medium-width'].note} -->
            <h4 id="gl-modal-title" class="gl-modal-title">{{ title }}</h4>
            <button type="button" class="gl-modal-close" aria-label="Close" @click="close">${SVG.x}</button>
          </header>
          <div class="gl-modal-body"><slot /></div>
          <footer v-if="primaryAction || secondaryAction" class="gl-modal-footer">
            <button
              v-if="secondaryAction"
              type="button"
              class="gl-button gl-button--secondary"
              @click="onSecondary"
            >{{ secondaryAction.text }}</button>
            <button
              v-if="primaryAction"
              type="button"
              class="gl-button gl-button--primary"
              :class="'gl-button--variant-' + (primaryAction.variant || 'default')"
              @click="onPrimary"
            >{{ primaryAction.text }}</button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>`;
    script = `
<script setup>
import { watch, onUnmounted } from 'vue';

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
  primaryAction: { type: Object, default: null },
  secondaryAction: { type: Object, default: null },
  onClose: { type: Function, default: null },
});
const emit = defineEmits(['update:visible', 'primary', 'secondary', 'close']);

function close() {
  emit('update:visible', false);
  emit('close');
  if (props.onClose) props.onClose();
}
function onPrimary() {
  emit('primary');
  close();
}
function onSecondary() {
  emit('secondary');
  close();
}
function onKeydown(event) {
  if (event.key === 'Escape') close();
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) document.addEventListener('keydown', onKeydown);
    else document.removeEventListener('keydown', onKeydown);
  }
);
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>`;
  } else if (id === 'table') {
    tpl = `
<template>
  <table class="gl-table">
    <thead>
      <tr>
        <th v-for="field in parsedFields" :key="field.key" scope="col">
          <button
            v-if="field.sortable"
            type="button"
            class="gl-table-sort-btn"
            :aria-sort="sortKey === field.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'"
            @click="onSort(field)"
          >
            {{ field.label }}
            <span class="gl-table-sort-icon">{{ sortKey === field.key ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}</span>
          </button>
          <template v-else>{{ field.label }}</template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td :colspan="parsedFields.length" class="gl-table-busy" aria-busy="true">
          ${SVG.spinner}<span>Loading&hellip;</span>
        </td>
      </tr>
      <tr v-else-if="rows.length === 0">
        <td :colspan="parsedFields.length" class="gl-table-empty">
          <slot name="empty">No data available.</slot>
        </td>
      </tr>
      <tr v-for="row in rows" :key="row.index" @click="$emit('row-clicked', row.row, row.index)">
        <td v-for="field in parsedFields" :key="field.key">{{ row.row[field.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>`;
    script = `
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  fields: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  sortBy: { type: String, default: null },
  sortDesc: { type: Boolean, default: false },
});
const emit = defineEmits(['sort-changed', 'row-clicked']);

const sortKey = ref(props.sortBy);
const sortOrder = ref(props.sortDesc ? 'desc' : 'asc');

const parsedFields = computed(() => {
  if (props.fields && props.fields.length) return props.fields;
  const first = props.items[0] || {};
  return Object.keys(first).map((key) => ({ key, label: key, sortable: false }));
});

const rows = computed(() => {
  const list = props.items.map((row, index) => ({ row, index }));
  if (!sortKey.value) return list;
  const key = sortKey.value;
  const order = sortOrder.value;
  return list.slice().sort((a, b) => {
    const av = a.row[key];
    const bv = b.row[key];
    let cmp = 0;
    if (av > bv) cmp = 1;
    else if (av < bv) cmp = -1;
    return order === 'desc' ? -cmp : cmp;
  });
});

function onSort(field) {
  if (!field.sortable) return;
  if (sortKey.value === field.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = field.key;
    sortOrder.value = 'asc';
  }
  emit('sort-changed', { sortBy: sortKey.value, sortDesc: sortOrder.value === 'desc' });
}
</script>`;
  } else if (id === 'tabs') {
    tpl = `
<template>
  <div>
    <div class="gl-tabs-wrapper">
      <div class="gl-tabs-nav" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          type="button"
          class="gl-tab-nav-item"
          :class="{ 'gl-tab-nav-item--active': index === activeIndex, 'gl-tab-nav-item--disabled': tab.disabled }"
          role="tab"
          :aria-selected="index === activeIndex ? 'true' : 'false'"
          :disabled="tab.disabled"
          @click="activate(index)"
        >
          {{ tab.title }}
          <span v-if="tab.count != null" class="gl-tab-count" aria-label="count">{{ tab.count }}</span>
        </button>
      </div>
    </div>
    <div class="gl-tab-content" role="tabpanel">
      <slot :name="'tab-' + activeIndex" :tab="currentTab">
        <span class="gl-tab-content-text">{{ currentContent }}</span>
      </slot>
    </div>
  </div>
</template>`;
    script = `
<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  tabs: { type: Array, default: () => [] },
  active: { type: Number, default: 0 },
  onChange: { type: Function, default: null },
});
const emit = defineEmits(['update:active', 'change']);

const activeIndex = ref(props.active);
watch(
  () => props.active,
  (v) => { activeIndex.value = v; }
);

const currentTab = computed(() => props.tabs[activeIndex.value] || {});
const currentContent = computed(() => currentTab.value.content || '');

function activate(index) {
  if (props.tabs[index] && props.tabs[index].disabled) return;
  activeIndex.value = index;
  emit('update:active', index);
  emit('change', index);
  if (props.onChange) props.onChange(index);
}
</script>`;
  } else if (id === 'badge') {
    tpl = `
<template>
  <component
    :is="badgeTag"
    class="gl-badge"
    :class="'gl-badge--' + variant"
    :href="href || undefined"
  >
    <span v-if="icon" class="gl-badge-icon" aria-hidden="true">${SVG.globe}</span>
    <span class="gl-badge-content"><slot /></span>
  </component>
</template>`;
    script = `
<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'neutral', validator: (v) => ['neutral', 'info', 'success', 'warning', 'danger', 'tier'].includes(v) },
  icon: { type: String, default: null },
  href: { type: String, default: null },
});

const badgeTag = computed(() => (props.href ? 'a' : 'span'));
</script>`;
  } else if (id === 'toast') {
    tpl = `
<template>
  <Teleport to="body">
    <div class="gl-toaster">
      <Transition name="gl-toast">
        <div v-if="visible" class="gl-toast" role="status" aria-live="polite">
          <div class="gl-toast-body">{{ message }}</div>
          <button v-if="action" type="button" class="gl-toast-action" @click="onAction">{{ action.text }}</button>
          <button type="button" class="gl-toast-close" aria-label="Close" @click="dismiss">${SVG.x}</button>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>`;
    script = `
<script setup>
import { ref, onUnmounted } from 'vue';

const props = defineProps({
  message: { type: String, default: '' },
  action: { type: Object, default: null },
  autoHideDelay: { type: Number, default: 5000 },
  onDismiss: { type: Function, default: null },
});
const emit = defineEmits(['dismiss', 'action']);

const visible = ref(true);

const alertIcon = computed(() => ALERT_ICONS[props.variant] || ALERT_ICONS.info);
let timer = null;

function vanish() {
  visible.value = false;
  emit('dismiss');
  if (props.onDismiss) props.onDismiss();
}
function dismiss() {
  clearTimeout(timer);
  vanish();
}
function onAction() {
  emit('action');
  if (props.action && props.action.onClick) props.action.onClick();
  clearTimeout(timer);
  vanish();
}

timer = setTimeout(dismiss, Math.max(props.autoHideDelay, 1000));
onUnmounted(() => clearTimeout(timer));
</script>`;
  } else if (id === 'dropdown') {
    tpl = `
<template>
  <div ref="root" class="gl-dropdown">
    <button
      ref="trigger"
      type="button"
      class="gl-dropdown-toggle"
      :aria-haspopup="'menu'"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggle"
    >
      {{ text }}
      ${SVG.chevron}
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        ref="menu"
        class="gl-dropdown-menu"
        :style="menuStyle"
        role="menu"
        @click.stop
      >
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item.divider" class="gl-dropdown-divider" role="separator"></div>
          <div v-else-if="item.header" class="gl-dropdown-header" role="presentation">{{ item.text }}</div>
          <button
            v-else
            type="button"
            class="gl-dropdown-item"
            :class="{ 'gl-dropdown-item--checked': isChecked(item) }"
            role="menuitemcheckbox"
            :aria-checked="isChecked(item) ? 'true' : 'false'"
            :disabled="item.disabled"
            @click="select(item)"
          >
            <span class="gl-dropdown-item-label">{{ item.text }}</span>
            <span v-if="isChecked(item)" class="gl-dropdown-item-check">${SVG.check}</span>
          </button>
        </template>
        <button v-if="showClearAll" type="button" class="gl-dropdown-clear-all" @click="clearAll">Clear all</button>
      </div>
    </Teleport>
  </div>
</template>`;
    script = `
<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';

const props = defineProps({
  text: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  showClearAll: { type: Boolean, default: false },
  onSelect: { type: Function, default: null },
});
const emit = defineEmits(['select', 'clear-all']);

const root = ref(null);
const trigger = ref(null);
const menu = ref(null);
const open = ref(false);
const position = ref({ top: 0, left: 0, minWidth: '12rem' });
const checked = ref(new Set());

const menuStyle = computed(() => ({
  top: position.value.top + 'px',
  left: position.value.left + 'px',
  minWidth: position.value.minWidth,
}));

function isChecked(item) {
  return checked.value.has(item.value);
}

function measure() {
  if (!trigger.value) return;
  const rect = trigger.value.getBoundingClientRect();
  position.value = { top: rect.bottom, left: rect.left, minWidth: rect.width + 'px' };
}

function openMenu() {
  measure();
  open.value = true;
}
function closeAll() {
  open.value = false;
}
function toggle() {
  if (open.value) closeAll();
  else openMenu();
}

function onDocClick(event) {
  if (!open.value) return;
  if (root.value && root.value.contains(event.target)) return;
  if (menu.value && menu.value.contains(event.target)) return;
  closeAll();
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('mousedown', onDocClick);
  else document.removeEventListener('mousedown', onDocClick);
});
onUnmounted(() => document.removeEventListener('mousedown', onDocClick));

function select(item) {
  if (item.disabled) return;
  if ('checked' in item) {
    const next = new Set(checked.value);
    if (next.has(item.value)) next.delete(item.value);
    else next.add(item.value);
    checked.value = next;
  } else {
    closeAll();
  }
  emit('select', item);
  if (props.onSelect) props.onSelect(item);
}

function clearAll() {
  checked.value = new Set();
  emit('clear-all');
  closeAll();
}
</script>`;
  } else if (id === 'form') {
    tpl = `
<template>
  <form class="gl-form" novalidate @submit.prevent="onSubmit">
    <!-- ${SUBS['--gl-text-strong-color'].note} / ${SUBS['--gl-text-subtle-color'].note} -->
    <div class="gl-form-group">
      <label class="gl-form-label" for="gl-field">
        {{ label }}
        <span v-if="optional" class="gl-form-optional">(optional)</span>
      </label>
      <p v-if="helper" class="gl-form-helper">{{ helper }}</p>
      <slot />
      <p v-if="error" class="gl-form-feedback gl-form-feedback--invalid" role="alert">{{ error }}</p>
    </div>
  </form>
</template>`;
    script = `
<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  helper: { type: String, default: '' },
  error: { type: String, default: null },
  optional: { type: Boolean, default: false },
});
const emit = defineEmits(['submit']);

function onSubmit(event) {
  emit('submit', event);
}
</script>`;
  } else if (id === 'alert') {
    tpl = `
<template>
  <div
    v-if="visible"
    class="gl-alert"
    :class="['gl-alert--' + variant, { 'gl-alert--sticky': sticky }]"
    :role="variant === 'danger' ? 'alert' : undefined"
  >
    <span class="gl-alert-icon" aria-hidden="true" v-html="alertIcon"></span>
    <div class="gl-alert-content">
      <h4 v-if="title" class="gl-alert-title">{{ title }}</h4>
      <div class="gl-alert-body"><slot /></div>
    </div>
    <button v-if="dismissible" type="button" class="gl-alert-close" aria-label="Close" @click="dismiss">${SVG.x}</button>
  </div>
</template>`;
    script = `
<script setup>
import { ref, computed } from 'vue';

const ALERT_ICONS = {
  info: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11.5V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
  success: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
  warning: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2L15 13.5H1L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5V10M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
  danger: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2L15 13.5H1L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5V10M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
  tip: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
};


const props = defineProps({
  variant: { type: String, default: 'info', validator: (v) => ['info', 'success', 'warning', 'danger', 'tip'].includes(v) },
  title: { type: String, default: '' },
  dismissible: { type: Boolean, default: true },
  sticky: { type: Boolean, default: false },
});
const emit = defineEmits(['dismiss']);

const visible = ref(true);

const alertIcon = computed(() => ALERT_ICONS[props.variant] || ALERT_ICONS.info);

function dismiss() {
  visible.value = false;
  emit('dismiss');
}
</script>`;
  } else {
    throw new Error('unknown component: ' + id);
  }
  const style = `<style scoped>${STYLES[id]}
</style>`;
  return `${HEADER}\n${tpl}\n${script}\n${style}\n`;
}

/* ---------- Vue 2 builders ---------- */
function sfcV2(id) {
  let tpl;
  let script;
  if (id === 'button') {
    tpl = `
<template>
  <button
    type="button"
    class="gl-button"
    :class="classes"
    :disabled="disabled"
    :aria-busy="loading ? 'true' : undefined"
    @click="onClick"
  >
    <span v-if="loading" class="gl-button-spinner" aria-hidden="true">${SVG.spinner}</span>
    <span v-if="icon" class="gl-button-glyph" aria-hidden="true">${SVG.globe}</span>
    <span class="gl-button-label"><slot /></span>
  </button>
</template>`;
    script = `
<script>
export default {
  name: 'GlButton',
  props: {
    category: { type: String, default: 'primary' },
    variant: { type: String, default: 'default' },
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    block: { type: Boolean, default: false },
  },
  computed: {
    classes() {
      return [
        'gl-button--' + this.category,
        'gl-button--variant-' + this.variant,
        'gl-button--size-' + this.size,
        { 'gl-button--block': this.block },
      ];
    },
  },
  methods: {
    onClick() {
      if (this.disabled || this.loading) return;
      this.$emit('click');
    },
  },
};
</script>`;
  } else if (id === 'input') {
    tpl = `
<template>
  <div class="gl-form-input-wrap">
    <input
      class="gl-form-input"
      :class="classes"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="state === 'invalid' ? 'true' : undefined"
      @input="onInput"
    />
    <p v-if="state === 'invalid'" class="gl-form-feedback gl-form-feedback--invalid" role="alert">
      <slot name="invalidFeedback">Invalid value.</slot>
    </p>
    <p v-else-if="state === 'valid'" class="gl-form-feedback gl-form-feedback--valid">
      <slot name="validFeedback">Looks good.</slot>
    </p>
  </div>
</template>`;
    script = `
<script>
export default {
  name: 'GlInput',
  props: {
    value: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    state: { type: String, default: null, validator: (v) => v === null || v === 'valid' || v === 'invalid' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    width: { type: String, default: null, validator: (v) => v === null || ['xs', 'sm', 'md', 'lg', 'xl'].includes(v) },
  },
  computed: {
    classes() {
      return [
        { 'is-valid': this.state === 'valid' },
        { 'is-invalid': this.state === 'invalid' },
        this.width ? 'gl-form-input--width-' + this.width : 'gl-form-input--width-null',
      ];
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>`;
  } else if (id === 'modal') {
    tpl = `
<template>
  <div v-if="visible" class="gl-modal-backdrop" @click.self="close">
    <div
      class="gl-modal"
      :class="'gl-modal--' + size"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gl-modal-title"
    >
      <header class="gl-modal-header">
        <!-- ${SUBS['--gl-modal-medium-width'].note} -->
        <h4 id="gl-modal-title" class="gl-modal-title">{{ title }}</h4>
        <button type="button" class="gl-modal-close" aria-label="Close" @click="close">${SVG.x}</button>
      </header>
      <div class="gl-modal-body"><slot /></div>
      <footer v-if="primaryAction || secondaryAction" class="gl-modal-footer">
        <button
          v-if="secondaryAction"
          type="button"
          class="gl-button gl-button--secondary"
          @click="onSecondary"
        >{{ secondaryAction.text }}</button>
        <button
          v-if="primaryAction"
          type="button"
          class="gl-button gl-button--primary"
          :class="'gl-button--variant-' + (primaryAction.variant || 'default')"
          @click="onPrimary"
        >{{ primaryAction.text }}</button>
      </footer>
    </div>
  </div>
</template>`;
    script = `
<script>
export default {
  name: 'GlModal',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
    primaryAction: { type: Object, default: () => null },
    secondaryAction: { type: Object, default: () => null },
    onClose: { type: Function, default: null },
  },
  mounted() {
    if (this.visible) document.addEventListener('keydown', this.onKeydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    close() {
      this.$emit('change', false);
      this.$emit('close');
      if (this.onClose) this.onClose();
    },
    onPrimary() {
      this.$emit('primary');
      this.close();
    },
    onSecondary() {
      this.$emit('secondary');
      this.close();
    },
    onKeydown(event) {
      if (event.key === 'Escape') this.close();
    },
  },
};
</script>`;
  } else if (id === 'table') {
    tpl = `
<template>
  <table class="gl-table">
    <thead>
      <tr>
        <th v-for="field in parsedFields" :key="field.key" scope="col">
          <button
            v-if="field.sortable"
            type="button"
            class="gl-table-sort-btn"
            :aria-sort="sortKey === field.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'"
            @click="onSort(field)"
          >
            {{ field.label }}
            <span class="gl-table-sort-icon">{{ sortKey === field.key ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}</span>
          </button>
          <template v-else>{{ field.label }}</template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td :colspan="parsedFields.length" class="gl-table-busy" aria-busy="true">
          ${SVG.spinner}<span>Loading&hellip;</span>
        </td>
      </tr>
      <tr v-else-if="rows.length === 0">
        <td :colspan="parsedFields.length" class="gl-table-empty">
          <slot name="empty">No data available.</slot>
        </td>
      </tr>
      <tr v-for="row in rows" :key="row.index" @click="$emit('row-clicked', row.row, row.index)">
        <td v-for="field in parsedFields" :key="field.key">{{ row.row[field.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>`;
    script = `
<script>
export default {
  name: 'GlTable',
  props: {
    items: { type: Array, default: () => [] },
    fields: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    sortBy: { type: String, default: null },
    sortDesc: { type: Boolean, default: false },
  },
  data() {
    return {
      sortKey: this.sortBy,
      sortOrder: this.sortDesc ? 'desc' : 'asc',
    };
  },
  computed: {
    parsedFields() {
      if (this.fields && this.fields.length) return this.fields;
      const first = this.items[0] || {};
      return Object.keys(first).map((key) => ({ key, label: key, sortable: false }));
    },
    rows() {
      const list = this.items.map((row, index) => ({ row, index }));
      if (!this.sortKey) return list;
      const key = this.sortKey;
      const order = this.sortOrder;
      return list.slice().sort((a, b) => {
        const av = a.row[key];
        const bv = b.row[key];
        let cmp = 0;
        if (av > bv) cmp = 1;
        else if (av < bv) cmp = -1;
        return order === 'desc' ? -cmp : cmp;
      });
    },
  },
  methods: {
    onSort(field) {
      if (!field.sortable) return;
      if (this.sortKey === field.key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = field.key;
        this.sortOrder = 'asc';
      }
      this.$emit('sort-changed', { sortBy: this.sortKey, sortDesc: this.sortOrder === 'desc' });
    },
  },
};
</script>`;
  } else if (id === 'tabs') {
    tpl = `
<template>
  <div>
    <div class="gl-tabs-wrapper">
      <div class="gl-tabs-nav" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          type="button"
          class="gl-tab-nav-item"
          :class="{ 'gl-tab-nav-item--active': index === activeIndex, 'gl-tab-nav-item--disabled': tab.disabled }"
          role="tab"
          :aria-selected="index === activeIndex ? 'true' : 'false'"
          :disabled="tab.disabled"
          @click="activate(index)"
        >
          {{ tab.title }}
          <span v-if="tab.count != null" class="gl-tab-count" aria-label="count">{{ tab.count }}</span>
        </button>
      </div>
    </div>
    <div class="gl-tab-content" role="tabpanel">
      <slot :name="'tab-' + activeIndex" :tab="currentTab">
        <span class="gl-tab-content-text">{{ currentContent }}</span>
      </slot>
    </div>
  </div>
</template>`;
    script = `
<script>
export default {
  name: 'GlTabs',
  props: {
    tabs: { type: Array, default: () => [] },
    active: { type: Number, default: 0 },
    onChange: { type: Function, default: null },
  },
  data() {
    return { activeIndex: this.active };
  },
  computed: {
    currentTab() {
      return this.tabs[this.activeIndex] || {};
    },
    currentContent() {
      return this.currentTab.content || '';
    },
  },
  watch: {
    active(value) {
      this.activeIndex = value;
    },
  },
  methods: {
    activate(index) {
      if (this.tabs[index] && this.tabs[index].disabled) return;
      this.activeIndex = index;
      this.$emit('input', index);
      this.$emit('change', index);
      if (this.onChange) this.onChange(index);
    },
  },
};
</script>`;
  } else if (id === 'badge') {
    tpl = `
<template>
  <component
    :is="badgeTag"
    class="gl-badge"
    :class="'gl-badge--' + variant"
    :href="href || undefined"
  >
    <span v-if="icon" class="gl-badge-icon" aria-hidden="true">${SVG.globe}</span>
    <span class="gl-badge-content"><slot /></span>
  </component>
</template>`;
    script = `
<script>
export default {
  name: 'GlBadge',
  props: {
    variant: { type: String, default: 'neutral', validator: (v) => ['neutral', 'info', 'success', 'warning', 'danger', 'tier'].includes(v) },
    icon: { type: String, default: null },
    href: { type: String, default: null },
  },
  computed: {
    badgeTag() {
      return this.href ? 'a' : 'span';
    },
  },
};
</script>`;
  } else if (id === 'toast') {
    tpl = `
<template>
  <div class="gl-toaster">
    <transition name="gl-toast">
      <div v-if="visible" class="gl-toast" role="status" aria-live="polite">
        <div class="gl-toast-body">{{ message }}</div>
        <button v-if="action" type="button" class="gl-toast-action" @click="onAction">{{ action.text }}</button>
        <button type="button" class="gl-toast-close" aria-label="Close" @click="dismiss">${SVG.x}</button>
      </div>
    </transition>
  </div>
</template>`;
    script = `
<script>
export default {
  name: 'GlToast',
  props: {
    message: { type: String, default: '' },
    action: { type: Object, default: () => null },
    autoHideDelay: { type: Number, default: 5000 },
    onDismiss: { type: Function, default: null },
  },
  data() {
    return { visible: true };
  },
  mounted() {
    this.timer = setTimeout(this.dismiss, Math.max(this.autoHideDelay, 1000));
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    dismiss() {
      clearTimeout(this.timer);
      this.visible = false;
      this.$emit('dismiss');
      if (this.onDismiss) this.onDismiss();
    },
    onAction() {
      this.$emit('action');
      if (this.action && this.action.onClick) this.action.onClick();
      this.dismiss();
    },
  },
};
</script>`;
  } else if (id === 'dropdown') {
    tpl = `
<template>
  <div ref="root" class="gl-dropdown">
    <button
      ref="trigger"
      type="button"
      class="gl-dropdown-toggle"
      :aria-haspopup="'menu'"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggle"
    >
      {{ text }}
      ${SVG.chevron}
    </button>
    <div
      v-if="open"
      ref="menu"
      class="gl-dropdown-menu"
      :style="menuStyle"
      role="menu"
      @click.stop
    >
      <template v-for="(item, index) in items" :key="index">
        <div v-if="item.divider" class="gl-dropdown-divider" role="separator"></div>
        <div v-else-if="item.header" class="gl-dropdown-header" role="presentation">{{ item.text }}</div>
        <button
          v-else
          type="button"
          class="gl-dropdown-item"
          :class="{ 'gl-dropdown-item--checked': isChecked(item) }"
          role="menuitemcheckbox"
          :aria-checked="isChecked(item) ? 'true' : 'false'"
          :disabled="item.disabled"
          @click="select(item)"
        >
          <span class="gl-dropdown-item-label">{{ item.text }}</span>
          <span v-if="isChecked(item)" class="gl-dropdown-item-check">${SVG.check}</span>
        </button>
      </template>
      <button v-if="showClearAll" type="button" class="gl-dropdown-clear-all" @click="clearAll">Clear all</button>
    </div>
  </div>
</template>`;
    script = `
<script>
export default {
  name: 'GlDropdown',
  props: {
    text: { type: String, default: '' },
    items: { type: Array, default: () => [] },
    showClearAll: { type: Boolean, default: false },
    onSelect: { type: Function, default: null },
  },
  data() {
    return {
      open: false,
      position: { top: 0, left: 0, minWidth: '12rem' },
      checked: new Set(),
    };
  },
  computed: {
    menuStyle() {
      return {
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        minWidth: this.position.minWidth,
      };
    },
  },
  mounted() {
    document.addEventListener('mousedown', this.onDocClick);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.onDocClick);
  },
  methods: {
    isChecked(item) {
      return this.checked.has(item.value);
    },
    measure() {
      if (!this.$refs.trigger) return;
      const rect = this.$refs.trigger.getBoundingClientRect();
      this.position = { top: rect.bottom, left: rect.left, minWidth: rect.width + 'px' };
    },
    openMenu() {
      this.measure();
      this.open = true;
    },
    closeAll() {
      this.open = false;
    },
    toggle() {
      if (this.open) this.closeAll();
      else this.openMenu();
    },
    onDocClick(event) {
      if (!this.open) return;
      if (this.$refs.root && this.$refs.root.contains(event.target)) return;
      if (this.$refs.menu && this.$refs.menu.contains(event.target)) return;
      this.closeAll();
    },
    select(item) {
      if (item.disabled) return;
      if ('checked' in item) {
        const next = new Set(this.checked);
        if (next.has(item.value)) next.delete(item.value);
        else next.add(item.value);
        this.checked = next;
      } else {
        this.closeAll();
      }
      this.$emit('select', item);
      if (this.onSelect) this.onSelect(item);
    },
    clearAll() {
      this.checked = new Set();
      this.$emit('clear-all');
      this.closeAll();
    },
  },
};
</script>`;
  } else if (id === 'form') {
    tpl = `
<template>
  <form class="gl-form" novalidate @submit.prevent="onSubmit">
    <!-- ${SUBS['--gl-text-strong-color'].note} / ${SUBS['--gl-text-subtle-color'].note} -->
    <div class="gl-form-group">
      <label class="gl-form-label" for="gl-field">
        {{ label }}
        <span v-if="optional" class="gl-form-optional">(optional)</span>
      </label>
      <p v-if="helper" class="gl-form-helper">{{ helper }}</p>
      <slot />
      <p v-if="error" class="gl-form-feedback gl-form-feedback--invalid" role="alert">{{ error }}</p>
    </div>
  </form>
</template>`;
    script = `
<script>
export default {
  name: 'GlForm',
  props: {
    label: { type: String, default: '' },
    helper: { type: String, default: '' },
    error: { type: String, default: null },
    optional: { type: Boolean, default: false },
  },
  methods: {
    onSubmit(event) {
      this.$emit('submit', event);
    },
  },
};
</script>`;
  } else if (id === 'alert') {
    tpl = `
<template>
  <div
    v-if="visible"
    class="gl-alert"
    :class="['gl-alert--' + variant, { 'gl-alert--sticky': sticky }]"
    :role="variant === 'danger' ? 'alert' : undefined"
  >
    <span class="gl-alert-icon" aria-hidden="true" v-html="alertIcon"></span>
    <div class="gl-alert-content">
      <h4 v-if="title" class="gl-alert-title">{{ title }}</h4>
      <div class="gl-alert-body"><slot /></div>
    </div>
    <button v-if="dismissible" type="button" class="gl-alert-close" aria-label="Close" @click="dismiss">${SVG.x}</button>
  </div>
</template>`;
    script = `
<script>
export default {
  name: 'GlAlert',
  props: {
    variant: { type: String, default: 'info', validator: (v) => ['info', 'success', 'warning', 'danger', 'tip'].includes(v) },
    title: { type: String, default: '' },
    dismissible: { type: Boolean, default: true },
    sticky: { type: Boolean, default: false },
  },
  data() {
    return { visible: true };
  },
  computed: {
    alertIcon() {
      return (
        {
          info: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11.5V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
          success: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\`,
          warning: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2L15 13.5H1L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5V10M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
          danger: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2L15 13.5H1L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5V10M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
          tip: \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`,
        }[this.variant] || \`<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11.5V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>\`
      );
    },
  },
  methods: {
    dismiss() {
      this.visible = false;
      this.$emit('dismiss');
    },
  },
};
</script>`;
  } else {
    throw new Error('unknown component: ' + id);
  }
  const style = `<style scoped>${STYLES[id]}
</style>`;
  return `${HEADER}\n${tpl}\n${script}\n${style}\n`;
}

/* ------------------------------------------------------------------ index */
function indexJs() {
  return '/* Pajamas-inspired (MIT). Vue component barrel. */\n' +
    COMPONENTS.map((id) => `export { default as ${EXPORT_NAME[id]} } from './${FILE_NAME[id]}.vue';`).join('\n') + '\n';
}

function readme(framework) {
  const api = framework === 'vue3'
    ? {
      title: 'Vue 3',
      intro: 'CombPosition API via `<script setup>` + `<style scoped>`. Floating layers (`Modal`, `Toast`, `Dropdown`) use `<Teleport to="body">`.',
    }
    : {
      title: 'Vue 2',
      intro: 'Options API (`props.data().methods.computed`) + `<style scoped>`. Floating layers use native `position: fixed` (no Teleport in Vue 2 by default).',
    };
  return [
    '# ' + api.title + ' components (.vue)',
    '',
    'Pajamas-inspired component library generated by scripts/gen-vue.js from',
    'scripts/component-spec.js + dist/css/variables.css.',
    '',
    api.intro,
    '',
    '## Import',
    '',
    '    import { GlButton, GlInput, GlAlert } from ' + (framework === 'vue3' ? "'./dist/vue3/components'" : "'./dist/vue2/components'") + ';',
    '',
    '## Components',
    '',
    '| File | Export | Props |',
    '|---|---|---|',
    ...COMPONENTS.map((id) => {
      const c = spec.components.find((x) => x.id === id);
      return '| ' + FILE_NAME[id] + '.vue | ' + EXPORT_NAME[id] + ' | ' + c.props.map((p) => p.name).join(', ') + ' |';
    }),
    '',
    '## Design tokens',
    '',
    'Every color / size / radius / font references a CSS variable from',
    'dist/css/variables.css (var(--gl-*)). Tokens from the spec that do not',
    'exist in variables.css are mapped at generation time to the closest real',
    'token; the mapping comment is inlined next to each usage:',
    '',
    ...Object.entries(SUBS).map(([k, v]) => '- ' + k + ' -> ' + v.to + ' (' + v.note + ')'),
    '',
    'Import the tokens once in your app entry:',
    '',
    "    @import '../css/variables.css';",
    '',
  ].join('\n');
}

/* ------------------------------------------------------------------ build */
function buildVue3() {
  COMPONENTS.forEach((id) => {
    writeIfChanged(path.join(VUE3_OUT, `${FILE_NAME[id]}.vue`), sfcV3(id));
  });
  writeIfChanged(path.join(VUE3_OUT, 'index.js'), indexJs());
  writeIfChanged(path.join(VUE3_OUT, 'README.md'), readme('vue3'));
}

function buildVue2() {
  COMPONENTS.forEach((id) => {
    writeIfChanged(path.join(VUE2_OUT, `${FILE_NAME[id]}.vue`), sfcV2(id));
  });
  writeIfChanged(path.join(VUE2_OUT, 'index.js'), indexJs());
  writeIfChanged(path.join(VUE2_OUT, 'README.md'), readme('vue2'));
}

/* -------------------------------------------------------------- verify */
function verify(dir, framework) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.vue') || f === 'index.js' || f === 'README.md');
  let issues = [];
  const fatal = [];

  // (b) no brand word: our filename+export names may contain "gl" but never "GitLab"/"gitlab".
  // NOTE: hard rule 4 mandates the header comment `<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->`
  // which contains the npm package id "@gitlab/ui" — that single substring is the only "gitlab" in dist.
  for (const f of files) {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    if (/\bGitLab\b|\btanuki\b/.test(src)) fatal.push(f + ': brand word found');
    for (const m of src.matchAll(/\bgitlab\b/gi)) {
      const line = src.slice(0, m.index).split('\n').length;
      if (!src.split('\n')[line - 1].trim().startsWith('<!-- Pajamas-inspired')) {
        issues.push(f + ':' + line + ': unexpected "gitlab"');
      }
    }
    // (a) sanity: only meaningful for .vue SFCs
    if (f.endsWith('.vue')) {
      const tplOpen = (src.match(/<template[\s>]/g) || []).length;
      const tplClose = (src.match(/<\/template>/g) || []).length;
      const scriptClose = (src.match(/<\/script>/g) || []).length;
      const styleClose = (src.match(/<\/style>/g) || []).length;
      if (tplOpen !== tplClose) issues.push(f + ': <template> unbalanced');
      if (!src.includes('<script') || scriptClose !== 1) issues.push(f + ': <script> missing/close missing');
      if (!src.includes('<style') || styleClose !== 1) issues.push(f + ': <style> missing/close missing');
    }
  }

  // tokens referenced must exist in variables.css or be substituted
  const cssTokens = new Set(cssText.matchAll(/--gl-[a-z0-9-]+/g).map((m) => m[0]));
  for (const f of files) {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const m of src.matchAll(/var\((--gl-[a-z0-9-]+)\)/g)) {
      if (!cssTokens.has(m[1])) issues.push(`${f}: missing token ${m[1]}`);
    }
  }

  return {
    base: dir,
    framework,
    fileCount: files.length,
    names: files.sort(),
    issues,
    fatal,
  };
}

const fs = require('fs');

/* ------------------------------------------------------------------ main */
function main() {
  const args = process.argv.slice(2);
  let do3 = false;
  let do2 = false;
  if (args.length === 0) { do3 = true; do2 = true; }
  for (const a of args) {
    if (a === 'vue3') do3 = true;
    if (a === 'vue2') do2 = true;
  }
  if (do3) buildVue3();
  if (do2) buildVue2();

  // validate token references on generated output
  const allIssues = [];
  const reports = [];
  if (do3) reports.push(verify(VUE3_OUT, 'vue3'));
  if (do2) reports.push(verify(VUE2_OUT, 'vue2'));

  reports.forEach((r) => {
    r.issues.forEach((i) => allIssues.push(`${r.framework}: ${i}`));
    r.fatal.forEach((i) => allIssues.push(`${r.framework}: ${i}`));
  });
  if (allIssues.length) {
    console.log('[gen-vue] issues:');
    allIssues.forEach((i) => console.log('  -', i));
    process.exit(1);
  }
  reports.forEach((r) => {
    console.log(`[gen-vue] ${r.framework}: ${r.fileCount} files -> ${r.base}`);
  });
  console.log('[gen-vue] OK');
}

// Only run when executed directly (also allows require() reuse in tests)
if (require.main === module) {
  main();
}

module.exports = { buildVue3, buildVue2, sfcV3, sfcV2, VUE3_OUT, VUE2_OUT };