import React from 'react';

import { useLocation } from 'react-router';
import config from '../config';
import OidcCallback from '../client/OidcCallback';
import { getClient } from '../client/oidc-react';

const HandleCallback = (
  props: React.PropsWithChildren<unknown>
): React.ReactElement => {
  const location = useLocation();
  const client = getClient();
  const { children } = props;
  const isCallbackUrl = config.isCallbackUrl(location.pathname);
  if (!client.isAuthenticated() && isCallbackUrl) {
    return <OidcCallback successRedirect={'/'} failureRedirect="/authError" />;
  }
  return <>{children}</>;
};

export default HandleCallback;
