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

<div class="g-form-group">
  {#if label}
    <label class="g-form-label">
      {label}
      {#if optional}<span class="g-optional">(optional)</span>{/if}
    </label>
  {/if}
  <slot></slot>
  {#if feedback}
    <p class="g-feedback" data-kind={feedback.kind}>{feedback.text}</p>
  {/if}
  {#if helper}
    <p class="g-helper">{helper}</p>
  {/if}
</div>

<style>
.g-form-group { margin-bottom: var(--gl-spacing-scale-5); }
.g-form-label { display: block; font-weight: var(--gl-font-weight-bold); font-size: var(--gl-font-size-base); color: var(--gl-text-color-strong); margin-bottom: var(--gl-spacing-scale-2); }
.g-optional { color: var(--gl-text-color-subtle); font-weight: var(--gl-font-weight-normal); }
.g-feedback { font-size: var(--gl-font-size-sm); margin-top: var(--gl-spacing-scale-2); margin-bottom: 0; }
.g-feedback[data-kind='invalid'] { color: var(--gl-control-text-color-error); }
.g-feedback[data-kind='valid'] { color: var(--gl-control-text-color-valid); }
.g-helper { font-size: var(--gl-font-size-sm); color: var(--gl-text-color-subtle); margin-top: var(--gl-spacing-scale-2); margin-bottom: 0; }
</style>
