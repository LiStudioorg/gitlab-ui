// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';

const cl = (...cs) => cs.filter(Boolean).join(' ');

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return (
    <form className="flex flex-col gap-[var(--gl-spacing-scale-5)]" {...rest}>
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
    <div className="flex flex-col gap-[var(--gl-spacing-scale-2)]">
      {label ? (
        <label className="flex items-baseline gap-[var(--gl-spacing-scale-2)] font-bold text-[color:var(--gl-text-color-strong)]">
          {label}
          {optional ? (
            <span className="font-normal text-[length:var(--gl-font-size-sm)] text-[color:var(--gl-text-color-subtle)]">
              (optional)
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-control-text-color-error)]">
          {error}
        </p>
      ) : null}
      {helper && !error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-text-color-subtle)]">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

