// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'tip';
  title?: string;
  dismissible?: boolean;
  sticky?: boolean;
  onDismiss?: () => void;
  children?: JSX.Element;
}

const ICONS: Record<string, string> = {
  info: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M8 11V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  success: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  warning: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 2.5L14.5 13.5H1.5L8 2.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M8 7v3.5M8 12v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  danger: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  tip: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
};

export function Alert(props: AlertProps) {
  const [leaving, setLeaving] = createSignal(false);
  const [dismissed, setDismissed] = createSignal(false);
  const variant = () => props.variant ?? 'info';
  const cr = () => (variant() === 'danger' || variant() === 'warning' || variant() === 'success' ? 'alert' : 'status');
  const dismiss = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setDismissed(true);
      props.onDismiss?.();
    }, 220);
  };
  return (
    <>
      {!dismissed() ? (
        <div class="g-alert" data-variant={variant()} data-sticky={props.sticky} data-leaving={leaving()} role={cr()}>
          <span class="g-alert-icon" aria-hidden="true" innerHTML={ICONS[variant()] ?? ICONS.info} />
          <div class="g-alert-content">
            {props.title ? <h3 class="g-alert-title">{props.title}</h3> : null}
            <p class="g-alert-body">{props.children}</p>
          </div>
          {props.dismissible !== false ? (
            <button type="button" class="g-alert-close" aria-label="Dismiss" onClick={dismiss}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
          ) : null}
        </div>
      ) : null}
      <style>{ALERT_CSS}</style>
    </>
  );
}

export default Alert;
