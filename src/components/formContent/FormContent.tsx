import React from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../searchForm/SearchForm';
import { FormId, selectFormContent } from './formContentSlice';
import './FormContent.css';
import ExtendDueDateForm from '../extendDueDate/ExtendDueDateForm';
import ParkingFineSummary from '../parkingFineSummary/ParkingFineSummary';

interface Props {
  activeStep: number;
}

const FormContent = (props: Props): React.ReactElement => {
  const formContent = useSelector(selectFormContent);

  const selectForm = (selectedForm: FormId) => {
    switch (selectedForm) {
      case 'dueDate':
        return <ExtendDueDateForm />;
      case 'parkingFine':
        return <ParkingFineSummary />;
    }
  };

  return (
    <div className="form-container">
      {
        {
          0: <SearchForm />,
          1: selectForm(formContent.selectedForm)
        }[props.activeStep]
      }
    </div>
  );
};

export default FormContent;