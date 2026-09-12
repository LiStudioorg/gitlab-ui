// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import './Badge.css';

const cl = (...cs) => cs.filter(Boolean).join(' ');

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
  const classes = cl('gl-badge', 'gl-badge--' + variant);
  const inner = (
    <>
      {icon ? (
        <span className="gl-badge-icon" aria-hidden="true">
          {STAR}
        </span>
      ) : null}
      <span className="gl-badge-content">{children}</span>
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

