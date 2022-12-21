import { configureStore } from '@reduxjs/toolkit';
import formContentReducer from './components/formContent/formContentSlice';
import formStepperReducer from './components/formStepper/formStepperSlice';
import extendDueDateFormReducer from './components/extendDueDate/extendDueDateFormSlice';
import rectificationFormReducer from './components/rectification/rectificationFormSlice';

const store = configureStore({
  reducer: {
    formContent: formContentReducer,
    formStepper: formStepperReducer,
    extendDueDateForm: extendDueDateFormReducer,
    rectificationForm: rectificationFormReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
