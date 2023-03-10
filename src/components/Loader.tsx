import React from 'react';
import { LoadingSpinner } from 'hds-react';
import { useTranslation } from 'react-i18next';

const Loader = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: 999,
        transform: 'translate(-50%, -50%)'
      }}>
      <LoadingSpinner loadingText={t('common:loading')} />
    </div>
  );
};

export default Loader;
