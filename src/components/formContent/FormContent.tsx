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
  ObjectionControlType,
  ObjectionFormFiles
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
  onSubmitPoaFile: (files: File[]) => void;
  onSubmitAttachmentFiles: (files: File[]) => void;
  formFiles: ObjectionFormFiles;
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
      case FormId.DUEDATE:
        return <ExtendDueDateForm />;
      case FormId.PARKINGFINE:
        return (
          <InfoContainer
            selectedForm={formContent.selectedForm}
            foulData={formContent.foulData}
            editMode={true}
          />
        );
      case FormId.MOVEDCAR:
        return (
          <InfoContainer
            transferNumber={formValues.transferNumber}
            selectedForm={formContent.selectedForm}
            transferData={formContent.transferData}
            editMode={true}
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
              editMode={true}
            />
          )
        }[props.activeStep]
      }
    </div>
  );
};

export default FormContent;
