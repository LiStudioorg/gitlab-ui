// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, Slot } from '@builder.io/qwik';

export interface FormProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  state?: 'valid' | 'invalid' | null;
}

export const GlForm = component$<FormProps>((props) => {
  const error = props.error ?? null;
  const state = props.state ?? null;
  const feedback = error
    ? { text: error, kind: 'invalid' }
    : state === 'valid'
      ? { text: 'Looks good.', kind: 'valid' }
      : null;
  return (
    <>
      <div class="g-form-group">
        {props.label ? (
          <label class="g-form-label">
            {props.label}
            {props.optional ? <span class="g-optional">(optional)</span> : null}
          </label>
        ) : null}
        <Slot />
        {feedback ? <p class="g-feedback" data-kind={feedback.kind}>{feedback.text}</p> : null}
        {props.helper ? <p class="g-helper">{props.helper}</p> : null}
      </div>
      <style>{FORM_CSS}</style>
    </>
  );
});

export default GlForm;
