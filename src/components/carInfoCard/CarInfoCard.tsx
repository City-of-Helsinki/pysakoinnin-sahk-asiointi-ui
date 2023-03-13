import React from 'react';
import { Card } from 'hds-react';
import { useTranslation } from 'react-i18next';
import ImageViewer from '../imageViewer/ImageViewer';
import './CarInfoCard.css';

const CarInfoCard = (): React.ReactElement => {
  const { t } = useTranslation();

  const imageUrls = [
    'https://via.placeholder.com/600.png',
    'https://via.placeholder.com/600x1200.png',
    'https://via.placeholder.com/1200x800.png',
    'https://via.placeholder.com/600x300.png',
    'https://via.placeholder.com/900x800.png'
  ];

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
        <p>{t('common:fine-info:reg-number:placeholder')}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:type:label')}</label>
        <p>{t('parking-fine:vehicle-info:type:placeholder')}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:brand:label')}</label>
        <p>{t('parking-fine:vehicle-info:brand:placeholder')}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:model:label')}</label>
        <p>{t('parking-fine:vehicle-info:model:placeholder')}</p>
      </div>
      <div>
        <label>{t('parking-fine:vehicle-info:color:label')}</label>
        <p>{t('parking-fine:vehicle-info:color:placeholder')}</p>
      </div>
      <ImageViewer images={imageUrls} />
    </Card>
  );
};

export default CarInfoCard;
