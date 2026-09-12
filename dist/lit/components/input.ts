// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gl-input')
export class GlInput extends LitElement {
  static styles = css`
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
  `;

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
    return html`
      <input type="${this.type}" placeholder="${this.placeholder}" .value=${this.value}
             ?disabled=${this.disabled} ?readonly=${this.readonly}
             aria-invalid=${this.state === 'invalid'}
             @input=${this._onInput} @change=${this._onChange}> `;
  }
}
