// Pajamas-inspired (MIT)
const STYLE = `
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
    const check = `<svg viewBox="0 0 16 16" width="16" height="16"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const items = this.items.map((it, i) => {
      const label = typeof it === 'string' ? it : it.text;
      const checked = typeof it === 'object' && it.checked;
      return `<button class="item" data-index="${i}" data-checked="${checked ? 'true' : 'false'}"><span>${label}</span>${checked ? check : ''}</button>`;
    }).join('');
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>
<button class="toggle">${text} <span>&#9662;</span></button>
<div class="menu" ${this.open ? '' : 'hidden'}>
  <div class="header">Options</div>
  ${items}
  ${showClear ? `<div class="divider"></div><button class="clear">Clear all</button>` : ''}
</div>`;
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
