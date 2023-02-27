import React, { FC } from 'react';
import { Button, IconArrowRight, IconDocument } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { RectificationListItem } from '../rectificationListRow/rectificationListRowSlice';
import { formatDateTime, sortByDate } from '../../utils/helpers';
import './RectificationListDetails.css';

interface Props {
  form: RectificationListItem;
}
const RectificationListDetails: FC<Props> = ({ form }): React.ReactElement => {
  const { t } = useTranslation();
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
      <div className="rectification-details-button-container">
        <Button iconRight={<IconDocument />}>
          {t('landing-page:list:details:open-decision')}
        </Button>
        <Button variant="secondary" iconRight={<IconArrowRight />}>
          {t('landing-page:list:details:show-form')}
        </Button>
      </div>
    </div>
  );
};

export default RectificationListDetails;
