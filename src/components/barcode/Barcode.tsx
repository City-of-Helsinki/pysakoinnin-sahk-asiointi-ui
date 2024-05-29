import React, { useState } from 'react';
import { Button, IconCopy, Notification } from 'hds-react';

import './Barcode.css';
import { useTranslation } from 'react-i18next';

type BarcodeProps = {
  barcode: string | undefined;
  className?: string;
};

const Barcode = (props: BarcodeProps) => {
  const { barcode, className } = props;
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    barcode && navigator.clipboard.writeText(barcode);
    setCopySuccess(true);
  };

  return (
    <>
      <div className={`barcode-container ${className ? className : ''}`}>
        {barcode && (
          <>
            <label className="barcode-label">{t('common:barcode:label')}</label>
            <p className="barcode">{barcode}</p>
            <Button
              data-testid="copy-to-clipboard"
              className="barcode-button"
              iconLeft={<IconCopy />}
              onClick={copyToClipboard}
              variant="secondary">
              {t('common:barcode:copy-barcode')}
            </Button>
          </>
        )}
      </div>

      {copySuccess && (
        <Notification
          label={t('common:barcode:toast-label')}
          autoClose
          autoCloseDuration={5000}
          onClose={() => setCopySuccess(false)}
          type="success"
          position="top-right"
          notificationAriaLabel={t<string>('common:barcode:toast-body')}>
          {t('common:barcode:toast-body')}
        </Notification>
      )}
    </>
  );
};

export default Barcode;
