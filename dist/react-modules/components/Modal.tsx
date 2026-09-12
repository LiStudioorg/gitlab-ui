// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './Modal.module.css';

const cl = (...cs) => cs.filter(Boolean).map((c) => styles[c]).join(' ');

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
  const [phase, setPhase] = useState<'entering' | 'leaving'>('entering');

  useEffect(() => {
    setOpen(visible);
    setPhase('entering');
  }, [visible]);

  const close = useCallback(() => {
    setPhase('leaving');
    window.setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, 130);
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

  const primaryClasses =
    'gl-modal-btn gl-modal-btn--' +
    (primaryAction && primaryAction.variant === 'danger' ? 'danger' : 'confirm');

  return (
    <div className="gl-modal-backdrop" onClick={close}>
      <div
        className={cl('gl-modal', 'gl-modal--' + size, phase === 'leaving' && 'gl-modal--leaving')}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="gl-modal-header">
          <h3 className="gl-modal-title">{title}</h3>
          <button type="button" className="gl-modal-close" onClick={close} aria-label="Close">
            {CLOSE_SVG}
          </button>
        </div>
        <div className="gl-modal-body">{children}</div>
        {primaryAction || secondaryAction ? (
          <div className="gl-modal-footer">
            {secondaryAction ? (
              <button
                type="button"
                className="gl-modal-btn gl-modal-btn--default"
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

