// Pajamas-inspired (MIT)
const STYLE = `
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
`;

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
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>
<div class="backdrop" data-backdrop>
  <div class="dialog" role="dialog" aria-modal="true" aria-label="${title}">
    <div class="header">
      <h3 class="title">${title}</h3>
      <button class="close" data-close aria-label="Close"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    </div>
    <div class="body"><slot></slot></div>
    <div class="footer">
      <gl-button category="primary" variant="danger" data-primary>${primary}</gl-button>
      <gl-button category="secondary" variant="default" data-secondary>${secondary}</gl-button>
    </div>
  </div>
</div>`;
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
