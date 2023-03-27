/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';
import { FormId, selectFormContent } from '../formContent/formContentSlice';
import CarInfoCard from '../carInfoCard/CarInfoCard';
import ParkingFineSummary from '../parkingFineSummary/ParkingFineSummary';
import ReimbursementSummary from '../reimbursementSummary/ReimbursementSummary';
import { FoulData, ResponseCode } from '../../interfaces/foulInterfaces';
import { TransferData } from '../../interfaces/transferInterfaces';
import './InfoContainer.css';

const InfoContainer = (): React.ReactElement => {
  const { t } = useTranslation();
  const formContent = useSelector(selectFormContent);
  const selectedForm = formContent.selectedForm;
  const data =
    selectedForm === FormId.MOVEDCAR
      ? formContent.transferData
      : formContent.foulData;
  const [errorNotificationOpen, setErrorNotificationOpen] = useState(false);

  useEffect(() => {
    data && setErrorNotificationOpen(data?.responseCode !== 0);
  }, [data]);

  const selectForm = (selectedForm: FormId) => {
    switch (selectedForm) {
      case FormId.PARKINGFINE:
        return (
          <>
            <ParkingFineSummary foulData={data as FoulData} />
            <CarInfoCard data={data} />
          </>
        );
      case FormId.MOVEDCAR:
        return (
          <>
            <ReimbursementSummary transferData={data as TransferData} />
            <CarInfoCard data={data} />
          </>
        );
    }
  };

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
      <div className="info-container">{selectForm(selectedForm)}</div>
    </>
  );
};

export default InfoContainer;
