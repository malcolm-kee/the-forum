import * as React from 'react';
import { Button } from '../components/button';
import { StyledLink } from '../components/styled-link';
import { TextField } from '../components/text-field';
import { useAuthUser, useFirebase } from '../firebase';
import * as routes from '../routes';
import { Alert } from '../components/alert';

export const Login = () => {
  const firebase = useFirebase();
  const user = useAuthUser();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleError = (err: any) => {
    if (err.message) {
      setErrorMessage(err.message);
    }
  };

  return user ? (
    <div className="px-3 py-5 max-w-md mx-auto text-center">
      <h1 className="text-3xl text-gray-700">You're already logged in.</h1>
      <div className="py-4">
        <StyledLink to={routes.homeUrl}>Home</StyledLink>
      </div>
    </div>
  ) : (
    <div className="px-3 py-5 max-w-md mx-auto">
      <form
        onSubmit={ev => {
          ev.preventDefault();
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
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChangeValue={setPassword}
          required
        />
        <div className="py-3">
          <Button type="submit" className="w-full">
            Login
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
          onClick={() => firebase.signInWithGoogle().catch(handleError)}
          variant="none"
          className="bg-blue-600 text-gray-100"
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};
