import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageContainer from './components/PageContainer';
import Header from './components/Header';
import Index from './pages/Index';
import ParkingFineAppeal from './components/parkingFineAppeal/ParkingFineAppeal';
import MovedCarAppeal from './components/movedCarAppeal/MovedCarAppeal';
import ExtendDueDate from './components/extendDueDate/ExtendDueDate';
import PageFooter from './components/PageFooter';
import ProtectedRoute from '../src/components/ProtectedRoute';
import { SessionEndedHandler, useCookies } from 'hds-react';
import { useTranslation } from 'react-i18next';
import LoginCallbackHandlerWrapper from './components/LoginCallbackHandlerWrapper';
import RequestLoader from './components/loader/RequestLoader';
import { AuthError } from './pages/authError';
import useMatomo from './components/matomo/hooks/useMatomo';
import CookieManagement from './pages/CookieManagement';

function App(): React.ReactElement {
  const { t } = useTranslation();
  const { trackPageView } = useMatomo();
  const { getAllConsents } = useCookies();
  const location = useLocation();

  useEffect(() => {
    if (getAllConsents().matomo) {
      trackPageView({
        href: window.location.href
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllConsents, location.pathname, location.search]);

  return (
    <PageContainer>
      <RequestLoader />
      <SessionEndedHandler
        content={{
          title: t('common:login-prompt:title'),
          text: t('common:login-prompt:body'),
          buttonText: t('common:login-prompt:button-label'),
          closeButtonLabelText: t('common:login-prompt:button-label')
        }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/auth/callback"
          element={<LoginCallbackHandlerWrapper />}
        />
        <Route path="/authError" element={<AuthError />} />
        <Route path="/cookies" element={<CookieManagement />} />
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
