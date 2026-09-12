// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from 'styled-components';
import { useMemo, useState } from 'react';

const Wrap = styled.div`
  position: relative;
  overflow: auto;
  border: 1px solid var(--gl-border-color-default);
  border-radius: var(--gl-border-radius-lg);
  background-color: var(--gl-background-color-default);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: var(--gl-font-size-base);
  color: var(--gl-text-color-default);
  &[data-busy='true'] {
    pointer-events: none;
    opacity: 0.55;
  }
`;

const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: left;
  padding: var(--gl-spacing-scale-3);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-strong);
  background-color: var(--gl-background-color-subtle);
  box-shadow: inset 0 -1px 0 var(--gl-border-color-default);
`;

const Td = styled.td`
  padding: var(--gl-spacing-scale-3);
  border-bottom: 1px solid var(--gl-border-color-subtle);
`;

const Row = styled.tr`
  &:hover {
    background-color: var(--gl-table-row-background-color-hover);
  }
`;

const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-weight: var(--gl-font-weight-bold);
  color: inherit;
  cursor: pointer;
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
`;

const SortIcon = styled.span`
  color: var(--gl-table-sorting-icon-color);
  font-size: var(--gl-font-size-sm);
  line-height: 1;
`;

const Loading = styled.p`
  margin: 0;
  padding: var(--gl-spacing-scale-4);
  font-size: var(--gl-font-size-sm);
  color: var(--gl-text-color-subtle);
`;

const Empty = styled.td`
  padding: var(--gl-spacing-scale-5);
  text-align: center;
  color: var(--gl-text-color-subtle);
`;

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
    <Wrap>
      {loading ? <Loading>Loading records\u2026</Loading> : null}
      <StyledTable data-busy={loading || undefined}>
        <thead>
          <tr>
            {fields.map((field) => (
              <Th key={field.key} scope="col">
                {field.sortable ? (
                  <SortButton
                    type="button"
                    onClick={() => toggleSort(field)}
                    aria-sort={activeSort === field.key ? (activeDesc ? 'descending' : 'ascending') : undefined}
                  >
                    {field.label || field.key}
                    <SortIcon aria-hidden="true">{arrow(field)}</SortIcon>
                  </SortButton>
                ) : (
                  field.label || field.key
                )}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && !loading ? (
            <tr>
              <Empty colSpan={fields.length || 1}>{emptyText}</Empty>
            </tr>
          ) : (
            sorted.map((row, index) => (
              <Row key={index}>
                {fields.map((field) => (
                  <Td key={field.key}>
                    {row[field.key] != null ? String(row[field.key]) : ''}
                  </Td>
                ))}
              </Row>
            ))
          )}
        </tbody>
      </StyledTable>
    </Wrap>
  );
}

