import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type SliceState = {
  emailConfirmationChecked: boolean;
};

const initialState: SliceState = {
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
export const emailConfirmationChecked = (state: RootState) =>
  state.extendDueDateForm.emailConfirmationChecked;

export default slice.reducer;
