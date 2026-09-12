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
  <nav class="g-tabs-nav" role="tablist" aria-label="Tabs">
    {#each tabs as tab, i}
      <button
        type="button"
        class="g-tab"
        data-active={i === active}
        disabled={tab.disabled || undefined}
        role="tab"
        aria-selected={i === active}
        on:click={() => select(i)}
      >
        {tab.title}
        {#if tab.count != null}
          <span class="g-tab-count">{tab.count}</span>
        {/if}
      </button>
    {/each}
  </nav>
  <div class="g-tab-pane" role="tabpanel">{pane}</div>
</div>

<style>
.g-tabs-nav { display: flex; gap: var(--gl-spacing-scale-2); overflow-x: auto; border-bottom: 1px solid var(--gl-border-color-default); }
.g-tab { position: relative; display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); padding: var(--gl-spacing-scale-4); font-size: var(--gl-font-size-base); color: var(--gl-text-color-subtle); background: none; border: none; cursor: pointer; white-space: nowrap; }
.g-tab::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; border-radius: 1px; background-color: var(--gl-color-alpha-0); }
.g-tab:hover { color: var(--gl-text-color-strong); }
.g-tab:hover::after { background-color: var(--gl-border-color-strong); }
.g-tab[data-active='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.g-tab[data-active='true']::after { background-color: var(--gl-tab-selected-indicator-color-default); }
.g-tab:disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
.g-tab-count { display: inline-flex; align-items: center; border-radius: var(--gl-border-radius-full); background-color: var(--gl-badge-neutral-background-color-default); color: var(--gl-badge-neutral-text-color-default); padding: 0 var(--gl-spacing-scale-2); font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold); line-height: var(--gl-line-height-16); }
.g-tab-pane { padding: var(--gl-spacing-scale-5) 0; color: var(--gl-text-color-default); }
</style>
