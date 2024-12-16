import React from 'react';
import { Button, useOidcClient } from 'hds-react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

const LoginInfo = (): React.ReactElement => {
  const client = useOidcClient();
  const { t } = useTranslation();
  return (
    <div className={styles['content-element']} data-test-id="login-info">
      <h3>{t('common:not-logged-in')}</h3>
      <div>
        <Button
          onClick={() =>
            client.login({
              language: localStorage.getItem('lang') ?? i18n.language
            })
          }
          data-test-id="login-button">
          {t('common:log-in')}
        </Button>
      </div>
    </div>
  );
};

export default LoginInfo;
