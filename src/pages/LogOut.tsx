import React from 'react';

import PageContent from '../components/PageContent';
import WithAuth from '../client/WithAuth';
import Loader from '../components/loader/Loader';
import LoggedOutInfo from '../components/LoggedOutInfo';
import { useTranslation } from 'react-i18next';

const LogOut = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <PageContent>
      <h1>{t('common:title')}</h1>
      {WithAuth(Loader, LoggedOutInfo)}
    </PageContent>
  );
};

export default LogOut;
