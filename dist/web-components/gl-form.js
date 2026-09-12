// Pajamas-inspired (MIT)
const STYLE = `
:host { display: block; }
form { margin: 0; }
`;

export class GlForm extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${STYLE}</style><form part="form"><slot></slot></form>`;
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
      this.dispatchEvent(new CustomEvent('submit', { detail: { form: e.target }, bubbles: true, composed: true, cancelable: true }));
    });
  }
}
customElements.define('gl-form', GlForm);

const GROUP_STYLE = `
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

export class GlFormGroup extends HTMLElement {
  static get observedAttributes() { return ['label', 'helper', 'error', 'optional', 'state']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get error() { return this.getAttribute('error'); }
  get state() { return this.getAttribute('state'); }
  _render() {
    const label = this.getAttribute('label') || '';
    const desc = this.getAttribute('label-description') || '';
    const helper = this.getAttribute('helper') || '';
    const optional = this.hasAttribute('optional') || this.getAttribute('optional') === 'true';
    const error = this.error;
    const state = error ? 'invalid' : this.state;
    const feedback = error ? { text: error, st: 'invalid' } : state === 'valid' ? { text: 'Looks good.', st: 'valid' } : null;
    this.shadowRoot.innerHTML = `<style>${GROUP_STYLE}</style>
<label class="label" part="label">${label} ${optional ? `<span class="optional">(optional)</span>` : ''}
  ${desc ? `<span class="desc">${desc}</span>` : ''}
</label>
<slot></slot>
${feedback ? `<p class="feedback" data-state="${feedback.st}" part="feedback">${feedback.text}</p>` : ''}
${helper ? `<p class="helper">${helper}</p>` : ''}`;
    this._rendered = true;
  }
}
customElements.define('gl-form-group', GlFormGroup);
