import { configureStore } from '@reduxjs/toolkit';
import formContentReducer from './components/formContent/formContentSlice';
import formStepperReducer from './components/formStepper/formStepperSlice';
import extendDueDateFormReducer from './components/extendDueDate/extendDueDateFormSlice';
import userReducer from './components/user/userSlice';

const store = configureStore({
  reducer: {
    formContent: formContentReducer,
    formStepper: formStepperReducer,
    extendDueDateForm: extendDueDateFormReducer,
    user: userReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
