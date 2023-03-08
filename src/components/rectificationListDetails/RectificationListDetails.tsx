/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  IconDocument,
  IconPrinter,
  Notification
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import { RectificationListItem } from '../rectificationListRow/rectificationListRowSlice';
import { formatDate, formatDateTime, sortByDate } from '../../utils/helpers';
import RectificationSummary from '../rectificationSummary/RectificationSummary';
import {
  setFormValues,
  setSelectedForm
} from '../formContent/formContentSlice';
import mockRectificationForm from '../../mocks/mockRectficationForm';
import { setUserProfile } from '../user/userSlice';
import mockUserData from '../../mocks/mockUserData';
import './RectificationListDetails.css';

interface Props {
  form: RectificationListItem;
}

const RectificationListDetails: FC<Props> = ({ form }): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDueDateForm = form.type === 'due-date';
  const notificationType = isDueDateForm ? form.type : form.status;
  const [notificationOpen, setNotificationOpen] = useState(
    isDueDateForm || form.status === 'solved-mailed'
  );
  const [formOpen, setFormOpen] = useState(false);

  // Populate redux with mock data (for testing)
  useEffect(() => {
    dispatch(setSelectedForm(form.type));
    dispatch(setFormValues(mockRectificationForm));
    dispatch(setUserProfile(mockUserData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rectification-details">
      <div className="rectification-details-log">
        <div className="rectification-details-events">
          <span className="rectification-details-title">
            {t('landing-page:list:details:events')}
          </span>
          {form.events
            .sort((a, b) => sortByDate(a.timestamp, b.timestamp, true))
            .map((event, i) => (
              <p key={i}>
                {formatDateTime(event.timestamp)}{' '}
                {t(`landing-page:list:status:${event.status}:default`)}
              </p>
            ))}
        </div>
        {!isDueDateForm && (
          <div className="rectification-details-attachments">
            <span className="rectification-details-title">
              {t('landing-page:list:details:attachments')}
            </span>
            {form.attachments.map((attachment, i) => (
              <p key={i}>{attachment.name}</p>
            ))}
          </div>
        )}
      </div>
      <div className="rectification-details-button-container">
        {notificationOpen && (
          <Notification
            size="small"
            label={t(
              `landing-page:list:details:notification:${notificationType}:label`
            )}
            dismissible
            closeButtonLabelText={t('common:close-notification') as string}
            onClose={() => setNotificationOpen(false)}>
            {t(
              `landing-page:list:details:notification:${notificationType}:text`,
              {
                timestamp: formatDate(
                  '2022-01-02T13:20:00Z'
                ) /* TODO: Get the real date */
              }
            )}
          </Notification>
        )}
        {form.status === 'solved-online' && (
          <Button iconRight={<IconDocument />}>
            {t('landing-page:list:details:open-decision')}
          </Button>
        )}
        {!isDueDateForm && (
          <>
            <Button variant="secondary" onClick={() => setFormOpen(true)}>
              {t('landing-page:list:details:show-form')}
            </Button>
            <Dialog
              id="form-summary-dialog"
              aria-labelledby={t(`${form.type}:title`)}
              isOpen={formOpen}
              close={() => setFormOpen(false)}
              closeButtonLabelText={
                t('common:close-rectification-dialog') as string
              }
              scrollable>
              <Dialog.Header
                id="form-summary-dialog-header"
                title={t(`${form.type}:title`)}
              />
              <Dialog.Content>
                <div id="form-summary-dialog-content">
                  <RectificationSummary />
                </div>
              </Dialog.Content>
              <Dialog.ActionButtons className="form-summary-dialog-buttons">
                <Button
                  className="button-close"
                  onClick={() => setFormOpen(false)}>
                  {t('common:close')}
                </Button>
                <Button
                  className="button-print"
                  onClick={() => window.print()}
                  iconLeft={<IconPrinter />}
                  variant="secondary">
                  {t('common:print')}
                </Button>
              </Dialog.ActionButtons>
            </Dialog>
          </>
        )}
      </div>
      <div id="rectification-summary-print" aria-hidden="true">
        <RectificationSummary />
      </div>
    </div>
  );
};

export default RectificationListDetails;
