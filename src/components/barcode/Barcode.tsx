import React, { useState } from 'react';
import { Button, IconCopy, Notification, TextInput } from 'hds-react';

import './Barcode.css';
import { useTranslation } from 'react-i18next';

type BarcodeProps = {
  barcode: string;
};

const Barcode = (props: BarcodeProps) => {
  const { barcode } = props;
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(barcode);
    setCopySuccess(true);
  };

  return (
    <>
      <div className="barcode-container">
        <TextInput
          id="barCode"
          label={t('common:barcode:label')}
          defaultValue={barcode}
          readOnly
        />
        <Button
          className="barcode-button"
          iconLeft={<IconCopy />}
          onClick={copyToClipboard}
          variant="secondary">
          {t('common:barcode:copy-barcode')}
        </Button>
      </div>

      {copySuccess && (
        <Notification
          label={t('common:barcode:toast-label')}
          autoClose
          autoCloseDuration={5000}
          onClose={() => setCopySuccess(false)}
          type="success"
          position="top-right"
          notificationAriaLabel={t('common:barcode:toast-body')}>
          {t('common:barcode:toast-body')}
        </Notification>
      )}
    </>
  );
};

export default Barcode;
