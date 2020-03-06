import * as React from 'react';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { TextField } from '../components/text-field';
import { useFirebase, useAuthUser } from '../firebase';
import { TopicList } from './topic-list';

export const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-3 py-4">
      <h1 className="py-4">
        <div className="text-lg">Welcome to</div>
        <div className="text-6xl font-serif leading-none">The Forum</div>
      </h1>
      <div className="hidden md:block">
        <AddTopicButton />
      </div>
      <TopicList />
    </div>
  );
};

const AddTopicButton = () => {
  const user = useAuthUser();
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    user && (
      <>
        <Button onClick={() => setShowDialog(true)}>New Topic</Button>
        <Dialog
          aria-label="New Topic Details"
          isOpen={showDialog}
          onDismiss={() => setShowDialog(false)}
        >
          <AddTopicForm onSubmit={() => setShowDialog(false)} />
        </Dialog>
      </>
    )
  );
};

const AddTopicForm = (props: { onSubmit: () => void }) => {
  const firebase = useFirebase();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        firebase.addTopic({
          title,
          description,
        });
        props.onSubmit();
      }}
    >
      <legend>New Topic</legend>
      <TextField
        label="Title"
        value={title}
        onChangeValue={setTitle}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChangeValue={setDescription}
        required
      />
      <div className="py-3">
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};
