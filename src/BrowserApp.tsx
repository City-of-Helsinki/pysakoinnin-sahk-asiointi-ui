import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ClientProvider } from './client/ClientProvider';
import StoreProvider from './client/redux/StoreProvider';
import HandleCallback from './components/HandleCallback';
import { setupStore } from './store';
import { injectStore } from './utils/interceptors';

const store = setupStore();
injectStore(store);

function BrowserApp(): React.ReactElement {
  return (
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
  );
}

export default BrowserApp;
