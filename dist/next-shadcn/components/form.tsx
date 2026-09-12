// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ className, children, ...props }: FormProps) {
  return (
    <form className={cn('flex flex-col gap-[var(--gl-spacing-scale-5)]', className)} {...props}>
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
  className?: string;
}

export function FormGroup({ label = '', helper = '', error = null, optional = false, children, className }: FormGroupProps) {
  return (
    <div className={cn('flex flex-col gap-[var(--gl-spacing-scale-2)]', className)}>
      {label ? (
        <label className="flex items-baseline gap-[var(--gl-spacing-scale-2)] text-[length:var(--gl-font-size-base)] font-bold text-[color:var(--gl-text-color-strong)]">
          {label}
          {optional ? (
            <span className="text-[length:var(--gl-font-size-sm)] font-normal text-[color:var(--gl-text-color-subtle)]">(optional)</span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-control-text-color-error)]">{error}</p>
      ) : null}
      {helper && !error ? (
        <p className="m-0 text-[length:var(--gl-font-size-sm)] leading-[var(--gl-line-height-16)] text-[color:var(--gl-text-color-subtle)]">{helper}</p>
      ) : null}
    </div>
  );
}

