// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { Show, onCleanup } from 'solid-js';
import type { JSX } from 'solid-js';

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: { text: string; variant?: 'confirm' | 'danger' } | null;
  secondaryAction?: { text: string } | null;
  onClose?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
  children?: JSX.Element;
}

export function Modal(props: ModalProps) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') props.onClose?.();
  };
  if (props.visible) document.addEventListener('keydown', onKey);
  onCleanup(() => document.removeEventListener('keydown', onKey));
  const size = () => props.size ?? 'md';
  return (
    <Show when={props.visible}>
      <div
        class="g-modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) props.onClose?.();
        }}
      >
        <div class="g-modal-dialog" data-size={size()} role="dialog" aria-modal="true" aria-label={props.title}>
          <header class="g-modal-header">
            <h3 class="g-modal-title">{props.title}</h3>
            <button type="button" class="g-modal-close" aria-label="Close" onClick={() => props.onClose?.()}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
          </header>
          <div class="g-modal-body">{props.children}</div>
          {props.primaryAction || props.secondaryAction ? (
            <footer class="g-modal-footer">
              {props.secondaryAction ? (
                <button type="button" class="g-modal-secondary" onClick={() => props.onSecondary?.()}>
                  {props.secondaryAction.text}
                </button>
              ) : null}
              {props.primaryAction ? (
                <button
                  type="button"
                  class="g-modal-primary"
                  data-variant={props.primaryAction.variant ?? 'confirm'}
                  onClick={() => props.onPrimary?.()}
                >
                  {props.primaryAction.text}
                </button>
              ) : null}
            </footer>
          ) : null}
        </div>
      </div>
      <style>{MODAL_CSS}</style>
    </Show>
  );
}

export default Modal;
