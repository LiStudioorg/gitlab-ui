'use strict';
/* gen-web-components.js — regenerates dist/web-components/*.js (native Web Components, ES modules).
 * Pajamas-inspired (MIT). Repeatable: run `node scripts/gen-web-components.js`. */
const path = require('path');
const { writeIfChanged, FRAMEWORKS } = require('./gen-lib.js');
const OUT = FRAMEWORKS['web-components'];

/* ---------------------------------------------------------------- button */
/* ---------------------------------------------------------------- button */
const GL_BUTTON = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: inline-flex; }
button {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
  font: inherit; font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-20); padding: var(--boot-pad, var(--gl-spacing-scale-3));
  border: 1px solid var(--boot-bd, transparent); border-radius: var(--gl-button-border-radius);
  cursor: pointer; white-space: nowrap;
  background-color: var(--boot-bg, var(--gl-button-default-primary-background-color-default));
  color: var(--boot-fg, var(--gl-button-default-primary-foreground-color-default));
  transition: box-shadow 150ms ease, background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
button:hover { background-color: var(--boot-bg-h, var(--gl-button-default-primary-background-color-hover)); color: var(--boot-fg-h, var(--gl-button-default-primary-foreground-color-hover)); border-color: var(--boot-bd-h, var(--gl-button-default-primary-border-color-hover)); }
button:active { background-color: var(--boot-bg-a, var(--gl-button-default-primary-background-color-active)); color: var(--boot-fg-a, var(--gl-button-default-primary-foreground-color-active)); border-color: var(--boot-bd-a, var(--gl-button-default-primary-border-color-active)); }
button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
:host([block]) button { width: 100%; display: flex; }
:host([size='small']) button { padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); font-size: var(--gl-font-size-sm); }
:host([loading]) button { cursor: progress; }
:host([disabled]) button { cursor: not-allowed; background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color); border-color: var(--gl-action-disabled-border-color); }
:host([variant='link']) button { background: transparent; border-color: transparent; color: var(--gl-button-link-text-color-default); border-radius: var(--gl-button-link-border-radius); text-decoration: underline; padding-left: var(--gl-spacing-scale-2); padding-right: var(--gl-spacing-scale-2); }
:host([variant='link']) button:hover { color: var(--gl-button-link-text-color-hover); }
:host([variant='link']) button:active { color: var(--gl-button-link-text-color-active); }
.gl-spin { animation: glspin 0.8s linear infinite; }
@keyframes glspin { to { transform: rotate(360deg); } }
\`;

export class GlButton extends HTMLElement {
  static get observedAttributes() { return ['category', 'variant', 'size', 'disabled', 'loading', 'block', 'icon']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  get category() { return this.getAttribute('category') || 'primary'; }
  get variant() { return this.getAttribute('variant') || 'default'; }
  get loading() { return this.hasAttribute('loading'); }
  _tokens() {
    const cat = this.category;
    const v = this.variant;
    const t = (s) => \`var(--gl-button-\${v}-\${cat}-\${s})\`;
    this.style.setProperty('--boot-bg', t('background-color-default'));
    this.style.setProperty('--boot-fg', t('foreground-color-default'));
    this.style.setProperty('--boot-bd', t('border-color-default'));
    this.style.setProperty('--boot-bg-h', t('background-color-hover'));
    this.style.setProperty('--boot-fg-h', t('foreground-color-hover'));
    this.style.setProperty('--boot-bd-h', t('border-color-hover'));
    this.style.setProperty('--boot-bg-a', t('background-color-active'));
    this.style.setProperty('--boot-fg-a', t('foreground-color-active'));
    this.style.setProperty('--boot-bd-a', t('border-color-active'));
  }
  _render() {
    this._tokens();
    const spin = \`<svg class="gl-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>\`;
    const icon = this.hasAttribute('icon') ? \`<svg class="gl-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"/></svg>\` : '';
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<button type="button" \${this.hasAttribute('disabled') ? 'disabled' : ''} aria-busy=\${this.loading ? 'true' : 'false'}>
  \${this.loading ? spin : icon}
  <slot></slot>
</button>\`;
  }
}
customElements.define('gl-button', GlButton);
`;

/* ---------------------------------------------------------------- input */
const GL_INPUT = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: block; }
input {
  width: 100%; font: inherit; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3); color: var(--gl-text-color-default);
  background-color: var(--gl-control-background-color-default);
  border: 1px solid var(--gl-control-border-color-default); border-radius: var(--gl-control-border-radius);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
