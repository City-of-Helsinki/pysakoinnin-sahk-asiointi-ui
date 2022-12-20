import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type FileItem = {
  name: string;
  size: number;
  type: string;
};

type SliceState = {
  poaFile: FileItem;
  attachments: FileItem[];
};

const initialState: SliceState = {
  poaFile: {
    name: '',
    size: 0,
    type: ''
  },
  attachments: []
};

export const slice = createSlice({
  name: 'rectificationForm',
  initialState,
  reducers: {
    setPOAFile: (state, action) => {
      state.poaFile = action.payload;
    },
    setAttachments: (state, action) => {
      state.attachments = action.payload;
    }
  }
});

// Actions
export const { setPOAFile, setAttachments } = slice.actions;

// Selectors
export const selectRectificationFormValues = (state: RootState) =>
  state.rectificationForm;

export default slice.reducer;
