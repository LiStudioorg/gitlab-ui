// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { component$, useSignal } from '@builder.io/qwik';
import type { QRL, QwikChangeEvent } from '@builder.io/qwik';

export interface InputProps {
  type?: string;
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  'readonly'?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  value?: string;
  onInput$?: QRL<(value: string, event: QwikChangeEvent<HTMLInputElement>) => void>;
  onChange$?: QRL<(value: string) => void>;
}

const WIDTH: Record<string, string> = {
  xs: 'max-width:var(--gl-spacing-scale-31);',
  sm: 'max-width:var(--gl-spacing-scale-37);',
  md: 'max-width:var(--gl-spacing-scale-48);',
  lg: 'max-width:var(--gl-spacing-scale-62);',
  xl: 'max-width:var(--gl-spacing-scale-75);',
};

export const GlInput = component$<InputProps>((props) => {
  const value = useSignal(props.value ?? '');
  const statement = 'g-spin';
  const width = props.width ?? null;
  const widthStyle = width && WIDTH[width] ? WIDTH[width] : '';
  return (
    <>
      <input
        class="g-input"
        style={widthStyle}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        value={value.value}
        data-state={props.state ?? ''}
        data-width={width ?? ''}
        disabled={props.disabled}
        readOnly={props['readonly']}
        aria-invalid={props.state === 'invalid'}
 preventdefault:oninput
        onInput$={(ev) => {
          const v = (ev.target as HTMLInputElement).value;
          value.value = v;
          props.onInput$?.(v, ev);
        }}
        onChange$={(ev) => props.onChange$?.((ev.target as HTMLInputElement).value)}
      />
      <style>{INPUT_CSS}</style>
    </>
  );
});

export default GlInput;