input::placeholder { color: var(--gl-control-placeholder-color); }
input:hover { border-color: var(--gl-control-border-color-hover); }
input:focus-visible { outline: none; border-color: var(--gl-control-border-color-focus); box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
:host([state='invalid']) input { border-color: var(--gl-control-border-color-error); }
:host([state='valid']) input { box-shadow: inset 0 0 0 1px var(--gl-control-text-color-valid); }
:host([disabled]) input { background-color: var(--gl-control-background-color-disabled); color: var(--gl-text-color-disabled); cursor: not-allowed; }
:host([readonly]) input { background-color: var(--gl-control-background-color-readonly); }
:host([width='xs']) input { max-width: var(--gl-spacing-scale-31); }
:host([width='sm']) input { max-width: var(--gl-spacing-scale-37); }
:host([width='md']) input { max-width: var(--gl-spacing-scale-48); }
:host([width='lg']) input { max-width: var(--gl-spacing-scale-62); }
:host([width='xl']) input { max-width: var(--gl-spacing-scale-75); }
\`;

export class GlInput extends HTMLElement {
  static get observedAttributes() { return ['type', 'placeholder', 'state', 'disabled', 'readonly', 'width', 'value']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get value() { return (this._input && this._input.value) || this.getAttribute('value') || ''; }
  set value(v) {
    if (this._input) this._input.value = v;
    else this.setAttribute('value', String(v));
  }
  _render() {
    const type = this.getAttribute('type') || 'text';
    const ph = this.getAttribute('placeholder') || '';
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<input type="\${type}" placeholder="\${ph}" value="\${this.getAttribute('value') || ''}"
       \${this.hasAttribute('disabled') ? 'disabled' : ''} \${this.hasAttribute('readonly') ? 'readonly' : ''}
       aria-invalid=\${this.getAttribute('state') === 'invalid' ? 'true' : 'false'}> \`;
    this._rendered = true;
    this._input = this.shadowRoot.querySelector('input');
    this._input.addEventListener('input', () => {
      if (!this.hasAttribute('readonly')) this.setAttribute('value', this._input.value);
      this.dispatchEvent(new CustomEvent('input', { detail: { value: this._input.value }, bubbles: true, composed: true }));
    });
    this._input.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('change', { detail: { value: this._input.value }, bubbles: true, composed: true }));
    });
  }
}
customElements.define('gl-input', GlInput);
`;

/* ---------------------------------------------------------------- modal */
const GL_MODAL = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: contents; }
.backdrop {
  position: fixed; inset: 0; z-index: var(--gl-zindex-modal);
  background-color: var(--gl-color-alpha-dark-40);
  display: flex; align-items: flex-start; justify-content: center;
  padding: var(--gl-spacing-scale-8) var(--gl-spacing-scale-4);
}
:host([state='closed']) .backdrop { display: none; }
.dialog {
  background-color: var(--gl-background-color-default); border-radius: var(--gl-modal-border-radius);
  box-shadow: var(--gl-shadow-lg); width: 100%; max-width: var(--gl-modal-medium-width);
  display: flex; flex-direction: column; max-height: calc(100vh - var(--gl-spacing-scale-9));
}
:host([size='sm']) .dialog { max-width: var(--gl-spacing-scale-31); }
:host([size='lg']) .dialog { max-width: var(--gl-spacing-scale-80); }
.header { display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5) var(--gl-spacing-scale-3); }
.title { font-size: var(--gl-heading-scale-500-font-size); font-weight: var(--gl-heading-scale-500-font-weight); color: var(--gl-text-color-heading); margin: 0; }
.close { background: transparent; border: none; cursor: pointer; color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-default); display: inline-flex; }
.close:hover { background-color: var(--gl-color-alpha-dark-4); }
.body { padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); overflow: auto; color: var(--gl-text-color-default); }
.footer { display: flex; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); flex-wrap: wrap; }
@media (max-width: 576px) { .footer { flex-direction: column; } }
\`;

export class GlModal extends HTMLElement {
  static get observedAttributes() { return ['visible', 'title', 'size', 'action-primary', 'action-secondary']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._stack = 0; }
  connectedCallback() {
    document.addEventListener('keydown', this._onKey);
    this._render();
  }
  disconnectedCallback() { document.removeEventListener('keydown', this._onKey); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  _onKey = (e) => { if (e.key === 'Escape' && this.visible) this.close(); };
  get visible() { return this.hasAttribute('visible'); }
  open() { this.setAttribute('visible', ''); this._emit('open'); }
  close() { if (!this.visible) return; this.removeAttribute('visible'); this._emit('close'); }
  toggle() { this.visible ? this.close() : this.open(); }
  _emit(name) { this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true })); }
  _render() {
    const title = this.getAttribute('title') || '';
    const primary = this.getAttribute('action-primary') || '';
    const secondary = this.getAttribute('action-secondary') || '';
    const state = this.visible ? 'opened' : 'closed';
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<div class="backdrop" data-backdrop>
  <div class="dialog" role="dialog" aria-modal="true" aria-label="\${title}">
    <div class="header">
      <h3 class="title">\${title}</h3>
      <button class="close" data-close aria-label="Close"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
    <div class="body"><slot></slot></div>
    <div class="footer">
      <gl-button category="primary" variant="danger" data-primary>\${primary}</gl-button>
      <gl-button category="secondary" variant="default" data-secondary>\${secondary}</gl-button>
    </div>
  </div>
</div>\`;
    this.setAttribute('state', state);
    this._rendered = true;
    if (this.visible && this.shadowRoot.querySelector('gl-button')) {
      this.shadowRoot.querySelector('[data-backdrop]').addEventListener('click', (e) => { if (e.target === e.currentTarget) this.close(); });
      this.shadowRoot.querySelector('[data-close]').addEventListener('click', () => this.close());
      this.shadowRoot.querySelector('[data-primary]').addEventListener('click', () => { this._emit('primary'); this.close(); });
      this.shadowRoot.querySelector('[data-secondary]').addEventListener('click', () => { this._emit('secondary'); this.close(); });
    }
  }
}
customElements.define('gl-modal', GlModal);
`;

