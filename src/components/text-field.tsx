import * as React from 'react';
import { useId } from '../hooks/use-id';
import { Input, InputProps } from './input';
import { Label } from './label';

export type TextFieldProps = InputProps & {
  label?: React.ReactNode;
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, ...props }, ref) {
    const displayedId = useId(props.id);

    return (
      <div>
        {label && <Label htmlFor={displayedId}>{label}</Label>}
        <Input {...props} id={displayedId} ref={ref} />
      </div>
    );
  }
);
