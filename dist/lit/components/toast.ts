// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-toast')
export class GlToast extends LitElement {
  static styles = css`
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
  `;

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
    if (!this._visible) return html``;
    return html`
      <div class="toast ${this._leaving ? 'leaving' : ''}">
        <span class="msg">${this.message}</span>
        ${this.actionText
          ? html`<button class="action" @click=${() => this.dispatchEvent(new CustomEvent('action', { bubbles: true, composed: true }))}>${this.actionText}</button>`
          : ''}
        <button class="close" aria-label="Dismiss" @click=${this.hide}>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>`;
  }
}
