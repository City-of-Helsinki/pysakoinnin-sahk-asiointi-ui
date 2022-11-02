import React from 'react';
import { Route, Switch } from 'react-router';

import { ClientProvider } from './client/ClientProvider';
import StoreProvider from './client/redux/StoreProvider';
import PageContainer from './components/PageContainer';
import HandleCallback from './components/HandleCallback';
import Header from './components/Header';
import LogOut from './pages/LogOut';
import Index from './pages/Index';
import SearchForm from './components/searchForm/SearchForm';

function App(): React.ReactElement {
  return (
    <HandleCallback>
      <ClientProvider>
        <StoreProvider>
          <PageContainer>
            <Header />
            <Switch>
              <Route path={'/'} exact>
                <Index />
              </Route>
              <Route path={['/authError']} exact>
                <div>Autentikaatio epäonnistui</div>
              </Route>
              <Route path={['/logout']} exact>
                <LogOut />
              </Route>
              <Route path={['/oikaisuvaatimus']} exact>
                <SearchForm />
              </Route>
              <Route path="*">404 - not found</Route>
            </Switch>
          </PageContainer>
        </StoreProvider>
      </ClientProvider>
    </HandleCallback>
  );
}

export default App;