/* ---------------------------------------------------------------- table */
const GL_TABLE = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: block; }
.scroll { overflow: auto; max-height: 380px; }
.loading-bar { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-3); }
.gl-spin { animation: glspin 0.8s linear infinite; }
@keyframes glspin { to { transform: rotate(360deg); } }
table { width: 100%; border-collapse: collapse; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
th { text-align: left; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-border-color-default); position: sticky; top: 0; background-color: var(--gl-background-color-default); }
th.sortable { cursor: pointer; user-select: none; }
th.sortable:hover { color: var(--gl-text-color-strong); }
td { padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8); }
tbody tr:hover td { background-color: var(--gl-table-row-background-color-hover); }
.arrow { color: var(--gl-table-sorting-icon-color); margin-left: var(--gl-spacing-scale-2); }
.empty { text-align: center; padding: var(--gl-spacing-scale-9) var(--gl-spacing-scale-5); color: var(--gl-text-color-subtle); }
:host([loading]) table { opacity: var(--gl-opacity-7); }
\`;

export class GlTable extends HTMLElement {
  static get observedAttributes() { return ['items', 'fields', 'loading', 'sort-by', 'sort-desc']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); this.items = []; this.fields = []; }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  _json(attr, fallback) {
    const raw = this.getAttribute(attr);
    if (!raw) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }
  get loading() { return this.hasAttribute('loading'); }
  get sortBy() { return this.getAttribute('sort-by') || null; }
  get sortDesc() { return this.hasAttribute('sort-desc'); }
  _rows() {
    const items = this.items;
    if (!this.sortBy) return items;
    const arr = [...items].sort((a, b) => {
      const av = a[this.sortBy]; const bv = b[this.sortBy];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return this.sortDesc ? arr.reverse() : arr;
  }
  _render() {
    this.items = this._json('items', []);
    this.fields = this._json('fields', []);
    const head = this.fields.map((f) => {
      const arrow = this.sortBy === f.key ? \`<span class="arrow">\${this.sortDesc ? '&darr;' : '&uarr;'}</span>\` : '';
      return \`<th \${f.sortable ? 'class="sortable" data-key="\${f.key}"' : ''}>\${f.label}\${arrow}</th>\`;
    }).join('');
    const rows = this._rows().map((row) => {
      const tds = this.fields.map((f) => \`<td>\${row[f.key] !== undefined ? row[f.key] : ''}</td>\`).join('');
      return \`<tr>\${tds}</tr>\`;
    }).join('');
    const empty = rows ? '' : \`<tr><td class="empty" colspan="\${this.fields.length}">No records found.</td></tr>\`;
    const spinner = \`<svg class="gl-spin" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>\`;
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<div class="loading-bar" \${this.loading ? '' : 'hidden'}>\${spinner} Loading&hellip;</div>
<div class="scroll">
  <table>
    <thead><tr>\${head}</tr></thead>
    <tbody>\${rows}\${empty}</tbody>
  </table>
</div>\`;
    this._rendered = true;
    this.shadowRoot.querySelectorAll('th.sortable').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.key;
        const desc = this.sortBy === key ? !this.sortDesc : false;
        const dir = desc ? 'yes' : 'no';
        this.setAttribute('sort-by', key);
        if (desc) this.setAttribute('sort-desc', '');
        else this.removeAttribute('sort-desc');
        this.dispatchEvent(new CustomEvent('sortchange', { detail: { key, sortDesc: desc }, bubbles: true, composed: true }));
      });
    });
  }
}
customElements.define('gl-table', GlTable);
`;

