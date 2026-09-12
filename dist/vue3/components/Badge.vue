<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <component
    :is="badgeTag"
    class="gl-badge"
    :class="'gl-badge--' + variant"
    :href="href || undefined"
  >
    <span v-if="icon" class="gl-badge-icon" aria-hidden="true"><svg class="gl-svg" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h12M8 2a10 10 0 0 1 0 12M8 2a10 10 0 0 0 0 12" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span>
    <span class="gl-badge-content"><slot /></span>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'neutral', validator: (v) => ['neutral', 'info', 'success', 'warning', 'danger', 'tier'].includes(v) },
  icon: { type: String, default: null },
  href: { type: String, default: null },
});

const badgeTag = computed(() => (props.href ? 'a' : 'span'));
</script>
<style scoped>
.gl-badge {
  display: inline-flex; align-items: center; gap: var(--gl-spacing-scale-1);
  min-width: var(--gl-spacing-scale-3);
  padding: 1px var(--gl-spacing-scale-2);
  border-radius: var(--gl-border-radius-full);
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  font-weight: var(--gl-font-weight-semibold);
  text-decoration: none;
}
.gl-badge .gl-svg { width: 0.75rem; height: 0.75rem; }
.gl-badge--neutral { background-color: var(--gl-badge-neutral-background-color-default); color: var(--gl-badge-neutral-text-color-default); }
.gl-badge--info { background-color: var(--gl-badge-info-background-color-default); color: var(--gl-badge-info-text-color-default); }
.gl-badge--success { background-color: var(--gl-badge-success-background-color-default); color: var(--gl-badge-success-text-color-default); }
.gl-badge--warning { background-color: var(--gl-badge-warning-background-color-default); color: var(--gl-badge-warning-text-color-default); }
.gl-badge--danger { background-color: var(--gl-badge-danger-background-color-default); color: var(--gl-badge-danger-text-color-default); }
.gl-badge--tier { background-color: var(--gl-badge-tier-background-color-default); color: var(--gl-badge-tier-text-color-default); }
a.gl-badge--neutral:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-neutral-border-color-hover); }
a.gl-badge--info:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-info-border-color-hover); }
a.gl-badge--success:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-success-border-color-hover); }
a.gl-badge--warning:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-warning-border-color-hover); }
a.gl-badge--danger:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-danger-border-color-hover); }
a.gl-badge--tier:hover { box-shadow: inset 0 0 0 1px var(--gl-badge-tier-border-color-hover); }

</style>
