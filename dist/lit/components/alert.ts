// Pajamas-inspired (MIT)
import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const svg = (paths: string) =>
  html`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">${paths}</svg>`;
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
  static styles = css`
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
  `;

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
    return html`
      <div class="alert ${this._leaving ? 'leaving' : ''}" role=${this.variant === 'danger' ? 'alert' : 'status'}>
        <span class="icon">${ICONS[this.variant] ?? ICONS.info}</span>
        <div class="content">
          ${this.title ? html`<h3 class="title">${this.title}</h3>` : ''}
          <p class="body"><slot></slot></p>
        </div>
        ${this.dismissible
          ? html`<button class="dismiss" aria-label="Dismiss" @click=${this.dismiss}>
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>`
          : ''}
      </div>`;
  }
}