/* ---------------------------------------------------------------- tabs */
const GL_TABS = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: block; }
.nav { display: flex; gap: var(--gl-spacing-scale-2); overflow-x: auto; border-bottom: 1px solid var(--gl-border-color-default); }
.tab { position: relative; display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base); color: var(--gl-text-color-subtle); background: none; border: none; cursor: pointer; white-space: nowrap; }
.tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
.tab:hover { color: var(--gl-text-color-strong); }
.tab:hover::after { background-color: var(--gl-border-color-strong); }
.tab[data-active='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.tab[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
.tab:disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
.badge { display: inline-flex; align-items: center; border-radius: var(--gl-border-radius-full); background-color: var(--gl-badge-neutral-background-color-default); color: var(--gl-badge-neutral-text-color-default); padding: 0 var(--gl-spacing-scale-2); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); }
.pane { padding: var(--gl-spacing-scale-5) 0; color: var(--gl-text-color-default); }
\`;

export class GlTabs extends HTMLElement {
  static get observedAttributes() { return ['tabs', 'active']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); this.tabs = []; }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get active() { return parseInt(this.getAttribute('active') || '0', 10); }
  set active(i) { this.setAttribute('active', String(i)); }
  _render() {
    let tabs = [];
    const raw = this.getAttribute('tabs');
    if (raw) { try { tabs = JSON.parse(raw); } catch (e) { tabs = []; } }
    this.tabs = tabs;
    const nav = tabs.map((t, i) => \`
      <button class="tab" data-index="\${i}" data-active="\${i === this.active ? 'true' : 'false'}" \${t.disabled ? 'disabled' : ''}>
        \${t.title}\${t.count != null ? \`<span class="badge">\${t.count}</span>\` : ''}
      </button>\`).join('');
    const pane = tabs[this.active] && tabs[this.active].content;
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<div class="nav" role="tablist">\${nav}</div>
<div class="pane" role="tabpanel">\${pane || ''}</div>\`;
    this._rendered = true;
    this.shadowRoot.querySelectorAll('.tab').forEach((b) => {
      b.addEventListener('click', () => {
        const i = Number(b.dataset.index);
        if (b.disabled) return;
        this.active = i;
        this.dispatchEvent(new CustomEvent('change', { detail: { index: i }, bubbles: true, composed: true }));
      });
    });
  }
}
customElements.define('gl-tabs', GlTabs);
`;

/* ---------------------------------------------------------------- badge */
const GL_BADGE = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: inline-flex; }
.badge {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2);
  border-radius: var(--gl-border-radius-full);
  font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-16); text-decoration: none;
  background-color: var(--boot-bg, var(--gl-badge-neutral-background-color-default));
  color: var(--boot-fg, var(--gl-badge-neutral-text-color-default));
  border: 1px solid transparent;
}
:host([href]) .badge { cursor: pointer; }
:host([href]) .badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
:host([disabled]) .badge { opacity: var(--gl-opacity-7); pointer-events: none; }
:host([variant='neutral']) { --boot-bg: var(--gl-badge-neutral-background-color-default); --boot-fg: var(--gl-badge-neutral-text-color-default); }
:host([variant='info']) { --boot-bg: var(--gl-badge-info-background-color-default); --boot-fg: var(--gl-badge-info-text-color-default); }
:host([variant='success']) { --boot-bg: var(--gl-badge-success-background-color-default); --boot-fg: var(--gl-badge-success-text-color-default); }
:host([variant='warning']) { --boot-bg: var(--gl-badge-warning-background-color-default); --boot-fg: var(--gl-badge-warning-text-color-default); }
:host([variant='danger']) { --boot-bg: var(--gl-badge-danger-background-color-default); --boot-fg: var(--gl-badge-danger-text-color-default); }
:host([variant='tier']) { --boot-bg: var(--gl-badge-tier-background-color-default); --boot-fg: var(--gl-badge-tier-text-color-default); }
:host([variant='neutral']:hover) { --boot-bg: var(--gl-badge-neutral-background-color-hover); }
.icon { display: inline-flex; }
\`;

export class GlBadge extends HTMLElement {
  static get observedAttributes() { return ['variant', 'icon', 'href', 'disabled']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get variant() { return this.getAttribute('variant') || 'neutral'; }
  _render() {
    const href = this.getAttribute('href');
    const icon = this.getAttribute('icon');
    const iconSvg = icon ? \`<span class="icon"><svg viewBox="0 0 16 16" width="14" height="14"><circle cx="8" cy="8" r="3.5" fill="currentColor"/></svg></span>\` : '';
    const inner = \`\${iconSvg}<span><slot></slot></span>\`;
    const tag = href ? \`<a class="badge" href="\${href}">\${inner}</a>\` : \`<span class="badge">\${inner}</span>\`;
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>\${tag}\`;
    this._rendered = true;
  }
}
customElements.define('gl-badge', GlBadge);
`;

