import React, { FC } from 'react';
import { Card } from 'hds-react';
import { useTranslation } from 'react-i18next';
import ImageViewer from '../imageViewer/ImageViewer';
import { FoulData } from '../../interfaces/foulInterfaces';
import { TransferData } from '../../interfaces/transferInterfaces';
import './CarInfoCard.css';

interface Props {
  data: FoulData | TransferData | undefined;
}

const CarInfoCard: FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  // Attachments can also contain pdf file(s), so extract only images here
  const images = data?.attachments?.filter(attachment =>
    attachment.mimeType?.startsWith('image')
  );

  return (
    <Card
      data-testid="carInfoCard"
      className="vehicle-details-container"
      border
      theme={{
        '--border-color': 'var(--color-black-20)',
        '--padding-horizontal': 'var(--spacing-l)',
        '--padding-vertical': 'var(--spacing-m)'
      }}>
      <h2 className="vehicle-details-header">
        {t('parking-fine:vehicle-info:header')}
      </h2>
      <div>
        <label>{t('common:fine-info:reg-number:label')}</label>
        <p>{data?.registerNumber}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:type')}</label>
        <p>{data?.vehicleType}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:brand')}</label>
        <p>{data?.vehicleBrand}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:model')}</label>
        <p>{data?.vehicleModel}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:color')}</label>
        <p>{data?.vehicleColor}</p>
      </div>
      {images && images.length > 0 && <ImageViewer images={images} />}
    </Card>
  );
};

export default CarInfoCard;
