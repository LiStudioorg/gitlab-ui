// Pajamas-inspired (MIT)
const STYLE = `
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
input:focus-visible { outline: none; border-color: var(--gl-control-border-color-focus); box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
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

export class GlInput extends HTMLElement {
  static get observedAttributes() { return ['type', 'placeholder', 'state', 'disabled', 'readonly', 'width', 'value']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get value() { return (this._input && this._input.value) || this.getAttribute('value') || ''; }
  set value(v) {
    if (this._input) this._input.value = v;
    else this.setAttribute('value', String(v));
  }
  _render() {
    const type = this.getAttribute('type') || 'text';
    const ph = this.getAttribute('placeholder') || '';
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>
<input type="${type}" placeholder="${ph}" value="${this.getAttribute('value') || ''}"
       ${this.hasAttribute('disabled') ? 'disabled' : ''} ${this.hasAttribute('readonly') ? 'readonly' : ''}
       aria-invalid=${this.getAttribute('state') === 'invalid' ? 'true' : 'false'}> `;
    this._rendered = true;
    this._input = this.shadowRoot.querySelector('input');
    this._input.addEventListener('input', () => {
      if (!this.hasAttribute('readonly')) this.setAttribute('value', this._input.value);
      this.dispatchEvent(new CustomEvent('input', { detail: { value: this._input.value }, bubbles: true, composed: true }));
    });
    this._input.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('change', { detail: { value: this._input.value }, bubbles: true, composed: true }));
    });
  }
}
customElements.define('gl-input', GlInput);
