// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

const WIDTHS: Record<string, string> = {
  xs: 'max-w-[var(--gl-spacing-scale-30)]',
  sm: 'max-w-[var(--gl-spacing-scale-34)]',
  md: 'max-w-[var(--gl-spacing-scale-48)]',
  lg: 'max-w-[var(--gl-spacing-scale-62)]',
  xl: 'max-w-[var(--gl-spacing-scale-75)]',
};

export interface InputProps {
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'url' | 'tel' | 'date' | 'time';
  placeholder?: string;
  state?: 'valid' | 'invalid' | null;
  disabled?: boolean;
  readonly?: boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
  defaultValue?: string;
  id?: string;
  name?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = 'text',
  placeholder = '',
  state = null,
  disabled = false,
  readonly = false,
  width = null,
  defaultValue = '',
  id,
  name,
  onChange,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (onChange) onChange(event.currentTarget.value, event);
  };
  const classes = cl(
    'w-full rounded-[var(--gl-control-border-radius)] border border-[var(--gl-control-border-color-default)] bg-[var(--gl-control-background-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-[color:var(--gl-text-color-default)] placeholder:text-[color:var(--gl-control-placeholder-color)] hover:border-[var(--gl-control-border-color-hover)] focus:border-[var(--gl-control-border-color-focus)] focus:outline-none focus:ring-[3px] focus:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:bg-[var(--gl-control-background-color-disabled)] disabled:text-[color:var(--gl-text-color-disabled)]',
    state === 'invalid' && 'border-[var(--gl-control-border-color-error)]',
    state === 'valid' && 'border-[var(--gl-control-text-color-valid)]',
    width && WIDTHS[width]
  );
  return (
    <div className="flex flex-col gap-[var(--gl-spacing-scale-2)]">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        className={classes}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        aria-invalid={state === 'invalid' || undefined}
        onChange={handleChange}
      />
      {state === 'invalid' ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-control-text-color-error)]">
          Invalid input value.
        </p>
      ) : null}
      {state === 'valid' ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-control-text-color-valid)]">
          Input value looks good.
        </p>
      ) : null}
    </div>
  );
}

