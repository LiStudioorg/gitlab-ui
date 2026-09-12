<!-- Pajamas-inspired (MIT, from @gitlab/ui tokens) -->
<script>
  export let label = '';
  export let helper = '';
  export let error = null;
  export let optional = false;
  export let state = null;

  $: feedback = error
    ? { text: error, kind: 'invalid' }
    : state === 'valid'
      ? { text: 'Looks good.', kind: 'valid' }
      : null;
</script>

<div class="g-form-group mb-[var(--gl-spacing-scale-5)]">
  {#if label}
    <label class="mb-[var(--gl-spacing-scale-2)] block text-[length:var(--gl-font-size-base)] font-bold text-[color:var(--gl-text-color-strong)]">
      {label}
      {#if optional}<span class="font-normal text-[color:var(--gl-text-color-subtle)]">(optional)</span>{/if}
    </label>
  {/if}
  <slot></slot>
  {#if feedback}
    <p class="mt-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] {feedback.kind === 'invalid' ? 'text-[color:var(--gl-control-text-color-error)]' : 'text-[color:var(--gl-control-text-color-valid)]'}">{feedback.text}</p>
  {/if}
  {#if helper}
    <p class="mt-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">{helper}</p>
  {/if}
</div>
