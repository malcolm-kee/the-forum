import cx from 'classnames';
import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const StyledLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      className={cx('text-teal-700 font-semibold', props.className)}
    />
  );
};
