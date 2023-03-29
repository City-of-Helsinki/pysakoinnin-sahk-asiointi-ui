/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Link, Notification, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatDate, getNewDueDate } from '../../utils/helpers';
import {
  selectDueDateFormValues,
  setEmailConfirmationChecked
} from './extendDueDateFormSlice';
import { selectUserProfile } from '../user/userSlice';
import './ExtendDueDateForm.css';
import { selectFormContent } from '../formContent/formContentSlice';
import Barcode from '../barcode/Barcode';

const ExtendDueDateForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const formContent = useSelector(selectFormContent);
  const dueDateFormValues = useSelector(selectDueDateFormValues);
  const foulData = formContent.foulData;
  const [infoNotificationOpen, setInfoNotificationOpen] = useState(false);

  const handleCheckedChange = () => {
    dispatch(
      setEmailConfirmationChecked(!dueDateFormValues.emailConfirmationChecked)
    );
  };

  // Set notification when data is loaded
  useEffect(() => {
    foulData && setInfoNotificationOpen(true);
  }, [foulData]);

  return (
    <div data-testid="extendDueDateForm">
      {infoNotificationOpen && (
        <Notification
          label={
            foulData?.dueDateExtendable
              ? t('due-date:notifications:allowed:label')
              : t('due-date:notifications:not-allowed:label')
          }
          type={foulData?.dueDateExtendable ? 'success' : 'error'}
          dismissible
          closeButtonLabelText={t('common:close-notification') as string}
          onClose={() => setInfoNotificationOpen(false)}>
          {t('due-date:notifications:allowed:text')}
        </Notification>
      )}
      <div className="text-container">
        <TextInput
          id="refNumber"
          label={t('common:fine-info:ref-number:label')}
          defaultValue={foulData?.referenceNumber}
          readOnly
        />
        <div className="reg-number-field">
          <TextInput
            id="regNumber"
            label={t('common:fine-info:reg-number:label')}
            defaultValue={foulData?.registerNumber}
            readOnly
          />
        </div>
        <TextInput
          id="sum"
          label={t('common:fine-info:sum')}
          defaultValue={foulData?.invoiceSumText}
          readOnly
        />
        <TextInput
          id="dueDate"
          label={t('common:fine-info:due-date')}
          value={foulData && formatDate(foulData?.dueDate)}
          readOnly
        />
        {foulData?.dueDateExtendable && foulData?.dueDate && (
          <TextInput
            id="newDueDate"
            label={t('due-date:new-due-date')}
            value={formatDate(getNewDueDate(foulData?.dueDate))}
            readOnly
          />
        )}
      </div>

      <Barcode barcode={foulData?.barCode} />

      <p className="email-confirmation-label">
        {t('due-date:notifications:email-confirmation:label')}
      </p>
      <p>
        {t('due-date:notifications:email-confirmation:text', {
          email: user?.email
        })}{' '}
        <Link
          href={window._env_.REACT_APP_PROFILE_UI_URL}
          size="M"
          external
          openInNewTab
          openInExternalDomainAriaLabel={t('common:aria:open-external')}
          openInNewTabAriaLabel={t('common:aria:open-new-tab')}>
          {t('common:helsinki-profile-link')}
        </Link>
      </p>
      <Checkbox
        label={t('common:email-confirmation')}
        id="emailConfirmationCheckbox"
        checked={dueDateFormValues.emailConfirmationChecked}
        onChange={handleCheckedChange}
        disabled={!foulData?.dueDateExtendable || formContent.formSubmitted}
      />
    </div>
  );
};

export default ExtendDueDateForm;
