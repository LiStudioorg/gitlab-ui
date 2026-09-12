'use strict';
/* gen-lit.js — regenerates dist/lit/components/*.ts (Lit elements, TypeScript).
 * Pajamas-inspired (MIT). Repeatable: run `node scripts/gen-lit.js`. */
const path = require('path');
const { writeIfChanged, FRAMEWORKS } = require('./gen-lib.js');
const OUT = FRAMEWORKS.lit;

/* ---------------------------------------------------------------- Button */
const LIT_BUTTON = `// Pajamas-inspired (MIT)
import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const SPINNER = html\`
  <svg class="spinner" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/>
    <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>\`;

const iconSlot = html\`<span id="icon"><slot name="icon"></slot></span>\`;

function token(kind: string, cat: string, v: string, suf = '') {
  return \`var(--gl-button-default-\${cat}-\${kind}-\${v}\${suf ? '-' + suf : ''})\`;
}
const row = (pair: string) => {
  const [cat, v] = pair.split(':');
  return {
    bg: token('background-color', cat, v),
    fg: token('foreground-color', cat, v),
    bc: token('border-color', cat, v),
    hbg: token('background-color', cat, v, 'hover'),
    hfg: token('foreground-color', cat, v, 'hover'),
    hbc: token('border-color', cat, v, 'hover'),
  };
};
const TOKENS: Record<string, { bg: string; fg: string; bc: string; hbg: string; hfg: string; hbc: string } | null> = {
  'primary:default': row('primary:default'),
  'primary:confirm': row('primary:confirm'),
  'primary:danger': row('primary:danger'),
  'secondary:default': row('secondary:default'),
  'secondary:confirm': row('secondary:confirm'),
  'secondary:danger': row('secondary:danger'),
  'tertiary:default': row('tertiary:default'),
  'link:default': null,
};

type Category = 'primary' | 'secondary' | 'tertiary';
type Variant = 'default' | 'confirm' | 'danger' | 'link';

@customElement('gl-button')
export class GlButton extends LitElement {
  static styles = css\`
    :host { display: inline-flex; }
    :host([block]) { display: flex; }
    :host([size='small']) { font-size: var(--gl-font-size-sm); }
    button {
      display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
      border: 1px solid var(--bc); border-radius: var(--gl-button-border-radius);
      background-color: var(--bg); color: var(--fg);
      font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-base);
      padding: var(--gl-spacing-scale-4); min-width: var(--gl-spacing-scale-20); cursor: pointer;
    }
    button:hover { background-color: var(--hbg); color: var(--hfg); border-color: var(--hbc); }
    button:active { transform: translateY(1px); }
    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
    }
    button:disabled {
      background-color: var(--gl-action-disabled-background-color);
      color: var(--gl-action-disabled-foreground-color);
      border-color: var(--gl-action-disabled-background-color);
      cursor: not-allowed;
    }
    :host([size='small']) button { padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); min-width: 0; font-size: var(--gl-font-size-sm); }
    :host([block]) button { width: 100%; }
    :host([category='tertiary']) button { background-color: transparent; border-color: transparent; outline: none; }
    :host([category='link']) button {
      border: none; border-radius: 0; background-color: transparent; min-width: 0;
      padding: 0; color: var(--gl-link-foreground-color); font-weight: var(--gl-font-weight-normal);
    }
    :host([category='link']) button:hover { text-decoration: underline; background-color: transparent; }
    .spinner { animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    #icon { display: inline-flex; }
  \`;

  @property({ reflect: true }) category: Category = 'primary';
  @property({ reflect: true }) variant: Variant = 'default';
  @property({ reflect: true }) size: 'small' | 'medium' = 'medium';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) block = false;
  @property({ reflect: true }) icon = '';

  protected updated() {
    const t = TOKENS[\`\${this.category}:\${this.variant}\`] ?? TOKENS['primary:default']!;
    for (const [prop, val] of Object.entries(t)) this.style.setProperty('--' + prop, val);
  }

  render() {
    return html\`
      <button type="button" ?disabled=\${this.disabled || this.loading} aria-busy=\${this.loading}>
        \${this.loading ? SPINNER : (this.icon ? iconSlot : '')}
        <span><slot></slot></span>
      </button>\`;
  }
}
`;

