// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, Slot } from '@builder.io/qwik';

export interface BadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  icon?: string | null;
  href?: string | null;
  disabled?: boolean;
}

export const GlBadge = component$<BadgeProps>((props) => {
  const variant = props.variant ?? 'neutral';
  const style =
    '--gbd:var(--gl-badge-' + variant + '-background-color-default);' +
    '--gbf:var(--gl-badge-' + variant + '-text-color-default);';
  const inner = (
    <>
      {props.icon ? (
        <span class="g-badge-icon" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg></span>
      ) : null}
      <span>
        <Slot />
      </span>
    </>
  );
  return props.href ? (
    <>
      <a class="g-badge" style={style} data-variant={variant} data-disabled={props.disabled} href={props.href}>
        {inner}
      </a>
      <style>{BADGE_CSS}</style>
    </>
  ) : (
    <>
      <span class="g-badge" style={style} data-variant={variant} data-disabled={props.disabled}>
        {inner}
      </span>
      <style>{BADGE_CSS}</style>
    </>
  );
});

export default GlBadge;
