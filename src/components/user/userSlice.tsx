import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type SliceState = {
  userProfile: {
    name: string;
    email: string;
    SSN: string;
  };
  promptLogin: boolean;
};

const initialState: SliceState = {
  userProfile: {
    name: '',
    email: '',
    SSN: ''
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
        name: `${firstName} ${lastName}`,
        email: action.payload.primaryEmail.email,
        SSN:
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
