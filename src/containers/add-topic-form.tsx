import * as React from 'react';
import { Button } from '../components/button';
import { EditorTab, MarkdownEditor } from '../components/markdown-editor';
import { TextField } from '../components/text-field';
import { useFirebase } from '../firebase';

export const AddTopicForm = (props: { onSubmit: () => void }) => {
  const firebase = useFirebase();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [editorTab, setEditorTab] = React.useState<EditorTab>('edit');

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        firebase.addTopic({
          title,
          description,
        });
        props.onSubmit();
        setEditorTab('edit');
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
      <div className="pt-3">
        <MarkdownEditor
          activeTab={editorTab}
          onTabChange={setEditorTab}
          value={description}
          onChangeValue={setDescription}
          aria-label="Description"
          required
        />
      </div>
      <div className="py-3 text-right">
        <Button className="px-8" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};
