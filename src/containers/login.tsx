import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Button } from '../components/button';
import { StyledLink } from '../components/styled-link';
import { TextField } from '../components/text-field';
import { useAuthUser, useFirebase } from '../firebase';
import * as routes from '../routes';
import { Alert } from '../components/alert';
import { Spinner } from '../components/spinner';

export const Login = () => {
  const firebase = useFirebase();
  const user = useAuthUser();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isBusy, setIsBusy] = React.useState(false);
  const location = useLocation<{ from: string }>();

  const handleError = (err: any) => {
    if (err.message) {
      setErrorMessage(err.message);
      setIsBusy(false);
    }
  };

  return user ? (
    <Redirect to={(location.state && location.state.from) || '/'} />
  ) : (
    <div className="px-3 py-5 max-w-md mx-auto relative">
      {isBusy && <Spinner className="absolute right-0" />}
      <form
        onSubmit={ev => {
          ev.preventDefault();
          setErrorMessage('');
          setIsBusy(true);
          firebase.signInWithEmail(email, password).catch(handleError);
        }}
      >
        <legend className="text-center text-xl block">Login</legend>
        {errorMessage && (
          <Alert type="error" className="my-3">
            <p>{errorMessage}</p>
          </Alert>
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChangeValue={setEmail}
          required
          disabled={isBusy}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChangeValue={setPassword}
          required
          disabled={isBusy}
        />
        <div className="py-3">
          <Button type="submit" className="w-full" disabled={isBusy}>
            {isBusy ? 'Loading' : 'Login'}
          </Button>
        </div>
        <p>
          No account? <StyledLink to={routes.signupUrl}>Signup</StyledLink>{' '}
          here.
        </p>
      </form>
      <div className="py-3 my-6 text-center border-2 border-teal-500 rounded-lg">
        <p className="mb-2">Other Options</p>
        <Button
          onClick={() => {
            setIsBusy(true);
            firebase.signInWithGoogle().catch(handleError);
          }}
          variant="none"
          className={isBusy ? '' : 'bg-blue-600 text-gray-100'}
          disabled={isBusy}
        >
          {isBusy ? 'Loading' : 'Login with Google'}
        </Button>
      </div>
    </div>
  );
};
