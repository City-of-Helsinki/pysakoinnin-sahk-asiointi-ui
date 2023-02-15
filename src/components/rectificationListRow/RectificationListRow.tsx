import React, { FC } from 'react';
import { RectificationListItem } from './rectificationListRowSlice';
import CustomTag from '../customTag/CustomTag';
import './RectificationListRow.css';
import { t } from 'i18next';

interface Props {
  form: RectificationListItem;
}

const RectificationListRow: FC<Props> = ({ form }): React.ReactElement => {
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
      <div className="rectification-list-item-dropdown">
        {t('landing-page:list:show-more')}
      </div>
    </div>
  );
};

export default RectificationListRow;