/* ---------------------------------------------------------------- toast */
const GL_TOAST = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: block; position: fixed; bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: var(--gl-zindex-toast); }
.toast {
  display: flex; align-items: center; gap: var(--gl-spacing-scale-3);
  background-color: var(--gl-feedback-strong-background-color); color: var(--gl-feedback-strong-text-color);
  border-radius: var(--gl-border-radius-full); box-shadow: var(--gl-shadow-md);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base);
  max-width: 420px;
}
.msg { flex: 1; }
.action { color: var(--gl-feedback-strong-link-color); font-weight: var(--gl-font-weight-bold); background: none; border: none; cursor: pointer; }
.close { background: none; border: none; cursor: pointer; color: var(--gl-feedback-strong-text-color); display: inline-flex; padding: var(--gl-spacing-scale-1); }
:host(.leaving) .toast { opacity: 0; transform: translateY(-8px); transition: opacity 200ms ease, transform 200ms ease; }
:host([hidden]) { display: none; }
\`;

export class GlToast extends HTMLElement {
  static get observedAttributes() { return ['message', 'action-text', 'auto-hide-delay']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); this.visible = false; this._timer = 0; }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  show(delay) {
    this.hidden = false;
    this.visible = true;
    this._render();
    const ms = delay || Number(this.getAttribute('auto-hide-delay') || 5000);
    if (ms > 0) this._timer = setTimeout(() => this.hide(), ms);
  }
  hide() {
    if (this._timer) { clearTimeout(this._timer); this._timer = 0; }
    this.classList.add('leaving');
    setTimeout(() => { this.classList.remove('leaving'); this.hidden = true; this.visible = false; this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true })); }, 250);
  }
  _render() {
    const msg = this.getAttribute('message') || '';
    const action = this.getAttribute('action-text') || '';
    const close = \`<svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>\`;
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<div class="toast">
  <span class="msg">\${msg}</span>
  \${action ? \`<button class="action">\${action}</button>\` : ''}
  <button class="close" aria-label="Dismiss">\${close}</button>
</div>\`;
    this._rendered = true;
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.hide());
    const act = this.shadowRoot.querySelector('.action');
    if (act) act.addEventListener('click', () => this.dispatchEvent(new CustomEvent('action', { bubbles: true, composed: true })));
    if (!this.visible) this.hidden = true;
  }
}
customElements.define('gl-toast', GlToast);
`;

