import * as React from 'react';
import { useFirebase } from '../firebase';

type RecapchaProps = {
  onVerify: (token: string) => void;
};

export const Recaptcha = (props: RecapchaProps) => {
  const firebase = useFirebase();
  const onVerifyRef = React.useRef(props.onVerify);
  onVerifyRef.current = props.onVerify;

  React.useEffect(() => {
    const verifier = new firebase.RecapchaVerifier('recaptcha');
    verifier
      .render()
      .then(() => verifier.verify())
      .then(onVerifyRef.current);

    return () => {
      verifier.clear();
    };
  }, [firebase]);

  return <div id="recaptcha" />;
};
