import { configureStore } from '@reduxjs/toolkit';
import formContentReducer from './components/formContent/formContentSlice';
import extendDueDateFormReducer from './components/extendDueDate/extendDueDateFormSlice';

const store = configureStore({
  reducer: {
    formContent: formContentReducer,
    extendDueDateForm: extendDueDateFormReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
