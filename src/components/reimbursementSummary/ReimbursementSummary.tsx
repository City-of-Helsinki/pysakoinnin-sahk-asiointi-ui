import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSubmitDisabled } from '../formContent/formContentSlice';
import { TransferData } from '../../interfaces/transferInterfaces';
import Barcode from '../barcode/Barcode';
import { formatDate } from '../../utils/helpers';
import './ReimbursementSummary.css';

interface Props {
  transferData: TransferData;
}

const ReimbursementSummary: FC<Props> = ({ transferData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubmitDisabled(false));
  }, [dispatch]);

  return (
    <div className="summary-body">
      <div data-testid="reimbursementSummary" className="summary-container">
        <h2 className="show-on-print" aria-hidden="true">
          {t('moved-car:stepper:step2')}
        </h2>
        <div className="info-field">
          <label>{t('moved-car:move-timestamp')}</label>
          <p>{formatDate(transferData.transferDate)}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:ref-number:label')}</label>
          <p>{transferData.transferNumber}</p>
        </div>
        <hr />
        <div className="info-field">
          <label>{t('moved-car:move-reason')}</label>
          <p>{transferData.transferReason}</p>
        </div>
        <hr />
        <div className="info-field">
          <label>{t('moved-car:move-type')}</label>
          <p>{transferData.transferType}</p>
        </div>
        <hr />
        <div className="info-field address-field">
          <label>{t('moved-car:start-address')}</label>
          <p>{transferData.startAddress}</p>
        </div>
        <div className="info-field">
          <label>{t('moved-car:start-address-details')}</label>
          <p>{transferData.startAddressAdditionalInfo}</p>
        </div>
        <div className="info-field">
          <label>{t('moved-car:end-address')}</label>
          <p>{transferData.endAddress}</p>
        </div>
        <div className="info-field">
          <label>{t('moved-car:end-address-details')}</label>
          <p>{transferData.endAddressAdditionalInfo}</p>
        </div>
        <hr />
        <div className="info-field">
          <label>{t('moved-car:reimbursement-sum')}</label>
          <p>{transferData.invoiceSumText}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:due-date')}</label>
          <p>{formatDate(transferData.dueDate)}</p>
        </div>
        <hr />
        <Barcode barcode={transferData.barCode} className="wide-field" />
      </div>
    </div>
  );
};

export default ReimbursementSummary;
