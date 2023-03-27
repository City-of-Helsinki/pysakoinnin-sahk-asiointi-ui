import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit';
import formContentReducer from './components/formContent/formContentSlice';
import formStepperReducer from './components/formStepper/formStepperSlice';
import extendDueDateFormReducer from './components/extendDueDate/extendDueDateFormSlice';
import userReducer from './components/user/userSlice';
import loadingReducer from './components/loader/loadingSlice';
import { useDispatch } from 'react-redux';

export const storeItems = {
  formContent: formContentReducer,
  formStepper: formStepperReducer,
  extendDueDateForm: extendDueDateFormReducer,
  user: userReducer,
  loading: loadingReducer
};

const rootReducer = combineReducers(storeItems);

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState
  });

export default setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
