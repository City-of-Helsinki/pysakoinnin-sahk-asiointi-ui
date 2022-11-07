import React from 'react';
import SearchForm from '../searchForm/SearchForm';
import ExtendDueDateForm from '../extendDueDate/ExtendDueDateForm';
import './FormContent.css';

interface Props {
  selectedForm: string;
  activeStep: number;
}

const FormContent = (props: Props): React.ReactElement => (
  <div className="form-container">
    {props.activeStep === 0 && <SearchForm />}
    {props.activeStep === 1 && props.selectedForm === 'dueDate' && (
      <ExtendDueDateForm />
    )}
  </div>
);

export default FormContent;
