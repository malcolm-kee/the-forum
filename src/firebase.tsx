import * as React from 'react';
import * as app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Topic, TopicComment } from './type';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export class Firebase {
  auth: app.auth.Auth;
  db: app.firestore.Firestore;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  signUpWithEmail = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmail = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return this.auth.signInWithPopup(provider);
  };

  updateProfile = (displayName: string) =>
    this.auth.currentUser
      ? this.auth.currentUser.updateProfile({
          displayName,
        })
      : Promise.reject(new Error('User not logged in'));

  signOut = () => this.auth.signOut();

  addTopic = (topic: Pick<Topic, 'title' | 'description'>) => {
    const user = this.auth.currentUser;

    if (!user) {
      return Promise.reject(new Error('User not logged in'));
    }

    return this.db.collection('topics').add({
      ...topic,
      authorUid: user.uid,
      authorName: user.displayName,
      createdAt: app.firestore.FieldValue.serverTimestamp(),
    });
  };

  addComment = (topicId: string, commentContent: string) => {
    const user = this.auth.currentUser;

    if (!user) {
      return Promise.reject(new Error('User not logged in'));
    }

    return this.db
      .collection('topics')
      .doc(topicId)
      .collection('comments')
      .add({
        content: commentContent,
        authorUid: user.uid,
        authorName: user.displayName,
        createdAt: app.firestore.FieldValue.serverTimestamp(),
      });
  };
}

export const FirebaseContext = React.createContext<Firebase | null>(null);

export const useFirebase = () => React.useContext(FirebaseContext) as Firebase;

export const useAuthUser = () => {
  const firebase = useFirebase();
  const [user, setUser] = React.useState<app.User | null>(
    () => firebase.auth.currentUser
  );

  React.useEffect(() => {
    if (firebase) {
      const unsub = firebase.auth.onAuthStateChanged(setUser);

      return unsub;
    }
  }, [firebase]);

  return user;
};

export const useTopicsData = (pageSize = 10) => {
  const firebase = useFirebase();
  const [topics, setTopics] = React.useState<Topic[] | null>(null);
  const [limit, setLimit] = React.useState(pageSize);

  React.useEffect(() => {
    const unsub = firebase.db
      .collection('topics')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .onSnapshot(snapshots => {
        const topicData: Topic[] = [];
        snapshots.forEach(doc => {
          const data = doc.data();
          if (data) {
            topicData.push({
              ...data,
              createdAt: data.createdAt && data.createdAt.toDate(),
              id: doc.id,
            } as Topic);
          }
        });

        setTopics(topicData);
      });

    return unsub;
  }, [firebase, limit]);

  const loadMore = React.useCallback(() => {
    setLimit(prevLimit => prevLimit + pageSize);
  }, [pageSize]);

  return [
    topics,
    { loadMore, hasMore: !!topics && topics.length === limit },
  ] as const;
};

export const useTopic = (topicId: string) => {
  const firebase = useFirebase();
  const [topicData, setData] = React.useState<Topic | null>(null);
  const [comments, setComments] = React.useState<TopicComment[]>([]);

  React.useEffect(() => {
    const topicDb = firebase.db.collection('topics').doc(topicId);

    const unsub = topicDb.onSnapshot(snapshot => {
      const data = snapshot.data();

      if (data) {
        setData({
          ...data,
          createdAt: data.createdAt && data.createdAt.toDate(),
          id: topicId,
        } as Topic);
      }
    });

    const unsubComments = topicDb
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshots => {
        const commentData: TopicComment[] = [];

        snapshots.forEach(doc => {
          const data = doc.data();

          if (data) {
            commentData.push({
              ...data,
              createdAt: data.createdAt && data.createdAt.toDate(),
              id: doc.id,
            } as TopicComment);
          }
        });

        setComments(commentData);
      });

    return () => {
      unsub();
      unsubComments();
    };
  }, [topicId, firebase]);

  const addComment = React.useCallback(
    (comment: string) => {
      firebase.addComment(topicId, comment);
    },
    [firebase, topicId]
  );

  return [topicData, comments, addComment] as const;
};
