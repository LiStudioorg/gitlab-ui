// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const ALERT_ICONS: Record<string, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V7.5M8 5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 2l6 11H2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6.5v3M8 11.2v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 1.5l6.5 6.5L8 14.5 1.5 8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 5.5v3.5M8 11.4v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tip: (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const alertVariants = cva(
  'relative flex w-full items-start gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-alert-border-radius)] border px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] [&>svg]:absolute [&>svg]:left-[var(--gl-spacing-scale-5)] [&>svg]:top-[var(--gl-spacing-scale-4)] [&>svg~*]:pl-[var(--gl-spacing-scale-7)]',
  {
    variants: {
      variant: {
        info: 'bg-[var(--gl-alert-info-background-color)] border-[var(--gl-alert-info-border-color)] text-[color:var(--gl-alert-info-title-color)]',
        success:
          'bg-[var(--gl-alert-success-background-color)] border-[var(--gl-alert-success-border-color)] text-[color:var(--gl-alert-success-title-color)]',
        warning:
          'bg-[var(--gl-alert-warning-background-color)] border-[var(--gl-alert-warning-border-color)] text-[color:var(--gl-alert-warning-title-color)]',
        danger:
          'bg-[var(--gl-alert-danger-background-color)] border-[var(--gl-alert-danger-border-color)] text-[color:var(--gl-alert-danger-title-color)]',
        tip: 'bg-[var(--gl-alert-neutral-background-color)] border-[var(--gl-alert-neutral-border-color)] text-[color:var(--gl-alert-neutral-title-color)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Alert({
  className,
  variant,
  title = '',
  dismissible = true,
  sticky = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  return (
    <div
      role={variant === 'success' || variant === 'warning' || variant === 'danger' ? 'alert' : 'status'}
      className={cn(
        alertVariants({ variant }),
        sticky && 'sticky top-0 z-[var(--gl-zindex-2)]',
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">{ALERT_ICONS[variant || 'info']}</span>
      <div className="flex-1 min-w-0">
        {title ? <h4 className="mb-[var(--gl-spacing-scale-2)] font-bold leading-none">{title}</h4> : null}
        <div className="leading-[var(--gl-line-height-24)]">{children}</div>
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss"
          className="inline-flex items-center justify-center rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
          onClick={() => {
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
        >
          {CLOSE_SVG}
        </button>
      ) : null}
    </div>
  );
}

export { alertVariants };

