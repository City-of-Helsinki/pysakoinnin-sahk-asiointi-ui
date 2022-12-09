import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  IconArrowLeft,
  IconArrowRight,
  IconPrinter,
  IconThumbsUp,
  Notification,
  Stepper
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/helpers';
import FormContent from '../formContent/FormContent';
import {
  completeStep,
  selectStepperState,
  setActive,
  setSteps,
  Step
} from './formStepperSlice';
import {
  selectFormContent,
  setFormSubmitted
} from '../formContent/formContentSlice';
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
  const [showSubmitNotification, setShowSubmitNotification] = useState(false);
  const mainPageButtonRef = useRef<null | HTMLDivElement>(null);

  const handleSubmit = () => {
    dispatch(setFormSubmitted(true));
    setShowSubmitNotification(true);
  };

  useEffect(() => {
    dispatch(setSteps(props.initialSteps));
  }, [dispatch, props.initialSteps]);

  // scroll down to ensure submit notification and button to main page are visible
  useEffect(() => {
    mainPageButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showSubmitNotification]);

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
        <div>
          {lastStep && formContent.selectedForm === 'parking-fine' && (
            <Button
              iconLeft={<IconPrinter />}
              onClick={() => null}
              variant="secondary"
              className="print-button">
              Tulosta
            </Button>
          )}
          {!lastStep ? (
            <Button
              iconRight={<IconArrowRight />}
              onClick={() => dispatch(completeStep(activeStepIndex))}
              variant="primary">
              {t('common:next')}
            </Button>
          ) : formContent.formSubmitted ? (
            <Button
              iconLeft={<IconThumbsUp />}
              onClick={handleSubmit}
              variant="success">
              {t(`${formContent.selectedForm}:submit-success`)}
            </Button>
          ) : (
            <Button
              className="submit-button"
              onClick={handleSubmit}
              variant="primary"
              disabled={formContent.submitDisabled}>
              {t(`${formContent.selectedForm}:submit`)}
            </Button>
          )}
        </div>
      </div>
      {lastStep && formContent.formSubmitted && showSubmitNotification && (
        <Notification
          className="submit-notification"
          label={t(`${formContent.selectedForm}:notifications:success:label`)}
          position="bottom-right"
          type={'success'}
          autoClose
          dismissible
          closeButtonLabelText="Close notification"
          onClose={() => setShowSubmitNotification(false)}>
          {t(`${formContent.selectedForm}:notifications:success:text`, {
            newDueDate: formatDate(dueDateFormValues.newDueDate)
          })}
        </Notification>
      )}
      {lastStep && formContent.formSubmitted && (
        <div ref={mainPageButtonRef}>
          <a href="/">
            <Button className="wide-button" role="link" variant="primary">
              {t('common:to-mainpage')}
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default FormStepper;
