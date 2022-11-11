import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum FormId {
  NONE = '',
  DUEDATE = 'dueDate',
  PARKINGFINE = 'parkingFine',
  MOVEDCAR = 'movedCar'
}

type SliceState = {
  selectedForm: FormId;
  submitDisabled: boolean;
};

const initialState: SliceState = {
  selectedForm: FormId.NONE,
  submitDisabled: true
};

export const slice = createSlice({
  name: 'formContent',
  initialState,
  reducers: {
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload;
    },
    setSubmitDisabled: (state, action) => {
      state.submitDisabled = action.payload;
    }
  }
});

// Actions
export const { setSelectedForm, setSubmitDisabled } = slice.actions;

// Selectors
export const selectFormContent = (state: RootState) => state.formContent;

export default slice.reducer;
