import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageContent from '../PageContent';
import FormStepper from '../formStepper/FormStepper';
import { StepState } from '../formStepper/formStepperSlice';
import { FormId, setSelectedForm } from '../formContent/formContentSlice';

const ExtendDueDate = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const steps = [
    {
      label: t('due-date:stepper:step1'),
      state: StepState.available
    },
    {
      label: t('due-date:stepper:step2'),
      state: StepState.disabled
    }
  ];

  const handleSubmit = () => {
    //console.log('submit extend due date form');
  };

  useEffect(() => {
    dispatch(setSelectedForm(FormId.DUEDATE));
  }, [dispatch]);

  return (
    <PageContent>
      <FormStepper initialSteps={steps} onSubmit={handleSubmit} />
    </PageContent>
  );
};

export default ExtendDueDate;
