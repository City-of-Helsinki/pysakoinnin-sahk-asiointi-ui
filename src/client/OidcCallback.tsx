import React from 'react';

import { useClientCallback } from './hooks';
import { Navigate } from 'react-router-dom';

export type OidcCallbackProps = {
  successRedirect: string;
  failureRedirect: string;
};

const OidcCallback = (props: OidcCallbackProps): React.ReactElement => {
  const client = useClientCallback();
  const initialized = client.isInitialized();
  const authenticated = client.isAuthenticated();
  if (!initialized) {
    return <div>Tarkistetaan kirjautumistietoja...</div>;
  }
  return authenticated ? (
    <Navigate to={props.successRedirect} />
  ) : (
    <Navigate to={props.failureRedirect} />
  );
};

export default OidcCallback;
