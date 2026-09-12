// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface ToastProps {
  visible?: boolean;
  message?: string;
  action?: { text: string; onClick$?: QRL<() => void> } | null;
  autoHideDelay?: number;
  onDismiss$?: QRL<() => void>;
}

export const GlToast = component$<ToastProps>((props) => {
  const visible = useSignal(props.visible ?? false);
  const leaving = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => visible.value);
    if (!visible.value) return;
    const delay = props.autoHideDelay ?? 5000;
    if (delay > 0 && typeof window !== 'undefined') {
      const id = window.setTimeout(() => {
        leaving.value = true;
        window.setTimeout(() => {
          leaving.value = false;
          visible.value = false;
          props.onDismiss$?.();
        }, 220);
      }, delay);
      return () => window.clearTimeout(id);
    }
  });

  return (
    <>
      {visible.value ? (
        <div class="g-toast" data-leaving={leaving.value} role="status">
          <span class="g-toast-body">{props.message}</span>
          {props.action ? (
            <button type="button" class="g-toast-action" onClick$={() => props.action!.onClick$?.()}>
              {props.action.text}
            </button>
          ) : null}
          <button type="button" class="g-toast-close" aria-label="Dismiss" onClick$={() => (visible.value = false)}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
        </div>
      ) : null}
      <style>{TOAST_CSS}</style>
    </>
  );
});

export default GlToast;
