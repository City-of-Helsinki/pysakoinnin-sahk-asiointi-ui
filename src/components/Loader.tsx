import React from 'react';
import { LoadingSpinner } from 'hds-react';
import { useTranslation } from 'react-i18next';

const Loader = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        position: 'absolute',
        top: '30%',
        left: '50%'
      }}>
      <LoadingSpinner loadingText={t('common:loading')} />
    </div>
  );
};

export default Loader;
