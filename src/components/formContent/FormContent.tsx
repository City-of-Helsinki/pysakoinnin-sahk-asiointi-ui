import React from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../searchForm/SearchForm';
import { FormId, selectFormContent } from './formContentSlice';
import './FormContent.css';
import ExtendDueDateForm from '../extendDueDate/ExtendDueDateForm';
import ParkingFineSummary from '../parkingFineSummary/ParkingFineSummary';
import RectificationForm from '../rectification/RectificationForm';
import ReimbursementSummary from '../reimbursement/ReimbursementSummary';

interface Props {
  activeStep: number;
}

const FormContent = (props: Props): React.ReactElement => {
  const formContent = useSelector(selectFormContent);

  const selectForm = (selectedForm: FormId) => {
    switch (selectedForm) {
      case 'due-date':
        return <ExtendDueDateForm />;
      case 'parking-fine':
        return <ParkingFineSummary />;
      case 'moved-car':
        return <ReimbursementSummary />;
    }
  };

  return (
    <div className="form-container">
      {
        {
          0: <SearchForm />,
          1: selectForm(formContent.selectedForm),
          2: <RectificationForm />
        }[props.activeStep]
      }
    </div>
  );
};

export default FormContent;
