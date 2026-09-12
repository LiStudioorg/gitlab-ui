// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const json = {
  fromAttribute: (v: string | null) => {
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },
};

const checkMark = html`
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

@customElement('gl-dropdown')
export class GlDropdown extends LitElement {
  static styles = css`
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
  `;

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
      return html`
        <button class="item" data-index=${i} data-checked=${checked ? 'true' : 'false'} @click=${this._select}>
          <span>${label}</span>
          ${checked ? checkMark : ''}
        </button>`;
    });
    return html`
      <button class="toggle" @click=${() => (this.open = !this.open)}>${this.text} <span aria-hidden="true">&#9662;</span></button>
      <div class="menu" ?hidden=${!this.open}>
        <div class="header">Options</div>
        ${items}
        ${this.showClearAll
          ? html`<div class="divider"></div><button class="clear" @click=${this._clearAll}>Clear all</button>`
          : ''}
      </div>`;
  }
}
