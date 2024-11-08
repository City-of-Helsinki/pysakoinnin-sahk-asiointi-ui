import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageContainer from './components/PageContainer';
import Header from './components/Header';
import LogOut from './pages/LogOut';
import Index from './pages/Index';
import ParkingFineAppeal from './components/parkingFineAppeal/ParkingFineAppeal';
import MovedCarAppeal from './components/movedCarAppeal/MovedCarAppeal';
import ExtendDueDate from './components/extendDueDate/ExtendDueDate';
import PageFooter from './components/PageFooter';
import ProtectedRoute from '../src/components/ProtectedRoute';
import { Button, Dialog, IconInfoCircle, useCookies } from 'hds-react';
import { getClient } from './client/oidc-react';
import { useTranslation } from 'react-i18next';
import { selectPromptLogin, setPromptLogin } from './components/user/userSlice';
import RequestLoader from './components/loader/RequestLoader';
import useMatomo from './components/matomo/hooks/useMatomo';
import CookieManagement from './pages/CookieManagement';

function App(): React.ReactElement {
  const { t } = useTranslation();
  const client = getClient();
  const dispatch = useDispatch();
  const { trackPageView } = useMatomo();
  const { getAllConsents } = useCookies();
  const location = useLocation();

  const promptLogin = useSelector(selectPromptLogin);

  useEffect(() => {
    if (getAllConsents().matomo) {
      trackPageView({
        href: window.location.href
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllConsents, location.pathname, location.search]);

  const initLogin = () => {
    dispatch(setPromptLogin(false));
    client.login();
  };

  return (
    <PageContainer>
      <RequestLoader />
      {promptLogin && (
        <Dialog
          id="session-end-dialog"
          aria-labelledby={t('common:login-prompt:title')}
          className="login-prompt"
          isOpen={promptLogin}>
          <Dialog.Header
            id="session-end-dialog-title"
            title={t('common:login-prompt:title')}
            iconLeft={<IconInfoCircle aria-hidden="true" />}
          />
          <Dialog.Content>
            <p>{t('common:login-prompt:body')}</p>
          </Dialog.Content>
          <Dialog.ActionButtons>
            <Button onClick={initLogin}>
              {t('common:login-prompt:button-label')}
            </Button>
          </Dialog.ActionButtons>
        </Dialog>
      )}
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/authError"
          element={<div>Autentikaatio epäonnistui</div>}
        />
        <Route path="/cookies" element={<CookieManagement />} />
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
  );
}

export default App;
