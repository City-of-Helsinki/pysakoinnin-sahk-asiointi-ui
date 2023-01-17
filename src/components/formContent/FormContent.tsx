import React from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../searchForm/SearchForm';
import {
  FormId,
  selectFormContent,
  RectificationControlType
} from './formContentSlice';
import ExtendDueDateForm from '../extendDueDate/ExtendDueDateForm';
import InfoContainer from '../infoContainer/InfoContainer';
import RectificationForm from '../rectificationForm/RectificationForm';
import RectificationSummary from '../rectificationSummary/RectificationSummary';
import './FormContent.css';

interface Props {
  activeStep: number;
  control: RectificationControlType;
}

const FormContent = (props: Props): React.ReactElement => {
  const formContent = useSelector(selectFormContent);

  const selectForm = (selectedForm: FormId) => {
    switch (selectedForm) {
      case 'due-date':
        return <ExtendDueDateForm />;
      case 'parking-fine':
        return <InfoContainer />;
      case 'moved-car':
        return <InfoContainer />;
    }
  };

  return (
    <div className="form-container">
      {
        {
          0: <SearchForm control={props.control} />,
          1: selectForm(formContent.selectedForm),
          2: <RectificationForm control={props.control} />,
          3: <RectificationSummary />
        }[props.activeStep]
      }
    </div>
  );
};

export default FormContent;
