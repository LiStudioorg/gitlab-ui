<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <div class="gl-form-input-wrap">
    <input
      class="gl-form-input"
      :class="classes"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="state === 'invalid' ? 'true' : undefined"
      @input="onInput"
    />
    <p v-if="state === 'invalid'" class="gl-form-feedback gl-form-feedback--invalid" role="alert">
      <slot name="invalidFeedback">Invalid value.</slot>
    </p>
    <p v-else-if="state === 'valid'" class="gl-form-feedback gl-form-feedback--valid">
      <slot name="validFeedback">Looks good.</slot>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  state: { type: String, default: null, validator: (v) => v === null || v === 'valid' || v === 'invalid' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  width: { type: String, default: null, validator: (v) => v === null || ['xs', 'sm', 'md', 'lg', 'xl'].includes(v) },
});
const emit = defineEmits(['update:modelValue']);

const classes = computed(() => [
  { 'is-valid': props.state === 'valid' },
  { 'is-invalid': props.state === 'invalid' },
  props.width ? 'gl-form-input--width-' + props.width : 'gl-form-input--width-null',
]);

function onInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>
<style scoped>
.gl-form-input-wrap { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-2); }
.gl-form-input {
  display: block; width: 100%;
  background-color: var(--gl-control-background-color-default);
  border: 1px solid var(--gl-control-border-color-default);
  border-radius: var(--gl-control-border-radius);
  color: var(--gl-text-color-default);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  padding: var(--gl-spacing-scale-3) var(--gl-spacing-scale-3);
  transition: border-color 150ms linear, box-shadow 150ms linear;
}
.gl-form-input::placeholder { color: var(--gl-control-placeholder-color); }
.gl-form-input:hover:not(:disabled):not([readonly]) { border-color: var(--gl-control-border-color-hover); }
.gl-form-input:focus { outline: none; border-color: var(--gl-control-border-color-focus); box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
.gl-form-input:disabled {
  background-color: var(--gl-control-background-color-disabled);
  border-color: var(--gl-control-border-color-disabled);
  color: var(--gl-text-color-disabled);
  cursor: not-allowed;
}
.gl-form-input[readonly] { background-color: var(--gl-control-background-color-readonly); cursor: default; }
.gl-form-input.is-invalid { border-color: var(--gl-control-border-color-error); }
.gl-form-input.is-invalid:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-control-border-color-error);
}
.gl-form-input.is-valid { border-color: var(--gl-text-color-success); }
.gl-form-input--width-xs { max-width: var(--gl-spacing-scale-31); }
.gl-form-input--width-sm { max-width: var(--gl-spacing-scale-37); }
.gl-form-input--width-md { max-width: var(--gl-spacing-scale-62); }
.gl-form-input--width-lg { max-width: var(--gl-spacing-scale-75); }
.gl-form-input--width-xl, .gl-form-input--width-null { max-width: 100%; }
.gl-form-feedback { margin: 0; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20); }
.gl-form-feedback--valid { color: var(--gl-control-text-color-valid); }
.gl-form-feedback--invalid { color: var(--gl-control-text-color-error); }

</style>
