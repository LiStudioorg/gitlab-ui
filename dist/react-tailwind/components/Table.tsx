// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useMemo, useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

export interface TableField {
  key: string;
  label?: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Array<Record<string, unknown>>;
  fields?: TableField[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
  emptyText?: string;
}

export function Table({
  items = [],
  fields = [],
  loading = false,
  sortBy = null,
  sortDesc = false,
  emptyText = 'No records found.',
}: TableProps) {
  const [activeSort, setActiveSort] = useState<string | null>(sortBy);
  const [activeDesc, setActiveDesc] = useState(sortDesc);

  const sorted = useMemo(() => {
    const data = items.slice();
    if (!activeSort) return data;
    return data.sort((a, b) => {
      const av = String(a[activeSort] ?? '');
      const bv = String(b[activeSort] ?? '');
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return activeDesc ? -cmp : cmp;
    });
  }, [items, activeSort, activeDesc]);

  const toggleSort = (field: TableField) => {
    if (!field.sortable) return;
    if (activeSort === field.key) {
      setActiveDesc(!activeDesc);
    } else {
      setActiveSort(field.key);
      setActiveDesc(false);
    }
  };

  const arrow = (field: TableField) =>
    activeSort === field.key ? (activeDesc ? '\u2193' : '\u2191') : '';

  return (
    <div className="relative overflow-auto rounded-[var(--gl-border-radius-lg)] border border-[var(--gl-border-color-default)] bg-[var(--gl-background-color-default)]">
      {loading ? (
        <p className="m-0 px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">
          Loading records\u2026
        </p>
      ) : null}
      <table className={cl('w-full border-collapse text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)]', loading && 'pointer-events-none opacity-55')}>
        <thead>
          <tr>
            {fields.map((field) => (
              <th
                key={field.key}
                scope="col"
                className={cl(
                  'sticky top-0 z-[1] border-b border-[var(--gl-border-color-default)] bg-[var(--gl-background-color-subtle)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-left font-bold text-[color:var(--gl-text-color-strong)]'
                )}
              >
                {field.sortable ? (
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-[var(--gl-spacing-scale-2)] border-0 bg-transparent p-0 font-bold inherit focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
                    onClick={() => toggleSort(field)}
                    aria-sort={activeSort === field.key ? (activeDesc ? 'descending' : 'ascending') : undefined}
                  >
                    {field.label || field.key}
                    <span
                      className="text-[length:var(--gl-font-size-sm)] leading-none text-[color:var(--gl-table-sorting-icon-color)]"
                      aria-hidden="true"
                    >
                      {arrow(field)}
                    </span>
                  </button>
                ) : (
                  field.label || field.key
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && !loading ? (
            <tr>
              <td
                className="px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-5)] text-center text-[color:var(--gl-text-color-subtle)]"
                colSpan={fields.length || 1}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, index) => (
              <tr key={index} className="hover:bg-[var(--gl-table-row-background-color-hover)]">
                {fields.map((field) => (
                  <td key={field.key} className="border-b border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]">
                    {row[field.key] != null ? String(row[field.key]) : ''}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