/* ---------------------------------------------------------------- Input */
const LIT_INPUT = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-input')
export class GlInput extends LitElement {
  static styles = css\`
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
    input:focus-visible {
      outline: none; border-color: var(--gl-control-border-color-focus);
      box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
    }
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

  @property({ reflect: true }) type = 'text';
  @property() placeholder = '';
  @property({ reflect: true }) state: '' | 'invalid' | 'valid' = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ reflect: true }) width: '' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = '';
  @property() value = '';

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }
  private _onChange() {
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  render() {
    return html\`
      <input type="\${this.type}" placeholder="\${this.placeholder}" .value=\${this.value}
             ?disabled=\${this.disabled} ?readonly=\${this.readonly}
             aria-invalid=\${this.state === 'invalid'}
             @input=\${this._onInput} @change=\${this._onChange}> \`;
  }
}
`;

/* ---------------------------------------------------------------- Modal */
const LIT_MODAL = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-modal')
export class GlModal extends LitElement {
  static styles = css\`
    :host { display: contents; }
    .backdrop {
      position: fixed; inset: 0; z-index: var(--gl-zindex-modal);
      background-color: var(--gl-color-alpha-dark-40);
      display: flex; align-items: flex-start; justify-content: center;
      padding: var(--gl-spacing-scale-8) var(--gl-spacing-scale-4);
    }
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

  @property({ type: Boolean, reflect: true }) visible = false;
  @property({ reflect: true }) title = '';
  @property({ reflect: true }) size: '' | 'sm' | 'lg' = '';
  @property({ attribute: 'action-primary', reflect: true }) actionPrimary = '';
  @property({ attribute: 'action-secondary', reflect: true }) actionSecondary = '';

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKey);
  }
  private _onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') this.close(); };
  open() {
    this.visible = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }
  close() {
    this.visible = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }
  toggle() { this.visible ? this.close() : this.open(); }

  render() {
    if (!this.visible) return html\`\`;
    return html\`
      <div class="backdrop" @click=\${(e: Event) => e.target === e.currentTarget && this.close()}>
        <div class="dialog" role="dialog" aria-modal="true" aria-label=\${this.title}>
          <div class="header">
            <h3 class="title">\${this.title}</h3>
            <button class="close" aria-label="Close" @click=\${this.close}>
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="body"><slot></slot></div>
          <div class="footer">
            \${this.actionPrimary
              ? html\`<gl-button category="primary" variant="danger" @click=\${() => { this.dispatchEvent(new CustomEvent('primary', { bubbles: true, composed: true })); this.close(); }}>\${this.actionPrimary}</gl-button>\`
              : ''}
            \${this.actionSecondary
              ? html\`<gl-button category="secondary" variant="default" @click=\${() => { this.dispatchEvent(new CustomEvent('secondary', { bubbles: true, composed: true })); this.close(); }}>\${this.actionSecondary}</gl-button>\`
              : ''}
          </div>
        </div>
      </div>\`;
  }
}
`;

/* ---------------------------------------------------------------- Table */
const LIT_TABLE = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const json = {
  fromAttribute: (v: string | null) => {
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },
};

@customElement('gl-table')
export class GlTable extends LitElement {
  static styles = css\`
    :host { display: block; }
    .scroll { overflow: auto; max-height: 380px; }
    .loading-bar { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-3); }
    .spinner { animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
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

  @property({ converter: json }) items: Record<string, unknown>[] = [];
  @property({ converter: json }) fields: { key: string; label: string; sortable?: boolean }[] = [];
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ attribute: 'sort-by', reflect: true }) sortBy: string | null = null;
  @property({ type: Boolean, attribute: 'sort-desc', reflect: true }) sortDesc = false;

  private get _rows() {
    const items = this.items;
    if (!this.sortBy) return items;
    const arr = [...items].sort((a, b) => {
      const av: any = a[this.sortBy!]; const bv: any = b[this.sortBy!];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return this.sortDesc ? arr.reverse() : arr;
  }
  private _sort(key: string) {
    if (this.sortBy === key) this.sortDesc = !this.sortDesc;
    else { this.sortBy = key; this.sortDesc = false; }
    this.dispatchEvent(new CustomEvent('sortchange', { detail: { key, sortDesc: this.sortDesc }, bubbles: true, composed: true }));
  }

  render() {
    const head = this.fields.map((f) => html\`
      <th class=\${f.sortable ? 'sortable' : ''} @click=\${() => f.sortable && this.sortBy !== f.key && this._sort(f.key)}>
        \${f.label}
        \${this.sortBy === f.key
          ? html\`<span class="arrow">\${this.sortDesc ? '\\u2193' : '\\u2191'}</span>\`
          : ''}
      </th>\`);
    const rows = this._rows.map((row) => html\`
      <tr>\${this.fields.map((f) => html\`<td>\${row[f.key] ?? ''}</td>\`)}</tr>\`);
    const body = rows.length
      ? rows
      : html\`<tr><td class="empty" colspan=\${this.fields.length}>No records found.</td></tr>\`;
    return html\`
      <div class="loading-bar" ?hidden=\${!this.loading}>
        <svg class="spinner" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/>
          <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Loading&hellip;
      </div>
      <div class="scroll"><table><thead><tr>\${head}</tr></thead><tbody>\${body}</tbody></table></div>\`;
  }
}
`;

/* ---------------------------------------------------------------- Tabs */
const LIT_TABS = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const json = {
  fromAttribute: (v: string | null) => {
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },
};

interface TabMeta { title: string; count?: number; disabled?: boolean; content?: string }

@customElement('gl-tabs')
export class GlTabs extends LitElement {
  static styles = css\`
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

  @property({ converter: json }) tabs: TabMeta[] = [];
  @property({ type: Number, reflect: true }) active = 0;

  private _select(e: Event) {
    const i = Number((e.currentTarget as HTMLButtonElement).dataset.index);
    if (this.tabs[i]?.disabled) return;
    this.active = i;
    this.dispatchEvent(new CustomEvent('change', { detail: { index: i }, bubbles: true, composed: true }));
  }

  render() {
    const nav = this.tabs.map((t, i) => html\`
      <button class="tab" data-index=\${i} data-active=\${i === this.active ? 'true' : 'false'} ?disabled=\${t.disabled} @click=\${this._select}>
        \${t.title}
        \${t.count != null ? html\`<span class="badge">\${t.count}</span>\` : ''}
      </button>\`);
    const pane = this.tabs[this.active]?.content;
    return html\`
      <div class="nav" role="tablist">\${nav}</div>
      <div class="pane" role="tabpanel">\${pane ?? ''}</div>\`;
  }
}
`;

/* ---------------------------------------------------------------- Badge */
const LIT_BADGE = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Variant = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';

@customElement('gl-badge')
export class GlBadge extends LitElement {
  static styles = css\`
    :host { display: inline-flex; --boot-bg: var(--gl-badge-neutral-background-color-default); --boot-fg: var(--gl-badge-neutral-text-color-default); }
    :host([variant='info']) { --boot-bg: var(--gl-badge-info-background-color-default); --boot-fg: var(--gl-badge-info-text-color-default); }
    :host([variant='success']) { --boot-bg: var(--gl-badge-success-background-color-default); --boot-fg: var(--gl-badge-success-text-color-default); }
    :host([variant='warning']) { --boot-bg: var(--gl-badge-warning-background-color-default); --boot-fg: var(--gl-badge-warning-text-color-default); }
    :host([variant='danger']) { --boot-bg: var(--gl-badge-danger-background-color-default); --boot-fg: var(--gl-badge-danger-text-color-default); }
    :host([variant='tier']) { --boot-bg: var(--gl-badge-tier-background-color-default); --boot-fg: var(--gl-badge-tier-text-color-default); }
    :host(:hover) { --boot-bg: var(--gl-badge-neutral-background-color-hover); }
    .badge {
      display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
      padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2);
      border-radius: var(--gl-border-radius-full);
      font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold);
      line-height: var(--gl-line-height-16); text-decoration: none;
      background-color: var(--boot-bg); color: var(--boot-fg);
    }
    :host([href]) .badge { cursor: pointer; }
    :host([href]) .badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
    :host([disabled]) .badge { opacity: var(--gl-opacity-7); pointer-events: none; }
    .icon { display: inline-flex; }
  \`;

  @property({ reflect: true }) variant: Variant = 'neutral';
  @property({ reflect: true }) icon = '';
  @property({ reflect: true }) href = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    const iconSvg = this.icon
      ? html\`<span class="icon"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"/></svg></span>\`
      : '';
    const inner = html\`\${iconSvg}<span><slot></slot></span>\`;
    return this.href
      ? html\`<a class="badge" href="\${this.href}">\${inner}</a>\`
      : html\`<span class="badge">\${inner}</span>\`;
  }
}
`;

/* ---------------------------------------------------------------- Toast */
const LIT_TOAST = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-toast')
export class GlToast extends LitElement {
  static styles = css\`
    :host { display: block; position: fixed; bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: var(--gl-zindex-toast); }
    .toast {
      display: flex; align-items: center; gap: var(--gl-spacing-scale-3);
      background-color: var(--gl-feedback-strong-background-color); color: var(--gl-feedback-strong-text-color);
      border-radius: var(--gl-border-radius-full); box-shadow: var(--gl-shadow-md);
      padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base);
      max-width: 420px;
      transition: opacity 200ms ease, transform 200ms ease;
    }
    .toast.leaving { opacity: 0; transform: translateY(-8px); }
    :host([hidden]) { display: none; }
    .msg { flex: 1; }
    .action { color: var(--gl-feedback-strong-link-color); font-weight: var(--gl-font-weight-bold); background: none; border: none; cursor: pointer; }
    .close { background: none; border: none; cursor: pointer; color: var(--gl-feedback-strong-text-color); display: inline-flex; padding: var(--gl-spacing-scale-1); }
  \`;

  @property({ reflect: true }) message = '';
  @property({ attribute: 'action-text', reflect: true }) actionText = '';
  @property({ type: Number, attribute: 'auto-hide-delay' }) autoHideDelay = 5000;

  private _visible = false;
  private _leaving = false;
  private _timer = 0;

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this._timer);
  }

  show(delay?: number) {
    this._visible = true;
    this._leaving = false;
    const ms = delay ?? this.autoHideDelay;
    if (ms > 0) this._timer = window.setTimeout(() => this.hide(), ms);
    this.requestUpdate();
  }
  hide() {
    window.clearTimeout(this._timer);
    this._leaving = true;
    window.setTimeout(() => {
      this._visible = false;
      this._leaving = false;
      this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
      this.requestUpdate();
    }, 220);
    this.requestUpdate();
  }

  render() {
    if (!this._visible) return html\`\`;
    return html\`
      <div class="toast \${this._leaving ? 'leaving' : ''}">
        <span class="msg">\${this.message}</span>
        \${this.actionText
          ? html\`<button class="action" @click=\${() => this.dispatchEvent(new CustomEvent('action', { bubbles: true, composed: true }))}>\${this.actionText}</button>\`
          : ''}
        <button class="close" aria-label="Dismiss" @click=\${this.hide}>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>\`;
  }
}
`;

/* ------------------------------------------------------------ Dropdown */
const LIT_DROPDOWN = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const json = {
  fromAttribute: (v: string | null) => {
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },
};

const checkMark = html\`
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\`;

@customElement('gl-dropdown')
export class GlDropdown extends LitElement {
  static styles = css\`
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

  @property({ reflect: true }) text = 'Select';
  @property({ converter: json }) items: (string | { text: string; checked?: boolean })[] = [];
  @property({ type: Boolean, attribute: 'show-clear-all' }) showClearAll = true;

  private open = false;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDoc);
    document.addEventListener('keydown', this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDoc);
    document.removeEventListener('keydown', this._onKey);
  }
  private _onDoc = (e: Event) => { if (this.open && !this.contains(e.target as Node)) this.open = false; };
  private _onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') this.open = false; };

  private _select(e: Event) {
    const btn = e.currentTarget as HTMLButtonElement;
    const i = Number(btn.dataset.index);
    this.dispatchEvent(new CustomEvent('select', {
      detail: { index: i, item: this.items[i], checked: btn.dataset.checked !== 'true' },
      bubbles: true, composed: true,
    }));
  }
  private _clearAll() {
    this.dispatchEvent(new CustomEvent('clear-all', { bubbles: true, composed: true }));
  }

  render() {
    const items = this.items.map((it, i) => {
      const sm = typeof it === 'string';
      const label = sm ? it : it.text;
      const checked = !sm && it.checked;
      return html\`
        <button class="item" data-index=\${i} data-checked=\${checked ? 'true' : 'false'} @click=\${this._select}>
          <span>\${label}</span>
          \${checked ? checkMark : ''}
        </button>\`;
    });
    return html\`
      <button class="toggle" @click=\${() => (this.open = !this.open)}>\${this.text} <span aria-hidden="true">&#9662;</span></button>
      <div class="menu" ?hidden=\${!this.open}>
        <div class="header">Options</div>
        \${items}
        \${this.showClearAll
          ? html\`<div class="divider"></div><button class="clear" @click=\${this._clearAll}>Clear all</button>\`
          : ''}
      </div>\`;
  }
}
`;

/* ---------------------------------------------------------------- Form */
const LIT_FORM = `// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-form')
export class GlForm extends LitElement {
  static styles = css\`
    :host { display: block; }
    form { margin: 0; }
  \`;

  private _submit(e: Event) {
    const ev = new CustomEvent('submit', {
      detail: { form: e.target }, bubbles: true, composed: true, cancelable: true,
    });
    this.dispatchEvent(ev);
    if (ev.defaultPrevented) e.preventDefault();
  }

  render() {
    return html\`<form part="form" @submit=\${this._submit}><slot></slot></form>\`;
  }
}

@customElement('gl-form-group')
export class GlFormGroup extends LitElement {
  static styles = css\`
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

  @property({ reflect: true }) label = '';
  @property({ attribute: 'label-description' }) labelDescription = '';
  @property({ reflect: true }) helper = '';
  @property({ reflect: true }) error: string | null = null;
  @property({ type: Boolean, reflect: true }) optional = false;
  @property({ reflect: true }) state: '' | 'invalid' | 'valid' = '';

  render() {
    const state = this.error ? 'invalid' : this.state;
    const feedback = this.error
      ? { text: this.error, s: 'invalid' }
      : state === 'valid'
        ? { text: 'Looks good.', s: 'valid' }
        : null;
    return html\`
      <label class="label" part="label">
        \${this.label}
        \${this.optional ? html\`<span class="optional">(optional)</span>\` : ''}
        \${this.labelDescription ? html\`<span class="desc">\${this.labelDescription}</span>\` : ''}
      </label>
      <slot></slot>
      \${feedback ? html\`<p class="feedback" data-state="\${feedback.s}" part="feedback">\${feedback.text}</p>\` : ''}
      \${this.helper ? html\`<p class="helper">\${this.helper}</p>\` : ''}\`;
  }
}
`;

/* ---------------------------------------------------------------- Alert */
const LIT_ALERT = `// Pajamas-inspired (MIT)
import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const svg = (paths: string) =>
  html\`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">\${paths}</svg>\`;
const ICONS: Record<string, TemplateResult> = {
  info: svg('<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  success: svg('<path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
  warning: svg('<path d="M8 2.5L14.5 13.5H1.5L8 2.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 7v3.5M8 12v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  danger: svg('<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  tip: svg('<path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
};

type Variant = 'info' | 'success' | 'warning' | 'danger' | 'tip' | 'neutral';

@customElement('gl-alert')
export class GlAlert extends LitElement {
  static styles = css\`
    :host { display: block; }
    .alert {
      display: flex; gap: var(--gl-spacing-scale-3);
      border: 1px solid var(--gl-alert-info-border-color);
      border-radius: var(--gl-alert-border-radius); padding: var(--gl-spacing-scale-4);
      transition: opacity 200ms ease, transform 200ms ease;
    }
    .alert.leaving { opacity: 0; transform: translateY(-4px); }
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
    .icon { display: inline-flex; flex: 0 0 auto; }
    .content { flex: 1; min-width: 0; }
    .title { font-weight: var(--gl-font-weight-bold); margin: 0 0 var(--gl-spacing-scale-1); }
    .body { margin: 0; color: var(--gl-text-color-default); }
    .dismiss { background: none; border: none; cursor: pointer; color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-1); border-radius: var(--gl-border-radius-default); align-self: flex-start; display: inline-flex; }
    .dismiss:hover { background-color: var(--gl-color-alpha-dark-4); }
  \`;

  @property({ reflect: true }) variant: Variant = 'info';
  @property({ reflect: true }) title = '';
  @property({ type: Boolean, reflect: true }) dismissible = true;
  @property({ type: Boolean, reflect: true }) sticky = false;

  private _leaving = false;

  dismiss() {
    this._leaving = true;
    window.setTimeout(() => {
      this._leaving = false;
      this.style.display = 'none';
      this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
      this.requestUpdate();
    }, 220);
    this.requestUpdate();
  }

  render() {
    return html\`
      <div class="alert \${this._leaving ? 'leaving' : ''}" role=\${this.variant === 'danger' ? 'alert' : 'status'}>
        <span class="icon">\${ICONS[this.variant] ?? ICONS.info}</span>
        <div class="content">
          \${this.title ? html\`<h3 class="title">\${this.title}</h3>\` : ''}
          <p class="body"><slot></slot></p>
        </div>
        \${this.dismissible
          ? html\`<button class="dismiss" aria-label="Dismiss" @click=\${this.dismiss}>
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>\`
          : ''}
      </div>\`;
  }
}
`;

/* ---------------------------------------------------------------- index */
const LIT_INDEX = `// Pajamas-inspired (MIT). Importing this module registers every element.
export { GlButton } from './button.js';
export { GlInput } from './input.js';
export { GlModal } from './modal.js';
export { GlTable } from './table.js';
export { GlTabs } from './tabs.js';
export { GlBadge } from './badge.js';
export { GlToast } from './toast.js';
export { GlDropdown } from './dropdown.js';
export { GlForm, GlFormGroup } from './form.js';
export { GlAlert } from './alert.js';
`;

const LIT_README = `# Lit elements (\`<gl-*>\`, TypeScript)

Ten Lit 3 components, one file each, rendered from \`var(--gl-*)\` design
tokens. Same native custom elements and API surface as the vanilla
\`dist/web-components\` build.

## Element map

\`\`\`
button.ts  <gl-button>       category | variant | size | disabled | loading | block | icon
input.ts   <gl-input>        type | placeholder | state | disabled | readonly | width | value
modal.ts   <gl-modal>        visible | title | size | action-primary | action-secondary
table.ts   <gl-table>        items (JSON) | fields (JSON) | loading | sort-by | sort-desc
tabs.ts    <gl-tabs>         tabs (JSON) | active
badge.ts   <gl-badge>        variant | icon | href | disabled
toast.ts   <gl-toast>        message | action-text | auto-hide-delay
dropdown.ts <gl-dropdown>    text | items (JSON) | show-clear-all
form.ts    <gl-form>         native <form> wrapper, emits 'submit'
           <gl-form-group>   label | label-description | helper | error | optional | state
alert.ts   <gl-alert>        variant | title | dismissible | sticky
\`\`\`

## Project setup

\`\`\`bash
npm i lit typescript
npx tsc --noEmit   # type-check only; this folder is meant as drop-in source
\`\`\`

Recommended \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["components/*.ts"]
}
\`\`\`

## Usage

\`\`\`html
<link rel="stylesheet" href="css/variables.css">
<script type="module" src="components/index.js"></script>

<gl-button variant="confirm" category="primary">Save</gl-button>
<gl-input placeholder="Project name" width="lg" state="invalid"></gl-input>
<gl-alert variant="success" title="Merged">See the diff below.</gl-alert>
\`\`\`
`;

/* ---------------------------------------------------------------- main */
const LIT_FILES = [
  ['button.ts', LIT_BUTTON],
  ['input.ts', LIT_INPUT],
  ['modal.ts', LIT_MODAL],
  ['table.ts', LIT_TABLE],
  ['tabs.ts', LIT_TABS],
  ['badge.ts', LIT_BADGE],
  ['toast.ts', LIT_TOAST],
  ['dropdown.ts', LIT_DROPDOWN],
  ['form.ts', LIT_FORM],
  ['alert.ts', LIT_ALERT],
];

for (const [name, src] of LIT_FILES) {
  writeIfChanged(path.join(OUT, name), src.trim() + '\n');
}
writeIfChanged(path.join(OUT, 'index.ts'), LIT_INDEX);
writeIfChanged(path.join(OUT, 'README.md'), LIT_README);
console.log(`[gen-lit] wrote ${LIT_FILES.length} modules + index.ts + README.md -> ${OUT}`);