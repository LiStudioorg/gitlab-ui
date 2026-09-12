// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

export interface TabItem {
  title: string;
  count?: number;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs?: TabItem[];
  active?: number;
  onChange?: (index: number) => void;
  ariaLabel?: string;
}

const Nav = styled.div`
  display: flex;
  gap: var(--gl-spacing-scale-1);
  overflow-x: auto;
`;

const Tab = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  border: 0;
  background: transparent;
  font: inherit;
  font-size: var(--gl-font-size-base);
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  &:hover {
    color: var(--gl-text-color-strong);
  }
  &::after {
    content: '';
    position: absolute;
    left: var(--gl-spacing-scale-1);
    right: var(--gl-spacing-scale-1);
    bottom: -1px;
    height: 2px;
    background-color: var(--gl-tab-selected-indicator-color-default);
    opacity: 0;
  }
  &[data-active='true'] {
    color: var(--gl-text-color-strong);
    font-weight: var(--gl-font-weight-bold);
    &::after {
      opacity: 1;
    }
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--gl-spacing-scale-5);
  padding: 0 var(--gl-spacing-scale-1);
  border-radius: var(--gl-border-radius-full);
  background-color: var(--gl-badge-muted-background-color-default);
  color: var(--gl-badge-muted-text-color-default);
  font-size: var(--gl-font-size-xs);
  font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-16);
`;

const Panel = styled.div`
  padding: var(--gl-spacing-scale-5) 0;
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-24);
  color: var(--gl-text-color-default);
`;

export function Tabs({ tabs = [], active = 0, onChange, ariaLabel = 'Tabs' }: TabsProps) {
  const [idx, setIdx] = useState(active);
  const selected = idx >= 0 && idx < tabs.length ? idx : 0;

  const select = (index: number) => {
    setIdx(index);
    if (onChange) onChange(index);
  };

  return (
    <div>
      <Nav role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <Tab
            type="button"
            key={index}
            role="tab"
            aria-selected={index === selected}
            data-active={index === selected || undefined}
            onClick={() => select(index)}
          >
            {tab.title}
            {tab.count != null ? <Count>{tab.count}</Count> : null}
          </Tab>
        ))}
      </Nav>
      <Panel role="tabpanel">{tabs[selected] ? tabs[selected].content : null}</Panel>
    </div>
  );
}

