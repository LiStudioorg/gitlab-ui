// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const CHEVRON_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_SVG = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface DropdownItem {
  label?: string;
  value?: string;
  header?: boolean;
  divider?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

export interface DropdownProps {
  text?: string;
  items?: DropdownItem[];
  showClearAll?: boolean;
  onSelect?: (item: DropdownItem) => void;
  onClearAll?: () => void;
}

export function Dropdown({
  text = '',
  items = [],
  showClearAll = false,
  onSelect,
  onClearAll,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  const pick = (item: DropdownItem) => {
    if (item.disabled) return;
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="relative inline-block" ref={rootRef}>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-control-border-radius)] border border-[var(--gl-border-color-default)] bg-[var(--gl-action-neutral-background-color-default)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] font-bold text-[color:var(--gl-action-neutral-foreground-color-default)] hover:border-[var(--gl-border-color-strong)] hover:bg-[var(--gl-action-neutral-background-color-hover)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {text}
        <span className="inline-flex text-[color:var(--gl-text-color-subtle)]" aria-hidden="true">
          {CHEVRON_SVG}
        </span>
      </button>
      {open ? (
        <ul
          className="absolute left-0 top-full z-[var(--gl-zindex-3)] mt-[var(--gl-spacing-scale-2)] min-w-[var(--gl-spacing-scale-48)] list-none rounded-[var(--gl-dropdown-border-radius)] border border-[var(--gl-dropdown-border-color)] bg-[var(--gl-dropdown-background-color)] p-[var(--gl-spacing-scale-2)] shadow-[var(--gl-shadow-sm)]"
          role="menu"
        >
          {showClearAll ? (
            <li role="none">
              <button
                type="button"
                className="inline-flex cursor-pointer border-0 bg-transparent px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-button-link-text-color-default)] hover:underline"
                onClick={() => {
                  setOpen(false);
                  if (onClearAll) onClearAll();
                }}
              >
                Clear all
              </button>
            </li>
          ) : null}
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <li
                  key={index}
                  role="separator"
                  className="mx-auto my-[var(--gl-spacing-scale-2)] h-px bg-[var(--gl-dropdown-divider-color)]"
                />
              );
            }
            if (item.header) {
              return (
                <li
                  key={index}
                  role="presentation"
                  className="px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold text-[color:var(--gl-text-color-subtle)]"
                >
                  {item.label}
                </li>
              );
            }
            return (
              <li key={index} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  className={cl(
                    'flex w-full cursor-pointer items-center gap-[var(--gl-spacing-scale-3)] border-0 bg-transparent px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-left font-normal text-[color:var(--gl-text-color-default)] hover:bg-[var(--gl-dropdown-option-background-color-unselected-hover)] focus:outline-none focus:bg-[var(--gl-dropdown-option-background-color-unselected-focus)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-dropdown-option-text-color-disabled)]',
                    item.checked && 'font-semibold'
                  )}
                  onClick={() => pick(item)}
                >
                  <span>{item.label || item.value}</span>
                  {item.checked ? (
                    <span className="ml-auto inline-flex text-[color:var(--gl-dropdown-option-indicator-color-selected-default)]" aria-hidden="true">
                      {CHECK_SVG}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

