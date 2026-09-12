// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useMemo, useState } from 'react';
import styles from './Table.module.css';

const cl = (...cs) => cs.filter(Boolean).map((c) => styles[c]).join(' ');

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
    <div className="gl-table-wrap">
      {loading ? <p className="gl-table-loading">Loading records\u2026</p> : null}
      <table className={cl('gl-table', loading && 'gl-table--busy')}>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.key} scope="col">
                {field.sortable ? (
                  <button
                    type="button"
                    className="gl-table-sort-btn"
                    onClick={() => toggleSort(field)}
                    aria-sort={activeSort === field.key ? (activeDesc ? 'descending' : 'ascending') : undefined}
                  >
                    {field.label || field.key}
                    <span className="gl-table-sort-icon" aria-hidden="true">{arrow(field)}</span>
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
              <td className="gl-table-empty" colSpan={fields.length || 1}>
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={field.key}>
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

