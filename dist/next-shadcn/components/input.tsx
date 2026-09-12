// Pajamas-inspired (MIT, from @gitlab/ui tokens)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full max-w-full rounded-[var(--gl-control-border-radius)] border bg-[var(--gl-control-background-color-default)] px-[var(--gl-spacing-scale-3)] py-[var(--gl-spacing-scale-3)] text-[length:var(--gl-font-size-base)] leading-[var(--gl-line-height-20)] text-[color:var(--gl-text-color-default)] placeholder:text-[color:var(--gl-control-placeholder-color)] transition-colors focus-visible:outline-none focus-visible:border-[var(--gl-control-border-color-focus)] focus-visible:ring-[3px] focus-visible:ring-[var(--gl-focus-ring-outer-color)] disabled:cursor-not-allowed disabled:bg-[var(--gl-control-background-color-disabled)] disabled:border-[var(--gl-control-border-color-disabled)] disabled:text-[color:var(--gl-text-color-disabled)] read-only:bg-[var(--gl-control-background-color-readonly)] read-only:border-[var(--gl-control-border-color-disabled)] hover:not-disabled:border-[var(--gl-control-border-color-hover)]',
  {
    variants: {
      state: {
        null: 'border-[var(--gl-control-border-color-default)]',
        valid: 'border-[var(--gl-control-text-color-valid)]',
        invalid: 'border-[var(--gl-control-border-color-error)]',
      },
      inputWidth: {
        null: '',
        xs: 'max-w-[var(--gl-spacing-scale-30)]',
        sm: 'max-w-[var(--gl-spacing-scale-34)]',
        md: 'max-w-[var(--gl-spacing-scale-48)]',
        lg: 'max-w-[var(--gl-spacing-scale-62)]',
        xl: 'max-w-[var(--gl-spacing-scale-75)]',
      },
    },
    defaultVariants: {
      state: 'null',
      inputWidth: 'null',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, width, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ state, inputWidth }), className)}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { inputVariants };

