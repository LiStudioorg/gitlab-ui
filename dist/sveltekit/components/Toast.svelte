<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

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
  <div class="g-toast fixed bottom-[var(--gl-spacing-scale-6)] left-[var(--gl-spacing-scale-6)] z-[var(--gl-zindex-200)] flex max-w-[var(--gl-spacing-scale-48)] items-center gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-border-radius-full)] px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] bg-[var(--gl-feedback-strong-background-color)] text-[color:var(--gl-feedback-strong-text-color)] shadow-[var(--gl-shadow-md)]" data-leaving={leaving} role="status">
    <span class="flex-1">{message}</span>
    {#if action}
      <button type="button" class="bg-transparent border-0 p-0 font-bold text-[color:var(--gl-feedback-strong-link-color)] cursor-pointer" on:click={() => action.onClick && action.onClick()}>{action.text}</button>
    {/if}
    <button type="button" class="inline-flex bg-transparent border-0 p-[var(--gl-spacing-scale-1)] cursor-pointer text-[color:var(--gl-feedback-strong-text-color)]" aria-label="Dismiss" on:click={hide}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
  </div>
{/if}

<style>
  .g-toast { transition: opacity 200ms ease, transform 200ms ease; }
  .g-toast[data-leaving='true'] { opacity: 0; transform: translateY(-8px); }
</style>
