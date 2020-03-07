import * as React from 'react';
import { LinkProps, useLocation } from 'react-router-dom';
import { loginUrl } from '../routes';
import { LinkWithState } from './link-with-state';

type LoginLinkProps = Omit<LinkProps, 'to'> & {
  to?: LinkProps['to'];
};

export const LoginLink = ({
  to = loginUrl,
  children = 'Login',
  ...props
}: LoginLinkProps) => {
  const location = useLocation();

  return location.pathname === loginUrl ? null : (
    <LinkWithState {...props} to={to}>
      {children}
    </LinkWithState>
  );
};
