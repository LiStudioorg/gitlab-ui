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
</script>

{#if visible}
  <div
    class="g-modal-backdrop"
    on:click={(e) => {
      if (e.target === e.currentTarget) dispatch('close');
    }}
  >
    <div class="g-modal-dialog" data-size={size} role="dialog" aria-modal="true" aria-label={title}>
      <header class="g-modal-header">
        <h3 class="g-modal-title">{title}</h3>
        <button type="button" class="g-modal-close" aria-label="Close" on:click={close}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
      </header>
      <div class="g-modal-body">
        <slot></slot>
      </div>
      {#if primaryAction || secondaryAction}
        <footer class="g-modal-footer">
          {#if secondaryAction}
            <button type="button" class="g-modal-secondary" on:click={() => dispatch('secondary')}>{secondaryAction.text}</button>
          {/if}
          {#if primaryAction}
            <button
              type="button"
              class="g-modal-primary"
              data-variant={primaryAction.variant || 'confirm'}
              on:click={() => dispatch('primary')}
            >{primaryAction.text}</button>
          {/if}
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style>
.g-modal-backdrop {
  position: fixed; inset: 0; z-index: var(--gl-zindex-4); background-color: var(--gl-color-alpha-dark-40);
  display: flex; align-items: flex-start; justify-content: center; padding: var(--gl-spacing-scale-8) var(--gl-spacing-scale-4);
}
.g-modal-dialog {
  background-color: var(--gl-background-color-default); border-radius: var(--gl-modal-border-radius);
  box-shadow: var(--gl-shadow-lg); width: 100%; max-width: var(--gl-spacing-scale-48);
  display: flex; flex-direction: column; max-height: calc(100vh - var(--gl-spacing-scale-9));
}
.g-modal-dialog[data-size='sm'] { max-width: var(--gl-spacing-scale-31); }
.g-modal-dialog[data-size='lg'] { max-width: var(--gl-spacing-scale-80); }
.g-modal-header { display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5) var(--gl-spacing-scale-3); }
.g-modal-title { margin: 0; font-size: var(--gl-heading-scale-500-font-size); font-weight: var(--gl-heading-scale-500-font-weight); color: var(--gl-text-color-heading); }
.g-modal-close { background: none; border: none; cursor: pointer; color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-2); border-radius: var(--gl-border-radius-default); display: inline-flex; }
.g-modal-close:hover { background-color: var(--gl-color-alpha-dark-4); }
.g-modal-body { padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); overflow: auto; color: var(--gl-text-color-default); }
.g-modal-footer { display: flex; flex-wrap: wrap; gap: var(--gl-spacing-scale-3); padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5); }
@media (max-width: 576px) { .g-modal-footer { flex-direction: column; align-items: stretch; } }
.g-modal-footer button {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--gl-spacing-scale-2);
  border-radius: var(--gl-button-border-radius); padding: var(--gl-spacing-scale-3);
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold); cursor: pointer;
}
.g-modal-footer button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.g-modal-secondary { background-color: var(--gl-action-neutral-background-color-default); color: var(--gl-action-neutral-foreground-color-default); border: 1px solid var(--gl-action-neutral-border-color-default); }
.g-modal-secondary:hover { background-color: var(--gl-action-neutral-background-color-hover); }
.g-modal-primary { border: 1px solid var(--gl-button-confirm-primary-border-color-default); background-color: var(--gl-button-confirm-primary-background-color-default); color: var(--gl-button-confirm-primary-foreground-color-default); }
.g-modal-primary:hover { background-color: var(--gl-button-confirm-primary-background-color-hover); }
.g-modal-primary[data-variant='danger'] { border: 1px solid var(--gl-button-danger-primary-border-color-default); background-color: var(--gl-button-danger-primary-background-color-default); color: var(--gl-button-danger-primary-foreground-color-default); }
.g-modal-primary[data-variant='danger']:hover { background-color: var(--gl-button-danger-primary-background-color-hover); }
</style>
