import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type SliceState = {
  poaFile: {
    name: string;
    size: number;
    type: string;
  };
};

const initialState: SliceState = {
  poaFile: {
    name: '',
    size: 0,
    type: ''
  }
};

export const slice = createSlice({
  name: 'rectificationForm',
  initialState,
  reducers: {
    setPOAFile: (state, action) => {
      state.poaFile = action.payload;
    }
  }
});

// Actions
export const { setPOAFile } = slice.actions;

// Selectors
export const selectRectificationFormValues = (state: RootState) =>
  state.rectificationForm;

export default slice.reducer;
