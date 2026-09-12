// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';
import './Tabs.css';

const cl = (...cs) => cs.filter(Boolean).join(' ');

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

export function Tabs({ tabs = [], active = 0, onChange, ariaLabel = 'Tabs' }: TabsProps) {
  const [idx, setIdx] = useState(active);
  const selected = idx >= 0 && idx < tabs.length ? idx : 0;

  const select = (index: number) => {
    setIdx(index);
    if (onChange) onChange(index);
  };

  return (
    <div className="gl-tabs-wrap">
      <div className="gl-tabs-nav" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            role="tab"
            aria-selected={index === selected}
            className={cl('gl-tab-item', index === selected && 'gl-tab-item--active')}
            onClick={() => select(index)}
          >
            {tab.title}
            {tab.count != null ? <span className="gl-tab-count">{tab.count}</span> : null}
          </button>
        ))}
      </div>
      <div className="gl-tab-content" role="tabpanel">
        {tabs[selected] ? tabs[selected].content : null}
      </div>
    </div>
  );
}

