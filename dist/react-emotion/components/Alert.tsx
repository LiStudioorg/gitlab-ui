// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';

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

const ALERT_VARIANTS = ["info","success","warning","danger","tip"];

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--gl-spacing-scale-3);
  border: 1px solid var(--gl-alert-info-border-color);
  border-radius: var(--gl-alert-border-radius);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  background-color: var(--gl-alert-info-background-color);
  font-size: var(--gl-font-size-base);
${ALERT_VARIANTS.map((v) => `  &[data-variant='${v}'] {
    background-color: var(--gl-alert-${v}-background-color);
    border-color: var(--gl-alert-${v}-border-color);
  }`).join('\n')}
  &[data-variant='info'] .icon {
    color: var(--gl-feedback-info-icon-color);
  }
  &[data-variant='success'] .icon {
    color: var(--gl-feedback-success-icon-color);
  }
  &[data-variant='warning'] .icon {
    color: var(--gl-feedback-warning-icon-color);
  }
  &[data-variant='danger'] .icon {
    color: var(--gl-feedback-danger-icon-color);
  }
  &[data-variant='tip'] .icon {
    color: var(--gl-icon-color-default);
  }
  &[data-sticky='true'] {
    position: sticky;
    top: 0;
    z-index: var(--gl-zindex-2);
  }
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h4`
  margin: 0 0 var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-alert-info-title-color);
  [data-variant='success'] & {
    color: var(--gl-alert-success-title-color);
  }
  [data-variant='warning'] & {
    color: var(--gl-alert-warning-title-color);
  }
  [data-variant='danger'] & {
    color: var(--gl-alert-danger-title-color);
  }
  [data-variant='tip'] & {
    color: var(--gl-alert-neutral-title-color);
  }
`;

const Content = styled.div`
  line-height: var(--gl-line-height-24);
`;

const Icon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
`;

const Dismiss = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-2);
  border: 0;
  border-radius: var(--gl-border-radius-default);
  background: transparent;
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  &:hover {
    background-color: var(--gl-color-alpha-dark-6);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
`;

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
    <Box role={ROLES[variant]} data-variant={variant} data-sticky={sticky || undefined}>
      <Icon className="icon" aria-hidden="true">
        {ICONS[variant]}
      </Icon>
      <Body>
        {title ? <Title>{title}</Title> : null}
        <Content>{children}</Content>
      </Body>
      {dismissible ? (
        <Dismiss
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
        >
          {CLOSE_SVG}
        </Dismiss>
      ) : null}
    </Box>
  );
}

