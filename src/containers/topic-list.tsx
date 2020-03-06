import * as React from 'react';
import { useTopicsData } from '../firebase';
import { Link } from 'react-router-dom';
import { pluralize } from '../lib/pluralize';
import { Spinner } from '../components/spinner';

export const TopicList = () => {
  const topics = useTopicsData();

  return (
    <div className="py-4">
      {topics ? (
        <ul>
          {topics.map(topic => (
            <li className="shadow mb-2" key={topic.id}>
              <Link className="block p-2" to={`/topic/${topic.id}`}>
                <div>
                  <span className="text-lg">{topic.title}</span>
                  {topic.commentCount ? (
                    <span className="bg-teal-200 px-2 mx-2 text-sm rounded">
                      {topic.commentCount}{' '}
                      {pluralize('comment', 'comments', topic.commentCount)}
                    </span>
                  ) : null}
                </div>
                <div>
                  <small>{topic.description}</small>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-12 text-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
