import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSubmitDisabled } from '../formContent/formContentSlice';
import Barcode from '../barcode/Barcode';
import './ParkingFineSummary.css';

const ParkingFineSummary = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubmitDisabled(false));
  }, [dispatch]);

  return (
    <div className="summary-body">
      <div data-testid="parkingFineSummary" className="summary-container">
        <h2 className="show-on-print" aria-hidden="true">
          {t('parking-fine:fine-info')}
        </h2>
        <div className="info-field">
          <label>{t('common:fine-info:fine-timestamp:label')}</label>
          <p>{t('common:fine-info:fine-timestamp:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:ref-number:label')}</label>
          <p>{t('common:fine-info:ref-number:placeholder')}</p>
        </div>

        <hr />

        <div className="info-field">
          <label>{t('common:fine-info:address:label')}</label>
          <p>{t('common:fine-info:address:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:additional-details:label')}</label>
          <p>{t('common:fine-info:additional-details:placeholder')}</p>
        </div>

        <hr />

        <div className="info-field">
          <label>{t('common:fine-info:fine-title:label')}</label>
          <p>{t('common:fine-info:fine-title:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:fine-details:label')}</label>
          <p>{t('common:fine-info:fine-details:placeholder')}</p>
        </div>

        <div className="info-field">
          <label>{t('common:fine-info:fine-title:label')}</label>
          <p>{t('common:fine-info:fine-title:placeholder')}</p>
        </div>
        <div className="info-field">
          <label>{t('common:fine-info:fine-details:label')}</label>
          <p>{t('common:fine-info:fine-details:placeholder')}</p>
        </div>

        <hr />

        <div className="wide-field">
          <label>{t('common:fine-info:fine-additional-details:label')}</label>
          <p>{t('common:fine-info:fine-additional-details:placeholder')}</p>
        </div>

        <hr />

        <div className="info-field sum-field">
          <label>{t('common:fine-info:sum:label')}</label>
          <p>{t('common:fine-info:sum:placeholder')}</p>
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

export default ParkingFineSummary;
