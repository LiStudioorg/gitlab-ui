// Pajamas-inspired (MIT)
const STYLE = `
:host { display: inline-flex; }
.badge {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2);
  border-radius: var(--gl-border-radius-full);
  font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-16); text-decoration: none;
  background-color: var(--boot-bg, var(--gl-badge-neutral-background-color-default));
  color: var(--boot-fg, var(--gl-badge-neutral-text-color-default));
  border: 1px solid transparent;
}
:host([href]) .badge { cursor: pointer; }
:host([href]) .badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
:host([disabled]) .badge { opacity: var(--gl-opacity-7); pointer-events: none; }
:host([variant='neutral']) { --boot-bg: var(--gl-badge-neutral-background-color-default); --boot-fg: var(--gl-badge-neutral-text-color-default); }
:host([variant='info']) { --boot-bg: var(--gl-badge-info-background-color-default); --boot-fg: var(--gl-badge-info-text-color-default); }
:host([variant='success']) { --boot-bg: var(--gl-badge-success-background-color-default); --boot-fg: var(--gl-badge-success-text-color-default); }
:host([variant='warning']) { --boot-bg: var(--gl-badge-warning-background-color-default); --boot-fg: var(--gl-badge-warning-text-color-default); }
:host([variant='danger']) { --boot-bg: var(--gl-badge-danger-background-color-default); --boot-fg: var(--gl-badge-danger-text-color-default); }
:host([variant='tier']) { --boot-bg: var(--gl-badge-tier-background-color-default); --boot-fg: var(--gl-badge-tier-text-color-default); }
:host([variant='neutral']:hover) { --boot-bg: var(--gl-badge-neutral-background-color-hover); }
.icon { display: inline-flex; }
`;

export class GlBadge extends HTMLElement {
  static get observedAttributes() { return ['variant', 'icon', 'href', 'disabled']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  get variant() { return this.getAttribute('variant') || 'neutral'; }
  _render() {
    const href = this.getAttribute('href');
    const icon = this.getAttribute('icon');
    const iconSvg = icon ? `<span class="icon"><svg viewBox="0 0 16 16" width="14" height="14"><circle cx="8" cy="8" r="3.5" fill="currentColor"/></svg></span>` : '';
    const inner = `${iconSvg}<span><slot></slot></span>`;
    const tag = href ? `<a class="badge" href="${href}">${inner}</a>` : `<span class="badge">${inner}</span>`;
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>${tag}`;
    this._rendered = true;
  }
}
customElements.define('gl-badge', GlBadge);
