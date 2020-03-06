import cx from 'classnames';
import * as React from 'react';

export type AlertProps = JSX.IntrinsicElements['div'] & {
  type: 'error' | 'success' | 'info';
};

const classes: Record<AlertProps['type'], string> = {
  error: 'text-red-800 border-red-800',
  success: 'text-teal-800 border-teal-800',
  info: 'text-blue-800 border-blue-800',
};

export const Alert = ({ className, type, ...props }: AlertProps) => (
  <div
    role="alert"
    className={cx(
      'text-justify px-2 py-3 border-2 rounded-md',
      classes[type],
      className
    )}
    {...props}
  />
);
