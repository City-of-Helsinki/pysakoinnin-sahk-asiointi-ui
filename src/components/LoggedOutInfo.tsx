import React from 'react';
import { Button } from 'hds-react';
import styles from './styles.module.css';
import { useClient } from '../client/hooks';
import { t } from 'i18next';

const LoggedOutInfo = (): React.ReactElement => {
  const { login } = useClient();
  return (
    <div className={styles['content-element']} data-test-id="logged-out-info">
      <h3>{t('common:not-logged-in')}</h3>
      <div>
        <Button onClick={login} data-test-id="login-button">
          {t('common:log-in')}
        </Button>
      </div>
    </div>
  );
};

export default LoggedOutInfo;
