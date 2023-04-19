import React from 'react';
import { useSelector } from 'react-redux';
import { UseFormGetValues } from 'react-hook-form';
import SearchForm from '../searchForm/SearchForm';
import {
  FormId,
  selectFormContent,
  selectFormValues
} from './formContentSlice';
import {
  ObjectionForm,
  ObjectionControlType
} from '../../interfaces/objectionInterfaces';
import ExtendDueDateForm from '../extendDueDate/ExtendDueDateForm';
import InfoContainer from '../infoContainer/InfoContainer';
import RectificationForm from '../rectificationForm/RectificationForm';
import RectificationSummary from '../rectificationSummary/RectificationSummary';
import './FormContent.css';

interface Props {
  activeStep: number;
  control: ObjectionControlType;
  values: UseFormGetValues<ObjectionForm>;
}

const FormContent = (props: Props): React.ReactElement => {
  const formContent = useSelector(selectFormContent);
  const formValues = useSelector(selectFormValues);

  const selectForm = (selectedForm: FormId) => {
    switch (selectedForm) {
      case 'due-date':
        return <ExtendDueDateForm />;
      case 'parking-fine':
        return (
          <InfoContainer
            selectedForm={formContent.selectedForm}
            foulData={formContent.foulData}
          />
        );
      case 'moved-car':
        return (
          <InfoContainer
            selectedForm={formContent.selectedForm}
            transferData={formContent.transferData}
          />
        );
    }
  };

  return (
    <div className="form-container">
      {
        {
          0: <SearchForm control={props.control} />,
          1: selectForm(formContent.selectedForm),
          2: (
            <RectificationForm control={props.control} values={props.values} />
          ),
          3: (
            <RectificationSummary
              form={formValues}
              formType={formContent.selectedForm}
            />
          )
        }[props.activeStep]
      }
    </div>
  );
};

export default FormContent;
