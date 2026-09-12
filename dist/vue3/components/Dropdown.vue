<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <div ref="root" class="gl-dropdown">
    <button
      ref="trigger"
      type="button"
      class="gl-dropdown-toggle"
      :aria-haspopup="'menu'"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggle"
    >
      {{ text }}
      <svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        ref="menu"
        class="gl-dropdown-menu"
        :style="menuStyle"
        role="menu"
        @click.stop
      >
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item.divider" class="gl-dropdown-divider" role="separator"></div>
          <div v-else-if="item.header" class="gl-dropdown-header" role="presentation">{{ item.text }}</div>
          <button
            v-else
            type="button"
            class="gl-dropdown-item"
            :class="{ 'gl-dropdown-item--checked': isChecked(item) }"
            role="menuitemcheckbox"
            :aria-checked="isChecked(item) ? 'true' : 'false'"
            :disabled="item.disabled"
            @click="select(item)"
          >
            <span class="gl-dropdown-item-label">{{ item.text }}</span>
            <span v-if="isChecked(item)" class="gl-dropdown-item-check"><svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          </button>
        </template>
        <button v-if="showClearAll" type="button" class="gl-dropdown-clear-all" @click="clearAll">Clear all</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';

const props = defineProps({
  text: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  showClearAll: { type: Boolean, default: false },
  onSelect: { type: Function, default: null },
});
const emit = defineEmits(['select', 'clear-all']);

const root = ref(null);
const trigger = ref(null);
const menu = ref(null);
const open = ref(false);
const position = ref({ top: 0, left: 0, minWidth: '12rem' });
const checked = ref(new Set());

const menuStyle = computed(() => ({
  top: position.value.top + 'px',
  left: position.value.left + 'px',
  minWidth: position.value.minWidth,
}));

function isChecked(item) {
  return checked.value.has(item.value);
}

function measure() {
  if (!trigger.value) return;
  const rect = trigger.value.getBoundingClientRect();
  position.value = { top: rect.bottom, left: rect.left, minWidth: rect.width + 'px' };
}

function openMenu() {
  measure();
  open.value = true;
}
function closeAll() {
  open.value = false;
}
function toggle() {
  if (open.value) closeAll();
  else openMenu();
}

function onDocClick(event) {
  if (!open.value) return;
  if (root.value && root.value.contains(event.target)) return;
  if (menu.value && menu.value.contains(event.target)) return;
  closeAll();
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('mousedown', onDocClick);
  else document.removeEventListener('mousedown', onDocClick);
});
onUnmounted(() => document.removeEventListener('mousedown', onDocClick));

function select(item) {
  if (item.disabled) return;
  if ('checked' in item) {
    const next = new Set(checked.value);
    if (next.has(item.value)) next.delete(item.value);
    else next.add(item.value);
    checked.value = next;
  } else {
    closeAll();
  }
  emit('select', item);
  if (props.onSelect) props.onSelect(item);
}

function clearAll() {
  checked.value = new Set();
  emit('clear-all');
  closeAll();
}
</script>
<style scoped>
.gl-dropdown { display: inline-block; position: relative; }
.gl-dropdown-toggle {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
  border: 1px solid var(--gl-button-default-primary-border-color-default);
  border-radius: var(--gl-button-border-radius);
  background-color: var(--gl-button-default-primary-background-color-default);
  color: var(--gl-button-default-primary-foreground-color-default);
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  cursor: pointer;
}
.gl-dropdown-toggle:hover {
  background-color: var(--gl-button-default-primary-background-color-hover);
  border-color: var(--gl-button-default-primary-border-color-hover);
}
.gl-dropdown-toggle:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-dropdown-toggle .gl-svg { width: 1rem; height: 1rem; }
.gl-dropdown-menu {
  position: fixed; z-index: var(--gl-zindex-3);
  display: flex; flex-direction: column;
  min-width: 12rem;
  margin-top: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-2);
  background-color: var(--gl-dropdown-background-color);
  border: 1px solid var(--gl-dropdown-border-color);
  border-radius: var(--gl-dropdown-border-radius);
  box-shadow: var(--gl-shadow-sm);
}
.gl-dropdown-header {
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  font-size: var(--gl-font-size-sm); font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-subtle);
}
.gl-dropdown-item {
  display: flex; align-items: center; justify-content: space-between; gap: var(--gl-spacing-scale-3);
  width: 100%;
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  border: 0; border-radius: var(--gl-border-radius-default);
  background-color: var(--gl-dropdown-option-background-color-unselected-default);
  color: var(--gl-dropdown-option-text-color-default);
  font-size: var(--gl-font-size-base); text-align: left; cursor: pointer;
}
.gl-dropdown-item:hover {
  background-color: var(--gl-dropdown-option-background-color-unselected-hover);
  color: var(--gl-dropdown-option-text-color-hover);
}
.gl-dropdown-item--checked {
  background-color: var(--gl-dropdown-option-background-color-selected-default);
  color: var(--gl-dropdown-option-text-color-default);
}
.gl-dropdown-item--checked:hover { background-color: var(--gl-dropdown-option-background-color-selected-hover); }
.gl-dropdown-item:disabled {
  background: none; color: var(--gl-dropdown-option-text-color-disabled); cursor: not-allowed;
}
.gl-dropdown-item:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-dropdown-item-check { display: inline-flex; color: var(--gl-dropdown-option-indicator-color-selected-default); }
.gl-dropdown-item-check .gl-svg { width: 1rem; height: 1rem; }
.gl-dropdown-divider { height: 1px; margin: var(--gl-spacing-scale-2) 0; background-color: var(--gl-dropdown-divider-color); }
.gl-dropdown-clear-all {
  margin-top: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-4);
  align-self: flex-start;
  border: 0; background: none;
  color: var(--gl-button-link-text-color-default);
  font-size: var(--gl-font-size-sm); cursor: pointer; text-decoration: underline;
}
.gl-dropdown-clear-all:hover { color: var(--gl-button-link-text-color-hover); }
.gl-dropdown-clear-all:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-dropdown-menu-enter-active { transition: opacity 120ms linear, transform 120ms linear; }
.gl-dropdown-menu-enter-from { opacity: 0; transform: translateY(-0.125rem); }

</style>
