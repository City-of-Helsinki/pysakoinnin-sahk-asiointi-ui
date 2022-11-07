import React from 'react';
import { useTranslation } from 'react-i18next';
import PageContent from '../PageContent';
import FormStepper, { StepState } from '../formStepper/FormStepper';
import styles from '../styles.module.css';

const ExtendDueDate = (): React.ReactElement => {
  const { t } = useTranslation();
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

  return (
    <PageContent>
      <form>
        <h1 className={styles['form-title']}>{t('due-date:title')}</h1>
        <FormStepper selectedForm="dueDate" initialSteps={steps} />
      </form>
    </PageContent>
  );
};

export default ExtendDueDate;