/* ------------------------------------------------------------ dropdown */
const GL_DROPDOWN = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: inline-block; position: relative; }
.toggle {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
  background-color: var(--gl-button-default-secondary-background-color-default);
  color: var(--gl-button-default-secondary-foreground-color-default);
  border: 1px solid var(--gl-button-default-secondary-border-color-default);
  border-radius: var(--gl-button-border-radius); padding: var(--gl-spacing-scale-3);
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold); cursor: pointer;
}
.toggle:hover { background-color: var(--gl-button-default-secondary-background-color-hover); }
.toggle:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.menu {
  position: absolute; top: calc(100% + var(--gl-spacing-scale-2)); left: 0; min-width: 230px;
  background-color: var(--gl-dropdown-background-color); border: 1px solid var(--gl-dropdown-border-color);
  border-radius: var(--gl-dropdown-border-radius); box-shadow: var(--gl-shadow-sm);
  padding: var(--gl-spacing-scale-2); z-index: var(--gl-zindex-dropdown);
}
.menu[hidden] { display: none; }
.header { padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); }
.item { display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3); width: 100%; text-align: left; border: none; background: none; cursor: pointer; padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-default); font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
.item:hover { background-color: var(--gl-dropdown-option-background-color-unselected-hover); }
.item[data-checked='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); background-color: var(--gl-dropdown-option-background-color-selected-default); }
.divider { height: 1px; margin: var(--gl-spacing-scale-2); background-color: var(--gl-dropdown-divider-color); }
.clear { display: block; width: 100%; text-align: left; border: none; background: none; cursor: pointer; padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); color: var(--gl-text-color-link); font-size: var(--gl-font-size-sm); }
.clear:hover { text-decoration: underline; }
\`;

export class GlDropdown extends HTMLElement {
  static get observedAttributes() { return ['text', 'items', 'show-clear-all']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); this.items = []; this.open = false; }
  connectedCallback() {
    document.addEventListener('click', this._onDoc);
    document.addEventListener('keydown', this._onKey);
    this._render();
  }
  disconnectedCallback() {
    document.removeEventListener('click', this._onDoc);
    document.removeEventListener('keydown', this._onKey);
  }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  _onDoc = (e) => { if (this.open && !this.contains(e.target)) this.close(); };
  _onKey = (e) => { if (e.key === 'Escape') this.close(); };
  openMenu() { this.open = true; this._render(); }
  close() { this.open = false; this._render(); }
  toggleMenu() { this.open = !this.open; this._render(); }
  _render() {
    const raw = this.getAttribute('items');
    if (raw) { try { this.items = JSON.parse(raw); } catch (e) { this.items = []; } }
    const text = this.getAttribute('text') || 'Select';
    const showClear = this.hasAttribute('show-clear-all') || this.getAttribute('show-clear-all') !== 'false';
    const check = \`<svg viewBox="0 0 16 16" width="16" height="16"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\`;
    const items = this.items.map((it, i) => {
      const label = typeof it === 'string' ? it : it.text;
      const checked = typeof it === 'object' && it.checked;
      return \`<button class="item" data-index="\${i}" data-checked="\${checked ? 'true' : 'false'}"><span>\${label}</span>\${checked ? check : ''}</button>\`;
    }).join('');
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<button class="toggle">\${text} <span>&#9662;</span></button>
<div class="menu" \${this.open ? '' : 'hidden'}>
  <div class="header">Options</div>
  \${items}
  \${showClear ? \`<div class="divider"></div><button class="clear">Clear all</button>\` : ''}
</div>\`;
    this._rendered = true;
    this.shadowRoot.querySelector('.toggle').addEventListener('click', () => this.toggleMenu());
    this.shadowRoot.querySelectorAll('.item').forEach((b) => {
      b.addEventListener('click', () => {
        const idx = Number(b.dataset.index);
        const row = this.items[idx];
        const detail = { index: idx, item: row, checked: b.dataset.checked !== 'true' };
        this.dispatchEvent(new CustomEvent('select', { detail, bubbles: true, composed: true }));
      });
    });
    const clear = this.shadowRoot.querySelector('.clear');
    if (clear) clear.addEventListener('click', () => this.dispatchEvent(new CustomEvent('clear-all', { bubbles: true, composed: true })));
  }
}
customElements.define('gl-dropdown', GlDropdown);
`;

/* ---------------------------------------------------------------- form */
const GL_FORM = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: block; }
form { margin: 0; }
\`;

export class GlForm extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() {
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style><form part="form"><slot></slot></form>\`;
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
      this.dispatchEvent(new CustomEvent('submit', { detail: { form: e.target }, bubbles: true, composed: true, cancelable: true }));
    });
  }
}
customElements.define('gl-form', GlForm);

const GROUP_STYLE = \`
:host { display: block; }
:host(:not(:last-child)) { margin-bottom: var(--gl-spacing-scale-5); }
.label { display: block; font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-base); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-2); }
.desc { display: block; color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-sm); margin-top: var(--gl-spacing-scale-1); }
.optional { color: var(--gl-text-color-subtle); font-weight: var(--gl-font-weight-normal); }
.feedback { font-size: var(--gl-font-size-sm); margin-top: var(--gl-spacing-scale-2); }
.feedback[data-state='invalid'] { color: var(--gl-control-text-color-error); }
.feedback[data-state='valid'] { color: var(--gl-control-text-color-valid); }
.helper { font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); margin-top: var(--gl-spacing-scale-2); }
\`;

export class GlFormGroup extends HTMLElement {
  static get observedAttributes() { return ['label', 'helper', 'error', 'optional', 'state']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get error() { return this.getAttribute('error'); }
  get state() { return this.getAttribute('state'); }
  _render() {
    const label = this.getAttribute('label') || '';
    const desc = this.getAttribute('label-description') || '';
    const helper = this.getAttribute('helper') || '';
    const optional = this.hasAttribute('optional') || this.getAttribute('optional') === 'true';
    const error = this.error;
    const state = error ? 'invalid' : this.state;
    const feedback = error ? { text: error, st: 'invalid' } : state === 'valid' ? { text: 'Looks good.', st: 'valid' } : null;
    this.shadowRoot.innerHTML = \`<style>\${GROUP_STYLE}</style>
<label class="label" part="label">\${label} \${optional ? \`<span class="optional">(optional)</span>\` : ''}
  \${desc ? \`<span class="desc">\${desc}</span>\` : ''}
</label>
<slot></slot>
\${feedback ? \`<p class="feedback" data-state="\${feedback.st}" part="feedback">\${feedback.text}</p>\` : ''}
\${helper ? \`<p class="helper">\${helper}</p>\` : ''}\`;
    this._rendered = true;
  }
}
customElements.define('gl-form-group', GlFormGroup);
`;

