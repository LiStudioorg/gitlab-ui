// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from 'styled-components';

const BADGE_VARIANTS = ["neutral","info","success","warning","danger","tier"];

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--gl-spacing-scale-2);
  border: 1px solid transparent;
  border-radius: var(--gl-border-radius-full);
  padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-16);
  text-decoration: none;
  white-space: nowrap;
  background-color: var(--gl-badge-neutral-background-color-default);
  color: var(--gl-badge-neutral-text-color-default);
  text-decoration: none;
${BADGE_VARIANTS.map((v) => `  &[data-variant='${v}'] {
    background-color: var(--gl-badge-${v}-background-color-default);
    color: var(--gl-badge-${v}-text-color-default);
    --hover-color: var(--gl-badge-${v}-border-color-hover);
  }`).join('\n')}
  &[href]:hover {
    box-shadow: inset 0 0 0 1px var(--hover-color, var(--gl-badge-neutral-border-color-hover));
  }
  &[href]:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px var(--hover-color, var(--gl-badge-neutral-border-color-hover)), 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
  children?: React.ReactNode;
}

const STAR = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

export function Badge({
  variant = 'neutral',
  icon = null,
  href = null,
  disabled = false,
  children,
}: BadgeProps) {
  const inner = (
    <>
      {icon ? (
        <span aria-hidden="true">{STAR}</span>
      ) : null}
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <Pill
        href={disabled ? undefined : href}
        data-variant={variant}
        aria-disabled={disabled || undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </Pill>
    );
  }
  return <Pill data-variant={variant}>{inner}</Pill>;
}

