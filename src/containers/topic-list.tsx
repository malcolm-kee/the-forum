import * as React from 'react';
import { useTopicsData } from '../firebase';
import { Link } from 'react-router-dom';

export const TopicList = () => {
  const topics = useTopicsData();

  return (
    <div className="py-4">
      <ul>
        {topics.map(topic => (
          <li className="shadow mb-2" key={topic.id}>
            <Link className="block p-2" to={`/topic/${topic.id}`}>
              <div>{topic.title}</div>
              <div>
                <small>{topic.description}</small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
