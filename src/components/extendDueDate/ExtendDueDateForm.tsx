import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Link, Notification, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useClient } from '../../client/hooks';
import { formatDate, isExtensionAllowed } from '../../utils/helpers';
import {
  selectDueDateFormValues,
  setEmailConfirmationChecked
} from './extendDueDateFormSlice';
import './ExtendDueDateForm.css';
import {
  selectFormContent,
  setSubmitDisabled
} from '../formContent/formContentSlice';
import Barcode from '../barcode/Barcode';

const ExtendDueDateForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getUser } = useClient();
  const user = getUser();
  const formContent = useSelector(selectFormContent);
  const dueDateFormValues = useSelector(selectDueDateFormValues);
  const dueDate = formatDate(dueDateFormValues.dueDate);
  const newDueDate = formatDate(dueDateFormValues.newDueDate);
  const extensionAllowed = isExtensionAllowed(dueDateFormValues.dueDate);
  const [infoNotificationOpen, setInfoNotificationOpen] = useState(false);
  const [emailNotificationOpen, setEmailNotificationOpen] = useState(true);

  const handleCheckedChange = () => {
    dispatch(
      setEmailConfirmationChecked(!dueDateFormValues.emailConfirmationChecked)
    );
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

      <Barcode barcode="43012383000123056001240000000000000000018714210302" />

      <Checkbox
        label={t('common:email-confirmation')}
        id="emailConfirmationCheckbox"
        checked={dueDateFormValues.emailConfirmationChecked}
        onChange={handleCheckedChange}
        disabled={!extensionAllowed || formContent.formSubmitted}
      />
      {dueDateFormValues.emailConfirmationChecked && emailNotificationOpen && (
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
