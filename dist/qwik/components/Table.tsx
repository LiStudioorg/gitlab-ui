// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useMemo, useSignal } from '@builder.io/qwik';

export interface Field {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Record<string, unknown>[];
  fields?: Field[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
}

export const GL_TABLE_CSS = `
.g-table-loading { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-3); }
.g-table-wrap { overflow: auto; }
.g-table { width: 100%; border-collapse: collapse; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
.g-table[data-busy='true'] { opacity: var(--gl-opacity-7); pointer-events: none; }
.g-table th { text-align: left; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-border-color-default); position: sticky; top: 0; background-color: var(--gl-color-alpha-0); }
.g-table th[data-sortable='true'] { cursor: pointer; user-select: none; }
.g-table th[data-sortable='true']:hover { color: var(--gl-text-color-strong); }
.g-table td { padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8); }
.g-table tbody tr:hover td { background-color: var(--gl-table-row-background-color-hover); }
.g-table .g-arrow { color: var(--gl-table-sorting-icon-color); margin-left: var(--gl-spacing-scale-2); }
.g-table .g-empty { text-align: center; padding: var(--gl-spacing-scale-9) var(--gl-spacing-scale-5); color: var(--gl-text-color-subtle); }
.g-spin { animation: g-spin 0.8s linear infinite; }
@keyframes g-spin { to { transform: rotate(360deg); } }
`;

export const GlTable = component$<TableProps>((props) => {
  const sortBy = useSignal(props.sortBy ?? null);
  const sortDesc = useSignal(props.sortDesc ?? false);
  const items = props.items ?? [];
  const fields = props.fields ?? [];

  const sorted = useMemo(() => {
    const key = sortBy.value;
    if (!key) return items;
    const arr = items.slice().sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDesc.value ? arr.reverse() : arr;
  });

  return (
    <>
      {props.loading ? (
        <div class="g-table-loading" role="status"><svg class="g-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"></circle><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg> Loading&hellip;</div>
      ) : null}
      <div class="g-table-wrap">
        <table class="g-table" data-busy={props.loading}>
          <thead>
            <tr>
              {fields.map((f) => (
                <th
                  data-sortable={f.sortable ? 'true' : 'false'}
                  aria-sort={sortBy.value === f.key ? (sortDesc.value ? 'descending' : 'ascending') : undefined}
                  onClick$={() => {
                    if (!f.sortable) return;
                    if (sortBy.value === f.key) {
                      sortDesc.value = !sortDesc.value;
                    } else {
                      sortBy.value = f.key;
                      sortDesc.value = false;
                    }
                  }}
                >
                  {f.label}
                  {sortBy.value === f.key ? (
                    <span class="g-arrow" aria-hidden="true">
                      {sortDesc.value ? '\u2193' : '\u2191'}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.value.length ? (
              sorted.value.map((row) => (
                <tr>
                  {fields.map((f) => (
                    <td>{String(row[f.key] ?? '')}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td class="g-empty" colspan={fields.length || 1}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{GL_TABLE_CSS}</style>
    </>
  );
});

export default GlTable;
