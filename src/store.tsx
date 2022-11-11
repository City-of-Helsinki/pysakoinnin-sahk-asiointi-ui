import { configureStore } from '@reduxjs/toolkit';
import formContentReducer from './components/formContent/formContentSlice';
import formStepperReducer from './components/formStepper/formStepperSlice';
import extendDueDateFormReducer from './components/extendDueDate/extendDueDateFormSlice';

const store = configureStore({
  reducer: {
    formContent: formContentReducer,
    formStepper: formStepperReducer,
    extendDueDateForm: extendDueDateFormReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
