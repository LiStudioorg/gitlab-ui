// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import type { JSX } from 'solid-js';

export interface FormProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  state?: 'valid' | 'invalid' | null;
  children?: JSX.Element;
}

export function Form(props: FormProps) {
  const error = () => props.error ?? null;
  const state = () => props.state ?? null;
  const feedback = () =>
    error()
      ? { text: error() as string, kind: 'invalid' }
      : state() === 'valid'
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
        {props.children}
        {feedback() ? <p class="g-feedback" data-kind={feedback()!.kind}>{feedback()!.text}</p> : null}
        {props.helper ? <p class="g-helper">{props.helper}</p> : null}
      </div>
      <style>{FORM_CSS}</style>
    </>
  );
}

export default Form;
