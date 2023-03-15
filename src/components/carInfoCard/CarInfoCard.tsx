import React, { FC } from 'react';
import { Card } from 'hds-react';
import { useTranslation } from 'react-i18next';
import ImageViewer from '../imageViewer/ImageViewer';
import { FoulData } from '../interfaces/foulInterfaces';
import './CarInfoCard.css';

interface Props {
  foulData: FoulData;
}

const CarInfoCard: FC<Props> = ({ foulData }) => {
  const { t } = useTranslation();

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
        <p>{foulData.registerNumber}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:type')}</label>
        <p>{foulData.vehicleType}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:brand')}</label>
        <p>{foulData.vehicleBrand}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:model')}</label>
        <p>{foulData.vehicleModel}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:color')}</label>
        <p>{foulData.vehicleColor}</p>
      </div>
      <ImageViewer images={foulData.attachments} />
    </Card>
  );
};

export default CarInfoCard;
