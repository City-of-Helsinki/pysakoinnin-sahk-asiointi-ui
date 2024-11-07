import React from 'react';
import { CookiePage } from 'hds-react';

import i18n from '../utils/i18n';
import { changeLanguage, Language } from '../common';
import useCookieConsent from '../components/cookieConsent/hooks/useCookieConsent';

const CookieManagement = (): JSX.Element => {
  const { config } = useCookieConsent({
    language: i18n.language as Language,
    setLanguage: changeLanguage,
    isModal: false
  });

  return <CookiePage contentSource={config} />;
};

export default CookieManagement;