/* ---------------------------------------------------------------- alert */
const GL_ALERT = `// Pajamas-inspired (MIT)
const STYLE = \`
:host { display: block; }
.alert {
  display: flex; gap: var(--gl-spacing-scale-3);
  border: 1px solid var(--gl-alert-info-border-color);
  border-radius: var(--gl-alert-border-radius); padding: var(--gl-spacing-scale-4);
}
:host([variant='info']) .alert { background-color: var(--gl-alert-info-background-color); border-color: var(--gl-alert-info-border-color); }
:host([variant='info']) .icon { color: var(--gl-feedback-info-icon-color); }
:host([variant='info']) .title { color: var(--gl-alert-info-title-color); }
:host([variant='success']) .alert { background-color: var(--gl-alert-success-background-color); border-color: var(--gl-alert-success-border-color); }
:host([variant='success']) .icon { color: var(--gl-feedback-success-icon-color); }
:host([variant='success']) .title { color: var(--gl-alert-success-title-color); }
:host([variant='warning']) .alert { background-color: var(--gl-alert-warning-background-color); border-color: var(--gl-alert-warning-border-color); }
:host([variant='warning']) .icon { color: var(--gl-feedback-warning-icon-color); }
:host([variant='warning']) .title { color: var(--gl-alert-warning-title-color); }
:host([variant='danger']) .alert { background-color: var(--gl-alert-danger-background-color); border-color: var(--gl-alert-danger-border-color); }
:host([variant='danger']) .icon { color: var(--gl-feedback-danger-icon-color); }
:host([variant='danger']) .title { color: var(--gl-alert-danger-title-color); }
:host([variant='neutral']) .alert { background-color: var(--gl-alert-neutral-background-color); border-color: var(--gl-alert-neutral-border-color); }
:host([sticky]) .alert { position: sticky; top: var(--gl-spacing-scale-5); }
:host([hidden]) { display: none; }
.alert.leaving { opacity: 0; transform: translateY(-4px); transition: opacity 200ms ease, transform 200ms ease; }
.icon { display: inline-flex; flex: 0 0 auto; }
.content { flex: 1; min-width: 0; }
.title { font-weight: var(--gl-font-weight-bold); margin: 0 0 var(--gl-spacing-scale-1); }
.body { margin: 0; color: var(--gl-text-color-default); }
.dismiss { background: none; border: none; cursor: pointer; color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-1); border-radius: var(--gl-border-radius-default); align-self: flex-start; display: inline-flex; }
.dismiss:hover { background-color: var(--gl-color-alpha-dark-4); }
\`;

const ICONS_FOR = {
  info: '<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  success: '<path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  warning: '<path d="M8 2.5L14.5 13.5H1.5L8 2.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 7v3.5M8 12v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  danger: '<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  tip: '<path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
};
const ICON_PATH = '<svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">';

export class GlAlert extends HTMLElement {
  static get observedAttributes() { return ['variant', 'title', 'dismissible', 'sticky']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get variant() { return this.getAttribute('variant') || 'info'; }
  _render() {
    const variant = this.variant;
    const title = this.getAttribute('title') || '';
    const dismissible = this.getAttribute('dismissible') !== 'false';
    const iconBody = ICONS_FOR[variant] || ICONS_FOR.info;
    const close = \`<svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>\`;
    this.shadowRoot.innerHTML = \`<style>\${STYLE}</style>
<div class="alert" role="\${variant === 'danger' ? 'alert' : 'status'}">
  <span class="icon">\${ICON_PATH}\${iconBody}</svg></span>
  <div class="content">
    \${title ? \`<h3 class="title">\${title}</h3>\` : ''}
    <p class="body"><slot></slot></p>
  </div>
  \${dismissible ? \`<button class="dismiss" aria-label="Dismiss">\${close}</button>\` : ''}
</div>\`;
    this._rendered = true;
    const btn = this.shadowRoot.querySelector('.dismiss');
    if (btn) btn.addEventListener('click', () => this.dismiss());
  }
  dismiss() {
    const alert = this.shadowRoot.querySelector('.alert');
    alert.classList.add('leaving');
    setTimeout(() => {
      this.hidden = true;
      this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
    }, 220);
  }
}
customElements.define('gl-alert', GlAlert);
`;

