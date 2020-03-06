import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { TextField } from '../components/text-field';
import { useTopic, useAuthUser } from '../firebase';

export const TopicPage = () => {
  const params = useParams<{ topicId: string }>();

  const [topic, comments, addComment] = useTopic(params.topicId);

  return topic ? (
    <div className="max-w-3xl mx-auto px-3 py-4">
      <h1 className="text-4xl">{topic.title}</h1>
      <p>
        created by <strong>{topic.authorName}</strong> on{' '}
        {topic.createdAt.toLocaleString()}
      </p>
      <div className="mb-6">{topic.description}</div>
      {comments.length === 0 ? (
        <div>
          <p>There is no comment yet.</p>
        </div>
      ) : (
        <ul>
          {comments.map(comment => (
            <li className="mb-4 shadow" key={comment.id}>
              <div className="bg-gray-200 px-2 py-1 flex justify-between items-center">
                <strong>{comment.authorName}</strong>
                <small>
                  {comment.createdAt && comment.createdAt.toLocaleString()}
                </small>
              </div>
              <div className="px-2 py-1">{comment.content}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="my-4 text-right">
        <AddCommentButton onAddComment={addComment} />
      </div>
    </div>
  ) : null;
};

const AddCommentButton = (props: {
  onAddComment: (content: string) => void;
}) => {
  const user = useAuthUser();
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
  const [content, setContent] = React.useState('');

  return (
    user && (
      <>
        <Button onClick={() => setDialogIsOpen(true)}>Add Comment</Button>
        <Dialog
          aria-label="New Comment"
          isOpen={dialogIsOpen}
          onDismiss={() => setDialogIsOpen(false)}
        >
          <form
            onSubmit={ev => {
              ev.preventDefault();
              props.onAddComment(content);
              setDialogIsOpen(false);
            }}
          >
            <TextField
              label="Comment"
              value={content}
              onChangeValue={setContent}
              required
              autoFocus
            />
            <div>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Dialog>
      </>
    )
  );
};
