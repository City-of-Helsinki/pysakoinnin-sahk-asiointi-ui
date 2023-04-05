import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  ssn: string;
};
export type SliceState = {
  userProfile: UserProfile;
  promptLogin: boolean;
};

const initialState: SliceState = {
  userProfile: {
    firstName: '',
    lastName: '',
    email: '',
    ssn: ''
  },
  promptLogin: false
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { lastName, firstName } = action.payload;
      const parsedUserInfo = {
        firstName: firstName,
        lastName: lastName,
        email: action.payload.primaryEmail.email,
        ssn:
          action.payload.verifiedPersonalInformation
            .nationalIdentificationNumber
      };
      return {
        ...state,
        userProfile: { ...state.userProfile, ...parsedUserInfo }
      };
    },
    setPromptLogin: (state, action) => {
      state.promptLogin = action.payload;
    }
  }
});

// Actions
export const { setUserProfile, setPromptLogin } = slice.actions;

// Selectors
export const selectUserProfile = (state: RootState) => state.user.userProfile;
export const selectPromptLogin = (state: RootState) => state.user.promptLogin;

export default slice.reducer;
