import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageContent from '../PageContent';
import FormStepper from '../formStepper/FormStepper';
import { StepState } from '../formStepper/formStepperSlice';
import {
  FormId,
  setFormSubmitted,
  setSelectedForm
} from '../formContent/formContentSlice';
import styles from '../styles.module.css';

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

  function handleSubmit() {
    dispatch(setFormSubmitted(true));
  }

  useEffect(() => {
    dispatch(setSelectedForm(FormId.DUEDATE));
  }, [dispatch]);

  return (
    <PageContent>
      <form>
        <h1 className={styles['form-title']}>{t('due-date:title')}</h1>
        <FormStepper initialSteps={steps} onSubmit={handleSubmit} />
      </form>
    </PageContent>
  );
};

export default ExtendDueDate;
