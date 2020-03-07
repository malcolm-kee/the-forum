import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { TextField } from '../components/text-field';
import { useAuthUser, useFirebase } from '../firebase';
import { loginUrl } from '../routes';
import { Button } from '../components/button';
import { useTransientState } from '../hooks/use-transient-state';
import { Alert } from '../components/alert';

export const ProfilePage = () => {
  const firebase = useFirebase();
  const user = useAuthUser();
  const location = useLocation();

  const [isBusy, setIsBusy] = React.useState(false);
  const [displayName, setDisplayName] = React.useState(
    () => (user && user.displayName) || ''
  );
  const [showSuccessMsg, setShowSuccessMsg] = useTransientState(false);

  const handleSubmit = () => {
    setIsBusy(true);
    firebase
      .updateProfile(displayName)
      .then(() => {
        setIsBusy(false);
        setShowSuccessMsg(true);
      })
      .catch(() => {
        setIsBusy(false);
      });
  };

  return user ? (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        handleSubmit();
      }}
      className="max-w-md mx-auto px-3 py-5"
    >
      <div className="relative">
        <h1 className="text-3xl text-gray-700 p-2">Your Profile</h1>
        {showSuccessMsg && (
          <Alert type="success" className="absolute top-0 right-0">
            Profile saved!
          </Alert>
        )}
        <TextField
          label="Display Name"
          value={displayName}
          onChangeValue={setDisplayName}
          disabled={isBusy}
          required
        />
        <TextField label="Email" value={user.email || ''} readOnly />
        <div className="py-3">
          <Button
            type="submit"
            disabled={user.displayName === displayName || isBusy}
            className="w-full"
          >
            {isBusy ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  ) : (
    <Redirect
      to={{
        pathname: loginUrl,
        state: {
          from: location.pathname,
        },
      }}
    />
  );
};
