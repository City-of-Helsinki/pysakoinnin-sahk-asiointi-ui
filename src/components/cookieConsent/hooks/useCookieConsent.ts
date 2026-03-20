/* eslint-disable no-underscore-dangle */
import { useEffect, useMemo, useState } from 'react';
import { Language } from '../../../common';
import { CookieConsentChangeEvent, CookieConsentReactProps } from 'hds-react';
import siteSettings from '../../../assets/cookieSiteSettings.json';

const COOKIE_CONSENT_GROUP = {
  Tunnistamo: 'tunnistamo',
  Essential: 'essential',
  Shared: 'shared',
  Statistics: 'statistics'
} as const;

type Props = {
  language?: Language;
  setLanguage?: (language: Language) => void;
  isModal?: boolean;
};

const useCookieConsent = ({
  language,
  isModal = true
}: Props): CookieConsentReactProps => {
  const [currentLang, setCurrentLang] = useState(language ?? Language.FI);

  useEffect(() => {
    if (language) {
      setCurrentLang(language);
    }
  }, [language]);

  return useMemo(
    () => ({
      siteSettings,
      onChange: (changeEvent: CookieConsentChangeEvent) => {
        const { acceptedGroups } = changeEvent;

        const hasStatisticsConsent =
          acceptedGroups.indexOf(COOKIE_CONSENT_GROUP.Statistics) > -1;

        if (hasStatisticsConsent) {
          //  start tracking
          window._paq.push(['setConsentGiven']);
          window._paq.push(['setCookieConsentGiven']);
        } else {
          // tell matomo to forget conset
          window._paq.push(['forgetConsentGiven']);
        }
      },
      options: {
        focusTargetSelector: isModal ? '#content' : undefined,
        language: currentLang
      }
    }),
    [currentLang, isModal]
  );
};

export default useCookieConsent;
