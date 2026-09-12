// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const BADGE_CLS: Record<string, string> = {
  neutral: 'bg-[var(--gl-badge-neutral-background-color-default)] text-[color:var(--gl-badge-neutral-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-neutral-border-color-hover)]',
  info: 'bg-[var(--gl-badge-info-background-color-default)] text-[color:var(--gl-badge-info-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-info-border-color-hover)]',
  success: 'bg-[var(--gl-badge-success-background-color-default)] text-[color:var(--gl-badge-success-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-success-border-color-hover)]',
  warning: 'bg-[var(--gl-badge-warning-background-color-default)] text-[color:var(--gl-badge-warning-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-warning-border-color-hover)]',
  danger: 'bg-[var(--gl-badge-danger-background-color-default)] text-[color:var(--gl-badge-danger-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-danger-border-color-hover)]',
  tier: 'bg-[var(--gl-badge-tier-background-color-default)] text-[color:var(--gl-badge-tier-text-color-default)] a:hover:shadow-[inset_0_0_0_1px_var(--gl-badge-tier-border-color-hover)]',
};

const STAR = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Badge({
  variant = 'neutral',
  icon = null,
  href = null,
  disabled = false,
  children,
}: BadgeProps) {
  const classes = cl(
    'inline-flex items-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap rounded-full border border-transparent px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] text-[length:var(--gl-font-size-sm)] font-medium leading-[var(--gl-line-height-16)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]',
    BADGE_CLS[variant] || BADGE_CLS['neutral']
  );
  const inner = (
    <>
      {icon ? (
        <span className="inline-flex" aria-hidden="true">
          {STAR}
        </span>
      ) : null}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <a className={classes} href={disabled ? undefined : href} aria-disabled={disabled || undefined}>
        {inner}
      </a>
    );
  }
  return <span className={classes}>{inner}</span>;
}

