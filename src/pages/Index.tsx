import React, { useContext, useEffect } from 'react';
import { ClientContext } from '../client/ClientProvider';
import LoginComponent from '../components/Login';
import PageContent from '../components/PageContent';
import LandingPage from '../components/landingPage/LandingPage';
import useUserProfile from '../hooks/useUserProfile';
import {
  UserProfile,
  changeLanguage,
  convertHelsinkiProfileLang
} from '../common';
import { GraphQLClientError } from '../graphql/graphqlClient';
import { useTranslation } from 'react-i18next';

const Index = (): React.ReactElement => {
  const clientContext = useContext(ClientContext);
  const { t } = useTranslation();
  // No need to add the user to redux here, since all the links will redirect the user
  // to a new page, thus refreshing the store. The user is re-fetched and added to redux in FormStepper.tsx
  const userProfile = useUserProfile() as UserProfile | GraphQLClientError;

  const isUser: boolean =
    userProfile &&
    Object.prototype.hasOwnProperty.call(userProfile, 'firstName');

  const applyUserDefaultLang = () => {
    const user = userProfile as UserProfile;
    const userLang = user.language;
    const convertedLang = convertHelsinkiProfileLang(userLang);

    if (convertedLang) changeLanguage(convertedLang);
  };

  useEffect(() => {
    if (localStorage.getItem('lang') == null && isUser) {
      applyUserDefaultLang();
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
