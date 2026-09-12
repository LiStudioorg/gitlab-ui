// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

const SPINNER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" /><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

const ICON_PLACEHOLDER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button`
  --btn-bg: var(--gl-button-default-primary-background-color-default);
  --btn-fg: var(--gl-button-default-primary-foreground-color-default);
  --btn-bc: var(--gl-button-default-primary-border-color-default);
  --btn-hbg: var(--gl-button-default-primary-background-color-hover);
  --btn-hfg: var(--gl-button-default-primary-foreground-color-hover);
  --btn-hbc: var(--gl-button-default-primary-border-color-hover);
  --btn-abg: var(--gl-button-default-primary-background-color-active);
  --btn-afg: var(--gl-button-default-primary-foreground-color-active);
  --btn-abc: var(--gl-button-default-primary-border-color-active);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gl-spacing-scale-2);
  min-height: var(--gl-spacing-scale-8);
  padding: 0 var(--gl-spacing-scale-4);
  border: 1px solid var(--btn-bc);
  border-radius: var(--gl-button-border-radius);
  background-color: var(--btn-bg);
  color: var(--btn-fg);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-20);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  &:hover:not(:disabled):not([aria-busy='true']) {
    background-color: var(--btn-hbg);
    color: var(--btn-hfg);
    border-color: var(--btn-hbc);
  }
  &:active:not(:disabled):not([aria-busy='true']) {
    background-color: var(--btn-abg);
    color: var(--btn-afg);
    border-color: var(--btn-abc);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &:disabled,
  &[aria-busy='true'] {
    background-color: var(--gl-action-disabled-background-color);
    color: var(--gl-action-disabled-foreground-color);
    border-color: var(--gl-action-disabled-border-color);
    cursor: not-allowed;
  }
  &[data-tone='primary-confirm'] {
    --btn-bg: var(--gl-button-confirm-primary-background-color-default);
    --btn-fg: var(--gl-button-confirm-primary-foreground-color-default);
    --btn-bc: var(--gl-button-confirm-primary-border-color-default);
    --btn-hbg: var(--gl-button-confirm-primary-background-color-hover);
    --btn-hfg: var(--gl-button-confirm-primary-foreground-color-hover);
    --btn-hbc: var(--gl-button-confirm-primary-border-color-hover);
    --btn-abg: var(--gl-button-confirm-primary-background-color-active);
    --btn-afg: var(--gl-button-confirm-primary-foreground-color-active);
    --btn-abc: var(--gl-button-confirm-primary-border-color-active);
  }
  &[data-tone='primary-danger'] {
    --btn-bg: var(--gl-button-danger-primary-background-color-default);
    --btn-fg: var(--gl-button-danger-primary-foreground-color-default);
    --btn-bc: var(--gl-button-danger-primary-border-color-default);
    --btn-hbg: var(--gl-button-danger-primary-background-color-hover);
    --btn-hfg: var(--gl-button-danger-primary-foreground-color-hover);
    --btn-hbc: var(--gl-button-danger-primary-border-color-hover);
    --btn-abg: var(--gl-button-danger-primary-background-color-active);
    --btn-afg: var(--gl-button-danger-primary-foreground-color-active);
    --btn-abc: var(--gl-button-danger-primary-border-color-active);
  }
  &[data-tone='secondary-default'] {
    --btn-bg: var(--gl-action-neutral-background-color-default);
    --btn-fg: var(--gl-action-neutral-foreground-color-default);
    --btn-bc: var(--gl-border-color-default);
    --btn-hbg: var(--gl-action-neutral-background-color-hover);
    --btn-hfg: var(--gl-action-neutral-foreground-color-hover);
    --btn-hbc: var(--gl-border-color-strong);
    --btn-abg: var(--gl-action-neutral-background-color-active);
    --btn-afg: var(--gl-action-neutral-foreground-color-active);
    --btn-abc: var(--gl-color-alpha-dark-16);
  }
  &[data-tone='secondary-confirm'] {
    --btn-bg: var(--gl-button-confirm-secondary-background-color-default);
    --btn-fg: var(--gl-button-confirm-secondary-foreground-color-default);
    --btn-bc: var(--gl-button-confirm-secondary-border-color-default);
    --btn-hbg: var(--gl-button-confirm-secondary-background-color-hover);
    --btn-hfg: var(--gl-button-confirm-secondary-foreground-color-hover);
    --btn-hbc: var(--gl-button-confirm-secondary-border-color-hover);
    --btn-abg: var(--gl-button-confirm-secondary-background-color-active);
    --btn-afg: var(--gl-button-confirm-secondary-foreground-color-active);
    --btn-abc: var(--gl-button-confirm-secondary-border-color-active);
  }
  &[data-tone='secondary-danger'] {
    --btn-bg: var(--gl-button-danger-secondary-background-color-default);
    --btn-fg: var(--gl-button-danger-secondary-foreground-color-default);
    --btn-bc: var(--gl-button-danger-secondary-border-color-default);
    --btn-hbg: var(--gl-button-danger-secondary-background-color-hover);
    --btn-hfg: var(--gl-button-danger-secondary-foreground-color-hover);
    --btn-hbc: var(--gl-button-danger-secondary-border-color-hover);
    --btn-abg: var(--gl-button-danger-secondary-background-color-active);
    --btn-afg: var(--gl-button-danger-secondary-foreground-color-active);
    --btn-abc: var(--gl-button-danger-secondary-border-color-active);
  }
  &[data-tone='tertiary-default'] {
    --btn-bg: var(--gl-button-default-tertiary-background-color-default);
    --btn-fg: var(--gl-button-default-tertiary-foreground-color-default);
    --btn-bc: var(--gl-button-default-tertiary-border-color-default);
    --btn-hbg: var(--gl-button-default-tertiary-background-color-hover);
    --btn-hfg: var(--gl-button-default-tertiary-foreground-color-hover);
    --btn-hbc: var(--gl-button-default-tertiary-border-color-hover);
    --btn-abg: var(--gl-button-default-tertiary-background-color-active);
    --btn-afg: var(--gl-button-default-tertiary-foreground-color-active);
    --btn-abc: var(--gl-button-default-tertiary-border-color-active);
  }
  &[data-tone='tertiary-confirm'] {
    --btn-bg: var(--gl-button-confirm-tertiary-background-color-default);
    --btn-fg: var(--gl-button-confirm-tertiary-foreground-color-default);
    --btn-bc: var(--gl-button-confirm-tertiary-border-color-default);
    --btn-hbg: var(--gl-button-confirm-tertiary-background-color-hover);
    --btn-hfg: var(--gl-button-confirm-tertiary-foreground-color-hover);
    --btn-hbc: var(--gl-button-confirm-tertiary-border-color-hover);
    --btn-abg: var(--gl-button-confirm-tertiary-background-color-active);
    --btn-afg: var(--gl-button-confirm-tertiary-foreground-color-active);
    --btn-abc: var(--gl-button-confirm-tertiary-border-color-active);
  }
  &[data-tone='tertiary-danger'] {
    --btn-bg: var(--gl-button-danger-tertiary-background-color-default);
    --btn-fg: var(--gl-button-danger-tertiary-foreground-color-default);
    --btn-bc: var(--gl-button-danger-tertiary-border-color-default);
    --btn-hbg: var(--gl-button-danger-tertiary-background-color-hover);
    --btn-hfg: var(--gl-button-danger-tertiary-foreground-color-hover);
    --btn-hbc: var(--gl-button-danger-tertiary-border-color-hover);
    --btn-abg: var(--gl-button-danger-tertiary-background-color-active);
    --btn-afg: var(--gl-button-danger-tertiary-foreground-color-active);
    --btn-abc: var(--gl-button-danger-tertiary-border-color-active);
  }
  &[data-tone='link'] {
    min-height: 0;
    padding: 0;
    border: 0;
    border-radius: var(--gl-button-link-border-radius);
    background: var(--gl-color-alpha-0);
    color: var(--gl-button-link-text-color-default);
    font-weight: var(--gl-font-weight-normal);
  }
  &[data-tone='link']:hover:not(:disabled):not([aria-busy='true']) {
    background: var(--gl-color-alpha-0);
    color: var(--gl-button-link-text-color-hover);
    text-decoration: underline;
  }
  &[data-size='small'] {
    min-height: var(--gl-spacing-scale-7);
    padding: 0 var(--gl-spacing-scale-3);
    font-size: var(--gl-font-size-sm);
  }
  &[data-block='true'] {
    width: 100%;
  }
  & > span {
    display: inline-flex;
    align-items: center;
    gap: var(--gl-spacing-scale-2);
  }
  & > .spinner {
    animation: ${spin} 0.8s linear infinite;
  }
`;

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
  return (
    <StyledButton
      type="button"
      data-tone={variant === 'link' ? 'link' : category + '-' + variant}
      data-size={size}
      data-block={block || undefined}
      disabled={disabled || loading || pressed}
      aria-busy={loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {loading ? <span className="spinner">{SPINNER}</span> : null}
      {!loading && icon ? <span>{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span>{children}</span> : null}
    </StyledButton>
  );
}

