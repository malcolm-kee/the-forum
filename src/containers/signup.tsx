import * as React from 'react';
import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useFirebase } from '../firebase';

export const Signup = () => {
  const firebase = useFirebase();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pwRepeat, setPwRepeat] = React.useState('');

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        if (password === pwRepeat) {
          firebase
            .signUpWithEmail(email, password)
            .then(console.log)
            .catch(console.error);
        }
      }}
      className="px-3 py-5 max-w-md mx-auto"
    >
      <legend className="text-center text-xl block">Signup</legend>
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
      <TextField
        label="Repeat Password"
        type="password"
        value={pwRepeat}
        onChangeValue={setPwRepeat}
        required
      />
      <div className="py-3">
        <Button type="submit" className="w-full">
          Signup
        </Button>
      </div>
    </form>
  );
};
