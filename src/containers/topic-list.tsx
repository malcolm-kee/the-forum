import * as React from 'react';
import { useTopicsData } from '../firebase';
import { Link } from 'react-router-dom';
import { pluralize } from '../lib/pluralize';
import { Spinner } from '../components/spinner';
import { Button } from '../components/button';

export const TopicList = () => {
  const [topics, { loadMore, hasMore }] = useTopicsData();

  return (
    <div className="py-4">
      {topics ? (
        <>
          <ul>
            {topics.map(topic => (
              <li className="shadow mb-2" key={topic.id}>
                <Link className="block px-4 py-2" to={`/topic/${topic.id}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg">{topic.title}</span>
                    </div>
                    <div>
                      <small>
                        {topic.createdAt && topic.createdAt.toLocaleString()}
                      </small>
                    </div>
                  </div>
                  <div className="leading-none mb-1">
                    <small>by {topic.authorName}</small>
                  </div>
                  {topic.commentCount ? (
                    <div>
                      <span className="bg-teal-200 px-2 text-sm rounded">
                        {topic.commentCount}{' '}
                        {pluralize('comment', 'comments', topic.commentCount)}
                      </span>
                    </div>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          {hasMore && (
            <div>
              <Button onClick={loadMore} variant="none" className="w-full">
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
