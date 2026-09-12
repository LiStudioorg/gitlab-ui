// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

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

const Root = styled.div`
  position: relative;
  display: inline-block;
`;

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  border: 1px solid var(--gl-border-color-default);
  border-radius: var(--gl-control-border-radius);
  background-color: var(--gl-action-neutral-background-color-default);
  color: var(--gl-action-neutral-foreground-color-default);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  cursor: pointer;
  &:hover,
  &[aria-expanded='true'] {
    background-color: var(--gl-action-neutral-background-color-hover);
    border-color: var(--gl-border-color-strong);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
`;

const Chevron = styled.span`
  display: inline-flex;
  color: var(--gl-text-color-subtle);
`;

const Menu = styled.ul`
  position: absolute;
  left: 0;
  top: calc(100% + var(--gl-spacing-scale-2));
  min-width: var(--gl-spacing-scale-48);
  margin: 0;
  padding: var(--gl-spacing-scale-2) 0;
  list-style: none;
  background-color: var(--gl-dropdown-background-color);
  border: 1px solid var(--gl-dropdown-border-color);
  border-radius: var(--gl-dropdown-border-radius);
  box-shadow: var(--gl-shadow-sm);
  z-index: var(--gl-zindex-3);
`;

const Header = styled.li`
  padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-4);
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-subtle);
`;

const Divider = styled.li`
  height: 1px;
  margin: var(--gl-spacing-scale-2) 0;
  background-color: var(--gl-dropdown-divider-color);
`;

const Item = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  border: 0;
  background: transparent;
  text-align: left;
  font: inherit;
  font-size: var(--gl-font-size-base);
  color: var(--gl-text-color-default);
  cursor: pointer;
  &[aria-checked='true'] {
    font-weight: var(--gl-font-weight-semibold);
  }
  &:hover:not(:disabled) {
    background-color: var(--gl-dropdown-option-background-color-unselected-hover);
  }
  &:disabled {
    color: var(--gl-dropdown-option-text-color-disabled);
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: none;
    background-color: var(--gl-dropdown-option-background-color-unselected-focus);
  }
`;

const Check = styled.span`
  margin-left: auto;
  display: inline-flex;
  color: var(--gl-dropdown-option-indicator-color-selected-default);
`;

const Clear = styled.button`
  display: inline-flex;
  padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-4);
  border: 0;
  background: transparent;
  color: var(--gl-button-link-text-color-default);
  font: inherit;
  font-size: var(--gl-font-size-sm);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

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
    <Root ref={rootRef}>
      <Toggle
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {text}
        <Chevron aria-hidden="true">{CHEVRON_SVG}</Chevron>
      </Toggle>
      {open ? (
        <Menu role="menu">
          {showClearAll ? (
            <li role="none">
              <Clear
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (onClearAll) onClearAll();
                }}
              >
                Clear all
              </Clear>
            </li>
          ) : null}
          {items.map((item, index) => {
            if (item.divider) {
              return <Divider key={index} role="separator" />;
            }
            if (item.header) {
              return <Header key={index} role="presentation">{item.label}</Header>;
            }
            return (
              <li key={index} role="none">
                <Item
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={item.checked || false}
                  disabled={item.disabled}
                  onClick={() => pick(item)}
                >
                  <span>{item.label || item.value}</span>
                  {item.checked ? (
                    <Check aria-hidden="true">{CHECK_SVG}</Check>
                  ) : null}
                </Item>
              </li>
            );
          })}
        </Menu>
      ) : null}
    </Root>
  );
}

