// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Variant = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';

@customElement('gl-badge')
export class GlBadge extends LitElement {
  static styles = css`
    :host { display: inline-flex; --boot-bg: var(--gl-badge-neutral-background-color-default); --boot-fg: var(--gl-badge-neutral-text-color-default); }
    :host([variant='info']) { --boot-bg: var(--gl-badge-info-background-color-default); --boot-fg: var(--gl-badge-info-text-color-default); }
    :host([variant='success']) { --boot-bg: var(--gl-badge-success-background-color-default); --boot-fg: var(--gl-badge-success-text-color-default); }
    :host([variant='warning']) { --boot-bg: var(--gl-badge-warning-background-color-default); --boot-fg: var(--gl-badge-warning-text-color-default); }
    :host([variant='danger']) { --boot-bg: var(--gl-badge-danger-background-color-default); --boot-fg: var(--gl-badge-danger-text-color-default); }
    :host([variant='tier']) { --boot-bg: var(--gl-badge-tier-background-color-default); --boot-fg: var(--gl-badge-tier-text-color-default); }
    :host(:hover) { --boot-bg: var(--gl-badge-neutral-background-color-hover); }
    .badge {
      display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
      padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2);
      border-radius: var(--gl-border-radius-full);
      font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold);
      line-height: var(--gl-line-height-16); text-decoration: none;
      background-color: var(--boot-bg); color: var(--boot-fg);
    }
    :host([href]) .badge { cursor: pointer; }
    :host([href]) .badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
    :host([disabled]) .badge { opacity: var(--gl-opacity-7); pointer-events: none; }
    .icon { display: inline-flex; }
  `;

  @property({ reflect: true }) variant: Variant = 'neutral';
  @property({ reflect: true }) icon = '';
  @property({ reflect: true }) href = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    const iconSvg = this.icon
      ? html`<span class="icon"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"/></svg></span>`
      : '';
    const inner = html`${iconSvg}<span><slot></slot></span>`;
    return this.href
      ? html`<a class="badge" href="${this.href}">${inner}</a>`
      : html`<span class="badge">${inner}</span>`;
  }
}
