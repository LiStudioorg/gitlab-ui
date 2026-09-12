// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';
import './Button.css';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const SPINNER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" /><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);

const ICON_PLACEHOLDER = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.4 4.4 13l.7-4L2 6.2l4-.6z" fill="currentColor" /></svg>
);

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
  const classes = cl(
    'gl-btn',
    variant === 'link' ? 'gl-btn--link' : 'gl-btn--' + category + '-' + variant,
    size === 'small' && 'gl-btn--small',
    block && 'gl-btn--block',
    loading && 'gl-btn--loading'
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
      {loading ? <span className="gl-btn-spinner">{SPINNER}</span> : null}
      {!loading && icon ? <span className="gl-btn-icon">{ICON_PLACEHOLDER}</span> : null}
      {children != null ? <span className="gl-btn-text">{children}</span> : null}
    </button>
  );
}

