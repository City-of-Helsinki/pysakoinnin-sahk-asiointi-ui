import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, TextArea, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { setSubmitDisabled } from '../formContent/formContentSlice';
import './ParkingFineSummary.css';
import Barcode from '../barcode/Barcode';
import ImageViewer from '../imageViewer/ImageViewer';

/**
 * TODO
 * - Add dividers
 * - Add image view to vehicle details
 */

const ParkingFineSummary = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const imageUrls = [
    'https://via.placeholder.com/600.png',
    'https://via.placeholder.com/600x1200.png',
    'https://via.placeholder.com/1200x800.png'
  ];

  useEffect(() => {
    dispatch(setSubmitDisabled(false));
  }, [dispatch]);

  return (
    <>
      <div data-testid="parkingFineSummary" className="summary-container">
        <Card className="vehicle-details-container" border>
          <TextInput
            id="regNumber"
            label={t('common:fine-info:reg-number:label')}
            value={t('common:fine-info:reg-number:placeholder')}
            readOnly
          />
          <TextInput
            id="vehicleType"
            label={t('parking-fine:vehicle-info:type:label')}
            value={t('parking-fine:vehicle-info:type:placeholder')}
            readOnly
          />
          <TextInput
            id="vehicleBrand"
            label={t('parking-fine:vehicle-info:brand:label')}
            value={t('parking-fine:vehicle-info:brand:placeholder')}
            readOnly
          />
          <TextInput
            id="vehicleModel"
            label={t('parking-fine:vehicle-info:model:label')}
            value={t('parking-fine:vehicle-info:model:placeholder')}
            readOnly
          />
          <TextInput
            id="vehicleColor"
            label={t('parking-fine:vehicle-info:color:label')}
            value={t('parking-fine:vehicle-info:color:placeholder')}
            readOnly
          />
          <ImageViewer images={imageUrls} />
        </Card>

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

        <TextArea
          className="wide-field"
          id="fineAdditionalDetails"
          label={t('common:fine-info:fine-additional-details:label')}
          value={t('common:fine-info:fine-additional-details:placeholder')}
          readOnly
        />
        <TextInput
          id="sum"
          label={t('common:fine-info:sum:label')}
          value={t('common:fine-info:sum:placeholder')}
          readOnly
          className="info-field"
        />
        <TextInput
          className="info-field"
          id="dueDate"
          label={t('common:fine-info:due-date:label')}
          value={t('common:fine-info:due-date:placeholder')}
          readOnly
        />
      </div>

      <Barcode barcode="430123730001230560012400000000000000000100018714210302" />
    </>
  );
};

export default ParkingFineSummary;
