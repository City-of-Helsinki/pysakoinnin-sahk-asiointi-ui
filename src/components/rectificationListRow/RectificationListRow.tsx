import React, { FC, useState } from 'react';
import { Button, IconAngleDown, IconAngleUp } from 'hds-react';
import { RectificationListItem } from './rectificationListRowSlice';
import CustomTag from '../customTag/CustomTag';
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
    <div className="rectification-list-item">
      <div className="rectification-list-item-date">
        {`${t('landing-page:list:last-edited')} ${form.edited} klo 12:00`}
      </div>
      <div className="rectification-list-item-title">
        {`${t(`${form.type}:title`)} (${form.id})`}
      </div>
      <div className="rectification-list-item-status">
        <CustomTag
          text={t(`landing-page:list:status:${form.status}`)}
          color={tagColor(form.status)}
          textColor={form.status !== 'processing' ? 'white' : undefined}
        />
      </div>
      <Button
        className="rectification-list-item-button"
        variant="supplementary"
        size="small"
        iconRight={extended ? <IconAngleUp /> : <IconAngleDown />}
        onClick={() => setExtended(!extended)}>
        {extended
          ? t('landing-page:list:show-less')
          : t('landing-page:list:show-more')}
      </Button>
    </div>
  );
};

export default RectificationListRow;
