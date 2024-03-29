import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSubmitDisabled } from '../formContent/formContentSlice';
import { formatDate, formatDateTime } from '../../utils/helpers';
import { FoulData, Foul, ResponseCode } from '../../interfaces/foulInterfaces';
import Barcode from '../barcode/Barcode';
import '../infoContainer/InfoContainer.css';

interface FoulRowProps {
  foul: Foul;
}

const FoulRow: FC<FoulRowProps> = ({ foul }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="info-field">
        <label>{t('common:fine-info:fine-title')}</label>
        <p>{foul?.description}</p>
      </div>
      <div className="info-field">
        {foul?.additionalInfo && (
          <>
            <label>{t('common:fine-info:fine-details')}</label>
            <p>{foul.additionalInfo}</p>
          </>
        )}
      </div>
    </>
  );
};

interface Props {
  foulData: FoulData | undefined;
}

const ParkingFineSummary: FC<Props> = ({ foulData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const foulTime: string = foulData
    ? foulData?.monitoringStart
      ? `${formatDateTime(foulData.monitoringStart)} - ${formatDateTime(
          foulData.foulDate
        )}`
      : `${formatDateTime(foulData.foulDate)}`
    : '';

  useEffect(() => {
    dispatch(setSubmitDisabled(false));
  }, [dispatch]);

  return (
    <div className="summary-body">
      <div data-testid="parkingFineSummary" className="summary-container">
        <div className="info-field">
          <label>{t('common:fine-info:fine-timestamp')}</label>
          <p>{foulTime}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:ref-number:label')}</label>
          <p>{foulData?.foulNumber}</p>
        </div>

        <hr />

        <div className="info-field">
          <label>{t('common:fine-info:address')}</label>
          <p>{foulData?.address}</p>
        </div>
        <div className="info-field">
          {foulData?.addressAdditionalInfo && (
            <>
              <label>{t('common:fine-info:additional-details')}</label>
              <p>{foulData?.addressAdditionalInfo}</p>
            </>
          )}
        </div>

        <hr />

        {foulData?.fouls?.map((foul: Foul, index: number) => (
          <FoulRow key={index} foul={foul} />
        ))}

        <hr />

        <div className="wide-field">
          <label>{t('common:fine-info:fine-additional-details')}</label>
          <p>{foulData?.description}</p>
        </div>

        <hr />

        <div className="info-field sum-field">
          <label>{t('common:fine-info:sum')}</label>
          <p>{foulData?.openAmountText}</p>
        </div>

        <div className="info-field">
          {foulData?.responseCode !== ResponseCode.FoulIsANote && (
            <>
              <label>{t('common:fine-info:due-date')}</label>
              <p>{foulData?.dueDate && formatDate(foulData.dueDate)}</p>
            </>
          )}
        </div>

        <hr />
        <Barcode barcode={foulData?.barCode} className="wide-field" />
      </div>
    </div>
  );
};

export default ParkingFineSummary;
