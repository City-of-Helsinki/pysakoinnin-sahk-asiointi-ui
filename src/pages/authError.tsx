import { Notification } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AuthError = () => {
  const { t } = useTranslation();
  return (
    <Notification
      label={t('common:errors:login')}
      type="error"
      className="error-notification">
      {t('common:errors:unknown')}
    </Notification>
  );
};
