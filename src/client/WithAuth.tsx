import React from 'react';

import { Client } from '.';
import { useClient } from './hooks';

export type WithAuthChildProps = { client: Client };

const WithAuth = (
  AuthorizedContent: React.ComponentType<WithAuthChildProps>,
  UnAuthorizedContent: React.ComponentType<WithAuthChildProps>,
  InitializingContent?: React.ComponentType<unknown>
): React.ReactElement => {
  const client = useClient();
  const promptLogin = sessionStorage.getItem('promptLogin') === 'true';
  if (InitializingContent && !client.isInitialized()) {
    return <InitializingContent />;
  }
  // FIXME: this shouldn't be true if apiAccessToken is expired
  return client.isAuthenticated() && promptLogin === false ? (
    <AuthorizedContent client={client} />
  ) : (
    <UnAuthorizedContent client={client} />
  );
};

export default WithAuth;
