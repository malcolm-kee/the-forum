import * as React from 'react';
import { MdNoteAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { LinkWithState } from '../components/link-with-state';
import { LoginLink } from '../components/login-link';
import { useAuthUser, useFirebase } from '../firebase';
import * as routes from '../routes';

export const Navbar = () => {
  const firebase = useFirebase();
  const user = useAuthUser();

  return (
    <header className="bg-teal-500 text-gray-100 shadow-lg w-full fixed top-0">
      <div className="mx-auto max-w-6xl px-3 py-2 flex justify-between items-center">
        <LinkWithState
          to={routes.createTopicUrl}
          title="New Topic"
          className="inline-block md:hidden px-4 py-2"
        >
          <span className="sr-only">New Topic</span>
          <MdNoteAdd aria-hidden focusable={false} size={24} />
        </LinkWithState>
        <Link to={routes.homeUrl} className="text-2xl font-serif">
          The Forum
        </Link>
        <nav>
          {/* TODO: profile page */}
          {user ? (
            <Button variant="none" onClick={() => firebase.signOut()}>
              Logout
            </Button>
          ) : (
            <LoginLink to={routes.loginUrl} />
          )}
        </nav>
      </div>
    </header>
  );
};
