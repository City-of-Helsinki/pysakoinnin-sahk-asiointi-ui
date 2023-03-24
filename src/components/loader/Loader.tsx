import React from 'react';
import { LoadingSpinner } from 'hds-react';
import { useTranslation } from 'react-i18next';
import './Loader.css';

/**
 * An overlay component that is used
 * * on LandingPage when the user info is being retrieved
 * * by RequestLoader when redux loading.isLoading = true
 */
const Loader = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="loading-spinner">
      <LoadingSpinner loadingText={t('common:loading')} />
    </div>
  );
};

export default Loader;
