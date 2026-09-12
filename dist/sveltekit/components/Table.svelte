<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];
  export let fields = [];
  export let loading = false;
  export let sortBy = null;
  export let sortDesc = false;

  const dispatch = createEventDispatcher();

  $: sorted = (() => {
    if (!sortBy) return items;
    const arr = items.slice().sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      return av > bv ? 1 : av < bv ? -1 : 0;
    });
    return sortDesc ? arr.reverse() : arr;
  })();

  function onSort(f) {
    if (!f.sortable) return;
    if (sortBy === f.key) {
      sortDesc = !sortDesc;
    } else {
      sortBy = f.key;
      sortDesc = false;
    }
    dispatch('sortchange', { key: sortBy, sortDesc });
  }
</script>

{#if loading}
  <div class="mb-3 flex items-center gap-2 text-[color:var(--gl-text-color-strong)]" role="status"><svg class="g-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"></circle><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg> Loading&hellip;</div>
{/if}
<div class="overflow-auto">
  <table class="w-full border-collapse text-[length:var(--gl-font-size-base)] text-[color:var(--gl-text-color-default)] {loading ? 'opacity-[var(--gl-opacity-7)] pointer-events-none' : ''}">
    <thead>
      <tr>
        {#each fields as f}
          <th class="sticky top-0 bg-[var(--gl-color-alpha-0)] p-3 text-left font-bold text-[color:var(--gl-text-color-subtle)] shadow-[inset_0_-1px_0_var(--gl-border-color-default)] {f.sortable ? 'cursor-pointer select-none hover:text-[color:var(--gl-text-color-strong)]' : ''}" data-sortable={f.sortable ? 'true' : 'false'} aria-sort={sortBy === f.key ? (sortDesc ? 'descending' : 'ascending') : undefined} on:click={() => onSort(f)}>
            {f.label}
            {#if sortBy === f.key}
              <span class="ml-[var(--gl-spacing-scale-2)] text-[color:var(--gl-table-sorting-icon-color)]" aria-hidden="true">{sortDesc ? '&darr;' : '&uarr;'}</span>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="group">
      {#if sorted.length}
        {#each sorted as row}
          <tr class="group:hover:bg-[var(--gl-table-row-background-color-hover)]">
            {#each fields as f}
              <td class="p-3 shadow-[inset_0_-1px_0_var(--gl-color-alpha-dark-8)] hover:bg-[var(--gl-table-row-background-color-hover)]">{row[f.key] ?? ''}</td>
            {/each}
          </tr>
        {/each}
      {:else}
        <tr>
          <td class="p-[var(--gl-spacing-scale-9)] px-[var(--gl-spacing-scale-5)] text-center text-[color:var(--gl-text-color-subtle)]" colspan={fields.length || 1}>No records found.</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  .g-spin { animation: g-spin 0.8s linear infinite; }
  @keyframes g-spin { to { transform: rotate(360deg); } }
</style>
