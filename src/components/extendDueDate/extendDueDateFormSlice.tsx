import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type SliceState = {
  dueDate: string;
  newDueDate: string;
  emailConfirmationChecked: boolean;
};

const initialState: SliceState = {
  // for testing the notifications
  dueDate: '2022-12-12',
  newDueDate: '2023-01-11',
  emailConfirmationChecked: false
};

export const slice = createSlice({
  name: 'extendDueDateForm',
  initialState,
  reducers: {
    setEmailConfirmationChecked: (state, action) => {
      state.emailConfirmationChecked = action.payload;
    }
  }
});

// Actions
export const { setEmailConfirmationChecked } = slice.actions;

// Selectors
export const selectDueDateFormValues = (state: RootState) =>
  state.extendDueDateForm;

export default slice.reducer;
