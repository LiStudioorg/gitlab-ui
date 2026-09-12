<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let category = 'primary';
  export let variant = 'default';
  export let size = 'medium';
  export let disabled = false;
  export let loading = false;
  export let icon = '';
  export let block = false;
  export let type = 'button';

function btnTokens() {
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

  $: t = btnTokens();
  $: btnStyle =
    '--tbg:' + t.bg + ';--tfg:' + t.fg + ';--tbc:' + t.bc + ';' +
    '--thbg:' + t.hbg + ';--thfg:' + t.hfg + ';--thbc:' + t.hbc + ';';
  $: btnClass = [
    'g-button',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-[var(--gl-spacing-scale-2)]',
    'rounded-[var(--gl-button-border-radius)]',
    'font-bold',
    'leading-[var(--gl-line-height-20)]',
    'cursor-pointer',
    'border',
    size === 'small'
      ? 'px-[var(--gl-spacing-scale-2)] min-w-0 text-[length:var(--gl-font-size-sm)]'
      : 'px-[var(--gl-spacing-scale-4)] min-w-[var(--gl-spacing-scale-20)] text-[length:var(--gl-font-size-base)]',
    block ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' ');
</script>

<button
  class={btnClass}
  style={btnStyle}
  type={type}
  data-category={category}
  data-variant={variant}
  disabled={disabled || loading}
  aria-busy={loading}
  on:click
>
  {#if loading}
    <span class="inline-flex" aria-hidden="true"><svg class="g-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"></circle><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></span>
  {:else if icon}
    <span class="inline-flex" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="3.5" fill="currentColor"></circle></svg></span>
  {/if}
  {#if $$slots.default}
    <span><slot></slot></span>
  {/if}
</button>

<style>
  .g-button {
    background-color: var(--tbg); color: var(--tfg); border-color: var(--tbc);
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
  }
  .g-button:hover { background-color: var(--thbg); color: var(--thfg); border-color: var(--thbc); }
  .g-button:active { transform: translateY(1px); }
  .g-button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
  .g-button:disabled {
    background-color: var(--gl-action-disabled-background-color); color: var(--gl-action-disabled-foreground-color);
    border-color: var(--gl-action-disabled-background-color); cursor: not-allowed;
  }
  .g-button[data-category='tertiary'], .g-button[data-variant='link'] { background-color: var(--gl-color-alpha-0); border-color: var(--gl-color-alpha-0); }
  .g-button[data-variant='link'] { border-radius: 0; padding: 0 var(--gl-spacing-scale-2); min-width: 0; font-weight: var(--gl-font-weight-normal); }
  .g-button[data-variant='link']:hover { text-decoration: underline; }
  .g-spin { animation: g-spin 0.8s linear infinite; }
  @keyframes g-spin { to { transform: rotate(360deg); } }
</style>
