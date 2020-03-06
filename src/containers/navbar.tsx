import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { useAuthUser, useFirebase } from '../firebase';
import * as routes from '../routes';

export const Navbar = () => {
  const firebase = useFirebase();
  const user = useAuthUser();

  return (
    <header className="bg-teal-500 text-gray-100 shadow-lg">
      <div className="mx-auto max-w-6xl px-3 py-2 flex justify-between items-center">
        <Link to={routes.homeUrl} className="text-2xl">
          The Forum
        </Link>
        <nav>
          {user ? (
            <Button onClick={() => firebase.signOut()}>Logout</Button>
          ) : (
            <Link to={routes.loginUrl}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};
