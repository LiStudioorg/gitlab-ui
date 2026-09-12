// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export interface ToastAction {
  text: string;
  onClick?: () => void;
}

export interface ToastProps {
  message?: string;
  action?: ToastAction | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
  className?: string;
}

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function Toast({ message = '', action = null, autoHideDelay = 5000, onDismiss, className }: ToastProps) {
  const delay = Math.max(1000, autoHideDelay);
  const dismissed = React.useRef(false);
  const [visible, setVisible] = React.useState(true);
  const [phase, setPhase] = React.useState<'entering' | 'leaving'>('entering');

  React.useEffect(() => {
    const hideTimer = window.setTimeout(() => setPhase('leaving'), delay);
    const doneTimer = window.setTimeout(() => {
      if (!dismissed.current) {
        dismissed.current = true;
        setVisible(false);
        if (onDismiss) onDismiss();
      }
    }, delay + 140);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, [delay, onDismiss]);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <div className={cn('fixed bottom-[var(--gl-spacing-scale-6)] left-[var(--gl-spacing-scale-6)] z-[var(--gl-zindex-200)]', className)}>
      <div
        role="status"
        data-phase={phase}
        className={cn(
          'flex max-w-[min(24rem,calc(100vw-var(--gl-spacing-scale-12)))] items-center gap-[var(--gl-spacing-scale-4)] rounded-[var(--gl-border-radius-full)] bg-[var(--gl-feedback-strong-background-color)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)] text-[color:var(--gl-feedback-strong-text-color)] shadow-[var(--gl-shadow-md)]',
          phase === 'leaving' && 'translate-y-[var(--gl-spacing-scale-2)] opacity-0 transition-all duration-150',
        )}
      >
        <span className="min-w-0 flex-1 leading-[var(--gl-line-height-20)]">{message}</span>
        {action ? (
          <button
            type="button"
            className="whitespace-nowrap border-0 bg-transparent p-0 font-bold text-[color:var(--gl-feedback-strong-link-color)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
            onClick={() => {
              if (action.onClick) action.onClick();
              dismiss();
            }}
          >
            {action.text}
          </button>
        ) : null}
        <button
          type="button"
          aria-label="Dismiss"
          className="inline-flex items-center justify-center rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-1)] opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)]"
          onClick={dismiss}
        >
          {CLOSE_SVG}
        </button>
      </div>
    </div>
  );
}

