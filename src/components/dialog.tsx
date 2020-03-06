import cx from 'classnames';
import { Dialog as ReachDialog, DialogProps } from '@reach/dialog';
import '@reach/dialog/styles.css';
import * as React from 'react';
import { MdClose } from 'react-icons/md';

export const Dialog = ({ children, className, ...props }: DialogProps) => {
  return (
    <ReachDialog className={cx('relative', className)} {...props}>
      <button
        className="absolute top-0 right-0"
        onClick={props.onDismiss}
        aria-label="Close"
      >
        <MdClose size={24} />
      </button>
      {children}
    </ReachDialog>
  );
};
