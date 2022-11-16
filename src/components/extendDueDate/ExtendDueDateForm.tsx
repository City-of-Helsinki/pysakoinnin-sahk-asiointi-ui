import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Checkbox,
  IconCopy,
  Link,
  Notification,
  TextInput
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useClient } from '../../client/hooks';
import {
  formatDate,
  getNewDueDate,
  isExtensionAllowed
} from '../../utils/helpers';
import {
  emailConfirmationChecked,
  setEmailConfirmationChecked
} from './extendDueDateFormSlice';
import './ExtendDueDateForm.css';
import { setSubmitDisabled } from '../formContent/formContentSlice';

const ExtendDueDateForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getUser } = useClient();
  const user = getUser();
  const checkboxChecked = useSelector(emailConfirmationChecked);
  const [infoNotificationOpen, setInfoNotificationOpen] = useState(false);
  const [emailNotificationOpen, setEmailNotificationOpen] = useState(true);
  // For testing the notifications
  const dueDateObject = new Date('2022-12-12');
  const extensionAllowed = isExtensionAllowed(dueDateObject);
  const dueDate = formatDate(dueDateObject);
  const newDueDate = getNewDueDate(dueDateObject);

  const handleCheckedChange = () => {
    dispatch(setEmailConfirmationChecked(!checkboxChecked));
    setEmailNotificationOpen(true);
  };

  // Allow extension only if due date has not passed
  useEffect(() => {
    if (extensionAllowed) {
      dispatch(setSubmitDisabled(false));
    }
    setInfoNotificationOpen(true);
  }, [dispatch, extensionAllowed]);

  return (
    <div>
      <p>{t('common:required-fields')}</p>
      {infoNotificationOpen && (
        <Notification
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
          label={t('common:fine-info:sum:label')}
          defaultValue="80,00 EUR"
          readOnly
        />
        <TextInput
          id="dueDate"
          label={t('common:fine-info:due-date:label')}
          value={dueDate}
          readOnly
        />
        {extensionAllowed && (
          <TextInput
            id="newDueDate"
            label={t('due-date:new-due-date')}
            value={newDueDate}
            readOnly
          />
        )}
      </div>
      <div className="barcode-container">
        <TextInput
          id="barCode"
          label={t('common:fine-info:barcode:label')}
          defaultValue="43012383000123056001240000000000000000018714210302"
          readOnly
        />
        <Button
          className="barcode-button"
          iconLeft={<IconCopy />}
          //onClick={}
          variant="secondary">
          {t('common:copy-barcode')}
        </Button>
      </div>
      <Checkbox
        label={t('common:email-confirmation')}
        id="emailConfirmationCheckbox"
        checked={checkboxChecked}
        onChange={handleCheckedChange}
        disabled={!extensionAllowed}
      />
      {checkboxChecked && emailNotificationOpen && (
        <Notification
          className="email-notification"
          size="small"
          label={t('due-date:notifications:email-confirmation:label')}
          dismissible
          closeButtonLabelText="Close notification"
          onClose={() => setEmailNotificationOpen(false)}>
          {t('due-date:notifications:email-confirmation:text', {
            email: user?.email
          })}
          <Link
            href={window._env_.REACT_APP_PROFILE_UI_URL}
            size="S"
            external
            openInNewTab
            openInExternalDomainAriaLabel={t('common:aria:open-external')}
            openInNewTabAriaLabel={t('common:aria:open-new-tab')}>
            {t('common:helsinki-profile-link')}
          </Link>
        </Notification>
      )}
    </div>
  );
};

export default ExtendDueDateForm;
