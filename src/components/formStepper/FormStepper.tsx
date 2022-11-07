import React, { useReducer } from 'react';
import { Button, IconArrowLeft, IconArrowRight, Stepper } from 'hds-react';
import { useTranslation } from 'react-i18next';
import FormContent from '../formContent/FormContent';
import './FormStepper.css';

interface Props {
  selectedForm: string;
  initialSteps: Step[];
}

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

export enum StepState {
  available,
  completed,
  disabled
}

const FormStepper = (props: Props): React.ReactElement => {
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
    steps: props.initialSteps
  };
  const reducer = commonReducer(props.initialSteps.length);
  const [state, dispatch] = useReducer(reducer, initialState);
  const lastStep = state.activeStepIndex === state.steps.length - 1;

  return (
    <div>
      <Stepper
        language="fi"
        onStepClick={(event, stepIndex) =>
          dispatch({ type: 'setActive', payload: stepIndex })
        }
        selectedStep={state.activeStepIndex}
        stepHeading
        steps={state.steps}
      />
      <FormContent
        selectedForm={props.selectedForm}
        activeStep={state.activeStepIndex}
      />
      <div
        className={lastStep ? 'button-container-submit' : 'button-container'}>
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
        {!lastStep ? (
          <Button
            iconRight={<IconArrowRight />}
            onClick={() =>
              dispatch({ type: 'completeStep', payload: state.activeStepIndex })
            }
            variant={'primary'}>
            {t('common:next')}
          </Button>
        ) : (
          <Button
            className="submit-button"
            onClick={() =>
              dispatch({ type: 'completeStep', payload: state.activeStepIndex })
            }
            variant={'primary'}>
            {props.selectedForm === 'dueDate'
              ? t('due-date:submit')
              : t('common:send')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStepper;
