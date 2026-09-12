<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <div
    v-if="visible"
    class="gl-alert"
    :class="['gl-alert--' + variant, { 'gl-alert--sticky': sticky }]"
    :role="variant === 'danger' ? 'alert' : undefined"
  >
    <span class="gl-alert-icon" aria-hidden="true" v-html="alertIcon"></span>
    <div class="gl-alert-content">
      <h4 v-if="title" class="gl-alert-title">{{ title }}</h4>
      <div class="gl-alert-body"><slot /></div>
    </div>
    <button v-if="dismissible" type="button" class="gl-alert-close" aria-label="Close" @click="dismiss"><svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const ALERT_ICONS = {
  info: `<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 11.5V7.5M8 5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  success: `<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2L15 13.5H1L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5V10M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  danger: `<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2L15 13.5H1L8 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5V10M8 11.5v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  tip: `<svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5a4.5 4.5 0 0 0-3 7.9c.6.5 1 1.3 1 2.1v.5h4v-.5c0-.8.4-1.6 1-2.1A4.5 4.5 0 0 0 8 1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6.5 13.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};


const props = defineProps({
  variant: { type: String, default: 'info', validator: (v) => ['info', 'success', 'warning', 'danger', 'tip'].includes(v) },
  title: { type: String, default: '' },
  dismissible: { type: Boolean, default: true },
  sticky: { type: Boolean, default: false },
});
const emit = defineEmits(['dismiss']);

const visible = ref(true);

const alertIcon = computed(() => ALERT_ICONS[props.variant] || ALERT_ICONS.info);

function dismiss() {
  visible.value = false;
  emit('dismiss');
}
</script>
<style scoped>
.gl-alert {
  display: flex; align-items: flex-start; gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-4);
  border: 1px solid var(--gl-border-color-default);
  border-radius: var(--gl-alert-border-radius);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  color: var(--gl-text-color-default);
}
.gl-alert--sticky { position: sticky; top: var(--gl-spacing-scale-4); z-index: var(--gl-zindex-2); }
.gl-alert-icon { display: inline-flex; flex: none; margin-top: 1px; }
.gl-alert-icon .gl-svg { width: 1rem; height: 1rem; }
.gl-alert-content { flex: 1; min-width: 0; }
.gl-alert-title {
  margin: 0 0 var(--gl-spacing-scale-1);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  font-weight: var(--gl-font-weight-bold);
}
.gl-alert-close {
  flex: none; display: inline-flex; align-items: center; justify-content: center;
  margin: -var(--gl-spacing-scale-2);
  padding: var(--gl-spacing-scale-2);
  border: 0; border-radius: var(--gl-border-radius-default);
  background: none; color: inherit; cursor: pointer;
}
.gl-alert-close:hover { background-color: var(--gl-color-alpha-dark-4); }
.gl-alert-close:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-alert-close .gl-svg { width: 1rem; height: 1rem; }
.gl-alert--info { background-color: var(--gl-alert-info-background-color); border-color: var(--gl-alert-info-border-color); }
.gl-alert--info .gl-alert-title { color: var(--gl-alert-info-title-color); }
.gl-alert--info .gl-alert-icon { color: var(--gl-feedback-info-icon-color); }
.gl-alert--success { background-color: var(--gl-alert-success-background-color); border-color: var(--gl-alert-success-border-color); }
.gl-alert--success .gl-alert-title { color: var(--gl-alert-success-title-color); }
.gl-alert--success .gl-alert-icon { color: var(--gl-feedback-success-icon-color); }
.gl-alert--warning { background-color: var(--gl-alert-warning-background-color); border-color: var(--gl-alert-warning-border-color); }
.gl-alert--warning .gl-alert-title { color: var(--gl-alert-warning-title-color); }
.gl-alert--warning .gl-alert-icon { color: var(--gl-feedback-warning-icon-color); }
.gl-alert--danger { background-color: var(--gl-alert-danger-background-color); border-color: var(--gl-alert-danger-border-color); }
.gl-alert--danger .gl-alert-title { color: var(--gl-alert-danger-title-color); }
.gl-alert--danger .gl-alert-icon { color: var(--gl-feedback-danger-icon-color); }
.gl-alert--tip { background-color: var(--gl-feedback-brand-background-color); border-color: var(--gl-feedback-brand-border-color); }
.gl-alert--tip .gl-alert-title { color: var(--gl-feedback-brand-text-color); }
.gl-alert--tip .gl-alert-icon { color: var(--gl-feedback-brand-icon-color); }

</style>
