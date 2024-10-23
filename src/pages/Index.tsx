import React, { useEffect } from 'react';
import PageContent from '../components/PageContent';
import LandingPage from '../components/landingPage/LandingPage';

import { useTranslation } from 'react-i18next';
import {
  useGraphQL,
  useOidcClientTracking,
  WithAuthentication
} from 'hds-react';
import { NormalizedCacheObject } from '@apollo/client';
import {
  changeLanguage,
  convertHelsinkiProfileLang,
  ProfileQueryResult
} from '../common';
import LoginInfo from '../components/LoginInfo';

const Index = (): React.ReactElement => {
  const { t } = useTranslation();
  useOidcClientTracking();
  const [, { data }] = useGraphQL<NormalizedCacheObject, ProfileQueryResult>();

  const profile = data?.myProfile;
  const language = profile?.language;

  useEffect(() => {
    if (localStorage.getItem('lang') == null && language) {
      const convertedLang = convertHelsinkiProfileLang(language);
      if (convertedLang) {
        changeLanguage(convertedLang);
      }
    }
  }, [language]);
  return (
    <PageContent>
      <h1>{t('common:title')}</h1>
      <WithAuthentication
        AuthorisedComponent={LandingPage}
        UnauthorisedComponent={LoginInfo}
      />
    </PageContent>
  );
};

export default Index;
