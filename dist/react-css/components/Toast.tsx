// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './Toast.css';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
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
    <div className="gl-toaster">
      <div className={cl('gl-toast', phase === 'leaving' && 'gl-toast--leaving')} role="status">
        <span className="gl-toast-message">{message}</span>
        {action ? (
          <button
            type="button"
            className="gl-toast-action"
            onClick={() => {
              if (action.onClick) action.onClick();
              dismiss();
            }}
          >
            {action.text}
          </button>
        ) : null}
        <button type="button" className="gl-toast-close" aria-label="Dismiss" onClick={dismiss}>
          {CLOSE_SVG}
        </button>
      </div>
    </div>
  );
}

