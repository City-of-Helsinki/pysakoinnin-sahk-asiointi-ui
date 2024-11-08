import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ClientProvider } from './client/ClientProvider';
import StoreProvider from './client/redux/StoreProvider';
import HandleCallback from './components/HandleCallback';
import { setupStore } from './store';
import { injectStore } from './utils/interceptors';
import MatomoTracker from './components/matomo/MatomoTracker';
import MatomoContext from './components/matomo/matomo-context';
import CookieConsent from './components/cookieConsent/CookieConsent';

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
        <HandleCallback>
          <ClientProvider>
            <StoreProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </StoreProvider>
          </ClientProvider>
        </HandleCallback>
      </BrowserRouter>
    </MatomoContext.Provider>
  );
}

export default BrowserApp;
