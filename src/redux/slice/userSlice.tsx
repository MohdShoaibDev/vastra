import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
  name: string;
  email: string;
  profileImage: string;
  phoneNumber: string;
};

const initialState: userType = {
  name: '',
  email: '',
  profileImage: '',
  phoneNumber: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDetailsHandler: (state: userType, action: PayloadAction<{}>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { userDetailsHandler } = userSlice.actions;
export default userSlice.reducer;
