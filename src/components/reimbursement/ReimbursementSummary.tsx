import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSubmitDisabled } from '../formContent/formContentSlice';
import Barcode from '../barcode/Barcode';
import './ReimbursementSummary.css';

const ReimbursementSummary = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubmitDisabled(false));
  }, [dispatch]);

  return (
    <div className="summary-body">
      <div data-testid="reimbursementSummary" className="summary-container">
        <div className="info-field">
          <label>{t('moved-car:move-timestamp:label')}</label>
          <p>{t('moved-car:move-timestamp:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:ref-number:label')}</label>
          <p>{t('common:fine-info:ref-number:placeholder')}</p>
        </div>
        <hr />
        <div className="info-field">
          <label>{t('moved-car:move-reason:label')}</label>
          <p>{t('moved-car:move-reason:placeholder')}</p>
        </div>
        <hr />
        <div className="info-field">
          <label>{t('moved-car:move-type:label')}</label>
          <p>{t('moved-car:move-type:placeholder')}</p>
        </div>
        <hr />
        <div className="info-field address-field">
          <label>{t('moved-car:address-from:label')}</label>
          <p>{t('moved-car:address-from:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('moved-car:address-from:details-label')}</label>
          <p>{t('moved-car:address-from:details-placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('moved-car:address-to:label')}</label>
          <p>{t('moved-car:address-to:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('moved-car:address-to:details-label')}</label>
          <p>{t('moved-car:address-to:details-placeholder')}</p>
        </div>
        <hr />
        <div className="info-field">
          <label>{t('moved-car:reimbursement-sum:label')}</label>
          <p>{t('moved-car:reimbursement-sum:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:due-date:label')}</label>
          <p>{t('common:fine-info:due-date:placeholder')}</p>
        </div>
        <hr />
        <Barcode
          barcode="430123730001230560012400000000000000000100018714210302"
          className="wide-field"
        />
      </div>
    </div>
  );
};

export default ReimbursementSummary;
