// Pajamas-inspired (MIT)
const STYLE = `
:host { display: block; }
.scroll { overflow: auto; max-height: 380px; }
.loading-bar { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-3); }
.gl-spin { animation: glspin 0.8s linear infinite; }
@keyframes glspin { to { transform: rotate(360deg); } }
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

export class GlTable extends HTMLElement {
  static get observedAttributes() { return ['items', 'fields', 'loading', 'sort-by', 'sort-desc']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); this.items = []; this.fields = []; }
  connectedCallback() { this._render(); }
  attributeChangedCallback() { if (this._rendered) this._render(); }
  _json(attr, fallback) {
    const raw = this.getAttribute(attr);
    if (!raw) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }
  get loading() { return this.hasAttribute('loading'); }
  get sortBy() { return this.getAttribute('sort-by') || null; }
  get sortDesc() { return this.hasAttribute('sort-desc'); }
  _rows() {
    const items = this.items;
    if (!this.sortBy) return items;
    const arr = [...items].sort((a, b) => {
      const av = a[this.sortBy]; const bv = b[this.sortBy];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return this.sortDesc ? arr.reverse() : arr;
  }
  _render() {
    this.items = this._json('items', []);
    this.fields = this._json('fields', []);
    const head = this.fields.map((f) => {
      const arrow = this.sortBy === f.key ? `<span class="arrow">${this.sortDesc ? '&darr;' : '&uarr;'}</span>` : '';
      return `<th ${f.sortable ? 'class="sortable" data-key="${f.key}"' : ''}>${f.label}${arrow}</th>`;
    }).join('');
    const rows = this._rows().map((row) => {
      const tds = this.fields.map((f) => `<td>${row[f.key] !== undefined ? row[f.key] : ''}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    const empty = rows ? '' : `<tr><td class="empty" colspan="${this.fields.length}">No records found.</td></tr>`;
    const spinner = `<svg class="gl-spin" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>
<div class="loading-bar" ${this.loading ? '' : 'hidden'}>${spinner} Loading&hellip;</div>
<div class="scroll">
  <table>
    <thead><tr>${head}</tr></thead>
    <tbody>${rows}${empty}</tbody>
  </table>
</div>`;
    this._rendered = true;
    this.shadowRoot.querySelectorAll('th.sortable').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.key;
        const desc = this.sortBy === key ? !this.sortDesc : false;
        const dir = desc ? 'yes' : 'no';
        this.setAttribute('sort-by', key);
        if (desc) this.setAttribute('sort-desc', '');
        else this.removeAttribute('sort-desc');
        this.dispatchEvent(new CustomEvent('sortchange', { detail: { key, sortDesc: desc }, bubbles: true, composed: true }));
      });
    });
  }
}
customElements.define('gl-table', GlTable);
