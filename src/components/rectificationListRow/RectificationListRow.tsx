import React, { FC, useState } from 'react';
import { Button, IconAngleDown, IconAngleUp } from 'hds-react';
import { ObjectionDocument } from '../../interfaces/objectionInterfaces';
import RectificationListDetails from '../rectificationListDetails/RectificationListDetails';
import CustomTag from '../customTag/CustomTag';
import { formatDateTime } from '../../utils/helpers';
import { FormId } from '../formContent/formContentSlice';
import { t } from 'i18next';
import './RectificationListRow.css';

interface Props {
  form: ObjectionDocument;
}

const RectificationListRow: FC<Props> = ({ form }): React.ReactElement => {
  const [extended, setExtended] = useState(false);
  const formTypes = [FormId.PARKINGFINE, FormId.MOVEDCAR, FormId.DUEDATE];
  const formType = form.content.dueDate
    ? FormId.DUEDATE
    : formTypes[form.content.type as number];
  const tagColor = (status: string) => {
    switch (status) {
      case 'resolvedViaEService':
      case 'resolvedViaMail':
        return 'var(--color-success)';
      case 'handling':
        return 'var(--color-alert)';
      default:
        return 'var(--color-info)';
    }
  };

  return (
    <>
      <div className="rectification-list-row">
        <div className="rectification-list-row-date">
          {formatDateTime(form.updated_at)}
        </div>
        <div className="rectification-list-row-title">
          {`${t(`${formType}:title`)} (${form.transaction_id})`}
        </div>
        <div className="rectification-list-row-status">
          {form.status.value && (
            <CustomTag
              text={t(`landing-page:list:status:${form.status.value}:default`)}
              color={tagColor(form.status.value)}
              textColor={form.status.value !== 'handling' ? 'white' : undefined}
            />
          )}
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
      {extended && <RectificationListDetails form={form} formType={formType} />}
    </>
  );
};

export default RectificationListRow;
