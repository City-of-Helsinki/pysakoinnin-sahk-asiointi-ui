import React, { useMemo } from 'react';
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
import MatomoTracker from './components/matomo/MatomoTracker';
import MatomoContext from './components/matomo/matomo-context';
import CookieConsent from './components/cookieConsent/CookieConsent';

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
    url: config.config.apiTokensUrl,
    queryProps: {
      grantType: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      permission: '#access'
    },
    audiences: [config.config.apiClientId, config.config.profileApiClientId]
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
    uri: config.config.profileApiUrl,
    cache: new InMemoryCache()
  }),
  options: {
    apiTokenKey: config.config.profileApiClientId
  }
});

const store = setupStore();

injectStore(store);
function BrowserApp(): React.ReactElement {
  const matomoTracker = useMemo(
    () =>
      new MatomoTracker({
        urlBase: window._env_.REACT_APP_MATOMO_URL_BASE,
        siteId: window._env_.REACT_APP_MATOMO_SITE_ID,
        srcUrl: window._env_.REACT_APP_MATOMO_SRC_URL,
        enabled: window._env_.REACT_APP_MATOMO_ENABLED === 'true',
        configurations: {
          setDoNotTrack: true
        }
      }),
    []
  );

  return (
    <MatomoContext.Provider value={matomoTracker}>
      <CookieConsent />
      <BrowserRouter>
        <LoginProvider {...loginProviderProps} modules={[profileGraphQL]}>
          <Provider store={store}>
            <App />
          </Provider>
        </LoginProvider>
      </BrowserRouter>
    </MatomoContext.Provider>
  );
}

export default BrowserApp;
