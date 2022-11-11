import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum StepState {
  available,
  completed,
  disabled
}

export type Step = {
  label: string;
  state: number;
};

type SliceState = {
  activeStepIndex: number;
  steps: Step[];
};

const initialState: SliceState = {
  activeStepIndex: 0,
  steps: [
    {
      label: '',
      state: StepState.disabled
    }
  ]
};

export const slice = createSlice({
  name: 'formStepper',
  initialState,
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    completeStep: (state, action) => {
      const stepsTotal = state.steps.length;
      state.activeStepIndex =
        action.payload === stepsTotal - 1 ? stepsTotal - 1 : action.payload + 1;
      state.steps = state.steps.map((step: Step, index: number) => {
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
      });
    },
    setActive: (state, action) => {
      state.activeStepIndex = action.payload;
      state.steps = state.steps.map((step: Step, index: number) => {
        if (index === action.payload) {
          return {
            state: StepState.available,
            label: step.label
          };
        }
        return step;
      });
    }
  }
});

// Actions
export const { completeStep, setActive, setSteps } = slice.actions;

// Selectors
export const selectStepperState = (state: RootState) => state.formStepper;

export default slice.reducer;
