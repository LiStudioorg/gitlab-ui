// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export interface TableField {
  key: string;
  label?: string;
  sortable?: boolean;
}

export interface TableProps {
  items?: Record<string, unknown>[];
  fields?: TableField[];
  loading?: boolean;
  sortBy?: string | null;
  sortDesc?: boolean;
  onSort?: (key: string) => void;
  className?: string;
}

export function Table({ items = [], fields = [], loading = false, sortBy = null, sortDesc = false, onSort, className }: TableProps) {
  const arrow = (field: TableField) => {
    if (sortBy !== field.key) return '\u2195';
    return sortDesc ? '\u2193' : '\u2191';
  };

  return (
    <div className={cn('relative overflow-auto rounded-[var(--gl-border-radius-lg)] border border-[var(--gl-border-color-default)] bg-[var(--gl-background-color-default)]', loading && 'pointer-events-none opacity-55', className)}>
      {loading ? (
        <p className="m-0 p-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">Loading records\u2026</p>
      ) : null}
      <table className="w-full border-collapse text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)]">
        <thead>
          <tr>
            {fields.map((field) => (
              <th
                key={field.key}
                className="sticky top-0 z-[1] bg-[var(--gl-background-color-subtle)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-left font-bold text-[color:var(--gl-text-color-strong)] shadow-[inset_0_-1px_0_var(--gl-border-color-default)]"
              >
                {field.sortable ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-[var(--gl-spacing-scale-2)] p-0 font-bold text-inherit hover:text-[color:var(--gl-table-sorting-icon-color)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
                    onClick={() => onSort && onSort(field.key)}
                  >
                    {field.label || field.key}
                    <span aria-hidden="true" className="text-[length:var(--gl-font-size-sm)] leading-none text-[color:var(--gl-table-sorting-icon-color)]">
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
          {items.length === 0 ? (
            <tr>
              <td
                className="p-[var(--gl-spacing-scale-5)] text-center text-[color:var(--gl-text-color-subtle)]"
                colSpan={fields.length || 1}
              >
                No records found
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index} className="border-b border-[var(--gl-border-color-subtle)] transition-colors hover:bg-[var(--gl-table-row-background-color-hover)]">
                {fields.map((field) => (
                  <td key={field.key} className="px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)]">
                    {String(item[field.key] ?? '')}
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

