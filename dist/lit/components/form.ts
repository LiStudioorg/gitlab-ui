// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-form')
export class GlForm extends LitElement {
  static styles = css`
    :host { display: block; }
    form { margin: 0; }
  `;

  private _submit(e: Event) {
    const ev = new CustomEvent('submit', {
      detail: { form: e.target }, bubbles: true, composed: true, cancelable: true,
    });
    this.dispatchEvent(ev);
    if (ev.defaultPrevented) e.preventDefault();
  }

  render() {
    return html`<form part="form" @submit=${this._submit}><slot></slot></form>`;
  }
}

@customElement('gl-form-group')
export class GlFormGroup extends LitElement {
  static styles = css`
    :host { display: block; }
    :host(:not(:last-child)) { margin-bottom: var(--gl-spacing-scale-5); }
    .label { display: block; font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-base); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-2); }
    .desc { display: block; color: var(--gl-text-color-subtle); font-size: var(--gl-font-size-sm); margin-top: var(--gl-spacing-scale-1); }
    .optional { color: var(--gl-text-color-subtle); font-weight: var(--gl-font-weight-normal); }
    .feedback { font-size: var(--gl-font-size-sm); margin-top: var(--gl-spacing-scale-2); }
    .feedback[data-state='invalid'] { color: var(--gl-control-text-color-error); }
    .feedback[data-state='valid'] { color: var(--gl-control-text-color-valid); }
    .helper { font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); margin-top: var(--gl-spacing-scale-2); }
  `;

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
    return html`
      <label class="label" part="label">
        ${this.label}
        ${this.optional ? html`<span class="optional">(optional)</span>` : ''}
        ${this.labelDescription ? html`<span class="desc">${this.labelDescription}</span>` : ''}
      </label>
      <slot></slot>
      ${feedback ? html`<p class="feedback" data-state="${feedback.s}" part="feedback">${feedback.text}</p>` : ''}
      ${this.helper ? html`<p class="helper">${this.helper}</p>` : ''}`;
  }
}
