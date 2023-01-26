import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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
import { formatDate } from '../../utils/helpers';
import useMobileWidth from '../../hooks/useMobileWidth';
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
  setFormSubmitted,
  selectFormValues,
  setFormValues,
  RectificationFormType
} from '../formContent/formContentSlice';
import { selectDueDateFormValues } from '../extendDueDate/extendDueDateFormSlice';
import './FormStepper.css';

interface Props {
  initialSteps: Step[];
  onSubmit: () => void;
}

const useRectificationForm = () => {
  const formValues = useSelector(selectFormValues);

  const { control, handleSubmit, reset } = useForm<RectificationFormType>({
    defaultValues: formValues
  });

  useEffect(() => {
    // if form values are found from redux (i.e. a change happens), update the form default values
    formValues && reset(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  // export the needed functions/hooks to use the form
  return { control, handleSubmit };
};

const FormStepper = (props: Props): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { activeStepIndex, steps } = useSelector(selectStepperState);
  const formContent = useSelector(selectFormContent);
  const dueDateFormValues = useSelector(selectDueDateFormValues);
  const lastStep = activeStepIndex === steps.length - 1;
  const [showSubmitNotification, setShowSubmitNotification] = useState(false);
  const mainPageButtonRef = useRef<null | HTMLDivElement>(null);

  const { control, handleSubmit } = useRectificationForm();

  const handleFormSubmit = () => {
    dispatch(setFormSubmitted(true));
    setShowSubmitNotification(true);
  };

  const onSubmitForm = (form: RectificationFormType) => {
    dispatch(setFormValues(form));
    dispatch(completeStep(activeStepIndex));
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    dispatch(setSteps(props.initialSteps));
  }, [dispatch, props.initialSteps]);

  // scroll down to ensure submit notification and button to main page are visible
  useEffect(() => {
    mainPageButtonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, [showSubmitNotification]);

  return (
    <div>
      <form>
        <h1 className="form-title">{t(`${formContent.selectedForm}:title`)}</h1>
        <div id="stepper">
          <Stepper
            className="stepper hide-on-print"
            small={useMobileWidth()}
            language="fi"
            onStepClick={(event, stepIndex) => dispatch(setActive(stepIndex))}
            selectedStep={activeStepIndex}
            stepHeading
            steps={steps}
          />
        </div>
        <FormContent activeStep={activeStepIndex} control={control} />
        <div className="button-container">
          <div className={`button-wrapper ${lastStep ? 'submit' : ''}`}>
            <Button
              id="button-previous"
              className="button"
              disabled={activeStepIndex === 0 || formContent.formSubmitted}
              iconLeft={<IconArrowLeft />}
              onClick={() => dispatch(setActive(activeStepIndex - 1))}
              variant="secondary">
              {t('common:previous')}
            </Button>
            {activeStepIndex === 1 && !lastStep && (
              <a id="button-home" className="button link" href="/">
                <Button
                  className="button"
                  iconRight={<IconHome />}
                  role="link"
                  variant="secondary">
                  {t('common:to-mainpage')}
                </Button>
              </a>
            )}
            <div className="submit-and-print-button-wrapper">
              {lastStep && formContent.selectedForm !== 'due-date' && (
                <Button
                  id="button-print"
                  iconLeft={<IconPrinter />}
                  onClick={handlePrint}
                  variant="secondary"
                  className="button print">
                  {t('common:print')}
                </Button>
              )}
              {!lastStep ? (
                <Button
                  id="button-next"
                  className="button"
                  iconRight={<IconArrowRight />}
                  onClick={handleSubmit(onSubmitForm)}
                  variant="primary">
                  {activeStepIndex === 1
                    ? t('common:make-rectification')
                    : t('common:next')}
                </Button>
              ) : formContent.formSubmitted ? (
                <Button
                  id="button-submitted"
                  className="button"
                  iconLeft={<IconThumbsUp />}
                  onClick={handleFormSubmit}
                  variant="success">
                  {t(`${formContent.selectedForm}:submit-success`)}
                </Button>
              ) : (
                <Button
                  id="button-submit"
                  className="button submit"
                  onClick={handleFormSubmit}
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
              label={t(
                `${formContent.selectedForm}:notifications:success:label`
              )}
              position="top-right"
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
              <div ref={mainPageButtonRef} className="home-button-container">
                <a className="button link" href="/">
                  <Button
                    className="button home"
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
      </form>
    </div>
  );
};

export default FormStepper;
