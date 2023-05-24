import React from 'react';
import { Button } from 'hds-react';
import styles from './styles.module.css';
import { useClient } from '../client/hooks';
import { useTranslation } from 'react-i18next';

const LoginInfo = (): React.ReactElement => {
  const { login } = useClient();
  const { t } = useTranslation();
  return (
    <div className={styles['content-element']} data-test-id="login-info">
      <h3>{t('common:not-logged-in')}</h3>
      <div>
        <Button onClick={login} data-test-id="login-button">
          {t('common:log-in')}
        </Button>
      </div>
    </div>
  );
};

export default LoginInfo;
