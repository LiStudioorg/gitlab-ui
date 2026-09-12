// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const json = {
  fromAttribute: (v: string | null) => {
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },
};

interface TabMeta { title: string; count?: number; disabled?: boolean; content?: string }

@customElement('gl-tabs')
export class GlTabs extends LitElement {
  static styles = css`
    :host { display: block; }
    .nav { display: flex; gap: var(--gl-spacing-scale-2); overflow-x: auto; border-bottom: 1px solid var(--gl-border-color-default); }
    .tab { position: relative; display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base); color: var(--gl-text-color-subtle); background: none; border: none; cursor: pointer; white-space: nowrap; }
    .tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
    .tab:hover { color: var(--gl-text-color-strong); }
    .tab:hover::after { background-color: var(--gl-border-color-strong); }
    .tab[data-active='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
    .tab[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
    .tab:disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
    .badge { display: inline-flex; align-items: center; border-radius: var(--gl-border-radius-full); background-color: var(--gl-badge-neutral-background-color-default); color: var(--gl-badge-neutral-text-color-default); padding: 0 var(--gl-spacing-scale-2); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); }
    .pane { padding: var(--gl-spacing-scale-5) 0; color: var(--gl-text-color-default); }
  `;

  @property({ converter: json }) tabs: TabMeta[] = [];
  @property({ type: Number, reflect: true }) active = 0;

  private _select(e: Event) {
    const i = Number((e.currentTarget as HTMLButtonElement).dataset.index);
    if (this.tabs[i]?.disabled) return;
    this.active = i;
    this.dispatchEvent(new CustomEvent('change', { detail: { index: i }, bubbles: true, composed: true }));
  }

  render() {
    const nav = this.tabs.map((t, i) => html`
      <button class="tab" data-index=${i} data-active=${i === this.active ? 'true' : 'false'} ?disabled=${t.disabled} @click=${this._select}>
        ${t.title}
        ${t.count != null ? html`<span class="badge">${t.count}</span>` : ''}
      </button>`);
    const pane = this.tabs[this.active]?.content;
    return html`
      <div class="nav" role="tablist">${nav}</div>
      <div class="pane" role="tabpanel">${pane ?? ''}</div>`;
  }
}
