import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  IconArrowLeft,
  IconArrowRight,
  IconHome,
  IconPrinter,
  IconThumbsUp,
  Notification,
  Stepper
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatDate, isSmallScreen } from '../../utils/helpers';
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // save the screen size on window resize event, to decide the size of stepper component
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <h1 className="form-title">{t(`${formContent.selectedForm}:title`)}</h1>
      <Stepper
        className="stepper"
        small={isSmallScreen(screenWidth)}
        language="fi"
        onStepClick={(event, stepIndex) => dispatch(setActive(stepIndex))}
        selectedStep={activeStepIndex}
        stepHeading
        steps={steps}
      />
      <FormContent activeStep={activeStepIndex} />
      <div className="button-container">
        <div className={`button-wrapper ${lastStep ? 'submit' : ''}`}>
          <Button
            className="button"
            disabled={activeStepIndex === 0}
            iconLeft={<IconArrowLeft />}
            onClick={() => dispatch(setActive(activeStepIndex - 1))}
            variant="secondary">
            {t('common:previous')}
          </Button>
          {activeStepIndex === 1 && !lastStep && (
            <a className="button link" href="/">
              <Button
                className="button"
                iconRight={<IconHome />}
                role="link"
                variant="secondary">
                {t('common:to-mainpage')}
              </Button>
            </a>
          )}
          <div>
            {lastStep && formContent.selectedForm === 'parking-fine' && (
              <Button
                iconLeft={<IconPrinter />}
                onClick={() => null}
                variant="secondary"
                className="button print">
                Tulosta
              </Button>
            )}
            {!lastStep ? (
              <Button
                className="button"
                iconRight={<IconArrowRight />}
                onClick={() => dispatch(completeStep(activeStepIndex))}
                variant="primary">
                {activeStepIndex === 1
                  ? t('common:make-rectification')
                  : t('common:next')}
              </Button>
            ) : formContent.formSubmitted ? (
              <Button
                className="button"
                iconLeft={<IconThumbsUp />}
                onClick={handleSubmit}
                variant="success">
                {t(`${formContent.selectedForm}:submit-success`)}
              </Button>
            ) : (
              <Button
                className="button submit"
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
        <div>
          {lastStep && formContent.formSubmitted && (
            <div ref={mainPageButtonRef}>
              <a className="button link" href="/">
                <Button
                  className="button back"
                  iconRight={<IconHome />}
                  role="link"
                  variant="primary">
                  {t('common:to-mainpage')}
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
