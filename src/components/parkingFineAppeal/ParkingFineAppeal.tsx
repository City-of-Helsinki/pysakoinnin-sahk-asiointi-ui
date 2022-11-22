import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageContent from '../PageContent';
import FormStepper from '../formStepper/FormStepper';
import { StepState } from '../formStepper/formStepperSlice';
import { FormId, setSelectedForm } from '../formContent/formContentSlice';
import styles from '../styles.module.css';

const ParkingFineAppeal = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  const handleSubmit = () => {
    //console.log('submit parking fine appeal form');
  };

  useEffect(() => {
    dispatch(setSelectedForm(FormId.PARKINGFINE));
  }, [dispatch]);

  return (
    <PageContent>
      <form>
        <h1 className={styles['form-title']}>{t('parking-fine:title')}</h1>
        <FormStepper initialSteps={steps} onSubmit={handleSubmit} />
      </form>
    </PageContent>
  );
};

export default ParkingFineAppeal;
