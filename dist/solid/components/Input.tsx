// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import { createSignal } from 'solid-js';

export interface InputProps {
  type?: string;
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  'readonly'?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  value?: string;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
}

const WIDTH: Record<string, string> = {
  xs: 'max-width:var(--gl-spacing-scale-31);',
  sm: 'max-width:var(--gl-spacing-scale-37);',
  md: 'max-width:var(--gl-spacing-scale-48);',
  lg: 'max-width:var(--gl-spacing-scale-62);',
  xl: 'max-width:var(--gl-spacing-scale-75);',
};

export function Input(props: InputProps) {
  const [value, setValue] = createSignal(props.value ?? '');
  const state = () => props.state ?? null;
  const width = () => props.width ?? null;
  const widthStyle = () => (width() && WIDTH[width()!] ? WIDTH[width()!] : '');
  return (
    <>
      <input
        class="g-input"
        style={widthStyle()}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        value={value()}
        data-state={state() ?? ''}
        data-width={width() ?? ''}
        disabled={props.disabled}
        readonly={props['readonly']}
        aria-invalid={state() === 'invalid'}
        onInput={(e) => {
          const v = e.currentTarget.value;
          setValue(v);
          props.onInput?.(v);
        }}
        onChange={(e) => props.onChange?.(e.currentTarget.value)}
      />
      <style>{INPUT_CSS}</style>
    </>
  );
}

export default Input;
