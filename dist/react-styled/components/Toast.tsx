// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

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

const toastIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const toastOut = keyframes`
  from {
    opacity: 1;
    transform: none;
  }
  to {
    opacity: 0;
    transform: translateY(8px);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  left: var(--gl-spacing-scale-6);
  bottom: var(--gl-spacing-scale-6);
  z-index: var(--gl-zindex-200);
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gl-spacing-scale-4);
  max-width: min(24rem, calc(100vw - var(--gl-spacing-scale-12)));
  background-color: var(--gl-feedback-strong-background-color);
  color: var(--gl-feedback-strong-text-color);
  border-radius: var(--gl-border-radius-full);
  box-shadow: var(--gl-shadow-md);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  font-size: var(--gl-font-size-base);
  animation: ${toastIn} 160ms ease-out;
  &[data-phase='leaving'] {
    animation: ${toastOut} 140ms ease-in forwards;
  }
`;

const Message = styled.span`
  flex: 1;
  min-width: 0;
  line-height: var(--gl-line-height-20);
`;

const Action = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--gl-feedback-strong-link-color);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  cursor: pointer;
  white-space: nowrap;
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
`;

const Close = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-1);
  border: 0;
  border-radius: var(--gl-border-radius-default);
  background: transparent;
  color: var(--gl-feedback-strong-text-color);
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
`;

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
    <Wrapper>
      <Card role="status" data-phase={phase}>
        <Message>{message}</Message>
        {action ? (
          <Action
            type="button"
            onClick={() => {
              if (action.onClick) action.onClick();
              dismiss();
            }}
          >
            {action.text}
          </Action>
        ) : null}
        <Close type="button" aria-label="Dismiss" onClick={dismiss}>
          {CLOSE_SVG}
        </Close>
      </Card>
    </Wrapper>
  );
}

