import * as React from 'react';
import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useFirebase } from '../firebase';

export const AddTopicForm = (props: { onSubmit: () => void }) => {
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
      <legend className="text-2xl">New Topic</legend>
      <TextField
        label="Title"
        value={title}
        onChangeValue={setTitle}
        required
        autoFocus
      />
      {/* TODO: switch to Textarea */}
      <TextField
        label="Description"
        value={description}
        onChangeValue={setDescription}
        required
      />
      <div className="py-3 text-right">
        <Button className="px-8" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};
