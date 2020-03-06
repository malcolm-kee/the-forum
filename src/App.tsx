import * as React from 'react';
import { Signup } from './containers/signup';
import { Login } from './containers/login';

export function App() {
  return (
    <div>
      <header className="bg-teal-500 text-gray-100">
        <div className="mx-auto max-w-lg">
          <a href="/">The Forum</a>
        </div>
      </header>
      <main>
        <Signup />
        <Login />
      </main>
    </div>
  );
}
