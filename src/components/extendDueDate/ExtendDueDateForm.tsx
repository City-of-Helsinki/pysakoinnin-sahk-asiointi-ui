import React, { useEffect, useState } from 'react';
import { formatISO } from 'date-fns';
import {
  Button,
  IconLinkExternal,
  Notification,
  RadioButton,
  TextInput
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import './ExtendDueDateForm.css';

const ExtendDueDateForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<number>();
  const [extensionAllowed, setExtensionAllowed] = useState(false);
  const [infoNotificationOpen, setInfoNotificationOpen] = useState(false);
  // For testing the notifications
  const dueDate = formatISO(new Date('2022-11-20'), { representation: 'date' });

  useEffect(() => {
    const currentDate = formatISO(new Date(), { representation: 'date' });
    if (dueDate >= currentDate) {
      setExtensionAllowed(true);
    }
    setInfoNotificationOpen(true);
  }, [dueDate]);

  return (
    <div>
      <p>{t('common:required-fields')}</p>
      <div className="info-container">
        <TextInput
          id="refNumber"
          label={t('common:fine-info:ref-number:label')}
          defaultValue="12345678"
          readOnly
        />
        <TextInput
          id="regNumber"
          label={t('common:fine-info:reg-number:label')}
          defaultValue="ABC-123"
          readOnly
        />
        <div />
        <TextInput
          id="sum"
          label={t('common:fine-info:sum')}
          defaultValue="80,00 EUR"
          readOnly
        />
        <TextInput
          id="dueDate"
          label={t('common:fine-info:due-date')}
          defaultValue="20.11.2022"
          readOnly
        />
        {extensionAllowed && (
          <TextInput
            id="newDueDate"
            label={t('due-date:new-due-date')}
            defaultValue="20.12.2022"
            readOnly
          />
        )}
      </div>
      {infoNotificationOpen && (
        <Notification
          className="notification"
          label={
            extensionAllowed
              ? t('due-date:notifications:allowed:label')
              : t('due-date:notifications:not-allowed:label')
          }
          type={extensionAllowed ? 'success' : 'error'}
          dismissible
          closeButtonLabelText="Close notification"
          onClose={() => setInfoNotificationOpen(false)}>
          {t('due-date:notifications:allowed:text')}
        </Notification>
      )}
      <div>
        <p>{t('common:selection')}</p>
        <RadioButton
          id="extendRadio"
          name="extendRadio"
          disabled={!extensionAllowed}
          label={t('due-date:radio-button:extend')}
          value="1"
          checked={selectedItem === 1}
          onChange={() => setSelectedItem(1)}
        />
        <RadioButton
          id="payRadio"
          name="payRadio"
          disabled={!extensionAllowed}
          label={t('due-date:radio-button:pay')}
          value="2"
          checked={selectedItem === 2}
          onChange={() => setSelectedItem(2)}
        />
      </div>
      <Button
        className="pay-button"
        disabled={selectedItem !== 2}
        iconRight={<IconLinkExternal />}
        //onClick={}
        variant="secondary">
        {t('common:pay')}
      </Button>
    </div>
  );
};

export default ExtendDueDateForm;
