import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
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
import { ClientContext } from '../../client/ClientProvider';
import { formatDate } from '../../utils/helpers';
import { friendlyFormatIBAN } from 'ibantools';
import useMobileWidth from '../../hooks/useMobileWidth';
import useUserProfile from '../../hooks/useUserProfile';
import FormContent from '../formContent/FormContent';
import {
  completeStep,
  selectStepperState,
  setActive,
  setSteps,
  disablePreviousSteps,
  Step
} from './formStepperSlice';
import {
  selectFormContent,
  setFormSubmitted,
  selectFormValues,
  setFormValues,
  RectificationFormType,
  getFoulDataThunk
} from '../formContent/formContentSlice';
import { selectDueDateFormValues } from '../extendDueDate/extendDueDateFormSlice';
import { setUserProfile } from '../user/userSlice';
import ErrorLabel from '../errorLabel/ErrorLabel';
import './FormStepper.css';

interface Props {
  initialSteps: Step[];
  onSubmit: () => void;
}

const useRectificationForm = () => {
  const formValues = useSelector(selectFormValues);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitSuccessful }
  } = useForm<RectificationFormType>({
    mode: 'onTouched',
    defaultValues: formValues
  });

  // if form values are found from redux (i.e. a change happens), update the form default values
  useEffect(() => {
    formValues && reset(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  // reset the form when successfully submitting to also reset the validation which happens onSubmit
  useEffect(() => {
    isSubmitSuccessful && reset(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  // export the needed functions/hooks to use the form
  return { control, handleSubmit, getValues };
};

const FormStepper = (props: Props): React.ReactElement => {
  // ClientContext is needed to get user profile
  useContext(ClientContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeStepIndex, steps } = useSelector(selectStepperState);
  const formContent = useSelector(selectFormContent);
  const dueDateFormValues = useSelector(selectDueDateFormValues);
  const lastStep = activeStepIndex === steps.length - 1;
  const [showSubmitNotification, setShowSubmitNotification] = useState(false);
  const mainPageButtonRef = useRef<null | HTMLDivElement>(null);
  const userProfile = useUserProfile();
  const formError = formContent.formError;

  const { control, handleSubmit, getValues } = useRectificationForm();

  const handleFormSubmit = () => {
    dispatch(setFormSubmitted(true));
    dispatch(disablePreviousSteps(activeStepIndex));
    setShowSubmitNotification(true);
  };

  const handleNextClick = (form: RectificationFormType) => {
    dispatch(setFormValues({ ...form, IBAN: friendlyFormatIBAN(form.IBAN) }));
    if (activeStepIndex === 0 && formContent.selectedForm === 'parking-fine') {
      dispatch(
        getFoulDataThunk({
          foul_number: form.refNumber,
          register_number: form.regNumber
        })
      );
    } else {
      dispatch(completeStep(activeStepIndex));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const goToHomePage = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  // if user profile is found, add it to redux
  useEffect(() => {
    userProfile && dispatch(setUserProfile(userProfile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  useEffect(() => {
    dispatch(setSteps(props.initialSteps));
  }, [dispatch, props.initialSteps]);

  // scroll down to ensure submit notification and button to home page are visible
  useEffect(() => {
    mainPageButtonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, [showSubmitNotification]);

  return (
    <div>
      <form>
        <h1>{t(`${formContent.selectedForm}:title`)}</h1>
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
        <FormContent
          activeStep={activeStepIndex}
          control={control}
          values={getValues}
        />
        {formError && <ErrorLabel text={t(`common:errors:${formError}`)} />}
        <div className="button-container">
          <div className={`button-wrapper ${lastStep ? 'submit' : ''}`}>
            <Button
              id="button-previous"
              className="button"
              role={activeStepIndex === 0 ? 'link' : 'button'}
              disabled={formContent.formSubmitted}
              iconLeft={<IconArrowLeft />}
              onClick={() =>
                activeStepIndex === 0
                  ? goToHomePage()
                  : dispatch(setActive(activeStepIndex - 1))
              }
              variant="secondary">
              {t('common:previous')}
            </Button>
            {activeStepIndex === 1 && !lastStep && (
              <Button
                id="button-home"
                className="button link"
                iconRight={<IconHome />}
                role="link"
                variant="secondary"
                onClick={goToHomePage}>
                {t('common:to-mainpage')}
              </Button>
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
                  onClick={handleSubmit(handleNextClick)}
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
              closeButtonLabelText={t('common:close-notification')}
              onClose={() => setShowSubmitNotification(false)}>
              {t(`${formContent.selectedForm}:notifications:success:text`, {
                newDueDate: formatDate(dueDateFormValues.newDueDate)
              })}
            </Notification>
          )}
          <div>
            {lastStep && formContent.formSubmitted && (
              <div ref={mainPageButtonRef} className="home-button-container">
                <Button
                  className="button home link"
                  iconRight={<IconHome />}
                  role="link"
                  variant="primary"
                  onClick={goToHomePage}>
                  {t('common:to-mainpage')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormStepper;
