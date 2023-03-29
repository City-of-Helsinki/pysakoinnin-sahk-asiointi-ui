/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Link, Notification, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatDate, getNewDueDate } from '../../utils/helpers';
import { selectUserProfile } from '../user/userSlice';
import {
  selectFormContent,
  setEmailConfirmation,
  setSubmitDisabled
} from '../formContent/formContentSlice';
import Barcode from '../barcode/Barcode';
import { DueDateExtendableReason } from '../../interfaces/dueDateInterfaces';
import './ExtendDueDateForm.css';

const ExtendDueDateForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const formContent = useSelector(selectFormContent);
  const foulData = formContent.foulData;
  const [infoNotificationOpen, setInfoNotificationOpen] = useState(false);

  const handleCheckedChange = () => {
    dispatch(setEmailConfirmation(!formContent.emailConfirmation));
  };

  const getErrorMessage = (error: DueDateExtendableReason | undefined) => {
    switch (error) {
      case DueDateExtendableReason.HasNoChecks:
        return 'parking-fine:errors:note';
      case DueDateExtendableReason.DueDateIsPast:
        return 'due-date:errors:due-date-past';
      case DueDateExtendableReason.AlreadyExtended:
        return 'due-date:errors:already-extended';
      case DueDateExtendableReason.HasPaidCheck:
        return 'due-date:errors:already-paid';
      default:
        return 'due-date:errors:default';
    }
  };

  // Set notification and submit disabled status when data is loaded
  useEffect(() => {
    if (foulData) {
      setInfoNotificationOpen(true);
      dispatch(setSubmitDisabled(!foulData.dueDateExtendable));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {foulData?.dueDateExtendable
            ? t('due-date:notifications:allowed:text')
            : t(getErrorMessage(foulData?.dueDateExtendableReason))}
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
          defaultValue={foulData && formatDate(foulData?.dueDate)}
          readOnly
        />
        {foulData?.dueDateExtendable && foulData?.dueDate && (
          <TextInput
            id="newDueDate"
            label={t('due-date:new-due-date')}
            defaultValue={formatDate(getNewDueDate(foulData?.dueDate))}
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
        checked={formContent.emailConfirmation}
        onChange={handleCheckedChange}
        disabled={formContent.submitDisabled}
      />
    </div>
  );
};

export default ExtendDueDateForm;
