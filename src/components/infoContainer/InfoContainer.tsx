/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';
import CarInfoCard from '../carInfoCard/CarInfoCard';
import ParkingFineSummary from '../parkingFineSummary/ParkingFineSummary';
import ReimbursementSummary from '../reimbursementSummary/ReimbursementSummary';
import { FoulData, ResponseCode } from '../../interfaces/foulInterfaces';
import { TransferData } from '../../interfaces/transferInterfaces';
import './InfoContainer.css';

interface Props {
  transferNumber?: string;
  selectedForm: string;
  foulData?: FoulData;
  transferData?: TransferData;
  editMode: boolean;
}

const InfoContainer: FC<Props> = ({
  transferNumber,
  selectedForm,
  foulData,
  transferData,
  editMode
}): React.ReactElement => {
  const { t } = useTranslation();
  const data = transferData ? transferData : foulData;
  const [errorNotificationOpen, setErrorNotificationOpen] = useState(false);

  useEffect(() => {
    data && editMode && setErrorNotificationOpen(data?.responseCode !== 0);
  }, [data, editMode]);

  const getErrorMessage = (error: ResponseCode | undefined) => {
    switch (error) {
      case ResponseCode.ObjectionExists:
        return `${selectedForm}:errors:objection-exists`;
      case ResponseCode.FoulIsANote:
        return 'parking-fine:errors:note';
      default:
        return 'common:errors:default';
    }
  };

  return (
    <>
      <h2 className="show-on-print" aria-hidden="true">
        {t(`${selectedForm}:stepper:step2`)}
      </h2>
      {foulData || transferData ? (
        <>
          {errorNotificationOpen && (
            <Notification
              label={t('common:errors:notification-title')}
              type="error"
              dismissible
              className="error-notification"
              closeButtonLabelText={t('common:close-notification') as string}
              onClose={() => setErrorNotificationOpen(false)}>
              {t(getErrorMessage(data?.responseCode))}
            </Notification>
          )}
          <div className="info-container">
            {foulData ? (
              <ParkingFineSummary foulData={foulData} />
            ) : (
              <ReimbursementSummary
                transferNumber={transferNumber}
                transferData={transferData}
              />
            )}
            <CarInfoCard data={data} />
          </div>
        </>
      ) : (
        <Notification
          label={t(`${selectedForm}:notifications:data-not-found:label`)}
          type="error">
          {t(`${selectedForm}:notifications:data-not-found:text`)}
        </Notification>
      )}
    </>
  );
};

export default InfoContainer;
