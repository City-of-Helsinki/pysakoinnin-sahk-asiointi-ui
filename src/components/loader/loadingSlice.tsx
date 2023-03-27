import { RootState } from '../../store';
import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false
};

export const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: state => {
      state.isLoading = true;
    },
    clearLoading: state => {
      state.isLoading = false;
    }
  }
});

export const selectIsLoading = (state: RootState) => state.loading.isLoading;

export const { setLoading, clearLoading } = slice.actions;
export default slice.reducer;
