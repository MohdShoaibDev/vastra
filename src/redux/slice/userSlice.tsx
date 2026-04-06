import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
  name: string;
  email: string;
  profileImage: string;
  phoneNumber: string;
  wallet: number;
};

const initialState: userType = {
  name: '',
  email: '',
  profileImage: '',
  phoneNumber: '',
  wallet: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    appUserDetailsHandler: (state: userType, action: PayloadAction<{}>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { appUserDetailsHandler } = userSlice.actions;
export default userSlice.reducer;
