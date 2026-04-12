import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'src/types/product';

type userType = {
  name: string;
  email: string;
  profileImage: string;
  phoneNumber: string;
  wallet: number;
  address: {
    id: number;
    name: string;
    phone: string;
    locality: string;
    city: string;
    pincode: string;
    state: string;
    default: boolean;
  };
  cart: {
    count: number;
    items: Product[];
  };
};

const initialState: userType = {
  name: '',
  email: '',
  profileImage: '',
  phoneNumber: '',
  wallet: 0,
  address: {
    id: 0,
    name: '',
    phone: '',
    locality: '',
    city: '',
    pincode: '',
    state: '',
    default: false,
  },
  cart: {
    count: 0,
    items: [],
  },
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
