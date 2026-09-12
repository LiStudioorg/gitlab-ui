// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const ICONS = {
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

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

const ALERT_CLS: Record<string, string> = {
  info: 'border-[var(--gl-alert-info-border-color)] bg-[var(--gl-alert-info-background-color)]',
  success: 'border-[var(--gl-alert-success-border-color)] bg-[var(--gl-alert-success-background-color)]',
  warning: 'border-[var(--gl-alert-warning-border-color)] bg-[var(--gl-alert-warning-background-color)]',
  danger: 'border-[var(--gl-alert-danger-border-color)] bg-[var(--gl-alert-danger-background-color)]',
  tip: 'border-[var(--gl-alert-neutral-border-color)] bg-[var(--gl-alert-neutral-background-color)]',
};

const TITLE_CLS: Record<string, string> = {
  info: 'text-[color:var(--gl-alert-info-title-color)]',
  success: 'text-[color:var(--gl-alert-success-title-color)]',
  warning: 'text-[color:var(--gl-alert-warning-title-color)]',
  danger: 'text-[color:var(--gl-alert-danger-title-color)]',
  tip: 'text-[color:var(--gl-alert-neutral-title-color)]',
};

const ICON_CLS: Record<string, string> = {
  info: 'text-[color:var(--gl-feedback-info-icon-color)]',
  success: 'text-[color:var(--gl-feedback-success-icon-color)]',
  warning: 'text-[color:var(--gl-feedback-warning-icon-color)]',
  danger: 'text-[color:var(--gl-feedback-danger-icon-color)]',
  tip: 'text-[color:var(--gl-icon-color-default)]',
};

const ROLES: Record<NonNullable<AlertProps['variant']>, string> = {
  info: 'status',
  tip: 'status',
  success: 'alert',
  warning: 'alert',
  danger: 'alert',
};

export function Alert({
  variant = 'info',
  title = '',
  dismissible = true,
  sticky = false,
  onDismiss,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className={cl(
        'flex items-start gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-alert-border-radius)] border px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)]',
        ALERT_CLS[variant] || ALERT_CLS['info'],
        sticky && 'sticky top-0 z-[var(--gl-zindex-2)]'
      )}
      role={ROLES[variant] || 'status'}
    >
      <span className={cl('inline-flex shrink-0', ICON_CLS[variant] || ICON_CLS['info'])} aria-hidden="true">
        {ICONS[variant] || ICONS['info']}
      </span>
      <div className="min-w-0 flex-1">
        {title ? (
          <h4 className={cl('m-0 mb-[var(--gl-spacing-scale-2)] font-bold', TITLE_CLS[variant] || TITLE_CLS['info'])}>
            {title}
          </h4>
        ) : null}
        <div className="m-0 leading-[var(--gl-line-height-24)]">{children}</div>
      </div>
      {dismissible ? (
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
          aria-label="Dismiss"
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

