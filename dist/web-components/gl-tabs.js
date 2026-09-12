// Pajamas-inspired (MIT)
const STYLE = `
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
`;

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
    const nav = tabs.map((t, i) => `
      <button class="tab" data-index="${i}" data-active="${i === this.active ? 'true' : 'false'}" ${t.disabled ? 'disabled' : ''}>
        ${t.title}${t.count != null ? `<span class="badge">${t.count}</span>` : ''}
      </button>`).join('');
    const pane = tabs[this.active] && tabs[this.active].content;
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>
<div class="nav" role="tablist">${nav}</div>
<div class="pane" role="tabpanel">${pane || ''}</div>`;
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
