// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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
  className?: string;
}

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

export function Dropdown({ text = '', items = [], showClearAll = false, onSelect, onClearAll, className }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
    <div className={cn('relative inline-block', className)} ref={rootRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-control-border-radius)] border border-[var(--gl-border-color-default)] bg-[var(--gl-action-neutral-background-color-default)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] font-bold text-[color:var(--gl-action-neutral-foreground-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)] hover:border-[var(--gl-border-color-strong)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
        onClick={() => setOpen(!open)}
      >
        {text}
        <span className="inline-flex text-[color:var(--gl-text-color-subtle)]" aria-hidden="true">
          {CHEVRON_SVG}
        </span>
      </button>
      {open ? (
        <ul
          role="menu"
          className="absolute left-0 top-[calc(100%+var(--gl-spacing-scale-2))] z-[var(--gl-zindex-3)] my-[var(--gl-spacing-scale-0)] min-w-[var(--gl-spacing-scale-48)] list-none rounded-[var(--gl-dropdown-border-radius)] border border-[var(--gl-dropdown-border-color)] bg-[var(--gl-dropdown-background-color)] py-[var(--gl-spacing-scale-2)] shadow-[var(--gl-shadow-sm)]"
        >
          {showClearAll ? (
            <li role="none">
              <button
                type="button"
                className="inline-flex px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-button-link-text-color-default)] hover:underline"
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
              return <li key={index} role="separator" className="my-[var(--gl-spacing-scale-2)] h-px bg-[var(--gl-dropdown-divider-color)]" />;
            }
            if (item.header) {
              return (
                <li key={index} role="presentation" className="px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold text-[color:var(--gl-text-color-subtle)]">
                  {item.label}
                </li>
              );
            }
            return (
              <li key={index} role="none">
                <button
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={item.checked || false}
                  disabled={item.disabled}
                  className={cn(
                    'flex w-full items-center gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)] hover:bg-[var(--gl-dropdown-option-background-color-unselected-hover)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-dropdown-option-text-color-disabled)] focus-visible:outline-none focus-visible:bg-[var(--gl-dropdown-option-background-color-unselected-focus)]',
                    item.checked && 'font-semibold',
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

