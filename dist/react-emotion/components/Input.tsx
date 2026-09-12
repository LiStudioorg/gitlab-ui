// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';

const WIDTHS: Record<string, string> = {
  xs: 'var(--gl-spacing-scale-30)',
  sm: 'var(--gl-spacing-scale-34)',
  md: 'var(--gl-spacing-scale-48)',
  lg: 'var(--gl-spacing-scale-62)',
  xl: 'var(--gl-spacing-scale-75)',
};

const StyledInput = styled.input`
  width: 100%;
  max-width: 100%;
  font: inherit;
  font-size: var(--gl-font-size-base);
  line-height: var(--gl-line-height-20);
  color: var(--gl-text-color-default);
  background-color: var(--gl-control-background-color-default);
  border: 1px solid var(--gl-control-border-color-default);
  border-radius: var(--gl-control-border-radius);
  padding: var(--gl-spacing-scale-3);
  transition: border-color 120ms ease, box-shadow 120ms ease;
  &::placeholder {
    color: var(--gl-control-placeholder-color);
    opacity: 1;
  }
  &:hover:not(:disabled):not([readonly]) {
    border-color: var(--gl-control-border-color-hover);
  }
  &:focus {
    outline: none;
    border-color: var(--gl-control-border-color-focus);
    box-shadow: 0 0 0 2px var(--gl-focus-ring-inner-color), 0 0 0 4px var(--gl-focus-ring-outer-color);
  }
  &[data-state='invalid'] {
    border-color: var(--gl-control-border-color-error);
  }
  &[data-state='valid'] {
    border-color: var(--gl-control-text-color-valid);
  }
  &:disabled {
    background-color: var(--gl-control-background-color-disabled);
    border-color: var(--gl-control-border-color-disabled);
    color: var(--gl-text-color-disabled);
    cursor: not-allowed;
  }
  &[readonly] {
    background-color: var(--gl-control-background-color-readonly);
    border-color: var(--gl-control-border-color-disabled);
  }
`;

const InputShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gl-spacing-scale-2);
`;

const Feedback = styled.p`
  margin: 0;
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  color: var(--gl-control-text-color-valid);
  &[data-invalid='true'] {
    color: var(--gl-control-text-color-error);
  }
`;

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
  return (
    <InputShell>
      <StyledInput
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        data-state={state || undefined}
        data-width={width || undefined}
        style={width && WIDTHS[width] ? { maxWidth: WIDTHS[width] } : undefined}
        aria-invalid={state === 'invalid' || undefined}
        onChange={handleChange}
      />
      {state === 'invalid' ? <Feedback data-invalid="true">Invalid input value.</Feedback> : null}
      {state === 'valid' ? <Feedback>Input value looks good.</Feedback> : null}
    </InputShell>
  );
}

