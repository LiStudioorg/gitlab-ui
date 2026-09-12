<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let visible = false;
  export let title = '';
  export let size = 'md';
  export let primaryAction = null;
  export let secondaryAction = null;
  export let onClose = null;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
    if (typeof onClose === 'function') onClose();
  }
  function onKey(e) {
    if (e.key === 'Escape') dispatch('close');
  }
  onMount(() => {
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  $: dialogClass = [
    'g-modal-dialog',
    'w-full',
    'rounded-[var(--gl-modal-border-radius)]',
    'shadow-[var(--gl-shadow-lg)]',
    'flex',
    'flex-col',
    'max-h-[calc(100vh-var(--gl-spacing-scale-9))]',
    'bg-[var(--gl-background-color-default)]',
    size === 'sm' ? 'max-w-[var(--gl-spacing-scale-31)]' : size === 'lg' ? 'max-w-[var(--gl-spacing-scale-80)]' : 'max-w-[var(--gl-spacing-scale-48)]',
  ]
    .filter(Boolean)
    .join(' ');
</script>

{#if visible}
  <div class="g-modal-backdrop fixed inset-0 flex items-start justify-center px-[var(--gl-spacing-scale-4)] pt-[var(--gl-spacing-scale-8)] bg-[var(--gl-color-alpha-dark-40)] z-[var(--gl-zindex-4)]" on:click={(e) => { if (e.target === e.currentTarget) dispatch('close'); }}>
    <div class={dialogClass} role="dialog" aria-modal="true" aria-label={title}>
      <header class="flex items-center justify-between gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-3)] pt-[var(--gl-spacing-scale-4)]">
        <h3 class="m-0 text-[length:var(--gl-heading-scale-500-font-size)] font-bold text-[color:var(--gl-text-color-heading)]">{title}</h3>
        <button type="button" class="inline-flex cursor-pointer rounded-[var(--gl-border-radius-default)] p-[var(--gl-spacing-scale-2)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-4)]" aria-label="Close" on:click={close}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
      </header>
      <div class="overflow-auto px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-5)] pt-[var(--gl-spacing-scale-3)] text-[color:var(--gl-text-color-default)]">
        <slot></slot>
      </div>
      {#if primaryAction || secondaryAction}
        <footer class="flex flex-wrap gap-[var(--gl-spacing-scale-3)] px-[var(--gl-spacing-scale-5)] pb-[var(--gl-spacing-scale-5)] pt-[var(--gl-spacing-scale-4)] sm:flex-col sm:items-stretch">
          {#if secondaryAction}
            <button type="button" class="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-button-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)] bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] border border-[var(--gl-action-neutral-border-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)]" on:click={() => dispatch('secondary')}>{secondaryAction.text}</button>
          {/if}
          {#if primaryAction}
            <button
              type="button"
              data-variant={primaryAction.variant || 'confirm'}
              class="inline-flex cursor-pointer items-center justify-center rounded-[var(--gl-button-border-radius)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)]"
              on:click={() => dispatch('primary')}
            >{primaryAction.text}</button>
          {/if}
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style>
  .g-modal-primary { border: 1px solid var(--gl-button-confirm-primary-border-color-default); background-color: var(--gl-button-confirm-primary-background-color-default); color: var(--gl-button-confirm-primary-foreground-color-default); }
  .g-modal-primary:hover { background-color: var(--gl-button-confirm-primary-background-color-hover); }
  .g-modal-primary[data-variant='danger'] { border: 1px solid var(--gl-button-danger-primary-border-color-default); background-color: var(--gl-button-danger-primary-background-color-default); color: var(--gl-button-danger-primary-foreground-color-default); }
  .g-modal-primary[data-variant='danger']:hover { background-color: var(--gl-button-danger-primary-background-color-hover); }
  button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
</style>
