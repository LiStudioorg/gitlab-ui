// Pajamas-inspired (MIT)
import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const SPINNER = html`
  <svg class="spinner" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/>
    <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

const iconSlot = html`<span id="icon"><slot name="icon"></slot></span>`;

function token(kind: string, cat: string, v: string, suf = '') {
  return `var(--gl-button-default-${cat}-${kind}-${v}${suf ? '-' + suf : ''})`;
}
const row = (pair: string) => {
  const [cat, v] = pair.split(':');
  return {
    bg: token('background-color', cat, v),
    fg: token('foreground-color', cat, v),
    bc: token('border-color', cat, v),
    hbg: token('background-color', cat, v, 'hover'),
    hfg: token('foreground-color', cat, v, 'hover'),
    hbc: token('border-color', cat, v, 'hover'),
  };
};
const TOKENS: Record<string, { bg: string; fg: string; bc: string; hbg: string; hfg: string; hbc: string } | null> = {
  'primary:default': row('primary:default'),
  'primary:confirm': row('primary:confirm'),
  'primary:danger': row('primary:danger'),
  'secondary:default': row('secondary:default'),
  'secondary:confirm': row('secondary:confirm'),
  'secondary:danger': row('secondary:danger'),
  'tertiary:default': row('tertiary:default'),
  'link:default': null,
};

type Category = 'primary' | 'secondary' | 'tertiary';
type Variant = 'default' | 'confirm' | 'danger' | 'link';

@customElement('gl-button')
export class GlButton extends LitElement {
  static styles = css`
    :host { display: inline-flex; }
    :host([block]) { display: flex; }
    :host([size='small']) { font-size: var(--gl-font-size-sm); }
    button {
      display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
      border: 1px solid var(--bc); border-radius: var(--gl-button-border-radius);
      background-color: var(--bg); color: var(--fg);
      font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-base);
      padding: var(--gl-spacing-scale-4); min-width: var(--gl-spacing-scale-20); cursor: pointer;
    }
    button:hover { background-color: var(--hbg); color: var(--hfg); border-color: var(--hbc); }
    button:active { transform: translateY(1px); }
    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
    }
    button:disabled {
      background-color: var(--gl-action-disabled-background-color);
      color: var(--gl-action-disabled-foreground-color);
      border-color: var(--gl-action-disabled-background-color);
      cursor: not-allowed;
    }
    :host([size='small']) button { padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); min-width: 0; font-size: var(--gl-font-size-sm); }
    :host([block]) button { width: 100%; }
    :host([category='tertiary']) button { background-color: transparent; border-color: transparent; outline: none; }
    :host([category='link']) button {
      border: none; border-radius: 0; background-color: transparent; min-width: 0;
      padding: 0; color: var(--gl-link-foreground-color); font-weight: var(--gl-font-weight-normal);
    }
    :host([category='link']) button:hover { text-decoration: underline; background-color: transparent; }
    .spinner { animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    #icon { display: inline-flex; }
  `;

  @property({ reflect: true }) category: Category = 'primary';
  @property({ reflect: true }) variant: Variant = 'default';
  @property({ reflect: true }) size: 'small' | 'medium' = 'medium';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) block = false;
  @property({ reflect: true }) icon = '';

  protected updated() {
    const t = TOKENS[`${this.category}:${this.variant}`] ?? TOKENS['primary:default']!;
    for (const [prop, val] of Object.entries(t)) this.style.setProperty('--' + prop, val);
  }

  render() {
    return html`
      <button type="button" ?disabled=${this.disabled || this.loading} aria-busy=${this.loading}>
        ${this.loading ? SPINNER : (this.icon ? iconSlot : '')}
        <span><slot></slot></span>
      </button>`;
  }
}
