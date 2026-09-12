<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->

<template>
  <form class="gl-form" novalidate @submit.prevent="onSubmit">
    <!-- --gl-text-strong-color 未定义，映射 --gl-text-color-strong / --gl-text-subtle-color 未定义，映射 --gl-text-color-subtle -->
    <div class="gl-form-group">
      <label class="gl-form-label" for="gl-field">
        {{ label }}
        <span v-if="optional" class="gl-form-optional">(optional)</span>
      </label>
      <p v-if="helper" class="gl-form-helper">{{ helper }}</p>
      <slot />
      <p v-if="error" class="gl-form-feedback gl-form-feedback--invalid" role="alert">{{ error }}</p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'GlForm',
  props: {
    label: { type: String, default: '' },
    helper: { type: String, default: '' },
    error: { type: String, default: null },
    optional: { type: Boolean, default: false },
  },
  methods: {
    onSubmit(event) {
      this.$emit('submit', event);
    },
  },
};
</script>
<style scoped>
.gl-form { display: flex; flex-direction: column; }
.gl-form-group { display: flex; flex-direction: column; gap: var(--gl-spacing-scale-2); margin-bottom: var(--gl-spacing-scale-5); }
.gl-form-label {
  display: inline-flex; align-items: baseline; gap: var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-strong);
}
.gl-form-optional { color: var(--gl-text-color-subtle); font-weight: var(--gl-font-weight-normal); }
.gl-form-helper { margin: 0; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20); color: var(--gl-text-color-subtle); }
.gl-form-feedback { margin: 0; font-size: var(--gl-font-size-base); line-height: var(--gl-line-height-20); }
.gl-form-feedback--valid { color: var(--gl-control-text-color-valid); }
.gl-form-feedback--invalid { color: var(--gl-control-text-color-error); }

</style>
