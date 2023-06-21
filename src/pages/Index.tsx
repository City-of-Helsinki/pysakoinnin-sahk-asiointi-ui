import React, { useContext, useEffect } from 'react';
import { ClientContext } from '../client/ClientProvider';
import LoginComponent from '../components/Login';
import PageContent from '../components/PageContent';
import LandingPage from '../components/landingPage/LandingPage';
import useUserProfile from '../hooks/useUserProfile';
import { UserProfile } from '../common';
import { GraphQLClientError } from '../graphql/graphqlClient';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';
// import i18n from '../utils/i18n';

const Index = (): React.ReactElement => {
  const clientContext = useContext(ClientContext);
  const { t } = useTranslation();
  // No need to add the user to redux here, since all the links will redirect the user
  // to a new page, thus refreshing the store. The user is re-fetched and added to redux in FormStepper.tsx
  const userProfile = useUserProfile() as UserProfile | GraphQLClientError;

  console.log(localStorage.getItem('lang') == null);
  console.log(localStorage.getItem('lang'));

  const isUser: boolean =
    userProfile &&
    Object.prototype.hasOwnProperty.call(userProfile, 'firstName');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem('lang') == null && isUser) {
      const user = userProfile as UserProfile;
      let defaultLang = null;

      switch (user.language) {
        case 'FINNISH':
          defaultLang = 'fi';
          break;
        case 'SWEDISH':
          defaultLang = 'sv';
          break;
        case 'ENGLISH':
          defaultLang = 'en';
          break;
      }
      if (defaultLang) changeLanguage(defaultLang);
    }
  }, [isUser]);

  return (
    <PageContent>
      <h1>{t('common:title')}</h1>
      {!!clientContext && clientContext.client && isUser ? (
        <LandingPage />
      ) : (
        <LoginComponent />
      )}
    </PageContent>
  );
};

export default Index;
