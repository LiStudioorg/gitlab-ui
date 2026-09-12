// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createMemo, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';

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
  onSort?: (key: string, sortDesc: boolean) => void;
}

export function Table(props: TableProps) {
  const items = () => props.items ?? [];
  const fields = () => props.fields ?? [];
  const [sortBy, setSortBy] = createSignal(props.sortBy ?? null);
  const [sortDesc, setSortDesc] = createSignal(props.sortDesc ?? false);

  const sorted = createMemo(() => {
    const key = sortBy();
    if (!key) return items();
    const arr = items().slice().sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDesc() ? arr.reverse() : arr;
  });

  const onSort = (f: Field) => {
    if (!f.sortable) return;
    if (sortBy() === f.key) {
      setSortDesc(!sortDesc());
    } else {
      setSortBy(f.key);
      setSortDesc(false);
    }
    props.onSort?.(sortBy()!, sortDesc());
  };

  return (
    <>
      {props.loading ? (
        <div class="g-table-loading" role="status"><svg class="g-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"></circle><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg> Loading&hellip;</div>
      ) : null}
      <div class="g-table-wrap">
        <table class="g-table" data-busy={props.loading}>
          <thead>
            <tr>
              {fields().map((f) => (
                <th
                  data-sortable={f.sortable ? 'true' : 'false'}
                  aria-sort={sortBy() === f.key ? (sortDesc() ? 'descending' : 'ascending') : undefined}
                  onClick={() => onSort(f)}
                >
                  {f.label}
                  {sortBy() === f.key ? (
                    <span class="g-arrow" aria-hidden="true">
                      {sortDesc() ? '\u2193' : '\u2191'}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted().length ? (
              sorted().map((row) => (
                <tr>
                  {fields().map((f) => (
                    <td>{String(row[f.key] ?? '')}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td class="g-empty" colspan={fields().length || 1}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{TABLE_CSS}</style>
    </>
  );
}

export default Table;
