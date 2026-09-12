// Pajamas-inspired (MIT)
const STYLE = `
:host { display: inline-flex; }
button {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
  font: inherit; font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-20); padding: var(--boot-pad, var(--gl-spacing-scale-3));
  border: 1px solid var(--boot-bd, transparent); border-radius: var(--gl-button-border-radius);
  cursor: pointer; white-space: nowrap;
  background-color: var(--boot-bg, var(--gl-button-default-primary-background-color-default));
  color: var(--boot-fg, var(--gl-button-default-primary-foreground-color-default));
  transition: box-shadow 150ms ease, background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
button:hover { background-color: var(--boot-bg-h, var(--gl-button-default-primary-background-color-hover)); color: var(--boot-fg-h, var(--gl-button-default-primary-foreground-color-hover)); border-color: var(--boot-bd-h, var(--gl-button-default-primary-border-color-hover)); }
button:active { background-color: var(--boot-bg-a, var(--gl-button-default-primary-background-color-active)); color: var(--boot-fg-a, var(--gl-button-default-primary-foreground-color-active)); border-color: var(--boot-bd-a, var(--gl-button-default-primary-border-color-active)); }
button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
:host([block]) button { width: 100%; display: flex; }
:host([size='small']) button { padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); font-size: var(--gl-font-size-sm); }
:host([loading]) button { cursor: progress; }
:host([disabled]) button { cursor: not-allowed; background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color); border-color: var(--gl-action-disabled-border-color); }
:host([variant='link']) button { background: transparent; border-color: transparent; color: var(--gl-button-link-text-color-default); border-radius: var(--gl-button-link-border-radius); text-decoration: underline; padding-left: var(--gl-spacing-scale-2); padding-right: var(--gl-spacing-scale-2); }
:host([variant='link']) button:hover { color: var(--gl-button-link-text-color-hover); }
:host([variant='link']) button:active { color: var(--gl-button-link-text-color-active); }
.gl-spin { animation: glspin 0.8s linear infinite; }
@keyframes glspin { to { transform: rotate(360deg); } }
`;

export class GlButton extends HTMLElement {
  static get observedAttributes() { return ['category', 'variant', 'size', 'disabled', 'loading', 'block', 'icon']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  get category() { return this.getAttribute('category') || 'primary'; }
  get variant() { return this.getAttribute('variant') || 'default'; }
  get loading() { return this.hasAttribute('loading'); }
  _tokens() {
    const cat = this.category;
    const v = this.variant;
    const t = (s) => `var(--gl-button-${v}-${cat}-${s})`;
    this.style.setProperty('--boot-bg', t('background-color-default'));
    this.style.setProperty('--boot-fg', t('foreground-color-default'));
    this.style.setProperty('--boot-bd', t('border-color-default'));
    this.style.setProperty('--boot-bg-h', t('background-color-hover'));
    this.style.setProperty('--boot-fg-h', t('foreground-color-hover'));
    this.style.setProperty('--boot-bd-h', t('border-color-hover'));
    this.style.setProperty('--boot-bg-a', t('background-color-active'));
    this.style.setProperty('--boot-fg-a', t('foreground-color-active'));
    this.style.setProperty('--boot-bd-a', t('border-color-active'));
  }
  _render() {
    this._tokens();
    const spin = `<svg class="gl-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    const icon = this.hasAttribute('icon') ? `<svg class="gl-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"/></svg>` : '';
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>
<button type="button" ${this.hasAttribute('disabled') ? 'disabled' : ''} aria-busy=${this.loading ? 'true' : 'false'}>
  ${this.loading ? spin : icon}
  <slot></slot>
</button>`;
  }
}
customElements.define('gl-button', GlButton);