/* ---------------------------------------------------------------- index */
const GL_INDEX = `// Pajamas-inspired (MIT). Registers every Pajamas-inspired web component.
export { GlButton } from './gl-button.js';
export { GlInput } from './gl-input.js';
export { GlModal } from './gl-modal.js';
export { GlTable } from './gl-table.js';
export { GlTabs } from './gl-tabs.js';
export { GlBadge } from './gl-badge.js';
export { GlToast } from './gl-toast.js';
export { GlDropdown } from './gl-dropdown.js';
export { GlForm, GlFormGroup } from './gl-form.js';
export { GlAlert } from './gl-alert.js';
`;

const README = `# Native Web Components (\`<gl-*\>\`)

Fourteen custom elements built on the platform APIs (custom elements + shadow
DOM + CSS custom properties). No framework, no bundler, no dependencies.

## Elements

| File | Element | Props (attributes) | Events |
|---|---|---|---|
| gl-button.js | \`<gl-button>\` | category, variant, size, disabled, loading, block, icon | click |
| gl-input.js | \`<gl-input>\` | type, placeholder, state, disabled, readonly, width, value | input, change |
| gl-modal.js | \`<gl-modal>\` | visible, title, size, action-primary, action-secondary | open, close, primary, secondary |
| gl-table.js | \`<gl-table>\` | items, fields (JSON), loading, sort-by, sort-desc | sortchange |
| gl-tabs.js | \`<gl-tabs>\` | tabs (JSON), active | change |
| gl-badge.js | \`<gl-badge>\` | variant, icon, href, disabled | — |
| gl-toast.js | \`<gl-toast>\` | message, action-text, auto-hide-delay | action, dismiss |
| gl-dropdown.js | \`<gl-dropdown>\` | text, items (JSON), show-clear-all | select, clear-all |
| gl-form.js | \`<gl-form>\` / \`<gl-form-group>\` | label, label-description, helper, error, optional, state | submit |
| gl-alert.js | \`<gl-alert>\` | variant, title, dismissible, sticky | dismiss |

## Using in any project

Host a copy of \`variables.css\` (theme tokens) and load the tag module or the
registration entrypoint:

\`\`\`html
<link rel="stylesheet" href="css/variables.css">
<script type="module">
  import './web-components/index.js';   // registers all <gl-*> elements
</script>

<gl-button variant="confirm" category="primary" @click="...">Save</gl-button>
<gl-input placeholder="Project name" width="lg" state="invalid"></gl-input>
<gl-badge variant="success">Passed</gl-badge>
\`\`\`

Styles use \`var(--gl-*)\` design tokens exclusively inside each \`:host\`
shadow root, so components adopt the active theme automatically.
`;

/* ---------------------------------------------------------------- main */
const COMPONENTS = [
  ['gl-button.js', GL_BUTTON],
  ['gl-input.js', GL_INPUT],
  ['gl-modal.js', GL_MODAL],
  ['gl-table.js', GL_TABLE],
  ['gl-tabs.js', GL_TABS],
  ['gl-badge.js', GL_BADGE],
  ['gl-toast.js', GL_TOAST],
  ['gl-dropdown.js', GL_DROPDOWN],
  ['gl-form.js', GL_FORM],
  ['gl-alert.js', GL_ALERT],
];

for (const [name, src] of COMPONENTS) {
  writeIfChanged(path.join(OUT, name), src.trim() + '\n');
}
writeIfChanged(path.join(OUT, 'index.js'), GL_INDEX);
writeIfChanged(path.join(OUT, 'README.md'), README);
console.log(`[gen-web-components] wrote ${COMPONENTS.length} modules + index.js + README.md -> ${OUT}`);