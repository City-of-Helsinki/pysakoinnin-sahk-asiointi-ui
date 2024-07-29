import React, { FC, useState } from 'react';
import { Button, IconAngleDown, IconAngleUp } from 'hds-react';
import { ObjectionDocument } from '../../interfaces/objectionInterfaces';
import RectificationListDetails from '../rectificationListDetails/RectificationListDetails';
import CustomTag from '../customTag/CustomTag';
import { formatDateTime } from '../../utils/helpers';
import { FormId } from '../formContent/formContentSlice';
import { t } from 'i18next';
import { FoulData } from '../../interfaces/foulInterfaces';
import { TransferData } from '../../interfaces/transferInterfaces';
import { getFoulData } from '../../services/foulService';
import { getTransferData } from '../../services/transferService';
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
  const [foulData, setFoulData] = useState<FoulData>();
  const [transferData, setTransferData] = useState<TransferData>();

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

  /* Gets foul/transfer data and possible decision from PASI to be shown
  with the objection form. If data can't be fetched from PASI for some
  reason, the objection form can still be shown */
  const fetchData = async () => {
    if (!extended) {
      if (form.metadata && form.metadata.registerNumber) {
        if (form.metadata.foulNumber) {
          await getFoulData({
            foul_number: form.metadata.foulNumber,
            register_number: form.metadata.registerNumber
          })
            .then(res => {
              setFoulData(res);
            })
            .catch(() => {
              /* Fails silently */
            });
        } else if (form.metadata.transferNumber) {
          await getTransferData({
            transfer_number: form.metadata.transferNumber,
            register_number: form.metadata.registerNumber
          })
            .then(res => {
              setTransferData(res);
            })
            .catch(() => {
              /* Fails silently */
            });
        }
      }
    }
  };

  return (
    <>
      <div className="rectification-list-row">
        <div className="rectification-list-row-date">
          {formatDateTime(form.updated_at)}
        </div>
        <div className="rectification-list-row-title">
          {`${t(`${formType}:title`)} (${
            formType == FormId.MOVEDCAR
              ? form.metadata?.transferNumber
              : form.transaction_id
          })`}
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
          aria-label={
            extended
              ? t<string>('landing-page:list:show-less')
              : t<string>('landing-page:list:show-more')
          }
          className="rectification-list-row-button"
          variant="supplementary"
          size="small"
          aria-expanded={extended}
          aria-controls={`rectification-details-${form.transaction_id}`}
          iconRight={extended ? <IconAngleUp /> : <IconAngleDown />}
          onClick={async () => {
            await fetchData();
            setExtended(!extended);
          }}>
          {extended
            ? t('landing-page:list:show-less')
            : t('landing-page:list:show-more')}
        </Button>
      </div>
      {extended && (
        <RectificationListDetails
          form={form}
          formType={formType}
          foulData={foulData}
          transferData={transferData}
        />
      )}
    </>
  );
};

export default RectificationListRow;
