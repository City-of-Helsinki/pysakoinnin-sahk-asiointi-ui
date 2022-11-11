import {
  Button,
  Card,
  IconLinkExternal,
  RadioButton,
  TextInput
} from 'hds-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ParkingFineSummary.css';

const ParkingFineSummary = (): React.ReactElement => {
  const { t } = useTranslation();
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
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
        </Card>

        <div className="info-container">
          <TextInput
            id="fineTimeStamp"
            label={t('common:fine-info:fine-timestamp:label')}
            value={t('common:fine-info:fine-timestamp:placeholder')}
            readOnly
          />
          <TextInput
            id="ref-number"
            label={t('common:fine-info:ref-number:label')}
            value={t('common:fine-info:ref-number:placeholder')}
            readOnly
          />
        </div>

        <div className="info-container">
          <TextInput
            id="address"
            label={t('common:fine-info:address:label')}
            value={t('common:fine-info:address:placeholder')}
            readOnly
          />
          <TextInput
            id="additionalDetails"
            label={t('common:fine-info:additional-details:label')}
            value={t('common:fine-info:additional-details:placeholder')}
            readOnly
          />
        </div>

        <div className="info-container">
          <TextInput
            id="address"
            label={t('common:fine-info:fine-title:label')}
            value={t('common:fine-info:fine-title:placeholder')}
            readOnly
          />
          <TextInput
            id="additionalDetails"
            label={t('common:fine-info:fine-details:label')}
            value={t('common:fine-info:fine-details:placeholder')}
            readOnly
          />
          <TextInput
            id="address"
            label={t('common:fine-info:fine-title:label')}
            value={t('common:fine-info:fine-title:placeholder')}
            readOnly
          />
          <TextInput
            id="additionalDetails"
            label={t('common:fine-info:fine-details:label')}
            value={t('common:fine-info:fine-details:placeholder')}
            readOnly
          />
        </div>

        <div className="info-container">
          <TextInput
            id="address"
            label={t('common:fine-info:fine-additional-details')}
            readOnly
          />
        </div>
        <div className="info-container">
          <TextInput id="sum" label={t('common:fine-info:sum')} readOnly />
          <TextInput
            id="dueDate"
            label={t('common:fine-info:due-date')}
            readOnly
          />
        </div>

        <div className="info-container">
          <p>{t('common:selection')}</p>

          <RadioButton
            label={t('parking-fine:make-rectification')}
            id="makeRectification"
            value="a"
            checked={!isPaymentSelected}
            onChange={() => setIsPaymentSelected(false)}
          />
          <RadioButton
            value="b"
            label={t('parking-fine:pay-fine')}
            id="goToPayment"
            onChange={() => setIsPaymentSelected(true)}
            checked={isPaymentSelected}
          />

          <Button role="link" disabled={!isPaymentSelected}>
            {t('parking-fine:to-payment')} <IconLinkExternal />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ParkingFineSummary;
