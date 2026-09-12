<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <div>
    <div class="gl-tabs-wrapper">
      <div class="gl-tabs-nav" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          type="button"
          class="gl-tab-nav-item"
          :class="{ 'gl-tab-nav-item--active': index === activeIndex, 'gl-tab-nav-item--disabled': tab.disabled }"
          role="tab"
          :aria-selected="index === activeIndex ? 'true' : 'false'"
          :disabled="tab.disabled"
          @click="activate(index)"
        >
          {{ tab.title }}
          <span v-if="tab.count != null" class="gl-tab-count" aria-label="count">{{ tab.count }}</span>
        </button>
      </div>
    </div>
    <div class="gl-tab-content" role="tabpanel">
      <slot :name="'tab-' + activeIndex" :tab="currentTab">
        <span class="gl-tab-content-text">{{ currentContent }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  tabs: { type: Array, default: () => [] },
  active: { type: Number, default: 0 },
  onChange: { type: Function, default: null },
});
const emit = defineEmits(['update:active', 'change']);

const activeIndex = ref(props.active);
watch(
  () => props.active,
  (v) => { activeIndex.value = v; }
);

const currentTab = computed(() => props.tabs[activeIndex.value] || {});
const currentContent = computed(() => currentTab.value.content || '');

function activate(index) {
  if (props.tabs[index] && props.tabs[index].disabled) return;
  activeIndex.value = index;
  emit('update:active', index);
  emit('change', index);
  if (props.onChange) props.onChange(index);
}
</script>
<style scoped>
.gl-tabs-wrapper { border-bottom: 1px solid var(--gl-border-color-default); }
.gl-tabs-nav { display: flex; gap: var(--gl-spacing-scale-2); overflow-x: auto; }
.gl-tab-nav-item {
  position: relative;
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-4) var(--gl-spacing-scale-5);
  border: 0; background: none;
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  color: var(--gl-text-color-subtle);
  cursor: pointer;
  white-space: nowrap;
}
.gl-tab-nav-item:hover { background-color: var(--gl-action-neutral-background-color-hover); }
.gl-tab-nav-item:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-tab-nav-item::after {
  content: ''; position: absolute; left: var(--gl-spacing-scale-4); right: var(--gl-spacing-scale-4); bottom: 0;
  height: 2px; border-radius: var(--gl-border-radius-full);
  background-color: transparent;
}
.gl-tab-nav-item:hover::after { background-color: var(--gl-border-color-strong); }
.gl-tab-nav-item--active { color: var(--gl-text-color-strong); font-weight: var(--gl-font-weight-bold); }
.gl-tab-nav-item--active::after { background-color: var(--gl-tab-selected-indicator-color-default); }
.gl-tab-nav-item--active:hover::after { background-color: var(--gl-tab-selected-indicator-color-default); }
.gl-tab-nav-item:disabled, .gl-tab-nav-item--disabled { color: var(--gl-action-disabled-foreground-color); cursor: not-allowed; }
.gl-tab-nav-item:disabled::after, .gl-tab-nav-item--disabled::after { display: none; }
.gl-tab-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: var(--gl-line-height-20);
  height: var(--gl-line-height-20);
  padding: 0 var(--gl-spacing-scale-2);
  border-radius: var(--gl-border-radius-full);
  background-color: var(--gl-badge-neutral-background-color-default);
  color: var(--gl-badge-neutral-text-color-default);
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-semibold);
}
.gl-tab-content { padding: var(--gl-spacing-scale-5) 0; font-size: var(--gl-font-size-base); color: var(--gl-text-color-default); }

</style>
