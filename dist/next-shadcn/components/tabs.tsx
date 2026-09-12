// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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
  className?: string;
}

export function Tabs({ tabs = [], active = 0, onChange, ariaLabel = 'Tabs', className }: TabsProps) {
  const [idx, setIdx] = React.useState(active);
  const selected = idx >= 0 && idx < tabs.length ? idx : 0;

  const select = (index: number) => {
    setIdx(index);
    if (onChange) onChange(index);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex gap-[var(--gl-spacing-scale-1)] overflow-x-auto border-b border-[var(--gl-border-color-default)]"
      >
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            role="tab"
            aria-selected={index === selected}
            data-active={index === selected || undefined}
            className={cn(
              'relative inline-flex items-center gap-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-subtle)] hover:text-[color:var(--gl-text-color-strong)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] after:absolute after:inset-x-[var(--gl-spacing-scale-1)] after:-bottom-px after:h-[2px] after:bg-[var(--gl-tab-selected-indicator-color-default)] after:opacity-0',
              index === selected &&
                'font-bold text-[color:var(--gl-text-color-strong)] after:opacity-100',
            )}
            onClick={() => select(index)}
          >
            {tab.title}
            {tab.count != null ? (
              <span className="inline-flex min-w-[var(--gl-spacing-scale-5)] items-center justify-center rounded-[var(--gl-border-radius-full)] bg-[var(--gl-badge-muted-background-color-default)] px-[var(--gl-spacing-scale-1)] text-[length:var(--gl-font-size-xs)] font-semibold leading-[var(--gl-line-height-16)] text-[color:var(--gl-badge-muted-text-color-default)]">
                {tab.count}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="py-[var(--gl-spacing-scale-5)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-24)] text-[color:var(--gl-text-color-default)]">
        {tabs[selected] ? tabs[selected].content : null}
      </div>
    </div>
  );
}

