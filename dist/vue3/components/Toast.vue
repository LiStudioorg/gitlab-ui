<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <Teleport to="body">
    <div class="gl-toaster">
      <Transition name="gl-toast">
        <div v-if="visible" class="gl-toast" role="status" aria-live="polite">
          <div class="gl-toast-body">{{ message }}</div>
          <button v-if="action" type="button" class="gl-toast-action" @click="onAction">{{ action.text }}</button>
          <button type="button" class="gl-toast-close" aria-label="Close" @click="dismiss"><svg class="gl-svg gl-svg--sm" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const props = defineProps({
  message: { type: String, default: '' },
  action: { type: Object, default: null },
  autoHideDelay: { type: Number, default: 5000 },
  onDismiss: { type: Function, default: null },
});
const emit = defineEmits(['dismiss', 'action']);

const visible = ref(true);

const alertIcon = computed(() => ALERT_ICONS[props.variant] || ALERT_ICONS.info);
let timer = null;

function vanish() {
  visible.value = false;
  emit('dismiss');
  if (props.onDismiss) props.onDismiss();
}
function dismiss() {
  clearTimeout(timer);
  vanish();
}
function onAction() {
  emit('action');
  if (props.action && props.action.onClick) props.action.onClick();
  clearTimeout(timer);
  vanish();
}

timer = setTimeout(dismiss, Math.max(props.autoHideDelay, 1000));
onUnmounted(() => clearTimeout(timer));
</script>
<style scoped>
.gl-toaster { position: fixed; bottom: var(--gl-spacing-scale-6); left: var(--gl-spacing-scale-6); z-index: var(--gl-zindex-200); }
.gl-toast {
  display: flex; align-items: center; gap: var(--gl-spacing-scale-3);
  max-width: var(--gl-spacing-scale-62);
  padding: var(--gl-spacing-scale-4) var(--gl-spacing-scale-4);
  background-color: var(--gl-feedback-strong-background-color);
  color: var(--gl-feedback-strong-text-color);
  border-radius: var(--gl-border-radius-full);
  box-shadow: var(--gl-shadow-md);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
}
.gl-toast-body { flex: 1; min-width: 0; }
.gl-toast-action {
  flex: none; border: 0; background: none; padding: 0;
  color: var(--gl-feedback-strong-link-color);
  font-size: var(--gl-font-size-base); font-weight: var(--gl-font-weight-semibold);
  text-decoration: underline; cursor: pointer;
}
.gl-toast-close {
  flex: none; display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: var(--gl-border-radius-default);
  background: none; color: inherit; cursor: pointer; padding: var(--gl-spacing-scale-1);
}
.gl-toast-close:hover { background-color: var(--gl-color-alpha-light-4); }
.gl-toast-close:focus-visible, .gl-toast-action:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
}
.gl-toast-enter-active, .gl-toast-leave-active { transition: opacity 150ms linear, transform 150ms linear; }
.gl-toast-enter-from, .gl-toast-leave-to { opacity: 0; transform: translateY(0.25rem); }

</style>
