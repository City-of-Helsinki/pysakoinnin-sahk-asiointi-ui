import { Button, Card, IconCopy, TextArea, TextInput } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './ParkingFineSummary.css';

/**
 * TODO
 * - Handle copying barcode to clipboard
 * - Add dividers
 * - Add image view to vehicle details
 */

const ParkingFineSummary = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <p>{t('common:required-fields')}</p>

      <div className="summary-container">
        <Card className="vehicle-details-container" border>
          <TextInput
            id="regNumber"
            label={t('common:fine-info:reg-number:label')}
            value={t('common:fine-info:reg-number:placeholder')}
            readOnly
          />
          <TextInput
            id="regNumber"
            label={t('parking-fine:vehicle-info:type:label')}
            value={t('parking-fine:vehicle-info:type:placeholder')}
            readOnly
          />
          <TextInput
            id="regNumber"
            label={t('parking-fine:vehicle-info:brand:label')}
            value={t('parking-fine:vehicle-info:brand:placeholder')}
            readOnly
          />
          <TextInput
            id="regNumber"
            label={t('parking-fine:vehicle-info:model:label')}
            value={t('parking-fine:vehicle-info:model:placeholder')}
            readOnly
          />
          <TextInput
            id="regNumber"
            label={t('parking-fine:vehicle-info:color:label')}
            value={t('parking-fine:vehicle-info:color:placeholder')}
            readOnly
          />
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
          id="ref-number"
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
          id="fine-title"
          label={t('common:fine-info:fine-title:label')}
          value={t('common:fine-info:fine-title:placeholder')}
          readOnly
        />
        <TextInput
          className="info-field"
          id="additionalDetails"
          label={t('common:fine-info:fine-details:label')}
          value={t('common:fine-info:fine-details:placeholder')}
          readOnly
        />
        <TextArea
          className="info-field"
          id="fine-title"
          label={t('common:fine-info:fine-title:label')}
          value={t('common:fine-info:fine-title:placeholder')}
          readOnly
        />
        <TextInput
          className="info-field"
          id="additionalDetails"
          label={t('common:fine-info:fine-details:label')}
          value={t('common:fine-info:fine-details:placeholder')}
          readOnly
        />

        <TextArea
          className="wide-field"
          id="address"
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

      <TextInput
        id="fineBarcode"
        readOnly
        label={t('common:fine-info:barcode:label')}
        value={t('common:fine-info:barcode:placeholder')}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => null}
        iconLeft={<IconCopy />}>
        {t('common:copy-barcode')}
      </Button>
    </>
  );
};

export default ParkingFineSummary;
