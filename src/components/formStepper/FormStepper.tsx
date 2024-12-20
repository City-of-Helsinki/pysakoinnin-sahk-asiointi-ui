/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
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
  Stepper,
  useGraphQL
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import { friendlyFormatIBAN } from 'ibantools';
import FormContent from '../formContent/FormContent';
import { createObjection, fileToBase64, formatDate } from '../../utils/helpers';
import {
  completeStep,
  selectStepperState,
  setActive,
  setSteps,
  Step
} from './formStepperSlice';
import {
  selectFormContent,
  selectFormValues,
  setFormValues,
  getFoulDataThunk,
  getTransferDataThunk,
  extendDueDateThunk,
  saveObjectionThunk,
  setSubmitError,
  FormId
} from '../formContent/formContentSlice';
import {
  ObjectionForm,
  ObjectionFormFiles
} from '../../interfaces/objectionInterfaces';
import ErrorLabel from '../errorLabel/ErrorLabel';
import { ResponseCode } from '../../interfaces/foulInterfaces';
import './FormStepper.css';
import i18n from 'i18next';
import { useMediaQueryLessThan } from '../../hooks/useMediaQuery';
import { NormalizedCacheObject } from '@apollo/client';
import { ProfileQueryResult } from '../../common';
import { setUserProfile } from '../user/userSlice';
import Loader from '../loader/Loader';

interface Props {
  initialSteps: Step[];
}

const useRectificationForm = () => {
  const formValues = useSelector(selectFormValues);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitSuccessful }
  } = useForm<ObjectionForm>({
    mode: 'onTouched',
    defaultValues: formValues
  });

  // if form values are found from redux (i.e. a change happens), update the form default values
  useEffect(() => {
    formValues && reset(formValues);
  }, [formValues]);

  // reset the form when successfully submitting to also reset the validation which happens onSubmit
  useEffect(() => {
    isSubmitSuccessful && reset(formValues);
  }, [isSubmitSuccessful]);

  // export the needed functions/hooks to use the form
  return { control, handleSubmit, getValues };
};

