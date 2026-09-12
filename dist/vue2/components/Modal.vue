<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <div v-if="visible" class="gl-modal-backdrop" @click.self="close">
    <div
      class="gl-modal"
      :class="'gl-modal--' + size"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gl-modal-title"
    >
      <header class="gl-modal-header">
        <!-- --gl-modal-medium-width 未在 variables.css 定义，映射 --gl-spacing-scale-48 -->
        <h4 id="gl-modal-title" class="gl-modal-title">{{ title }}</h4>
        <button type="button" class="gl-modal-close" aria-label="Close" @click="close"><svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
      </header>
      <div class="gl-modal-body"><slot /></div>
      <footer v-if="primaryAction || secondaryAction" class="gl-modal-footer">
        <button
          v-if="secondaryAction"
          type="button"
          class="gl-button gl-button--secondary"
          @click="onSecondary"
        >{{ secondaryAction.text }}</button>
        <button
          v-if="primaryAction"
          type="button"
          class="gl-button gl-button--primary"
          :class="'gl-button--variant-' + (primaryAction.variant || 'default')"
          @click="onPrimary"
        >{{ primaryAction.text }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlModal',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
    primaryAction: { type: Object, default: () => null },
    secondaryAction: { type: Object, default: () => null },
    onClose: { type: Function, default: null },
  },
  mounted() {
    if (this.visible) document.addEventListener('keydown', this.onKeydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    close() {
      this.$emit('change', false);
      this.$emit('close');
      if (this.onClose) this.onClose();
    },
    onPrimary() {
      this.$emit('primary');
      this.close();
    },
    onSecondary() {
      this.$emit('secondary');
      this.close();
    },
    onKeydown(event) {
      if (event.key === 'Escape') this.close();
    },
  },
};
</script>
<style scoped>
.gl-modal-backdrop {
  position: fixed; inset: 0; z-index: var(--gl-zindex-4);
  display: flex; align-items: center; justify-content: center;
  background-color: var(--gl-background-color-overlay);
}
.gl-modal {
  display: flex; flex-direction: column;
  width: var(--gl-spacing-scale-48);
  max-width: calc(100vw - calc(var(--gl-spacing-scale-6) * 2));
  background-color: var(--gl-background-color-default);
  border-radius: var(--gl-modal-border-radius);
  box-shadow: var(--gl-shadow-lg);
  overflow: hidden;
}
.gl-modal--sm { width: var(--gl-spacing-scale-31); }
.gl-modal--lg { width: var(--gl-spacing-scale-62); }
.gl-modal-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: var(--gl-spacing-scale-4);
  padding: var(--gl-spacing-scale-5) var(--gl-spacing-scale-5) var(--gl-spacing-scale-3);
}
.gl-modal-title {
  margin: 0;
  font-size: var(--gl-heading-scale-500-fixed-font-size);
  font-weight: var(--gl-font-weight-bold);
  line-height: var(--gl-line-height-24);
  color: var(--gl-text-color-heading);
}
.gl-modal-close {
  display: inline-flex; align-items: center; justify-content: center;
  flex: none;
  border: 0; border-radius: var(--gl-border-radius-default);
  background-color: var(--gl-button-default-tertiary-background-color-default);
  color: var(--gl-text-color-strong);
  cursor: pointer;
  padding: var(--gl-spacing-scale-2);
}
.gl-modal-close:hover { background-color: var(--gl-button-default-tertiary-background-color-hover); }
.gl-modal-close:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-modal-close .gl-svg { width: 1rem; height: 1rem; }
.gl-modal-body {
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-5) var(--gl-spacing-scale-5);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-24);
  color: var(--gl-text-color-default);
}
.gl-modal-footer {
  display: flex; flex-wrap: wrap; gap: var(--gl-spacing-scale-3);
  padding: var(--gl-spacing-scale-5);
  border-top: 1px solid var(--gl-border-color-default);
}
.gl-modal-footer .gl-button { font-size: var(--gl-font-size-base); cursor: pointer; padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-4); }
.gl-modal-footer .gl-button--secondary {
  background-color: var(--gl-button-confirm-secondary-background-color-default);
  border: 1px solid var(--gl-button-confirm-secondary-border-color-default);
  border-radius: var(--gl-button-border-radius);
  color: var(--gl-button-confirm-secondary-foreground-color-default);
}
.gl-modal-footer .gl-button--secondary:hover { background-color: var(--gl-button-confirm-secondary-background-color-hover); }
.gl-modal-enter-active, .gl-modal-leave-active { transition: opacity 150ms linear; }
.gl-modal-enter-active .gl-modal, .gl-modal-leave-active .gl-modal { transition: transform 150ms linear, opacity 150ms linear; }
.gl-modal-enter-from, .gl-modal-leave-to { opacity: 0; }
.gl-modal-enter-from .gl-modal, .gl-modal-leave-to .gl-modal { transform: scale(0.98); opacity: 0; }

</style>
