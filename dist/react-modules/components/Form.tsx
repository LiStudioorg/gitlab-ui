// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styles from './Form.module.css';

const cl = (...cs) => cs.filter(Boolean).map((c) => styles[c]).join(' ');

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return (
    <form className="gl-form" {...rest}>
      {children}
    </form>
  );
}

export interface FormGroupProps {
  label?: string;
  helper?: string;
  error?: string | null;
  optional?: boolean;
  children?: React.ReactNode;
}

export function FormGroup({
  label = '',
  helper = '',
  error = null,
  optional = false,
  children,
}: FormGroupProps) {
  return (
    <div className="gl-form-group">
      {label ? (
        <label className="gl-form-label">
          {label}
          {optional ? <span className="gl-form-optional">(optional)</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <p className="gl-form-feedback gl-form-feedback--invalid">{error}</p> : null}
      {helper && !error ? <p className="gl-form-helper">{helper}</p> : null}
    </div>
  );
}

