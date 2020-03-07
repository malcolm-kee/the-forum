import * as React from 'react';
import { MdAddCircle } from 'react-icons/md';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { useAuthUser } from '../firebase';
import { AddTopicForm } from './add-topic-form';
import { TopicList } from './topic-list';
import { LoginLink } from '../components/login-link';

export const Home = () => {
  const user = useAuthUser();
  return (
    <div className="max-w-3xl mx-auto px-3 py-4">
      <h1 className="py-4">
        <div className="text-lg text-gray-700">Welcome to</div>
        <div className="text-5xl md:text-6xl font-serif leading-none">
          The Forum
        </div>
      </h1>
      {user && (
        <div className="hidden md:block">
          <AddTopicButton />
        </div>
      )}
      <TopicList />
      {!user && (
        <p>
          <LoginLink className="text-teal-700" /> to add topic.
        </p>
      )}
    </div>
  );
};

const AddTopicButton = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <MdAddCircle
          className="inline-block mr-2"
          focusable={false}
          aria-hidden
        />{' '}
        New Topic
      </Button>
      <Dialog
        aria-label="New Topic Details"
        isOpen={showDialog}
        onDismiss={() => setShowDialog(false)}
      >
        <AddTopicForm onSubmit={() => setShowDialog(false)} />
      </Dialog>
    </>
  );
};
