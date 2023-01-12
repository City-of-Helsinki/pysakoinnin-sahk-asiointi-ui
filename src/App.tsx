import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import PageFooter from './components/PageFooter';

function App(): React.ReactElement {
  return (
    <HandleCallback>
      <ClientProvider>
        <StoreProvider>
          <Provider store={store}>
            <PageContainer>
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route
                  path="/authError"
                  element={<div>Autentikaatio epäonnistui</div>}
                />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/virhemaksu" element={<ParkingFineAppeal />} />
                <Route path="/ajoneuvonsiirto" element={<MovedCarAppeal />} />
                <Route path="/erapaivansiirto" element={<ExtendDueDate />} />
                <Route path="*">404 - not found</Route>
              </Routes>
              <PageFooter />
            </PageContainer>
          </Provider>
        </StoreProvider>
      </ClientProvider>
    </HandleCallback>
  );
}

export default App;
