import * as React from 'react';
import { Alert } from '../components/alert';
import { Button } from '../components/button';
import { StyledLink } from '../components/styled-link';
import { TextField } from '../components/text-field';
import { useAuthUser, useFirebase } from '../firebase';
import * as routes from '../routes';
import { Recaptcha } from './recaptcha';

type Step = 'input' | 'recaptcha';

export const Signup = () => {
  const firebase = useFirebase();
  const user = useAuthUser();

  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pwRepeat, setPwRepeat] = React.useState('');

  const [step, setStep] = React.useState<Step>('input');

  const [errorMsg, setErrorMsg] = React.useState('');

  return user ? (
    <div className="px-3 py-5 max-w-md mx-auto text-center">
      <h1 className="text-3xl text-gray-700">You're already logged in.</h1>
      <div className="py-4">
        <StyledLink to={routes.homeUrl}>Home</StyledLink>
      </div>
    </div>
  ) : step === 'input' ? (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        if (password === pwRepeat) {
          setStep('recaptcha');
        }
      }}
      className="px-3 py-5 max-w-md mx-auto"
    >
      <legend className="text-center text-xl block">Signup</legend>
      {errorMsg && (
        <Alert type="error" className="my-3">
          <p>{errorMsg}</p>
        </Alert>
      )}
      <TextField
        label="Name"
        value={displayName}
        onChangeValue={setDisplayName}
        required
      />
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
        minLength={6}
      />
      <TextField
        label="Repeat Password"
        type="password"
        value={pwRepeat}
        onChangeValue={setPwRepeat}
        required
        minLength={6}
        helpText={
          password !== pwRepeat
            ? 'Passwords does not match'
            : 'Passwords match!'
        }
        showHelpTextWhenFocus
      />
      <div className="py-3">
        <Button type="submit" className="w-full">
          Signup
        </Button>
      </div>
      <div>
        <p>
          Already a member? <StyledLink to={routes.loginUrl}>Login</StyledLink>{' '}
          here.
        </p>
      </div>
    </form>
  ) : (
    <div className="py-6 max-w-sm mx-auto">
      <Recaptcha
        onVerify={() => {
          firebase
            .signUpWithEmail(email, password)
            .then(({ user }) => {
              if (user) {
                return user.updateProfile({
                  displayName,
                });
              }
            })
            .catch(err => {
              if (err.message) {
                setStep('input');
                setErrorMsg(err.message);
              }
            });
        }}
      />
    </div>
  );
};
