import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ClientProvider } from './client/ClientProvider';
import StoreProvider from './client/redux/StoreProvider';
import PageContainer from './components/PageContainer';
import HandleCallback from './components/HandleCallback';
import Header from './components/Header';
import LogOut from './pages/LogOut';
import Index from './pages/Index';
import store from './store';
import ParkingFineAppeal from './components/parkingFineAppeal/ParkingFineAppeal';
import MovedCarAppeal from './components/movedCarAppeal/MovedCarAppeal';
import ExtendDueDate from './components/extendDueDate/ExtendDueDate';

function App(): React.ReactElement {
  return (
    <HandleCallback>
      <ClientProvider>
        <StoreProvider>
          <Provider store={store}>
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
                <Route path={['/virhemaksu']} exact>
                  <ParkingFineAppeal />
                </Route>
                <Route path={['/ajoneuvonsiirto']} exact>
                  <MovedCarAppeal />
                </Route>
                <Route path={['/erapaivansiirto']} exact>
                  <ExtendDueDate />
                </Route>
                <Route path="*">404 - not found</Route>
              </Switch>
            </PageContainer>
          </Provider>
        </StoreProvider>
      </ClientProvider>
    </HandleCallback>
  );
}

export default App;
