// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';

const CLOSE_SVG = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WIDTHS: Record<string, string> = {
  sm: 'var(--gl-spacing-scale-30)',
  md: 'var(--gl-spacing-scale-48)',
  lg: 'var(--gl-spacing-scale-75)',
};

const modalIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const modalOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: var(--gl-zindex-4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-5);
  background-color: var(--gl-color-alpha-dark-40);
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--gl-spacing-scale-48);
  max-height: calc(100vh - var(--gl-spacing-scale-10));
  overflow: hidden;
  background-color: var(--gl-background-color-default);
  color: var(--gl-text-color-default);
  border-radius: var(--gl-modal-border-radius);
  box-shadow: var(--gl-shadow-lg);
  animation: ${modalIn} 160ms ease-out;
  &[data-leaving='true'] {
    animation: ${modalOut} 130ms ease-in forwards;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  border-bottom: 1px solid var(--gl-border-color-subtle);
`;

const Title = styled.h3`
  margin: 0;
  font-size: var(--gl-heading-scale-500-font-size);
  font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-28);
  color: var(--gl-text-color-heading);
`;

const Close = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--gl-spacing-scale-2);
  border: 0;
  border-radius: var(--gl-border-radius-default);
  background: transparent;
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  &:hover {
    background-color: var(--gl-color-alpha-dark-6);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
`;

const Body = styled.div`
  padding: var(--gl-spacing-scale-5);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-24);
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  border-top: 1px solid var(--gl-border-color-subtle);
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    & > button {
      width: 100%;
    }
  }
`;

const FooterBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gl-spacing-scale-2);
  min-height: var(--gl-spacing-scale-8);
  padding: 0 var(--gl-spacing-scale-4);
  border: 1px solid var(--gl-border-color-default);
  border-radius: var(--gl-button-border-radius);
  background-color: var(--gl-action-neutral-background-color-default);
  color: var(--gl-action-neutral-foreground-color-default);
  font: inherit;
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  cursor: pointer;
  &:hover {
    background-color: var(--gl-action-neutral-background-color-hover);
    border-color: var(--gl-border-color-strong);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &[data-variant='confirm'] {
    background-color: var(--gl-button-confirm-primary-background-color-default);
    color: var(--gl-button-confirm-primary-foreground-color-default);
    border-color: var(--gl-button-confirm-primary-border-color-default);
  }
  &[data-variant='confirm']:hover {
    background-color: var(--gl-button-confirm-primary-background-color-hover);
  }
  &[data-variant='danger'] {
    background-color: var(--gl-button-danger-primary-background-color-default);
    color: var(--gl-button-danger-primary-foreground-color-default);
    border-color: var(--gl-button-danger-primary-border-color-default);
  }
  &[data-variant='danger']:hover {
    background-color: var(--gl-button-danger-primary-background-color-hover);
  }
`;

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

  return (
    <Backdrop onClick={close}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        data-leaving={phase === 'leaving' || undefined}
        data-size={size}
        style={WIDTHS[size] ? { maxWidth: WIDTHS[size] } : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          <Close onClick={close} aria-label="Close">
            {CLOSE_SVG}
          </Close>
        </Header>
        <Body>{children}</Body>
        {primaryAction || secondaryAction ? (
          <Footer>
            {secondaryAction ? (
              <FooterBtn type="button" onClick={secondaryAction.onClick}>
                {secondaryAction.text}
              </FooterBtn>
            ) : null}
            {primaryAction ? (
              <FooterBtn
                type="button"
                data-variant={primaryAction.variant === 'danger' ? 'danger' : 'confirm'}
                onClick={primaryAction.onClick}
              >
                {primaryAction.text}
              </FooterBtn>
            ) : null}
          </Footer>
        ) : null}
      </Dialog>
    </Backdrop>
  );
}

