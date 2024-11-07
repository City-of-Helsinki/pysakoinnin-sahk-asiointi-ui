import { CookieModal } from 'hds-react';
import React, { FC } from 'react';
import useCookieConsent from './hooks/useCookieConsent';

import i18n from '../../utils/i18n';
import { changeLanguage, Language } from '../../common';

const CookieConsent: FC = () => {
  const { config } = useCookieConsent({
    language: i18n.language as Language,
    setLanguage: changeLanguage
  });

  return <CookieModal contentSource={config} />;
};

export default CookieConsent;
