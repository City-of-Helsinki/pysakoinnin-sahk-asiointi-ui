import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type SliceState = {
  name: string;
  email: string;
  SSN: string;
};

const initialState: SliceState = {
  name: '',
  email: '',
  SSN: ''
};

export const slice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { lastName, firstName } = action.payload;
      const parsedUserInfo = {
        name: `${firstName} ${lastName}`,
        email: action.payload.primaryEmail.email,
        SSN:
          action.payload.verifiedPersonalInformation
            .nationalIdentificationNumber
      };
      return (state = { ...state, ...parsedUserInfo });
    }
  }
});

// Actions
export const { setUserProfile } = slice.actions;

// Selectors
export const selectUserProfile = (state: RootState) => state.userProfile;

export default slice.reducer;
