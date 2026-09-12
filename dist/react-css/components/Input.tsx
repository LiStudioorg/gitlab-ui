// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import { useState } from 'react';
import './Input.css';

const cl = (...cs) => cs.filter(Boolean).join(' ');

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
    'gl-input',
    state === 'valid' && 'gl-input--valid',
    state === 'invalid' && 'gl-input--invalid',
    width && 'gl-input--' + width
  );
  return (
    <div className="gl-input-wrap">
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
        <p className="gl-input-feedback gl-input-feedback--invalid">Invalid input value.</p>
      ) : null}
      {state === 'valid' ? (
        <p className="gl-input-feedback gl-input-feedback--valid">Input value looks good.</p>
      ) : null}
    </div>
  );
}

