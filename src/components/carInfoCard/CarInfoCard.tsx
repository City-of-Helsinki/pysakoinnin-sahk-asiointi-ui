import React from 'react';
import { Card, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import ImageViewer from '../imageViewer/ImageViewer';
import './CarInfoCard.css';

const CarInfoCard = (): React.ReactElement => {
  const { t } = useTranslation();

  const imageUrls = [
    'https://via.placeholder.com/600.png',
    'https://via.placeholder.com/600x1200.png',
    'https://via.placeholder.com/1200x800.png'
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
  );
};

export default CarInfoCard;
