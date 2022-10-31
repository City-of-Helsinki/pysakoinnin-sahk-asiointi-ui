import React, { useReducer } from 'react';
import { Button, IconArrowLeft, IconArrowRight, Stepper } from 'hds-react';
import { useTranslation } from 'react-i18next';
import FormContent from '../formContent/FormContent';
import './FormStepper.css';

type Step = {
  label: string;
  state: number;
};

type StepperState = {
  activeStepIndex: number;
  steps: Step[];
};

type StepAction = {
  payload: number;
  type: string;
};

enum StepState {
  available,
  completed,
  disabled
}

const FormStepper = (): React.ReactElement => {
  const { t } = useTranslation();

  const commonReducer = (stepsTotal: number) => (
    state: StepperState,
    action: StepAction
  ) => {
    switch (action.type) {
      case 'completeStep': {
        const activeStepIndex =
          action.payload === stepsTotal - 1
            ? stepsTotal - 1
            : action.payload + 1;
        return {
          activeStepIndex,
          steps: state.steps.map((step: Step, index: number) => {
            if (index === action.payload && index !== stepsTotal - 1) {
              // current one but not last one
              return {
                state: StepState.completed,
                label: step.label
              };
            }
            if (index === action.payload + 1) {
              // next one
              return {
                state: StepState.available,
                label: step.label
              };
            }
            return step;
          })
        };
      }
      case 'setActive': {
        return {
          activeStepIndex: action.payload,
          steps: state.steps.map((step: Step, index: number) => {
            if (index === action.payload) {
              return {
                state: StepState.available,
                label: step.label
              };
            }
            return step;
          })
        };
      }
      default:
        throw new Error();
    }
  };

  const initialState = {
    activeStepIndex: 0,
    steps: [
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
    ]
  };
  const reducer = commonReducer(4);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <form>
        <h1 className="form-title">{t('common:form-title')}</h1>
        <Stepper
          language="fi"
          onStepClick={(event, stepIndex) =>
            dispatch({ type: 'setActive', payload: stepIndex })
          }
          selectedStep={state.activeStepIndex}
          stepHeading
          steps={state.steps}
        />
        <FormContent activeStep={state.activeStepIndex} />
        <div className="button-container">
          <Button
            disabled={state.activeStepIndex === 0}
            iconLeft={<IconArrowLeft />}
            onClick={() =>
              dispatch({
                type: 'setActive',
                payload: state.activeStepIndex - 1
              })
            }
            variant="secondary">
            {t('common:previous')}
          </Button>
          <Button
            iconRight={<IconArrowRight />}
            onClick={() =>
              dispatch({ type: 'completeStep', payload: state.activeStepIndex })
            }
            variant={'primary'}>
            {t('common:next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormStepper;
