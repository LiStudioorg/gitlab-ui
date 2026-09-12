// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import type { JSX } from 'solid-js';

export interface ButtonProps {
  category?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'confirm' | 'danger' | 'link';
  size?: 'small' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  type?: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  children?: JSX.Element;
}

export const STYLE = `
.g-button {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
  box-sizing: border-box; border: 1px solid var(--tbc); border-radius: var(--gl-button-border-radius);
  background-color: var(--tbg); color: var(--tfg);
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-4); min-width: var(--gl-spacing-scale-20); cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}
.g-button:hover { background-color: var(--thbg); color: var(--thfg); border-color: var(--thbc); }
.g-button:active { transform: translateY(1px); }
.g-button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.g-button:disabled {
  background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color);
  border-color: var(--gl-action-disabled-background-color); cursor: not-allowed;
}
.g-button[data-size='small'] { padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); min-width: 0; font-size: var(--gl-font-size-sm); }
.g-button[data-block='true'] { width: 100%; }
.g-button[data-category='tertiary'], .g-button[data-variant='link'] { background-color: var(--gl-color-alpha-0); border-color: var(--gl-color-alpha-0); }
.g-button[data-variant='link'] { border-radius: 0; padding: 0 var(--gl-spacing-scale-2); min-width: 0; font-weight: var(--gl-font-weight-normal); }
.g-button[data-variant='link']:hover { text-decoration: underline; }
.g-button-icon { display: inline-flex; }
.g-spin { animation: g-spin 0.8s linear infinite; }
@keyframes g-spin { to { transform: rotate(360deg); } }
`;

function btnTokens(category: string, variant: string) {
  if (variant === 'link') {
    return {
      bg: 'var(--gl-color-alpha-0)',
      fg: 'var(--gl-button-link-text-color-default)',
      bc: 'var(--gl-color-alpha-0)',
      hbg: 'var(--gl-color-alpha-0)',
      hfg: 'var(--gl-button-link-text-color-hover)',
      hbc: 'var(--gl-color-alpha-0)',
    };
  }
  if (category === 'secondary') {
    const v = variant === 'confirm' ? 'confirm' : variant === 'danger' ? 'danger' : 'neutral';
    return {
      bg: 'var(--gl-action-' + v + '-background-color-default)',
      fg: 'var(--gl-action-' + v + '-foreground-color-default)',
      bc: 'var(--gl-action-' + v + '-border-color-default)',
      hbg: 'var(--gl-action-' + v + '-background-color-hover)',
      hfg: 'var(--gl-action-' + v + '-foreground-color-hover)',
      hbc: 'var(--gl-action-' + v + '-border-color-hover)',
    };
  }
  return {
    bg: 'var(--gl-button-' + variant + '-' + category + '-background-color-default)',
    fg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-default)',
    bc: 'var(--gl-button-' + variant + '-' + category + '-border-color-default)',
    hbg: 'var(--gl-button-' + variant + '-' + category + '-background-color-hover)',
    hfg: 'var(--gl-button-' + variant + '-' + category + '-foreground-color-hover)',
    hbc: 'var(--gl-button-' + variant + '-' + category + '-border-color-hover)',
  };
}

export function Button(props: ButtonProps) {
  const category = () => props.category ?? 'primary';
  const variant = () => props.variant ?? 'default';
  const size = () => props.size ?? 'medium';
  const t = () => btnTokens(category(), variant());
  const btnStyle = () =>
    '--tbg:' + t().bg + ';--tfg:' + t().fg + ';--tbc:' + t().bc + ';' +
    '--thbg:' + t().hbg + ';--thfg:' + t().hfg + ';--thbc:' + t().hbc + ';';
  return (
    <button
      class="g-button"
      style={btnStyle()}
      type={props.type ?? 'button'}
      data-category={category()}
      data-variant={variant()}
      data-size={size()}
      data-block={props.block}
      disabled={props.disabled || props.loading}
      aria-busy={props.loading}
      onClick={props.onClick}
    >
      {props.loading ? (
        <span class="g-button-icon" aria-hidden="true"><svg class="g-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"></circle><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></span>
      ) : props.icon ? (
        <span class="g-button-icon" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg></span>
      ) : null}
      {props.children ? <span class="g-button-text">{props.children}</span> : null}
    </button>
  );
}

export default Button;
