import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageContent from '../PageContent';
import FormStepper from '../formStepper/FormStepper';
import { StepState } from '../formStepper/formStepperSlice';
import { FormId, setSelectedForm } from '../formContent/formContentSlice';

const MovedCarAppeal = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const steps = [
    {
      label: t('moved-car:stepper:step1'),
      state: StepState.available
    },
    {
      label: t('moved-car:stepper:step2'),
      state: StepState.disabled
    },
    {
      label: t('moved-car:stepper:step3'),
      state: StepState.disabled
    },
    {
      label: t('moved-car:stepper:step4'),
      state: StepState.disabled
    }
  ];

  const handleSubmit = () => {
    //console.log('submit moved car appeal form');
  };

  useEffect(() => {
    dispatch(setSelectedForm(FormId.MOVEDCAR));
  }, [dispatch]);

  return (
    <PageContent>
      <FormStepper initialSteps={steps} onSubmit={handleSubmit} />
    </PageContent>
  );
};

export default MovedCarAppeal;
