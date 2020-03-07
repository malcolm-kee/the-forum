import { render } from '@testing-library/react';
import React from 'react';
import { useFirebase } from '../firebase';
import { user } from '../lib/test-utils';
import { AddTopicForm } from './add-topic-form';

jest.mock('../firebase', () => {
  const firebaseMock = {
    addTopic: jest.fn(),
  };

  return {
    useFirebase: () => firebaseMock,
  };
});

describe(`<AddTopicForm />`, () => {
  it(`calls firebase.addTopic with expected params`, async () => {
    const onSubmitHandler = jest.fn();
    const firebaseMock = useFirebase();
    const { getByLabelText, getByText } = render(
      <AddTopicForm onSubmit={onSubmitHandler} />
    );
    const title = 'Topic Title: Testing Firebase';
    const description = `Go to my [website](https://malcolmkee.com)
    
    Where am *I*??`;

    await user.type(getByLabelText('Title'), title);
    await user.type(getByLabelText('Description'), description);

    user.click(getByText('Add'));

    expect(onSubmitHandler).toHaveBeenCalledTimes(1);
    expect(firebaseMock.addTopic).toHaveBeenCalledTimes(1);
    expect(firebaseMock.addTopic).toHaveBeenCalledWith({
      title,
      description,
    });
  });
});
