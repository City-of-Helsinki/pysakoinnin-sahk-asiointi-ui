import React, { FC, useState } from 'react';
import { Button, IconAngleDown, IconAngleUp } from 'hds-react';
import { RectificationListItem } from './rectificationListRowSlice';
import RectificationListDetails from '../rectificationListDetails/RectificationListDetails';
import CustomTag from '../customTag/CustomTag';
import { formatDateTime } from '../../utils/helpers';
import './RectificationListRow.css';
import { t } from 'i18next';

interface Props {
  form: RectificationListItem;
}

const RectificationListRow: FC<Props> = ({ form }): React.ReactElement => {
  const [extended, setExtended] = useState(false);
  const tagColor = (status: string) => {
    switch (status) {
      case 'solved-online':
      case 'solved-mailed':
        return 'var(--color-success)';
      case 'processing':
        return 'var(--color-alert)';
      default:
        return 'var(--color-info)';
    }
  };

  return (
    <>
      <div className="rectification-list-row">
        <div className="rectification-list-row-date">
          {`${t('landing-page:list:last-edited')} ${formatDateTime(
            form.edited
          )}`}
        </div>
        <div className="rectification-list-row-title">
          {`${t(`${form.type}:title`)} (${form.id})`}
        </div>
        <div className="rectification-list-row-status">
          <CustomTag
            text={t(`landing-page:list:status:${form.status}:default`)}
            color={tagColor(form.status)}
            textColor={form.status !== 'processing' ? 'white' : undefined}
          />
        </div>
        <Button
          className="rectification-list-row-button"
          variant="supplementary"
          size="small"
          iconRight={extended ? <IconAngleUp /> : <IconAngleDown />}
          onClick={() => setExtended(!extended)}>
          {extended
            ? t('landing-page:list:show-less')
            : t('landing-page:list:show-more')}
        </Button>
      </div>
      {extended && <RectificationListDetails form={form} />}
    </>
  );
};

export default RectificationListRow;
