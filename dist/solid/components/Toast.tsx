// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal, onCleanup } from 'solid-js';
import type { JSX } from 'solid-js';

export interface ToastProps {
  visible?: boolean;
  message?: string;
  action?: { text: string; onClick?: () => void } | null;
  autoHideDelay?: number;
  onDismiss?: () => void;
}

export function Toast(props: ToastProps) {
  const [visible, setVisible] = createSignal(props.visible ?? false);
  const [leaving, setLeaving] = createSignal(false);
  let timer = 0;

  const arm = () => {
    if (timer) window.clearTimeout(timer);
    const delay = props.autoHideDelay ?? 5000;
    if (delay > 0) timer = window.setTimeout(() => hide(), delay);
  };
  const stop = () => {
    if (timer) {
      window.clearTimeout(timer);
      timer = 0;
    }
  };
  const show = () => {
    setVisible(true);
    setLeaving(false);
    arm();
  };
  const hide = () => {
    stop();
    setLeaving(true);
    window.setTimeout(() => {
      setLeaving(false);
      setVisible(false);
      props.onDismiss?.();
    }, 220);
  };
  if (props.visible) arm();
  onCleanup(stop);

  return (
    <>
      {visible() ? (
        <div class="g-toast" data-leaving={leaving()} role="status">
          <span class="g-toast-body">{props.message}</span>
          {props.action ? (
            <button type="button" class="g-toast-action" onClick={() => props.action!.onClick?.()}>
              {props.action.text}
            </button>
          ) : null}
          <button type="button" class="g-toast-close" aria-label="Dismiss" onClick={hide}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
        </div>
      ) : null}
      <style>{TOAST_CSS}</style>
    </>
  );
}

export default Toast;
