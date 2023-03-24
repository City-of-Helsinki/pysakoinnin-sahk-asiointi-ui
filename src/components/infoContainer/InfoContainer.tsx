import React from 'react';
import { useSelector } from 'react-redux';
import { FormId, selectFormContent } from '../formContent/formContentSlice';
import CarInfoCard from '../carInfoCard/CarInfoCard';
import ParkingFineSummary from '../parkingFineSummary/ParkingFineSummary';
import ReimbursementSummary from '../reimbursementSummary/ReimbursementSummary';
import mockTransferData from '../../mocks/mockTransferData';
import './InfoContainer.css';

const InfoContainer = (): React.ReactElement => {
  const formContent = useSelector(selectFormContent);
  const selectedForm = formContent.selectedForm;
  const foulData = formContent.foulData;
  const transferData = mockTransferData; /* TODO: get data from /getTransferData endpoint */

  const selectForm = (selectedForm: FormId) => {
    switch (selectedForm) {
      case 'parking-fine':
        return (
          <>
            <ParkingFineSummary foulData={foulData} />
            <CarInfoCard data={foulData} />
          </>
        );
      case 'moved-car':
        return (
          <>
            <ReimbursementSummary transferData={transferData} />
            <CarInfoCard data={transferData} />
          </>
        );
    }
  };

  return <div className="info-container">{selectForm(selectedForm)}</div>;
};

export default InfoContainer;
