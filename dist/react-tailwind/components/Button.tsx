// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const SPINNER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" /><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

const ICON_PLACEHOLDER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

const BTN_CLS: Record<string, string> = {
  'primary:default': 'border-[var(--gl-button-default-primary-border-color-default)] bg-[var(--gl-button-default-primary-background-color-default)] text-[color:var(--gl-button-default-primary-foreground-color-default)] hover:bg-[var(--gl-button-default-primary-background-color-hover)] hover:text-[color:var(--gl-button-default-primary-foreground-color-hover)] active:bg-[var(--gl-button-default-primary-background-color-active)] active:text-[color:var(--gl-button-default-primary-foreground-color-active)]',
  'primary:confirm': 'border-[var(--gl-button-confirm-primary-border-color-default)] bg-[var(--gl-button-confirm-primary-background-color-default)] text-[color:var(--gl-button-confirm-primary-foreground-color-default)] hover:bg-[var(--gl-button-confirm-primary-background-color-hover)] hover:text-[color:var(--gl-button-confirm-primary-foreground-color-hover)] active:bg-[var(--gl-button-confirm-primary-background-color-active)] active:text-[color:var(--gl-button-confirm-primary-foreground-color-active)]',
  'primary:danger': 'border-[var(--gl-button-danger-primary-border-color-default)] bg-[var(--gl-button-danger-primary-background-color-default)] text-[color:var(--gl-button-danger-primary-foreground-color-default)] hover:bg-[var(--gl-button-danger-primary-background-color-hover)] hover:text-[color:var(--gl-button-danger-primary-foreground-color-hover)] active:bg-[var(--gl-button-danger-primary-background-color-active)] active:text-[color:var(--gl-button-danger-primary-foreground-color-active)]',
  'secondary:default': 'border-[var(--gl-border-color-default)] bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)] hover:text-[color:var(--gl-action-neutral-foreground-color-hover)] active:bg-[var(--gl-action-neutral-background-color-active)] active:text-[color:var(--gl-action-neutral-foreground-color-active)]',
  'secondary:confirm': 'border-[var(--gl-button-confirm-secondary-border-color-default)] bg-[var(--gl-button-confirm-secondary-background-color-default)] text-[color:var(--gl-button-confirm-secondary-foreground-color-default)] hover:bg-[var(--gl-button-confirm-secondary-background-color-hover)] hover:text-[color:var(--gl-button-confirm-secondary-foreground-color-hover)] active:bg-[var(--gl-button-confirm-secondary-background-color-active)] active:text-[color:var(--gl-button-confirm-secondary-foreground-color-active)]',
  'secondary:danger': 'border-[var(--gl-button-danger-secondary-border-color-default)] bg-[var(--gl-button-danger-secondary-background-color-default)] text-[color:var(--gl-button-danger-secondary-foreground-color-default)] hover:bg-[var(--gl-button-danger-secondary-background-color-hover)] hover:text-[color:var(--gl-button-danger-secondary-foreground-color-hover)] active:bg-[var(--gl-button-danger-secondary-background-color-active)] active:text-[color:var(--gl-button-danger-secondary-foreground-color-active)]',
  'tertiary:default': 'border-[var(--gl-button-default-tertiary-border-color-default)] bg-[var(--gl-button-default-tertiary-background-color-default)] text-[color:var(--gl-button-default-tertiary-foreground-color-default)] hover:bg-[var(--gl-button-default-tertiary-background-color-hover)] hover:text-[color:var(--gl-button-default-tertiary-foreground-color-hover)] active:bg-[var(--gl-button-default-tertiary-background-color-active)] active:text-[color:var(--gl-button-default-tertiary-foreground-color-active)]',
  'tertiary:confirm': 'border-[var(--gl-button-confirm-tertiary-border-color-default)] bg-[var(--gl-button-confirm-tertiary-background-color-default)] text-[color:var(--gl-button-confirm-tertiary-foreground-color-default)] hover:bg-[var(--gl-button-confirm-tertiary-background-color-hover)] hover:text-[color:var(--gl-button-confirm-tertiary-foreground-color-hover)] active:bg-[var(--gl-button-confirm-tertiary-background-color-active)] active:text-[color:var(--gl-button-confirm-tertiary-foreground-color-active)]',
  'tertiary:danger': 'border-[var(--gl-button-danger-tertiary-border-color-default)] bg-[var(--gl-button-danger-tertiary-background-color-default)] text-[color:var(--gl-button-danger-tertiary-foreground-color-default)] hover:bg-[var(--gl-button-danger-tertiary-background-color-hover)] hover:text-[color:var(--gl-button-danger-tertiary-foreground-color-hover)] active:bg-[var(--gl-button-danger-tertiary-background-color-active)] active:text-[color:var(--gl-button-danger-tertiary-foreground-color-active)]',

  link: 'h-auto min-h-0 border-0 bg-transparent p-0 font-normal normal-case rounded-[var(--gl-button-link-border-radius)] text-[color:var(--gl-button-link-text-color-default)] hover:bg-transparent hover:text-[color:var(--gl-button-link-text-color-hover)] hover:underline',
};

export interface ButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export function Button({
  category = 'primary',
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = '',
  block = false,
  onClick,
  children,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const key = variant === 'link' ? 'link' : category + ':' + variant;
  const classes = cl(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--gl-button-border-radius)] border min-h-[var(--gl-spacing-scale-8)] px-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] font-bold leading-[var(--gl-line-height-20)] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:bg-[var(--gl-action-disabled-background-color)] disabled:text-[color:var(--gl-action-disabled-foreground-color)] disabled:border-[var(--gl-action-disabled-border-color)]',
    BTN_CLS[key] || BTN_CLS['primary:default'],
    size === 'small' && 'min-h-[var(--gl-spacing-scale-7)] px-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-sm)]',
    block && 'w-full'
  );
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading || pressed}
      aria-busy={loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {loading ? <span className="animate-spin">{SPINNER}</span> : null}
      {!loading && icon ? <span>{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span>{children}</span> : null}
    </button>
  );
}

