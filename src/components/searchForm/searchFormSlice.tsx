import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type SearchState = {
  invoiceNumber: string;
  refNumber: string;
  regNumber: string;
};

const initialState: SearchState = {
  invoiceNumber: '',
  refNumber: '',
  regNumber: ''
};

export const slice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setSearchFormValues: (state, action) => ({ ...state, ...action.payload })
  }
});

// Actions
export const { setSearchFormValues } = slice.actions;

// Selectors
export const selectSearchFormValues = (state: RootState) => state.searchForm;

export default slice.reducer;
