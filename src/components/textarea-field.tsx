import * as React from 'react';
import { useId } from '../hooks/use-id';
import { Label } from './label';
import { Textarea, TextareaProps } from './textarea';

export type TextareaFieldProps = TextareaProps & {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
};

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(function TextareaField({ label, helpText, ...props }, ref) {
  const displayedId = useId(props.id);

  return (
    <div>
      {label && <Label htmlFor={displayedId}>{label}</Label>}
      <Textarea
        {...props}
        id={displayedId}
        aria-describedby={helpText ? `${displayedId}-help` : undefined}
        ref={ref}
      />
      {helpText && (
        <p id={`${displayedId}-help`} className="pl-2">
          <small>{helpText}</small>
        </p>
      )}
    </div>
  );
});
