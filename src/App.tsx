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
import ProtectedRoute from '../src/components/ProtectedRoute';
import { Button, Notification } from 'hds-react';
import { getClient } from './client/oidc-react';
import { useTranslation } from 'react-i18next';

function App(): React.ReactElement {
  const { t } = useTranslation();
  const client = getClient();

  const promptLogin = sessionStorage.getItem('promptLogin') === 'true';

  console.log(Boolean(promptLogin));

  const initLogin = () => {
    sessionStorage.setItem('promptLogin', 'false');
    client.login();
  };

  return (
    <HandleCallback>
      <ClientProvider>
        <StoreProvider>
          <Provider store={store}>
            <PageContainer>
              {Boolean(promptLogin) && (
                <Notification
                  label={t('common:login-prompt:title')}
                  className="login-prompt"
                  type="error">
                  <p>{t('common:login-prompt:body')}</p>
                  <Button onClick={initLogin}>
                    {t('common:login-prompt:button-label')}
                  </Button>
                </Notification>
              )}
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route
                  path="/authError"
                  element={<div>Autentikaatio epäonnistui</div>}
                />
                <Route path="/logout" element={<LogOut />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/virhemaksu" element={<ParkingFineAppeal />} />
                  <Route path="/ajoneuvonsiirto" element={<MovedCarAppeal />} />
                  <Route path="/erapaivansiirto" element={<ExtendDueDate />} />
                </Route>
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
