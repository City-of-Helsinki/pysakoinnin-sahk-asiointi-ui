import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextArea, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { setSubmitDisabled } from '../formContent/formContentSlice';
import './ParkingFineSummary.css';
import Barcode from '../barcode/Barcode';
import CarInfoCard from '../carInfoCard/CarInfoCard';

const ParkingFineSummary = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubmitDisabled(false));
  }, [dispatch]);

  return (
    <>
      <div data-testid="parkingFineSummary" className="summary-container">
        <CarInfoCard />

        <TextInput
          className="info-field"
          id="fineTimeStamp"
          label={t('common:fine-info:fine-timestamp:label')}
          value={t('common:fine-info:fine-timestamp:placeholder')}
          readOnly
        />
        <TextInput
          className="info-field"
          id="refNumber"
          label={t('common:fine-info:ref-number:label')}
          value={t('common:fine-info:ref-number:placeholder')}
          readOnly
        />

        <hr />

        <TextInput
          className="info-field"
          id="address"
          label={t('common:fine-info:address:label')}
          value={t('common:fine-info:address:placeholder')}
          readOnly
        />
        <TextInput
          className="info-field"
          id="additionalDetails"
          label={t('common:fine-info:additional-details:label')}
          value={t('common:fine-info:additional-details:placeholder')}
          readOnly
        />

        <hr />

        <TextArea
          className="info-field"
          id="fineTitle-1"
          label={t('common:fine-info:fine-title:label')}
          value={t('common:fine-info:fine-title:placeholder')}
          readOnly
        />
        <TextInput
          className="info-field"
          id="fineDetails-1"
          label={t('common:fine-info:fine-details:label')}
          value={t('common:fine-info:fine-details:placeholder')}
          readOnly
        />
        <TextArea
          className="info-field"
          id="fineTitle-2"
          label={t('common:fine-info:fine-title:label')}
          value={t('common:fine-info:fine-title:placeholder')}
          readOnly
        />
        <TextInput
          className="info-field"
          id="fineDetails-2"
          label={t('common:fine-info:fine-details:label')}
          value={t('common:fine-info:fine-details:placeholder')}
          readOnly
        />

        <hr />

        <TextArea
          className="wide-field"
          id="fineAdditionalDetails"
          label={t('common:fine-info:fine-additional-details:label')}
          value={t('common:fine-info:fine-additional-details:placeholder')}
          readOnly
        />

        <hr />

        <TextInput
          id="sum"
          label={t('common:fine-info:sum:label')}
          value={t('common:fine-info:sum:placeholder')}
          readOnly
          className="info-field sum-field"
        />
        <TextInput
          className="info-field"
          id="dueDate"
          label={t('common:fine-info:due-date:label')}
          value={t('common:fine-info:due-date:placeholder')}
          readOnly
        />

        <hr />
        <Barcode
          barcode="430123730001230560012400000000000000000100018714210302"
          className="wide-field"
        />
      </div>
    </>
  );
};

export default ParkingFineSummary;
