import React from 'react';
import { useSelector } from 'react-redux';

import { Client } from '.';
import { selectPromptLogin } from '../components/user/userSlice';
import { useClient } from './hooks';

export type WithAuthChildProps = { client: Client };

const WithAuth = (
  AuthorizedContent: React.ComponentType<WithAuthChildProps>,
  UnAuthorizedContent: React.ComponentType<WithAuthChildProps>,
  InitializingContent?: React.ComponentType<unknown>
): React.ReactElement => {
  const client = useClient();
  const promptLogin = useSelector(selectPromptLogin);
  if (InitializingContent && !client.isInitialized()) {
    return <InitializingContent />;
  }
  return client.isAuthenticated() && !promptLogin ? (
    <AuthorizedContent client={client} />
  ) : (
    <UnAuthorizedContent client={client} />
  );
};

export default WithAuth;
