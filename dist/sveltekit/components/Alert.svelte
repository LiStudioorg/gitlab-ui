<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let variant = 'info';
  export let title = '';
  export let dismissible = true;
  export let sticky = false;

  const dispatch = createEventDispatcher();

  let leaving = false;
  let dismissed = false;

const ICONS = {
  info: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M8 11V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  success: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  warning: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 2.5L14.5 13.5H1.5L8 2.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M8 7v3.5M8 12v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  danger: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"></circle><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
  tip: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>',
};


  $: icon = ICONS[variant] || ICONS.info;
  $: cr = variant === 'danger' || variant === 'warning' || variant === 'success' ? 'alert' : 'status';

  function dismiss() {
    leaving = true;
    setTimeout(() => {
      dismissed = true;
      dispatch('dismiss');
    }, 220);
  }
</script>

{#if !dismissed}
  <div
    class="g-alert flex gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-alert-border-radius)] p-[var(--gl-spacing-scale-4)]"
    data-variant={variant}
    data-sticky={sticky}
    data-leaving={leaving}
    role={cr}
  >
    <span class="flex flex-none" aria-hidden="true">{@html icon}</span>
    <div class="min-w-0 flex-1">
      {#if title}
        <h3 class="m-0 mb-[var(--gl-spacing-scale-1)] font-bold" style="color: var(--gab);">{title}</h3>
      {/if}
      <p class="m-0 text-[color:var(--gl-text-color-default)]"><slot></slot></p>
    </div>
    {#if dismissible}
      <button type="button" class="inline-flex self-start cursor-pointer rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-1)] text-[color:var(--gl-text-color-subtle)] hover:bg-[var(--gl-color-alpha-dark-4)]" aria-label="Dismiss" on:click={dismiss}><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>
    {/if}
  </div>
{/if}

<style>
  .g-alert { background-color: var(--gabbg); border: 1px solid var(--gab); transition: opacity 200ms ease, transform 200ms ease; }
  .g-alert[data-leaving='true'] { opacity: 0; transform: translateY(-4px); }
  .g-alert[data-sticky='true'] { position: sticky; top: var(--gl-spacing-scale-5); }
  .g-alert[data-variant='info'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
  .g-alert[data-variant='success'] { --gab: var(--gl-alert-success-border-color); --gabbg: var(--gl-alert-success-background-color); --gat: var(--gl-alert-success-title-color); --gai: var(--gl-feedback-success-icon-color); }
  .g-alert[data-variant='warning'] { --gab: var(--gl-alert-warning-border-color); --gabbg: var(--gl-alert-warning-background-color); --gat: var(--gl-alert-warning-title-color); --gai: var(--gl-feedback-warning-icon-color); }
  .g-alert[data-variant='danger'] { --gab: var(--gl-alert-danger-border-color); --gabbg: var(--gl-alert-danger-background-color); --gat: var(--gl-alert-danger-title-color); --gai: var(--gl-feedback-danger-icon-color); }
  .g-alert[data-variant='tip'] { --gab: var(--gl-alert-info-border-color); --gabbg: var(--gl-alert-info-background-color); --gat: var(--gl-alert-info-title-color); --gai: var(--gl-feedback-info-icon-color); }
</style>
