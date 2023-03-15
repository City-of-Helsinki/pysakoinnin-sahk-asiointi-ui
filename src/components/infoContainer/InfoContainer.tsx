import React from 'react';
import { useSelector } from 'react-redux';
import { FormId, selectFormContent } from '../formContent/formContentSlice';
import CarInfoCard from '../carInfoCard/CarInfoCard';
import ParkingFineSummary from '../parkingFineSummary/ParkingFineSummary';
import ReimbursementSummary from '../reimbursement/ReimbursementSummary';
import mockFoulData from '../../mocks/mockFoulData';
import './InfoContainer.css';

const InfoContainer = (): React.ReactElement => {
  const selectedForm = useSelector(selectFormContent).selectedForm;
  const foulData = mockFoulData; /* TODO: get data from /getFoulData endpoint */

  const selectForm = (selectedForm: FormId) => {
    switch (selectedForm) {
      case 'parking-fine':
        return <ParkingFineSummary foulData={foulData} />;
      case 'moved-car':
        return <ReimbursementSummary />;
    }
  };
  return (
    <div className="info-container">
      {selectForm(selectedForm)}
      <CarInfoCard foulData={foulData} />
    </div>
  );
};

export default InfoContainer;
