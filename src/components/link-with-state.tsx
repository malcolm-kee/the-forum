import * as React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

/**
 * `LinkWithState` set location.state with `from` property, which allow the
 * navigated page to come back after some operation, e.g. after login.
 */
export const LinkWithState = ({ to, children, ...props }: LinkProps) => {
  const location = useLocation();

  return (
    <Link
      {...props}
      to={
        typeof to === 'string'
          ? {
              pathname: to,
              state: {
                from: location.pathname,
              },
            }
          : {
              ...to,
              state: {
                from: location.pathname,
              },
            }
      }
    >
      {children}
    </Link>
  );
};
