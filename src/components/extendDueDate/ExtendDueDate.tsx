import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageContent from '../PageContent';
import FormStepper, { StepState } from '../formStepper/FormStepper';
import { FormId, setSelectedForm } from '../formContent/formContentSlice';
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
    //console.log('submit extend due date form');
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
