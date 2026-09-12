// Pajamas-inspired (MIT, from shared design tokens)
import * as React from 'react';
import styled from 'styled-components';

const FormEl = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--gl-spacing-scale-5);
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gl-spacing-scale-2);
`;

const Label = styled.label`
  display: flex;
  align-items: baseline;
  gap: var(--gl-spacing-scale-2);
  font-size: var(--gl-font-size-base);
  font-weight: var(--gl-font-weight-bold);
  color: var(--gl-text-color-strong);
`;

const Optional = styled.span`
  font-size: var(--gl-font-size-sm);
  font-weight: var(--gl-font-weight-normal);
  color: var(--gl-text-color-subtle);
`;

const Helper = styled.p`
  margin: 0;
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  color: var(--gl-text-color-subtle);
`;

const Feedback = styled.p`
  margin: 0;
  font-size: var(--gl-font-size-sm);
  line-height: var(--gl-line-height-16);
  &[data-state='valid'] {
    color: var(--gl-control-text-color-valid);
  }
  &[data-state='invalid'] {
    color: var(--gl-control-text-color-error);
  }
`;

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return <FormEl {...rest}>{children}</FormEl>;
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
    <Group>
      {label ? (
        <Label>
          {label}
          {optional ? <Optional>(optional)</Optional> : null}
        </Label>
      ) : null}
      {children}
      {error ? <Feedback data-state="invalid">{error}</Feedback> : null}
      {helper && !error ? <Helper>{helper}</Helper> : null}
    </Group>
  );
}

