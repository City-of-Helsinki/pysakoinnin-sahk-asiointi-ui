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
  const [dueDateNotificationOpen, setDueDateNotificationOpen] = useState(true);
  const [mailedNotificationOpen, setMailedNotificationOpen] = useState(true);

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
        <div className="rectification-details-attachments">
          <span className="rectification-details-title">
            {t('landing-page:list:details:attachments')}
          </span>
          {form.attachments.map((attachment, i) => (
            <p key={i}>{attachment.name}</p>
          ))}
        </div>
      </div>
      {form.type === 'due-date' ? (
        <div className="rectification-details-button-container">
          {dueDateNotificationOpen && (
            <Notification
              size="small"
              label={t('landing-page:list:details:due-date-notification:label')}
              dismissible
              closeButtonLabelText={t('common:close-notification') as string}
              onClose={() => setDueDateNotificationOpen(false)}>
              {t(`landing-page:list:details:due-date-notification:text`, {
                newDueDate: formatDate(
                  '2022-01-02T13:20:00Z'
                ) /* TODO: Get the real date */
              })}
            </Notification>
          )}
        </div>
      ) : (
        <div className="rectification-details-button-container">
          {form.status === 'solved-online' && (
            <Button iconRight={<IconDocument />}>
              {t('landing-page:list:details:open-decision')}
            </Button>
          )}
          {form.status === 'solved-mailed' && mailedNotificationOpen && (
            <Notification
              size="small"
              label={t('landing-page:list:details:mailed-notification:label')}
              dismissible
              closeButtonLabelText={t('common:close-notification') as string}
              onClose={() => setMailedNotificationOpen(false)}>
              {t('landing-page:list:details:mailed-notification:text')}
            </Notification>
          )}
          <Button variant="secondary" iconRight={<IconArrowRight />}>
            {t('landing-page:list:details:show-form')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RectificationListDetails;
