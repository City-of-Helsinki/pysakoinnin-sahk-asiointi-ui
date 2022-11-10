import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconArrowLeft, IconArrowRight, Stepper } from 'hds-react';
import { useTranslation } from 'react-i18next';
import FormContent from '../formContent/FormContent';
import {
  Step,
  selectStepperState,
  completeStep,
  setActive,
  setSteps
} from './formStepperSlice';
import { selectFormContent } from '../formContent/formContentSlice';
import './FormStepper.css';

interface Props {
  initialSteps: Step[];
  onSubmit: () => void;
}

const FormStepper = (props: Props): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { activeStepIndex, steps } = useSelector(selectStepperState);
  const formContent = useSelector(selectFormContent);
  const lastStep = activeStepIndex === steps.length - 1;

  useEffect(() => {
    dispatch(setSteps(props.initialSteps));
  }, [dispatch, props.initialSteps]);

  return (
    <div>
      <Stepper
        language="fi"
        onStepClick={(event, stepIndex) => dispatch(setActive(stepIndex))}
        selectedStep={activeStepIndex}
        stepHeading
        steps={steps}
      />
      <FormContent activeStep={activeStepIndex} />
      <div
        className={lastStep ? 'button-container-submit' : 'button-container'}>
        <Button
          disabled={activeStepIndex === 0}
          iconLeft={<IconArrowLeft />}
          onClick={() => dispatch(setActive(activeStepIndex - 1))}
          variant="secondary">
          {t('common:previous')}
        </Button>
        {!lastStep ? (
          <Button
            iconRight={<IconArrowRight />}
            onClick={() => dispatch(completeStep(activeStepIndex))}
            variant="primary">
            {t('common:next')}
          </Button>
        ) : (
          <Button
            className="submit-button"
            onClick={() => props.onSubmit()}
            variant="primary"
            disabled={formContent.submitDisabled}>
            {formContent.selectedForm === 'dueDate'
              ? t('due-date:submit')
              : t('common:send')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStepper;
