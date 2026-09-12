// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-modal')
export class GlModal extends LitElement {
  static styles = css`
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
  `;

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
    if (!this.visible) return html``;
    return html`
      <div class="backdrop" @click=${(e: Event) => e.target === e.currentTarget && this.close()}>
        <div class="dialog" role="dialog" aria-modal="true" aria-label=${this.title}>
          <div class="header">
            <h3 class="title">${this.title}</h3>
            <button class="close" aria-label="Close" @click=${this.close}>
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="body"><slot></slot></div>
          <div class="footer">
            ${this.actionPrimary
              ? html`<gl-button category="primary" variant="danger" @click=${() => { this.dispatchEvent(new CustomEvent('primary', { bubbles: true, composed: true })); this.close(); }}>${this.actionPrimary}</gl-button>`
              : ''}
            ${this.actionSecondary
              ? html`<gl-button category="secondary" variant="default" @click=${() => { this.dispatchEvent(new CustomEvent('secondary', { bubbles: true, composed: true })); this.close(); }}>${this.actionSecondary}</gl-button>`
              : ''}
          </div>
        </div>
      </div>`;
  }
}
