import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/button';
import { TextField } from '../components/text-field';
import { useTopic, useAuthUser } from '../firebase';
import { Spinner } from '../components/spinner';
import { LoginLink } from '../components/login-link';

export const TopicPage = () => {
  const params = useParams<{ topicId: string }>();

  const [topic, comments, addComment] = useTopic(params.topicId);

  return topic ? (
    <div className="max-w-3xl mx-auto px-3 py-4">
      <h1 className="text-4xl">{topic.title}</h1>
      <p>
        created by <strong>{topic.authorName}</strong> on{' '}
        {topic.createdAt && topic.createdAt.toLocaleString()}
      </p>
      <div className="mb-6 mt-3 text-lg">{topic.description}</div>
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
      <div className="my-4">
        <AddCommentInput onAddComment={addComment} />
      </div>
    </div>
  ) : (
    <div className="text-center p-12">
      <Spinner />
    </div>
  );
};

const AddCommentInput = (props: {
  onAddComment: (content: string) => void;
}) => {
  const user = useAuthUser();
  const [content, setContent] = React.useState('');

  return user ? (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        props.onAddComment(content);
        setContent('');
      }}
      className="flex items-end"
    >
      <div className="flex-1 pr-1">
        {/* TODO: switch to Textarea */}
        <TextField
          label="Comment"
          value={content}
          onChangeValue={setContent}
          placeholder="Your comment"
          required
        />
      </div>
      <Button type="submit">Add</Button>
    </form>
  ) : (
    <div>
      <p>
        <LoginLink className="text-teal-700" /> to add comment.
      </p>
    </div>
  );
};
