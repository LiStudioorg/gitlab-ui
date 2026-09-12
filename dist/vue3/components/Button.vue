<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <button
    type="button"
    class="gl-button"
    :class="classes"
    :disabled="disabled"
    :aria-busy="loading ? 'true' : undefined"
    @click="onClick"
  >
    <span v-if="loading" class="gl-button-spinner" aria-hidden="true"><svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M14 8A6 6 0 0 0 8 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
    <span v-if="icon" class="gl-button-glyph" aria-hidden="true"><svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h12M8 2a10 10 0 0 1 0 12M8 2a10 10 0 0 0 0 12" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span>
    <span class="gl-button-label"><slot /></span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  category: { type: String, default: 'primary' },
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'medium' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  block: { type: Boolean, default: false },
});
const emit = defineEmits(['click']);

const classes = computed(() => [
  'gl-button--' + props.category,
  'gl-button--variant-' + props.variant,
  'gl-button--size-' + props.size,
  { 'gl-button--block': props.block },
]);

function onClick() {
  if (props.disabled || props.loading) return;
  emit('click');
}
</script>
<style scoped>
.gl-button {
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--gl-spacing-scale-2);
  border-radius: var(--gl-button-border-radius);
  border: 1px solid transparent;
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-semibold);
  line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4);
  cursor: pointer;
  transition: background-color 150ms linear, border-color 150ms linear, color 150ms linear;
}
.gl-button--size-medium { min-height: var(--gl-line-height-32); }
.gl-button--size-small { min-height: var(--gl-line-height-28); padding: var(--gl-spacing-scale-2) var(--gl-spacing-scale-3); }
.gl-button--block { display: flex; width: 100%; }
.gl-button:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-button:disabled { cursor: not-allowed; }
.gl-button-spinner, .gl-button-glyph { display: inline-flex; }
.gl-button .gl-svg { width: 1rem; height: 1rem; }

/* default variant */
.gl-button--variant-default.gl-button--primary {
  background-color: var(--gl-button-default-primary-background-color-default);
  border-color: var(--gl-button-default-primary-border-color-default);
  color: var(--gl-button-default-primary-foreground-color-default);
}
.gl-button--variant-default.gl-button--primary:hover {
  background-color: var(--gl-button-default-primary-background-color-hover);
  border-color: var(--gl-button-default-primary-border-color-hover);
}
.gl-button--variant-default.gl-button--primary:active {
  background-color: var(--gl-button-default-primary-background-color-active);
  border-color: var(--gl-button-default-primary-border-color-active);
}
.gl-button--variant-default.gl-button--secondary {
  background-color: var(--gl-button-confirm-secondary-background-color-default);
  border-color: var(--gl-button-confirm-secondary-border-color-default);
  color: var(--gl-button-confirm-secondary-foreground-color-default);
}
.gl-button--variant-default.gl-button--secondary:hover {
  background-color: var(--gl-button-confirm-secondary-background-color-hover);
  border-color: var(--gl-button-confirm-secondary-border-color-hover);
}
.gl-button--variant-default.gl-button--tertiary {
  background-color: var(--gl-button-default-tertiary-background-color-default);
  color: var(--gl-button-default-tertiary-foreground-color-default);
}
.gl-button--variant-default.gl-button--tertiary:hover {
  background-color: var(--gl-button-default-tertiary-background-color-hover);
}

/* confirm variant */
.gl-button--variant-confirm.gl-button--primary {
  background-color: var(--gl-button-confirm-primary-background-color-default);
  color: var(--gl-button-confirm-primary-foreground-color-default);
}
.gl-button--variant-confirm.gl-button--primary:hover {
  background-color: var(--gl-button-confirm-primary-background-color-hover);
}
.gl-button--variant-confirm.gl-button--primary:active {
  background-color: var(--gl-button-confirm-primary-background-color-active);
}
.gl-button--variant-confirm.gl-button--secondary {
  background-color: var(--gl-button-confirm-secondary-background-color-default);
  border-color: var(--gl-button-confirm-secondary-border-color-default);
  color: var(--gl-button-confirm-secondary-foreground-color-default);
}
.gl-button--variant-confirm.gl-button--secondary:hover {
  background-color: var(--gl-button-confirm-secondary-background-color-hover);
  border-color: var(--gl-button-confirm-secondary-border-color-hover);
}
.gl-button--variant-confirm.gl-button--tertiary {
  background-color: var(--gl-button-confirm-tertiary-background-color-default);
  color: var(--gl-button-confirm-tertiary-foreground-color-default);
}
.gl-button--variant-confirm.gl-button--tertiary:hover {
  background-color: var(--gl-button-confirm-tertiary-background-color-hover);
}

/* danger variant */
.gl-button--variant-danger.gl-button--primary {
  background-color: var(--gl-button-danger-primary-background-color-default);
  border-color: var(--gl-button-danger-primary-border-color-default);
  color: var(--gl-button-danger-primary-foreground-color-default);
}
.gl-button--variant-danger.gl-button--primary:hover {
  background-color: var(--gl-button-danger-primary-background-color-hover);
  border-color: var(--gl-button-danger-primary-border-color-hover);
}
.gl-button--variant-danger.gl-button--primary:active {
  background-color: var(--gl-button-danger-primary-background-color-active);
  border-color: var(--gl-button-danger-primary-border-color-active);
}
.gl-button--variant-danger.gl-button--secondary {
  background-color: var(--gl-button-danger-secondary-background-color-default);
  border-color: var(--gl-button-danger-secondary-border-color-default);
  color: var(--gl-button-danger-secondary-foreground-color-default);
}
.gl-button--variant-danger.gl-button--secondary:hover {
  background-color: var(--gl-button-danger-secondary-background-color-hover);
  border-color: var(--gl-button-danger-secondary-border-color-hover);
}
.gl-button--variant-danger.gl-button--tertiary {
  background-color: var(--gl-button-danger-tertiary-background-color-default);
  color: var(--gl-button-danger-tertiary-foreground-color-default);
}
.gl-button--variant-danger.gl-button--tertiary:hover {
  background-color: var(--gl-button-danger-tertiary-background-color-hover);
}

/* link variant */
.gl-button--variant-link {
  background-color: var(--gl-button-default-tertiary-background-color-default);
  border-color: transparent;
  color: var(--gl-button-link-text-color-default);
  padding-left: var(--gl-spacing-scale-3);
  padding-right: var(--gl-spacing-scale-3);
}
.gl-button--variant-link:hover {
  background-color: var(--gl-button-default-tertiary-background-color-hover);
  color: var(--gl-button-link-text-color-hover);
}

.gl-button:disabled {
  background-color: var(--gl-action-disabled-background-color) !important;
  border-color: var(--gl-action-disabled-border-color) !important;
  color: var(--gl-action-disabled-foreground-color) !important;
}
.gl-button-spinner { animation: gl-vue-spin 800ms linear infinite; }
@keyframes gl-vue-spin { to { transform: rotate(360deg); } }

</style>