const FormStepper = (props: Props): React.ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeStepIndex, steps } = useSelector(selectStepperState);
  const formContent = useSelector(selectFormContent);
  const isLessThanM = useMediaQueryLessThan('m');
  const selectedForm = formContent.selectedForm;
  const formError = formContent.formError;
  const responseCode =
    selectedForm === FormId.MOVEDCAR
      ? formContent.transferData?.responseCode
      : formContent.foulData?.responseCode;
  const lastStep = activeStepIndex === steps.length - 1;
  const [showSubmitNotification, setShowSubmitNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const mainPageButtonRef = useRef<null | HTMLDivElement>(null);
  const [files, setFiles] = useState<ObjectionFormFiles>({
    poaFile: [],
    attachments: []
  });

  const { control, handleSubmit, getValues } = useRectificationForm();
  const [, { data, error, loading }] = useGraphQL<
    NormalizedCacheObject,
    ProfileQueryResult
  >();

  const userProfile = data?.myProfile;

  useEffect(() => {
    userProfile && dispatch(setUserProfile(userProfile));
  }, [userProfile]);

  // set initial steps when the form is opened
  useEffect(() => {
    dispatch(setSteps(props.initialSteps));
  }, [dispatch, props.initialSteps]);

  // show error notification if submitError = true in redux
  useEffect(() => {
    setShowErrorNotification(formContent.submitError);
  }, [formContent.submitError]);

  // clear submit error when form step is changed
  useEffect(() => {
    dispatch(setSubmitError(false));
  }, [activeStepIndex]);

  // scroll down to ensure submit notification and button to home page are visible
  useEffect(() => {
    mainPageButtonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, [showSubmitNotification]);

  const onSubmitPoaFile = (files: File[]) => {
    setFiles((current: ObjectionFormFiles) => ({ ...current, poaFile: files }));
  };

  const onSubmitAttachmentFiles = (files: File[]) => {
    setFiles((current: ObjectionFormFiles) => ({
      ...current,
      attachments: files
    }));
  };

  const useMediaQueryLessThanM = useMediaQueryLessThan('m');

  if (loading) {
    return <Loader />;
  } else if (error || !data) {
    return (
      <Notification label={t<string>('landing-page:errors:label')} type="error">
        {t<string>('landing-page:errors:default')}
      </Notification>
    );
  }

  const myProfile = data.myProfile;

  const handleFormSubmit = async (form: ObjectionForm) => {
    const filesAsBase64 = await Promise.all([
      ...files.attachments.map(async file => {
        const fileData = await fileToBase64(file);
        return {
          fileName: file.name,
          size: file.size,
          mimeType: file.type,
          data: fileData.split(',').pop() as string
        };
      }),
      ...files.poaFile.map(async file => {
        const fileData = await fileToBase64(file);
        return {
          fileName: file.name,
          size: file.size,
          mimeType: file.type,
          data: fileData.split(',').pop() as string
        };
      })
    ]);
    const objection = createObjection(
      formContent.formValues,
      selectedForm,
      filesAsBase64,
      formContent.transferData
    );
    switch (selectedForm) {
      case FormId.PARKINGFINE:
      case FormId.MOVEDCAR:
        return dispatch(saveObjectionThunk(objection)).then(() =>
          setShowSubmitNotification(true)
        );
      case FormId.DUEDATE:
        dispatch(
          extendDueDateThunk({
            foul_number: form.foulNumber ? form.foulNumber : '',
            register_number: form.registerNumber ? form.registerNumber : '',
            metadata: {
              lang: i18n.language,
              email: myProfile.primaryEmail.email
            }
          })
        ).then(() => setShowSubmitNotification(true));
    }
  };

  const handleNextClick = (form: ObjectionForm) => {
    dispatch(setFormValues({ ...form, iban: friendlyFormatIBAN(form.iban) }));
    if (activeStepIndex === 0) {
      switch (selectedForm) {
        case FormId.PARKINGFINE:
        case FormId.DUEDATE:
          return dispatch(
            getFoulDataThunk({
              foul_number: form.foulNumber ? form.foulNumber : '',
              register_number: form.registerNumber ? form.registerNumber : ''
            })
          );
        case FormId.MOVEDCAR:
          return dispatch(
            getTransferDataThunk({
              transfer_number: form.transferNumber ? form.transferNumber : '',
              register_number: form.registerNumber ? form.registerNumber : ''
            })
          );
      }
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

  const submitAndPrintButton = !lastStep ? (
    <Button
      id="button-next"
      className="button"
      iconRight={<IconArrowRight />}
      onClick={handleSubmit(handleNextClick)}
      variant="primary"
      disabled={activeStepIndex === 1 && responseCode !== ResponseCode.Success}>
      {activeStepIndex === 1
        ? t('common:make-rectification')
        : t('common:next')}
    </Button>
  ) : formContent.formSubmitted ? (
    <Button
      id="button-submitted"
      className="button"
      iconLeft={<IconThumbsUp />}
      variant="success">
      {t(`${formContent.selectedForm}:submit-success`)}
    </Button>
  ) : (
    <Button
      id="button-submit"
      className="button submit"
      onClick={handleSubmit(handleFormSubmit)}
      variant="primary"
      disabled={formContent.submitDisabled}>
      {t(`${formContent.selectedForm}:submit`)}
    </Button>
  );

  return (
    <div>
      <form>
        <h1>{t(`${formContent.selectedForm}:title`)}</h1>
        <div id="stepper">
          <Stepper
            className="stepper hide-on-print"
            small={useMediaQueryLessThanM}
            language={i18n.language}
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
          onSubmitPoaFile={onSubmitPoaFile}
          onSubmitAttachmentFiles={onSubmitAttachmentFiles}
          formFiles={files}
        />
        <div className="form-error-label">
          {formError && <ErrorLabel text={t<string>(formError)} />}
        </div>
        <div className="button-container">
          <div className={`button-wrapper ${lastStep ? 'submit' : ''}`}>
            {isLessThanM && (
              <div className="submit-and-print-button-wrapper">
                {submitAndPrintButton}
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
              </div>
            )}
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
            {!isLessThanM && (
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
                {submitAndPrintButton}
              </div>
            )}
          </div>
          {lastStep && formContent.formSubmitted && showSubmitNotification && (
            <Notification
              className="submit-notification"
              label={t(
                `${formContent.selectedForm}:notifications:success:label`
              )}
              position="top-right"
              type="success"
              autoClose
              dismissible
              closeButtonLabelText={t('common:close-notification')}
              onClose={() => setShowSubmitNotification(false)}>
              {t(`${formContent.selectedForm}:notifications:success:text`, {
                newDueDate:
                  formContent.dueDate && formatDate(formContent.dueDate)
              })}
            </Notification>
          )}
          {lastStep && showErrorNotification && (
            <Notification
              className="submit-notification"
              label={t(`${formContent.selectedForm}:notifications:fail:label`)}
              position="top-right"
              type="error"
              dismissible
              closeButtonLabelText={t('common:close-notification')}
              onClose={() => {
                dispatch(setSubmitError(false));
                setShowErrorNotification(false);
              }}>
              {t(`${formContent.selectedForm}:notifications:fail:text`)}
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
