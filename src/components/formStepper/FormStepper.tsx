import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  IconArrowLeft,
  IconArrowRight,
  Notification,
  Stepper
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/helpers';
import FormContent from '../formContent/FormContent';
import {
  Step,
  selectStepperState,
  completeStep,
  setActive,
  setSteps
} from './formStepperSlice';
import { FormId, selectFormContent } from '../formContent/formContentSlice';
import { selectDueDateFormValues } from '../extendDueDate/extendDueDateFormSlice';
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
  const dueDateFormValues = useSelector(selectDueDateFormValues);
  const lastStep = activeStepIndex === steps.length - 1;
  const [submitNotificationOpen, setSubmitNotificationOpen] = useState(true);

  const handleSubmit = () => {
    setSubmitNotificationOpen(true);
    props.onSubmit();
  };

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
            onClick={handleSubmit}
            variant="primary"
            disabled={formContent.submitDisabled}>
            {formContent.selectedForm === 'dueDate'
              ? t('due-date:submit')
              : t('common:send')}
          </Button>
        )}
      </div>
      {lastStep && formContent.formSubmitted && submitNotificationOpen && (
        <Notification
          className="submit-notification"
          label={
            formContent.selectedForm == FormId.DUEDATE &&
            t('due-date:notifications:success:label')
          }
          type={'success'}
          dismissible
          closeButtonLabelText="Close notification"
          onClose={() => setSubmitNotificationOpen(false)}>
          {formContent.selectedForm == FormId.DUEDATE &&
            t('due-date:notifications:success:text', {
              newDueDate: formatDate(dueDateFormValues.newDueDate)
            })}
        </Notification>
      )}
    </div>
  );
};

export default FormStepper;
