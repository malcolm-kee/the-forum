import * as React from 'react';
import * as app from 'firebase/app';
import 'firebase/auth';

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

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
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

  signOut = () => this.auth.signOut();
}

export const FirebaseContext = React.createContext<Firebase | null>(null);

export const useFirebase = () => React.useContext(FirebaseContext) as Firebase;

export const useAuthUser = () => {
  const firebase = useFirebase();
  const [user, setUser] = React.useState<app.User | null>(null);

  React.useEffect(() => {
    if (firebase) {
      const unsub = firebase.auth.onAuthStateChanged(setUser);

      return unsub;
    }
  }, [firebase]);

  return user;
};
