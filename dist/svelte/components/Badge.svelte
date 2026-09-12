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
  $: badgeClass = 'g-badge' + (href ? ' g-badge-link' : '');
</script>

{#if href}
  <a class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled} href={href || undefined}>
    {#if icon}<span class="g-badge-icon" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg></span>{/if}
    <span><slot></slot></span>
  </a>
{:else}
  <span class={badgeClass} style={badgeStyle} data-variant={variant} data-disabled={disabled}>
    {#if icon}<span class="g-badge-icon" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg></span>{/if}
    <span><slot></slot></span>
  </span>
{/if}

<style>
.g-badge { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-1) var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-full); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); text-decoration: none; background-color: var(--gbd); color: var(--gbf); }
a.g-badge:hover { box-shadow: inset 0 0 0 1px var(--gl-border-color-strong); }
.g-badge[data-disabled='true'] { opacity: var(--gl-opacity-7); pointer-events: none; }
</style>
