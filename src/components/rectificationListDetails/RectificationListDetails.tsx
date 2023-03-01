/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { FC, useState } from 'react';
import { Button, IconArrowRight, IconDocument, Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { RectificationListItem } from '../rectificationListRow/rectificationListRowSlice';
import { formatDate, formatDateTime, sortByDate } from '../../utils/helpers';
import './RectificationListDetails.css';

interface Props {
  form: RectificationListItem;
}

const RectificationListDetails: FC<Props> = ({ form }): React.ReactElement => {
  const { t } = useTranslation();
  const isDueDateForm = form.type === 'due-date';
  const notificationType = isDueDateForm ? form.type : form.status;
  const [notificationOpen, setNotificationOpen] = useState(
    isDueDateForm || form.status === 'solved-mailed'
  );

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
          <Button variant="secondary" iconRight={<IconArrowRight />}>
            {t('landing-page:list:details:show-form')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RectificationListDetails;
