import React from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../searchForm/SearchForm';
import ExtendDueDateForm from '../extendDueDate/ExtendDueDateForm';
import { FormId, selectFormContent } from './formContentSlice';
import './FormContent.css';

interface Props {
  activeStep: number;
}

const FormContent = (props: Props): React.ReactElement => {
  const formContent = useSelector(selectFormContent);
  return (
    <div className="form-container">
      {props.activeStep === 0 && <SearchForm />}
      {props.activeStep === 1 &&
        formContent.selectedForm === FormId.DUEDATE && <ExtendDueDateForm />}
    </div>
  );
};

export default FormContent;
