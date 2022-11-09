import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type SliceState = {
  selectedOption: number;
};

const initialState: SliceState = {
  selectedOption: 0
};

export const slice = createSlice({
  name: 'extendDueDateForm',
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    }
  }
});

// Actions
export const { setSelectedOption } = slice.actions;

// Selectors
export const selectedOption = (state: RootState) =>
  state.extendDueDateForm.selectedOption;

export default slice.reducer;
