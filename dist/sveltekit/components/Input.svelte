<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let type = 'text';
  export let placeholder = '';
  export let state = null;
  export let disabled = false;
  export let readonly = false;
  export let width = null;
  export let value = '';

  const dispatch = createEventDispatcher();

  const WIDTH = {
    xs: 'var(--gl-spacing-scale-31)',
    sm: 'var(--gl-spacing-scale-37)',
    md: 'var(--gl-spacing-scale-48)',
    lg: 'var(--gl-spacing-scale-62)',
    xl: 'var(--gl-spacing-scale-75)',
  };

  $: widthClass = width && WIDTH[width]
    ? 'max-w-[var(--gl-spacing-scale-48)]'
    : '';
  $: widthStyle = width && WIDTH[width] ? 'max-width:' + WIDTH[width] + ';' : '';
  $: inputClass = [
    'g-input',
    'w-full',
    'rounded-[var(--gl-control-border-radius)]',
    'px-[var(--gl-spacing-scale-3)]',
    'py-[var(--gl-spacing-scale-3)]',
    'text-[length:var(--gl-font-size-base)]',
    'leading-[var(--gl-line-height-20)]',
    'bg-[var(--gl-control-background-color-default)]',
    state === 'invalid' ? 'border-[var(--gl-control-border-color-error)]' : 'border-[var(--gl-control-border-color-default)]',
    state === 'valid' ? 'shadow-[inset_0_0_0_1px_var(--gl-control-text-color-valid)]' : '',
  ]
    .filter(Boolean)
    .join(' ');

  function onInput(e) {
    dispatch('input', { value: e.currentTarget.value });
  }
  function onChange(e) {
    dispatch('change', { value: e.currentTarget.value });
  }
</script>

<input
  class={inputClass}
  style={widthStyle}
  type={type}
  placeholder={placeholder}
  bind:value
  disabled={disabled}
  readonly={readonly || undefined}
  aria-invalid={state === 'invalid'}
  on:input={onInput}
  on:change={onChange}
/>

<style>
  .g-input {
    color: var(--gl-text-color-default);
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }
  .g-input::placeholder { color: var(--gl-control-placeholder-color); }
  .g-input:hover:not(:disabled):not([readonly]) { border-color: var(--gl-control-border-color-hover); }
  .g-input:focus-visible { outline: none; border-color: var(--gl-control-border-color-focus); box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color); }
  .g-input:disabled {
    background-color: var(--gl-control-background-color-disabled); color: var(--gl-text-color-disabled);
    border-color: var(--gl-control-border-color-disabled); cursor: not-allowed;
  }
  .g-input[readonly] { background-color: var(--gl-control-background-color-readonly); }
</style>
