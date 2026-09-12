// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';
import styles from './Alert.module.css';

const cl = (...cs) => cs.filter(Boolean).map((c) => styles[c]).join(' ');

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
      className={cl('gl-alert', 'gl-alert--' + variant, sticky && 'gl-alert--sticky')}
      role={ROLES[variant]}
    >
      <span className="gl-alert-icon" aria-hidden="true">
        {ICONS[variant]}
      </span>
      <div className="gl-alert-body">
        {title ? <h4 className="gl-alert-title">{title}</h4> : null}
        <div className="gl-alert-content">{children}</div>
      </div>
      {dismissible ? (
        <button
          type="button"
          className="gl-alert-dismiss"
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

