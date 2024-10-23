import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { setupStore } from './store';
import { injectStore } from './utils/interceptors';
import {
  createGraphQLModule,
  GraphQLModule,
  LoginProvider,
  LoginProviderProps
} from 'hds-react';
import config from './config';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';
import { MY_PROFILE_QUERY } from './graphql/MyProfileQuery';
import { ProfileQueryResult } from './common';

const loginProviderProps: LoginProviderProps = {
  userManagerSettings: {
    authority: config.config.authority,
    client_id: config.config.clientId,
    scope: config.config.scope,
    redirect_uri: `${window.location.origin}${config.config.callbackPath}`,
    silent_redirect_uri: `${window.location.origin}${config.config.silentAuthPath}`,
    post_logout_redirect_uri: `${window.location.origin}${config.config.logoutPath}`
  },
  apiTokensClientSettings: {
    url: config.config.apiTokensUrl
  },
  sessionPollerSettings: { pollIntervalInMs: 10000 }
};

const profileGraphQL: GraphQLModule<
  NormalizedCacheObject,
  ProfileQueryResult
> = createGraphQLModule({
  query: MY_PROFILE_QUERY,
  queryOptions: {
    // this is needed with Profile BE, because it returns an error in result.data with weak authentication
    errorPolicy: 'all'
  },
  graphQLClient: new ApolloClient({
    uri: 'https://profile-api.test.hel.ninja/graphql/',
    cache: new InMemoryCache()
  }),
  options: {
    apiTokenKey: 'https://api.hel.fi/auth/helsinkiprofile'
  }
});

const store = setupStore();

injectStore(store);
function BrowserApp(): React.ReactElement {
  return (
    <BrowserRouter>
      <LoginProvider {...loginProviderProps} modules={[profileGraphQL]}>
        <Provider store={store}>
          <App />
        </Provider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default BrowserApp;
