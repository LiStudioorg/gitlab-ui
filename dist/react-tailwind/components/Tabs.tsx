// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const UNDERLINE = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

export interface Tab {
  id: string;
  label?: string;
  disabled?: boolean;
}

export interface TabsProps {
  variant?: 'plain' | 'pills';
  tabs?: Tab[];
  defaultActiveId?: string;
  onTabChange?: (id: string) => void;
}

const SEGMENT_CLS = 'inline-flex items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-border-radius-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold cursor-pointer focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-tabs-disabled-text-color)]';

export function Tabs({
  variant = 'plain',
  tabs = [],
  defaultActiveId = '',
  onTabChange,
}: TabsProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || (tabs[0] ? tabs[0].id : ''));

  const select = (tab: Tab) => {
    if (tab.disabled) return;
    setActiveId(tab.id);
    if (onTabChange) onTabChange(tab.id);
  };

  return (
    <div
      className={cl(
        'w-full',
        variant === 'pills' && 'inline-flex max-w-full items-center gap-[var(--gl-spacing-scale-1)] overflow-x-auto rounded-[var(--gl-tabs-pills-background-radius)] bg-[var(--gl-tabs-pills-background-color)] p-[var(--gl-spacing-scale-1)]'
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          disabled={tab.disabled}
          role="tab"
          aria-selected={activeId === tab.id}
          onClick={() => select(tab)}
          className={cl(
            variant === 'plain'
              ? cl(
                  'whitespace-nowrap border-0 border-b-2 border-b-transparent bg-transparent pb-[var(--gl-spacing-scale-3)] pt-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] cursor-pointer text-[color:var(--gl-text-color-subtle)] hover:text-[color:var(--gl-text-color-default)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:text-[color:var(--gl-tabs-disabled-text-color)]',
                  activeId === tab.id &&
                    'border-[var(--gl-tabs-active-hover-border-color)] text-[color:var(--gl-text-color-strong)]'
                )
              : cl(
                  SEGMENT_CLS,
                  activeId === tab.id
                    ? 'bg-[var(--gl-tabs-active-background-color)] text-[color:var(--gl-text-color-strong)] shadow-[var(--gl-shadow-sm)]'
                    : 'text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)]'
                )
          )}
        >
          <span className="inline-flex">{UNDERLINE}</span>
          {tab.label || tab.id}
        </button>
      ))}
    </div>
  );
}

