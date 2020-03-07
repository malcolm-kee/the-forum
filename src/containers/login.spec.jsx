import React from 'react';
import { renderWithRouter, user } from '../lib/test-utils';
import { useFirebase } from '../firebase';

import { Login } from './login';

jest.mock('../firebase', () => {
  const firebaseMock = {
    signInWithEmail: jest.fn(() => Promise.resolve()),
    signInWithGoogle: jest.fn(() => Promise.resolve()),
  };

  return {
    useFirebase: () => firebaseMock,
    useAuthUser: () => null,
  };
});

describe(`<Login />`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`allows login with email and password`, async () => {
    const firebaseMock = useFirebase();
    const { getByLabelText, container } = renderWithRouter(<Login />);

    const email = 'malcolm@mgmail.com';
    const password = '123456';

    await user.type(getByLabelText('Email'), email);
    await user.type(getByLabelText('Password'), password);

    user.click(container.querySelector('button[type="submit"]'));

    expect(firebaseMock.signInWithEmail).toHaveBeenCalledTimes(1);
    expect(firebaseMock.signInWithEmail).toHaveBeenCalledWith(email, password);
  });

  it(`allows login with Google`, async () => {
    const firebaseMock = useFirebase();
    const { getByText } = renderWithRouter(<Login />);

    user.click(getByText('Login with Google'));

    expect(firebaseMock.signInWithGoogle).toHaveBeenCalledTimes(1);
  });

  it(`shows error message when login gets error`, async () => {
    const firebaseMock = useFirebase();
    firebaseMock.signInWithGoogle.mockImplementationOnce(() =>
      Promise.reject({ message: 'Some weird error' })
    );
    const { getByText, findByText } = renderWithRouter(<Login />);

    user.click(getByText('Login with Google'));

    expect(firebaseMock.signInWithGoogle).toHaveBeenCalledTimes(1);

    const errorMsg = await findByText('Some weird error');

    expect(errorMsg).toBeVisible();
  });
});
