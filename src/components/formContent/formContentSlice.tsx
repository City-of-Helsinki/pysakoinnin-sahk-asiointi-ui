import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum FormId {
  NONE = '',
  DUEDATE = 'dueDate',
  PARKINGFINE = 'parkingFine',
  MOVEDCAR = 'movedCar'
}

type SliceState = {
  formSubmitted: boolean;
  selectedForm: FormId;
  submitDisabled: boolean;
};

const initialState: SliceState = {
  formSubmitted: false,
  selectedForm: FormId.NONE,
  submitDisabled: true
};

export const slice = createSlice({
  name: 'formContent',
  initialState,
  reducers: {
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload;
    },
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload;
    },
    setSubmitDisabled: (state, action) => {
      state.submitDisabled = action.payload;
    }
  }
});

// Actions
export const {
  setFormSubmitted,
  setSelectedForm,
  setSubmitDisabled
} = slice.actions;

// Selectors
export const selectFormContent = (state: RootState) => state.formContent;

export default slice.reducer;
