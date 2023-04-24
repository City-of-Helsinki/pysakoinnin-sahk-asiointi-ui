import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormGetValues } from 'react-hook-form';
import SearchForm from '../searchForm/SearchForm';
import {
  FormId,
  selectFormContent,
  selectFormValues,
  setFormValues
} from './formContentSlice';
import { selectUserProfile } from '../user/userSlice';
import {
  ObjectionForm,
  ObjectionControlType
} from '../../interfaces/objectionInterfaces';
import ExtendDueDateForm from '../extendDueDate/ExtendDueDateForm';
import InfoContainer from '../infoContainer/InfoContainer';
import RectificationForm from '../rectificationForm/RectificationForm';
import RectificationSummary from '../rectificationSummary/RectificationSummary';
import { FormFiles } from '../formStepper/FormStepper';
import './FormContent.css';
interface Props {
  activeStep: number;
  control: ObjectionControlType;
  values: UseFormGetValues<ObjectionForm>;
  onSubmitPoaFile: (files: File[]) => void;
  onSubmitAttachmentFiles: (files: File[]) => void;
  formFiles: FormFiles;
}

const FormContent = (props: Props): React.ReactElement => {
  const dispatch = useDispatch();
  const formContent = useSelector(selectFormContent);
  const formValues = useSelector(selectFormValues);
  const userProfile = useSelector(selectUserProfile);

  /* Add user info to formValues so it can be easily
   * displayed on RectificationSummary and
   * sent to PASI when form is submitted */
  useEffect(() => {
    const formValuesWithUserData = {
      ...formValues,
      ...userProfile
    };
    dispatch(setFormValues(formValuesWithUserData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

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
            <RectificationForm
              control={props.control}
              values={props.values}
              onSubmitPoaFile={props.onSubmitPoaFile}
              onSubmitAttachmentFiles={props.onSubmitAttachmentFiles}
              formFiles={props.formFiles}
            />
          ),
          3: (
            <RectificationSummary
              form={formValues}
              formType={formContent.selectedForm}
              foulData={formContent.foulData}
              transferData={formContent.transferData}
              formFiles={props.formFiles}
            />
          )
        }[props.activeStep]
      }
    </div>
  );
};

export default FormContent;
