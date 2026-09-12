// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap rounded-[var(--gl-border-radius-full)] border border-transparent px-[var(--gl-spacing-scale-2)] py-[var(--gl-spacing-scale-1)] text-[length:var(--gl-font-size-sm)] font-medium leading-[var(--gl-line-height-16)]',
  {
    variants: {
      variant: {
        neutral:
          'bg-[var(--gl-badge-neutral-background-color-default)] text-[color:var(--gl-badge-neutral-text-color-default)]',
        info: 'bg-[var(--gl-badge-info-background-color-default)] text-[color:var(--gl-badge-info-text-color-default)]',
        success:
          'bg-[var(--gl-badge-success-background-color-default)] text-[color:var(--gl-badge-success-text-color-default)]',
        warning:
          'bg-[var(--gl-badge-warning-background-color-default)] text-[color:var(--gl-badge-warning-text-color-default)]',
        danger:
          'bg-[var(--gl-badge-danger-background-color-default)] text-[color:var(--gl-badge-danger-text-color-default)]',
        tier: 'bg-[var(--gl-badge-tier-background-color-default)] text-[color:var(--gl-badge-tier-text-color-default)]',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
}

const STAR = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

export function Badge({ className, variant, icon = null, href = null, disabled = false, children, ...props }: BadgeProps) {
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
      <a
        className={cn(badgeVariants({ variant }), 'hover:shadow-[inset_0_0_0_1px_var(--gl-badge-neutral-border-color-hover)]', className)}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {inner}
      </a>
    );
  }
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {inner}
    </span>
  );
}

export { badgeVariants };

