// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const SIZES: Record<string, string> = {
  sm: 'max-w-[var(--gl-spacing-scale-30)]',
  md: 'max-w-[var(--gl-spacing-scale-48)]',
  lg: 'max-w-[var(--gl-spacing-scale-75)]',
};

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ModalAction {
  text: string;
  variant?: 'default' | 'confirm' | 'danger';
  onClick?: () => void;
}

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: ModalAction | null;
  secondaryAction?: { text: string; onClick?: () => void } | null;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Modal({
  visible = false,
  title = '',
  size = 'md',
  primaryAction = null,
  secondaryAction = null,
  onClose,
  children,
}: ModalProps) {
  const [open, setOpen] = useState(visible);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const close = useCallback(() => {
    setOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!open) return null;

  const primaryClasses = cl(
    'rounded-[var(--gl-button-border-radius)] border px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] font-bold hover:brightness-95',
    primaryAction && primaryAction.variant === 'danger'
      ? 'border-transparent bg-[var(--gl-button-danger-primary-background-color-default)] text-[color:var(--gl-button-danger-primary-foreground-color-default)] hover:bg-[var(--gl-button-danger-primary-background-color-hover)]'
      : 'border-transparent bg-[var(--gl-button-confirm-primary-background-color-default)] text-[color:var(--gl-button-confirm-primary-foreground-color-default)] hover:bg-[var(--gl-button-confirm-primary-background-color-hover)]'
  );

  return (
    <div
      className="fixed inset-0 z-[var(--gl-zindex-4)] flex items-center justify-center p-[var(--gl-spacing-scale-5)] bg-[var(--gl-color-alpha-dark-40)]"
      onClick={close}
    >
      <div
        className={cl(
          'flex max-h-[calc(100vh-var(--gl-spacing-scale-10))] w-full flex-col overflow-hidden rounded-[var(--gl-modal-border-radius)] bg-[var(--gl-background-color-default)] text-[color:var(--gl-text-color-default)] shadow-[var(--gl-shadow-lg)]',
          SIZES[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-[var(--gl-spacing-scale-3)] border-b border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)]">
          <h3 className="m-0 text-[length:var(--gl-heading-scale-500-font-size)] font-bold leading-[var(--gl-line-height-28)] text-[color:var(--gl-text-color-heading)]">
            {title}
          </h3>
          <button
            type="button"
            className="rounded p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
            onClick={close}
            aria-label="Close"
          >
            {CLOSE_SVG}
          </button>
        </div>
        <div className="overflow-y-auto px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-5)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-24)]">
          {children}
        </div>
        {primaryAction || secondaryAction ? (
          <div className="flex flex-wrap justify-end gap-[var(--gl-spacing-scale-3)] border-t border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)]">
            {secondaryAction ? (
              <button
                type="button"
                className="rounded-[var(--gl-button-border-radius)] border border-[var(--gl-border-color-default)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] font-bold text-[color:var(--gl-action-neutral-foreground-color-default)] hover:border-[var(--gl-border-color-strong)] hover:bg-[var(--gl-action-neutral-background-color-hover)]"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.text}
              </button>
            ) : null}
            {primaryAction ? (
              <button type="button" className={primaryClasses} onClick={primaryAction.onClick}>
                {primaryAction.text}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

