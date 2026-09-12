// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const KEYFRAMES = (
  <style>{'@keyframes tw-toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes tw-toast-out{from{opacity:1;transform:none}to{opacity:0;transform:translateY(8px)}}'}</style>
);

export interface ToastAction {
  text: string;
  onClick?: () => void;
}

export interface ToastProps {
  message?: string;
  action?: ToastAction | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
}

export function Toast({
  message = '',
  action = null,
  autoHideDelay = 5000,
  onDismiss,
}: ToastProps) {
  const delay = Math.max(1000, autoHideDelay);
  const dismissed = useRef(false);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'entering' | 'leaving'>('entering');

  useEffect(() => {
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
    <div className="fixed left-[var(--gl-spacing-scale-6)] bottom-[var(--gl-spacing-scale-6)] z-[var(--gl-zindex-200)]">
      {KEYFRAMES}
      <div
        className={cl(
          'flex max-w-[min(24rem,calc(100vw-var(--gl-spacing-scale-12)))] items-center gap-[var(--gl-spacing-scale-4)] rounded-full bg-[var(--gl-feedback-strong-background-color)] px-[var(--gl-spacing-scale-5)] py-[var(--gl-spacing-scale-4)] text-[color:var(--gl-feedback-strong-text-color)] shadow-[var(--gl-shadow-md)] animate-[tw-toast-in_160ms_ease-out]',
          phase === 'leaving' && 'animate-[tw-toast-out_140ms_ease-in_forwards]'
        )}
        role="status"
      >
        <span className="min-w-0 flex-1 leading-[var(--gl-line-height-20)]">{message}</span>
        {action ? (
          <button
            type="button"
            className="whitespace-nowrap border-0 bg-transparent p-0 font-bold text-[color:var(--gl-feedback-strong-link-color)] cursor-pointer"
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
          className="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-1)] text-[color:var(--gl-feedback-strong-text-color)] opacity-70 hover:opacity-100 focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)]"
          aria-label="Dismiss"
          onClick={dismiss}
        >
          {CLOSE_SVG}
        </button>
      </div>
    </div>
  );
}

