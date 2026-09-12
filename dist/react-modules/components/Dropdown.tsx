// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

const cl = (...cs) => cs.filter(Boolean).map((c) => styles[c]).join(' ');

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
    <div className="gl-dropdown" ref={rootRef}>
      <button
        type="button"
        className="gl-dropdown-toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {text}
        <span className="gl-dropdown-chevron" aria-hidden="true">
          {CHEVRON_SVG}
        </span>
      </button>
      {open ? (
        <ul className="gl-dropdown-menu" role="menu">
          {showClearAll ? (
            <li role="none">
              <button
                type="button"
                className="gl-dropdown-clear"
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
              return <li key={index} className="gl-dropdown-divider" role="separator" />;
            }
            if (item.header) {
              return (
                <li key={index} className="gl-dropdown-header" role="presentation">
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
                  className={cl('gl-dropdown-item', item.checked && 'gl-dropdown-item--checked')}
                  onClick={() => pick(item)}
                >
                  <span>{item.label || item.value}</span>
                  {item.checked ? (
                    <span className="gl-dropdown-check" aria-hidden="true">
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

