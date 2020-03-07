import * as React from 'react';
import { MdMenu, MdNoteAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
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
        {user ? (
          <NavMenuLauncher>
            <div className="font-serif text-center text-3xl pb-3">
              The Forum
            </div>
            <ul className="text-center">
              <li>
                <Link
                  to={routes.homeUrl}
                  className="inline-block py-2 w-full text-xl"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={routes.profileUrl}
                  className="inline-block py-2 w-full text-xl"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Button
                  className="w-full text-xl"
                  variant="none"
                  onClick={() => firebase.signOut()}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </NavMenuLauncher>
        ) : (
          <LoginLink className="block sm:hidden" />
        )}
        <Link to={routes.homeUrl} className="text-2xl font-serif">
          The Forum
        </Link>
        <LinkWithState
          to={routes.createTopicUrl}
          title="New Topic"
          className="inline-block sm:hidden px-4 py-2"
        >
          <span className="sr-only">New Topic</span>
          <MdNoteAdd aria-hidden focusable={false} size={24} />
        </LinkWithState>
        <nav className="hidden sm:flex items-center">
          {user ? (
            <>
              <Link
                to={routes.profileUrl}
                className="text-base inline-block px-4 py-2"
              >
                Profile
              </Link>
              <Button variant="none" onClick={() => firebase.signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <LoginLink />
          )}
        </nav>
      </div>
    </header>
  );
};

const NavMenuLauncher = (props: { children: React.ReactNode }) => {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="inline-block sm:hidden"
        variant="none"
      >
        <span className="sr-only">Show Menu</span>
        <MdMenu aria-hidden focusable={false} size={24} />
      </Button>
      <Dialog
        aria-label="Main menu"
        className="w-3/4 border-t-4 border-teal-500"
        isOpen={showDialog}
        onDismiss={() => setShowDialog(false)}
        onClick={() => setShowDialog(false)}
        hideCloseBtn
      >
        {props.children}
      </Dialog>
    </>
  );
};
