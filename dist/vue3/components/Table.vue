<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <table class="gl-table">
    <thead>
      <tr>
        <th v-for="field in parsedFields" :key="field.key" scope="col">
          <button
            v-if="field.sortable"
            type="button"
            class="gl-table-sort-btn"
            :aria-sort="sortKey === field.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'"
            @click="onSort(field)"
          >
            {{ field.label }}
            <span class="gl-table-sort-icon">{{ sortKey === field.key ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}</span>
          </button>
          <template v-else>{{ field.label }}</template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td :colspan="parsedFields.length" class="gl-table-busy" aria-busy="true">
          <svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8A6 6 0 0 0 8 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Loading&hellip;</span>
        </td>
      </tr>
      <tr v-else-if="rows.length === 0">
        <td :colspan="parsedFields.length" class="gl-table-empty">
          <slot name="empty">No data available.</slot>
        </td>
      </tr>
      <tr v-for="row in rows" :key="row.index" @click="$emit('row-clicked', row.row, row.index)">
        <td v-for="field in parsedFields" :key="field.key">{{ row.row[field.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  fields: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  sortBy: { type: String, default: null },
  sortDesc: { type: Boolean, default: false },
});
const emit = defineEmits(['sort-changed', 'row-clicked']);

const sortKey = ref(props.sortBy);
const sortOrder = ref(props.sortDesc ? 'desc' : 'asc');

const parsedFields = computed(() => {
  if (props.fields && props.fields.length) return props.fields;
  const first = props.items[0] || {};
  return Object.keys(first).map((key) => ({ key, label: key, sortable: false }));
});

const rows = computed(() => {
  const list = props.items.map((row, index) => ({ row, index }));
  if (!sortKey.value) return list;
  const key = sortKey.value;
  const order = sortOrder.value;
  return list.slice().sort((a, b) => {
    const av = a.row[key];
    const bv = b.row[key];
    let cmp = 0;
    if (av > bv) cmp = 1;
    else if (av < bv) cmp = -1;
    return order === 'desc' ? -cmp : cmp;
  });
});

function onSort(field) {
  if (!field.sortable) return;
  if (sortKey.value === field.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = field.key;
    sortOrder.value = 'asc';
  }
  emit('sort-changed', { sortBy: sortKey.value, sortDesc: sortOrder.value === 'desc' });
}
</script>
<style scoped>
.gl-table { width: 100%; border-collapse: collapse; }
.gl-table th, .gl-table td {
  padding: var(--gl-spacing-scale-3);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  text-align: left;
  color: var(--gl-text-color-default);
}
.gl-table thead th {
  background-color: var(--gl-color-alpha-0);
  box-shadow: inset 0 -1px 0 var(--gl-border-color-default);
  color: var(--gl-text-color-strong);
  font-weight: var(--gl-font-weight-bold);
}
.gl-table tbody tr { transition: background-color 100ms linear; cursor: pointer; }
.gl-table tbody tr:hover { background-color: var(--gl-table-row-background-color-hover); }
.gl-table .gl-table-sort-btn {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-1);
  padding: 0; border: 0; background: none;
  font: inherit; font-weight: var(--gl-font-weight-bold);
  color: inherit; cursor: pointer;
}
.gl-table .gl-table-sort-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-table-sort-icon { color: var(--gl-table-sorting-icon-color); font-size: var(--gl-font-size-sm); }
.gl-table td.gl-table-empty, .gl-table td.gl-table-busy {
  padding: var(--gl-spacing-scale-8) var(--gl-spacing-scale-3);
  text-align: center;
  color: var(--gl-text-color-subtle);
}
.gl-table-busy { display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2); }
.gl-table-busy .gl-svg { width: 1rem; height: 1rem; animation: gl-vue-spin 800ms linear infinite; }
@keyframes gl-vue-spin { to { transform: rotate(360deg); } }

</style>
