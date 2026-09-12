// Pajamas-inspired (MIT)
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const json = {
  fromAttribute: (v: string | null) => {
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },
};

@customElement('gl-table')
export class GlTable extends LitElement {
  static styles = css`
    :host { display: block; }
    .scroll { overflow: auto; max-height: 380px; }
    .loading-bar { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-3); }
    .spinner { animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    table { width: 100%; border-collapse: collapse; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
    th { text-align: left; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-border-color-default); position: sticky; top: 0; background-color: var(--gl-background-color-default); }
    th.sortable { cursor: pointer; user-select: none; }
    th.sortable:hover { color: var(--gl-text-color-strong); }
    td { padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8); }
    tbody tr:hover td { background-color: var(--gl-table-row-background-color-hover); }
    .arrow { color: var(--gl-table-sorting-icon-color); margin-left: var(--gl-spacing-scale-2); }
    .empty { text-align: center; padding: var(--gl-spacing-scale-9) var(--gl-spacing-scale-5); color: var(--gl-text-color-subtle); }
    :host([loading]) table { opacity: var(--gl-opacity-7); }
  `;

  @property({ converter: json }) items: Record<string, unknown>[] = [];
  @property({ converter: json }) fields: { key: string; label: string; sortable?: boolean }[] = [];
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ attribute: 'sort-by', reflect: true }) sortBy: string | null = null;
  @property({ type: Boolean, attribute: 'sort-desc', reflect: true }) sortDesc = false;

  private get _rows() {
    const items = this.items;
    if (!this.sortBy) return items;
    const arr = [...items].sort((a, b) => {
      const av: any = a[this.sortBy!]; const bv: any = b[this.sortBy!];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return this.sortDesc ? arr.reverse() : arr;
  }
  private _sort(key: string) {
    if (this.sortBy === key) this.sortDesc = !this.sortDesc;
    else { this.sortBy = key; this.sortDesc = false; }
    this.dispatchEvent(new CustomEvent('sortchange', { detail: { key, sortDesc: this.sortDesc }, bubbles: true, composed: true }));
  }

  render() {
    const head = this.fields.map((f) => html`
      <th class=${f.sortable ? 'sortable' : ''} @click=${() => f.sortable && this.sortBy !== f.key && this._sort(f.key)}>
        ${f.label}
        ${this.sortBy === f.key
          ? html`<span class="arrow">${this.sortDesc ? '\u2193' : '\u2191'}</span>`
          : ''}
      </th>`);
    const rows = this._rows.map((row) => html`
      <tr>${this.fields.map((f) => html`<td>${row[f.key] ?? ''}</td>`)}</tr>`);
    const body = rows.length
      ? rows
      : html`<tr><td class="empty" colspan=${this.fields.length}>No records found.</td></tr>`;
    return html`
      <div class="loading-bar" ?hidden=${!this.loading}>
        <svg class="spinner" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/>
          <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Loading&hellip;
      </div>
      <div class="scroll"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  }
}
