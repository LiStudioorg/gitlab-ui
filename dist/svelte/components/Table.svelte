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
  <div class="g-table-loading" role="status"><svg class="g-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"></circle><path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg> Loading&hellip;</div>
{/if}
<div class="g-table-wrap">
  <table class="g-table" data-busy={loading}>
    <thead>
      <tr>
        {#each fields as f}
          <th
            data-sortable={f.sortable ? 'true' : 'false'}
            aria-sort={sortBy === f.key ? (sortDesc ? 'descending' : 'ascending') : undefined}
            on:click={() => onSort(f)}
          >
            {f.label}
            {#if sortBy === f.key}
              <span class="g-arrow" aria-hidden="true">{sortDesc ? '&darr;' : '&uarr;'}</span>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if sorted.length}
        {#each sorted as row}
          <tr>
            {#each fields as f}
              <td>{row[f.key] ?? ''}</td>
            {/each}
          </tr>
        {/each}
      {:else}
        <tr>
          <td class="g-empty" colspan={fields.length || 1}>No records found.</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
.g-table-loading { display: flex; align-items: center; gap: var(--gl-spacing-scale-2); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-3); }
.g-table-wrap { overflow: auto; }
.g-table { width: 100%; border-collapse: collapse; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }
.g-table[data-busy='true'] { opacity: var(--gl-opacity-7); pointer-events: none; }
.g-table th { text-align: left; font-weight: var(--gl-font-weight-bold); color: var(--gl-text-color-subtle); padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-border-color-default); position: sticky; top: 0; background-color: var(--gl-color-alpha-0); }
.g-table th[data-sortable='true'] { cursor: pointer; user-select: none; }
.g-table th[data-sortable='true']:hover { color: var(--gl-text-color-strong); }
.g-table td { padding: var(--gl-spacing-scale-3); box-shadow: inset 0 -1px 0 var(--gl-color-alpha-dark-8); }
.g-table tbody tr:hover td { background-color: var(--gl-table-row-background-color-hover); }
.g-table .g-arrow { color: var(--gl-table-sorting-icon-color); margin-left: var(--gl-spacing-scale-2); }
.g-table .g-empty { text-align: center; padding: var(--gl-spacing-scale-9) var(--gl-spacing-scale-5); color: var(--gl-text-color-subtle); }
.g-spin { animation: g-spin 0.8s linear infinite; }
@keyframes g-spin { to { transform: rotate(360deg); } }
</style>
