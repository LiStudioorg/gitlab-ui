<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let variant = 'neutral';
  export let icon = null;
  export let href = null;
  export let disabled = false;

  $: badgeStyle = (() => {
    const bg = 'var(--gl-badge-' + variant + '-background-color-default)';
    const fg = 'var(--gl-badge-' + variant + '-text-color-default)';
    return '--gbd:' + bg + ';--gbf:' + fg + ';';
  })();
  $: badgeClass = [
    'g-badge',
    'inline-flex',
    'items-center',
    'gap-[var(--gl-spacing-scale-2)]',
    'rounded-[var(--gl-border-radius-full)]',
    'px-[var(--gl-spacing-scale-2)]',
    'py-[var(--gl-spacing-scale-1)]',
    'text-[length:var(--gl-font-size-sm)]',
    'font-bold',
    'leading-[var(--gl-line-height-16)]',
    'no-underline',
    disabled ? 'opacity-[var(--gl-opacity-7)] pointer-events-none' : '',
  ]
    .filter(Boolean)
    .join(' ');
</script>

{#if href}
  <a class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled} href={href || undefined}>
    {#if icon}<span aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg></span>{/if}
    <span><slot></slot></span>
  </a>
{:else}
  <span class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled}>
    {#if icon}<span aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg></span>{/if}
    <span><slot></slot></span>
  </span>
{/if}

<style>
  .g-badge { background-color: var(--gbd); color: var(--gbf); }
  a.g-badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
</style>
