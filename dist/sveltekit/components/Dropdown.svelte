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

<div class="g-dropdown relative inline-block" bind:this={rootEl}>
  <button
    type="button"
    class="inline-flex cursor-pointer items-center gap-[var(--gl-spacing-scale-2)] rounded-[var(--gl-button-border-radius)] border border-[var(--gl-action-neutral-border-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] font-bold text-[length:var(--gl-font-size-base)] bg-[var(--gl-action-neutral-background-color-default)] text-[color:var(--gl-action-neutral-foreground-color-default)] hover:bg-[var(--gl-action-neutral-background-color-hover)]"
    aria-haspopup="true"
    aria-expanded={open}
    on:click={toggle}
  >
    {text}
    <span class="inline-flex text-[color:var(--gl-text-color-subtle)]" aria-hidden="true"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
  </button>
  {#if open}
    <div class="absolute left-0 top-[calc(100%+var(--gl-spacing-scale-2))] z-[var(--gl-zindex-3)] box-border min-w-[var(--gl-spacing-scale-31)] rounded-[var(--gl-dropdown-border-radius)] border border-[var(--gl-dropdown-border-color)] bg-[var(--gl-dropdown-background-color)] p-[var(--gl-spacing-scale-2)] shadow-[var(--gl-shadow-sm)]" role="menu" aria-label="Options">
      <div class="p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-sm)] font-bold text-[color:var(--gl-text-color-subtle)]">Options</div>
      {#each items as item, i}
        <button
          type="button"
          class="flex w-full cursor-pointer items-center justify-between gap-[var(--gl-spacing-scale-3)] rounded-[var(--gl-border-radius-default)] border-0 bg-transparent p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-base)] text-[color:var(--gl-dropdown-option-text-color-default)] hover:bg-[var(--gl-dropdown-option-background-color-unselected-hover)] {checkedOf(item) ? 'font-bold text-[color:var(--gl-text-color-strong)] bg-[var(--gl-dropdown-option-background-color-selected-default)]' : ''}"
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
        <div class="my-[var(--gl-spacing-scale-2)] h-px bg-[var(--gl-dropdown-divider-color)]" role="separator"></div>
        <button type="button" class="block w-full cursor-pointer border-0 bg-transparent p-[var(--gl-spacing-scale-2)] px-[var(--gl-spacing-scale-3)] text-left text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-link)] hover:underline" on:click={clearAll}>Clear all</button>
      {/if}
    </div>
  {/if}
</div>

<style>
  button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
</style>
