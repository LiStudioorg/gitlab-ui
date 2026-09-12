// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap rounded-[var(--gl-button-border-radius)] border min-h-[var(--gl-spacing-scale-8)] px-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] font-bold leading-[var(--gl-line-height-20)] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] disabled:pointer-events-none disabled:bg-[var(--gl-action-disabled-background-color)] disabled:text-[color:var(--gl-action-disabled-foreground-color)] disabled:border-[var(--gl-action-disabled-border-color)]',
  {
    variants: {
      category: {
        primary:
          'bg-[var(--gl-button-default-primary-background-color-default)] text-[color:var(--gl-button-default-primary-foreground-color-default)] border-[var(--gl-button-default-primary-border-color-default)] hover:bg-[var(--gl-button-default-primary-background-color-hover)] hover:text-[color:var(--gl-button-default-primary-foreground-color-hover)] hover:border-[var(--gl-button-default-primary-border-color-hover)] active:bg-[var(--gl-button-default-primary-background-color-active)] active:text-[color:var(--gl-button-default-primary-foreground-color-active)] active:border-[var(--gl-button-default-primary-border-color-active)]',
        secondary:
          'bg-[var(--gl-button-default-secondary-background-color-default)] text-[color:var(--gl-button-default-secondary-foreground-color-default)] border-[var(--gl-button-default-secondary-border-color-default)] hover:bg-[var(--gl-button-default-secondary-background-color-hover)] hover:text-[color:var(--gl-button-default-secondary-foreground-color-hover)] hover:border-[var(--gl-button-default-secondary-border-color-hover)] active:bg-[var(--gl-button-default-secondary-background-color-active)] active:text-[color:var(--gl-button-default-secondary-foreground-color-active)] active:border-[var(--gl-button-default-secondary-border-color-active)]',
        tertiary:
          'border-transparent bg-transparent text-[color:var(--gl-button-default-tertiary-text-color-default)] hover:text-[color:var(--gl-button-default-tertiary-text-color-hover)] hover:bg-transparent active:text-[color:var(--gl-button-default-tertiary-text-color-active)]',
      },
      variant: {
        default: '',
        confirm:
          'bg-[var(--gl-button-confirm-primary-background-color-default)] text-[color:var(--gl-button-confirm-primary-foreground-color-default)] border-[var(--gl-button-confirm-primary-border-color-default)] hover:bg-[var(--gl-button-confirm-primary-background-color-hover)] hover:text-[color:var(--gl-button-confirm-primary-foreground-color-hover)] active:bg-[var(--gl-button-confirm-primary-background-color-active)] active:text-[color:var(--gl-button-confirm-primary-foreground-color-active)]',
        danger:
          'bg-[var(--gl-button-danger-primary-background-color-default)] text-[color:var(--gl-button-danger-primary-foreground-color-default)] border-[var(--gl-button-danger-primary-border-color-default)] hover:bg-[var(--gl-button-danger-primary-background-color-hover)] hover:text-[color:var(--gl-button-danger-primary-foreground-color-hover)] active:bg-[var(--gl-button-danger-primary-background-color-active)] active:text-[color:var(--gl-button-danger-primary-foreground-color-active)]',
        link: 'h-auto min-h-0 border-0 bg-transparent p-0 font-normal rounded-[var(--gl-button-link-border-radius)] text-[color:var(--gl-button-link-text-color-default)] hover:bg-transparent hover:text-[color:var(--gl-button-link-text-color-hover)] hover:underline',
      },
      size: {
        small: 'min-h-[var(--gl-spacing-scale-7)] px-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-sm)]',
        medium: '',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      category: 'primary',
      variant: 'default',
      size: 'medium',
      block: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: string;
}

const SPINNER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" /><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

const ICON_PLACEHOLDER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, category, variant, size, block, loading = false, icon = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ category, variant, size, block }), className)}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="animate-spin">{SPINNER}</span> : null}
      {!loading && icon ? <span>{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span>{children}</span> : null}
    </button>
  ),
);
Button.displayName = 'Button';

export { buttonVariants };

