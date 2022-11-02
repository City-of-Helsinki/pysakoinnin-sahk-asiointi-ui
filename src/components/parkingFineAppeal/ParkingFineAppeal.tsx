import React from 'react';
import { useTranslation } from 'react-i18next';
import FormStepper, { StepState } from '../formStepper/FormStepper';
import styles from '../styles.module.css';

const ParkingFineAppeal = (): React.ReactElement => {
  const { t } = useTranslation();
  const steps = [
    {
      label: t('parking-fine:stepper:step1'),
      state: StepState.available
    },
    {
      label: t('parking-fine:stepper:step2'),
      state: StepState.disabled
    },
    {
      label: t('parking-fine:stepper:step3'),
      state: StepState.disabled
    },
    {
      label: t('parking-fine:stepper:step4'),
      state: StepState.disabled
    }
  ];

  return (
    <div>
      <form>
        <h1 className={styles['form-title']}>{t('common:form-title')}</h1>
        <FormStepper selectedForm="parkingFine" initialSteps={steps} />
      </form>
    </div>
  );
};

export default ParkingFineAppeal;
