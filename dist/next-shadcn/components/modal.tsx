// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export interface ModalAction {
  text: string;
  variant?: 'default' | 'confirm' | 'danger';
}

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: ModalAction | null;
  secondaryAction?: { text: string } | null;
  onClose?: () => void;
  children?: React.ReactNode;
}

const BTN_CLS: Record<string, string> = {
  confirm:
    'bg-[var(--gl-button-confirm-primary-background-color-default)] text-[color:var(--gl-button-confirm-primary-foreground-color-default)] border-[var(--gl-button-confirm-primary-border-color-default)] hover:bg-[var(--gl-button-confirm-primary-background-color-hover)]',
  danger:
    'bg-[var(--gl-button-danger-primary-background-color-default)] text-[color:var(--gl-button-danger-primary-foreground-color-default)] border-[var(--gl-button-danger-primary-border-color-default)] hover:bg-[var(--gl-button-danger-primary-background-color-hover)]',
  default:
    'bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] border-[var(--gl-border-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)] hover:border-[var(--gl-border-color-strong)]',
};

const SIZE_CLS: Record<string, string> = {
  sm: 'max-w-[var(--gl-spacing-scale-30)]',
  md: 'max-w-[var(--gl-spacing-scale-48)]',
  lg: 'max-w-[var(--gl-spacing-scale-75)]',
};

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Modal({
  visible = false,
  title = '',
  size = 'md',
  primaryAction = null,
  secondaryAction = null,
  onClose,
  children,
}: ModalProps) {
  const [show, setShow] = React.useState(visible);
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      setShow(true);
      setLeaving(false);
      return undefined;
    }
    if (!show) return undefined;
    setLeaving(true);
    const timer = window.setTimeout(() => {
      setShow(false);
      setLeaving(false);
    }, 130);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  React.useEffect(() => {
    if (!show) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--gl-zindex-4)] flex items-center justify-center bg-[var(--gl-color-alpha-dark-40)] p-[var(--gl-spacing-scale-5)]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && onClose) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'flex max-h-[calc(100vh-var(--gl-spacing-scale-10))] w-full flex-col overflow-hidden rounded-[var(--gl-modal-border-radius)] bg-[var(--gl-background-color-default)] shadow-[var(--gl-shadow-lg)]',
          SIZE_CLS[size] || SIZE_CLS['md'],
          leaving && 'translate-y-[calc(var(--gl-spacing-scale-2)*-1)] opacity-0 transition-all duration-130',
        )}
      >
        <div className="flex items-start justify-between gap-[var(--gl-spacing-scale-3)] border-b border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)]">
          <h3 className="m-0 text-[length:var(--gl-heading-scale-500-font-size)] font-bold leading-[var(--gl-line-height-28)] text-[color:var(--gl-text-color-heading)]">{title}</h3>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex items-center justify-center rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-6)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
            onClick={() => onClose && onClose()}
          >
            {CLOSE_SVG}
          </button>
        </div>
        <div className="overflow-y-auto px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-5)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-24)] text-[color:var(--gl-text-color-default)]">
          {children}
        </div>
        <div className="flex flex-wrap justify-end gap-[var(--gl-spacing-scale-3)] border-t border-[var(--gl-border-color-subtle)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] max-[576px]:flex-col max-[576px]:items-stretch">
          {secondaryAction ? (
            <button
              type="button"
              className={cn(BTN_CLS['default'], 'inline-flex min-h-[var(--gl-spacing-scale-8)] items-center justify-center rounded-[var(--gl-button-border-radius)] border px-[var(--gl-spacing-scale-4)] font-bold focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] max-[576px]:w-full')}
              onClick={() => onClose && onClose()}
            >
              {secondaryAction.text}
            </button>
          ) : null}
          {primaryAction ? (
            <button
              type="button"
              className={cn(BTN_CLS[primaryAction.variant || 'confirm'], 'inline-flex min-h-[var(--gl-spacing-scale-8)] items-center justify-center rounded-[var(--gl-button-border-radius)] border px-[var(--gl-spacing-scale-4)] font-bold focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] max-[576px]:w-full')}
              onClick={() => onClose && onClose()}
            >
              {primaryAction.text}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

