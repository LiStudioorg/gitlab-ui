<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let text = '';
  export let items = [];
  export let showClearAll = false;
  export let onSelect = null;

  const dispatch = createEventDispatcher();

  let open = false;
  let rootEl;

  function onDoc(e) {
    if (open && rootEl && !rootEl.contains(e.target)) open = false;
  }
  function onKey(e) {
    if (e.key === 'Escape') open = false;
  }
  onMount(() => {
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  });

  function toggle() {
    open = !open;
  }
  function select(item, i) {
    const checked = typeof item === 'object' ? !item.checked : true;
    dispatch('select', { index: i, item, checked });
    if (typeof onSelect === 'function') onSelect(item, i, checked);
    open = false;
  }
  function clearAll() {
    dispatch('clear-all');
    open = false;
  }
  function labelOf(item) {
    return typeof item === 'string' ? item : item.text;
  }
  function checkedOf(item) {
    return typeof item === 'object' && !!item.checked;
  }
</script>

<div class="g-dropdown" bind:this={rootEl}>
  <button
    type="button"
    class="g-dropdown-toggle"
    aria-haspopup="true"
    aria-expanded={open}
    on:click={toggle}
  >
    {text}
    <span class="g-caret" aria-hidden="true"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
  </button>
  {#if open}
    <div class="g-dropdown-menu" role="menu" aria-label="Options">
      <div class="g-dropdown-header">Options</div>
      {#each items as item, i}
        <button
          type="button"
          class="g-dropdown-item"
          data-checked={checkedOf(item)}
          role="menuitemcheckbox"
          aria-checked={checkedOf(item)}
          on:click={() => select(item, i)}
        >
          <span>{labelOf(item)}</span>
          {#if checkedOf(item)}
            <span aria-hidden="true"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
          {/if}
        </button>
      {/each}
      {#if showClearAll}
        <div class="g-dropdown-divider" role="separator"></div>
        <button type="button" class="g-dropdown-clear" on:click={clearAll}>Clear all</button>
      {/if}
    </div>
  {/if}
</div>

<style>
.g-dropdown { position: relative; display: inline-block; }
.g-dropdown-toggle { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); background-color: var(--gl-action-neutral-background-color-default); color: var(--gl-action-neutral-foreground-color-default); border: 1px solid var(--gl-action-neutral-border-color-default); border-radius: var(--gl-button-border-radius); padding: var(--gl-spacing-scale-3); font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-bold); cursor: pointer; }
.g-dropdown-toggle:hover { background-color: var(--gl-action-neutral-background-color-hover); }
.g-dropdown-toggle:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.g-dropdown-toggle .g-caret { display: inline-flex; color: var(--gl-text-color-subtle); }
.g-dropdown-menu { position: absolute; top: calc(100% + var(--gl-spacing-scale-2)); left: 0; min-width: var(--gl-spacing-scale-31); background-color: var(--gl-dropdown-background-color); border: 1px solid var(--gl-dropdown-border-color); border-radius: var(--gl-dropdown-border-radius); box-shadow: var(--gl-shadow-sm); padding: var(--gl-spacing-scale-2); z-index: var(--gl-zindex-3); box-sizing: border-box; }
.g-dropdown-header { padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); }
.g-dropdown-item { display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3); width: 100%; text-align: left; border: none; background: none; cursor: pointer; padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); border-radius: var(--gl-border-radius-default); font-size: var(--gl-font-size-base); color: var(--gl-dropdown-option-text-color-default); }
.g-dropdown-item:hover { background-color: var(--gl-dropdown-option-background-color-unselected-hover); }
.g-dropdown-item[data-checked='true'] { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); background-color: var(--gl-dropdown-option-background-color-selected-default); }
.g-dropdown-divider { height: 1px; margin: var(--gl-spacing-scale-2); background-color: var(--gl-dropdown-divider-color); }
.g-dropdown-clear { display: block; width: 100%; text-align: left; border: none; background: none; cursor: pointer; padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); color: var(--gl-text-color-link); font-size: var(--gl-font-size-sm); }
.g-dropdown-clear:hover { text-decoration: underline; }
</style>
