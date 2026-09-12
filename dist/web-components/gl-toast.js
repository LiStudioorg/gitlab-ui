// Pajamas-inspired (MIT)
const STYLE = `
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
`;

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
    const close = `<svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>
<div class="toast">
  <span class="msg">${msg}</span>
  ${action ? `<button class="action">${action}</button>` : ''}
  <button class="close" aria-label="Dismiss">${close}</button>
</div>`;
    this._rendered = true;
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.hide());
    const act = this.shadowRoot.querySelector('.action');
    if (act) act.addEventListener('click', () => this.dispatchEvent(new CustomEvent('action', { bubbles: true, composed: true })));
    if (!this.visible) this.hidden = true;
  }
}
customElements.define('gl-toast', GlToast);
