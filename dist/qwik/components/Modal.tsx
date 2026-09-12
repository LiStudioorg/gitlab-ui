// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface ModalProps {
  visible?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryAction?: { text: string; variant?: 'confirm' | 'danger' } | null;
  secondaryAction?: { text: string } | null;
  onClose$?: QRL<() => void>;
  onPrimary$?: QRL<() => void>;
  onSecondary$?: QRL<() => void>;
}

export const GlModal = component$<ModalProps>((props) => {
  const visible = useSignal(props.visible ?? false);
  useVisibleTask$(({ cleanup }) => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') visible.value = false;
    };
    document.addEventListener('keydown', onKey);
    cleanup(() => document.removeEventListener('keydown', onKey));
  });
  const size = props.size ?? 'md';
  return (
    <>
      {visible.value ? (
        <div
          class="g-modal-backdrop"
          onClick$={(ev) => {
            if (ev.target === ev.currentTarget) visible.value = false;
          }}
        >
          <div class="g-modal-dialog" data-size={size} role="dialog" aria-modal="true" aria-label={props.title}>
            <header class="g-modal-header">
              <h3 class="g-modal-title">{props.title}</h3>
              <button type="button" class="g-modal-close" aria-label="Close" onClick$={() => (visible.value = false)}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
            </header>
            <div class="g-modal-body">
              <Slot />
            </div>
            {props.primaryAction || props.secondaryAction ? (
              <footer class="g-modal-footer">
                {props.secondaryAction ? (
                  <button type="button" class="g-modal-secondary" onClick$={() => props.onSecondary$?.()}>
                    {props.secondaryAction.text}
                  </button>
                ) : null}
                {props.primaryAction ? (
                  <button type="button" class="g-modal-primary" data-variant={props.primaryAction.variant ?? 'confirm'} onClick$={() => props.onPrimary$?.()}>
                    {props.primaryAction.text}
                  </button>
                ) : null}
              </footer>
            ) : null}
          </div>
        </div>
      ) : null}
      <style>{MODAL_CSS}</style>
    </>
  );
});

export default GlModal;
