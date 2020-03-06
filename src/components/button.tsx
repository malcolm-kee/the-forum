import cx from 'classnames';
import * as React from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'];

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ type = 'button', className, disabled, ...props }, ref) {
    return (
      <button
        type={type}
        className={cx(
          'inline-block rounded px-4 py-2',
          disabled
            ? 'bg-gray-500 text-gray-100 cursor-not-allowed'
            : 'bg-teal-500 text-gray-100 shadow',
          className
        )}
        disabled={disabled}
        {...props}
        ref={ref}
      />
    );
  }
);
