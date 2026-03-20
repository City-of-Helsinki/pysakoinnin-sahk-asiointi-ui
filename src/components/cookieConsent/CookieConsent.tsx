import { CookieBanner } from 'hds-react';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

const CookieConsent: FC = () => {
  const location = useLocation();

  if (location.pathname === '/cookies') {
    return null;
  }

  return <CookieBanner />;
};

export default CookieConsent;
