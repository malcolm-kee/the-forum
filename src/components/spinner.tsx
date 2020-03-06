import cx from 'classnames';
import * as React from 'react';
import styles from './spinner.module.css';

export const Spinner = (props: JSX.IntrinsicElements['div']) => (
  <>
    <div
      role="progressbar"
      {...props}
      className={cx(styles.spinner, props.className)}
    ></div>
    <div className="sr-only">Processing...</div>
  </>
);
