<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let tabs = [];
  export let active = 0;
  export let onChange = null;

  const dispatch = createEventDispatcher();

  function select(i) {
    const tab = tabs[i];
    if (!tab || tab.disabled) return;
    active = i;
    dispatch('change', { index: i });
    if (typeof onChange === 'function') onChange(i, tab);
  }

  $: pane = tabs[active] ? tabs[active].content : '';
</script>

<div class="g-tabs">
  <nav class="flex gap-[var(--gl-spacing-scale-2)] overflow-x-auto border-b border-[var(--gl-border-color-default)]" role="tablist" aria-label="Tabs">
    {#each tabs as tab, i}
      <button
        type="button"
        class="g-tab relative inline-flex items-center gap-[var(--gl-spacing-scale-2)] whitespace-nowrap px-[var(--gl-spacing-scale-4)] py-[var(--gl-spacing-scale-4)] text-[length:var(--gl-font-size-base)]"
        data-active={i === active}
        disabled={tab.disabled || undefined}
        role="tab"
        aria-selected={i === active}
        on:click={() => select(i)}
      >
        {tab.title}
        {#if tab.count != null}
          <span class="inline-flex items-center rounded-[var(--gl-border-radius-full)] bg-[var(--gl-badge-neutral-background-color-default)] px-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] font-bold leading-[var(--gl-line-height-16)] text-[color:var(--gl-badge-neutral-text-color-default)]">{tab.count}</span>
        {/if}
      </button>
    {/each}
  </nav>
  <div class="pt-[var(--gl-spacing-scale-5)] text-[color:var(--gl-text-color-default)]" role="tabpanel">{pane}</div>
</div>

<style>
  .g-tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
  .g-tab:hover { color: var(--gl-text-color-strong); }
  .g-tab:hover::after { background-color: var(--gl-border-color-strong); }
  .g-tab[data-active='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
  .g-tab[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
  .g-tab:disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
</style>
