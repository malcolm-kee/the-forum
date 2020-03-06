import * as React from 'react';
import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useFirebase } from '../firebase';

export const Login = () => {
  const firebase = useFirebase();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        firebase
          .signInWithEmail(email, password)
          .then(console.log)
          .catch(console.error);
      }}
      className="px-3 py-5 max-w-md mx-auto"
    >
      <legend className="text-center text-xl block">Login</legend>
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
    </form>
  );
};
