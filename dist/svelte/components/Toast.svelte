<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let visible = false;
  export let message = '';
  export let action = null;
  export let autoHideDelay = 5000;
  export let onDismiss = null;

  const dispatch = createEventDispatcher();

  let leaving = false;
  let timer = null;

  onMount(() => {
    if (visible) arm();
    return () => stop();
  });

  function arm() {
    stop();
    if (autoHideDelay > 0) timer = setTimeout(hide, autoHideDelay);
  }
  function stop() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function show() {
    visible = true;
    leaving = false;
    arm();
  }
  function hide() {
    stop();
    leaving = true;
    setTimeout(() => {
      leaving = false;
      visible = false;
      dispatch('dismiss');
      if (typeof onDismiss === 'function') onDismiss();
    }, 220);
  }
</script>

{#if visible}
  <div class="g-toast" data-leaving={leaving} role="status">
    <span class="g-toast-body">{message}</span>
    {#if action}
      <button type="button" class="g-toast-action" on:click={() => action.onClick && action.onClick()}>{action.text}</button>
    {/if}
    <button type="button" class="g-toast-close" aria-label="Dismiss" on:click={hide}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
  </div>
{/if}

<style>
.g-toast {
  position: fixed; bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: var(--gl-zindex-200);
  display: flex; align-items: center; gap: var(--gl-spacing-scale-3); max-width: var(--gl-spacing-scale-48); box-sizing: border-box;
  background-color: var(--gl-feedback-strong-background-color); color: var(--gl-feedback-strong-text-color);
  border-radius: var(--gl-border-radius-full); box-shadow: var(--gl-shadow-md);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base);
  transition: opacity 200ms ease, transform 200ms ease;
}
.g-toast[data-leaving='true'] { opacity: 0; transform: translateY(-8px); }
.g-toast-body { flex: 1; }
.g-toast-action { background: none; border: none; cursor: pointer; padding: 0; color: var(--gl-feedback-strong-link-color); font-weight: var(--gl-font-weight-bold); }
.g-toast-close { background: none; border: none; cursor: pointer; color: var(--gl-feedback-strong-text-color); padding: var(--gl-spacing-scale-1); display: inline-flex; }
</style>
