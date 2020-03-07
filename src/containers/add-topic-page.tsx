import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { LoginLink } from '../components/login-link';
import { useAuthUser } from '../firebase';
import { AddTopicForm } from './add-topic-form';

export const AddTopicPage = () => {
  const user = useAuthUser();
  const location = useLocation<{ from: string }>();
  const from = location.state && location.state.from;
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  return hasSubmitted ? (
    <Redirect to={from || '/'} />
  ) : user ? (
    <div className="px-2 max-w-3xl mx-auto my-6">
      <AddTopicForm
        onSubmit={() => {
          setHasSubmitted(true);
        }}
      />
    </div>
  ) : (
    <p className="px-2 py-4 text-center">
      <LoginLink className="text-teal-700" /> to add topic.
    </p>
  );
};
