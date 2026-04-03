import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ReloadType = {
  cart: boolean;
  home: boolean;
  wishlist: boolean;
};

const initialState: ReloadType = {
  cart: false,
  home: false,
  wishlist: false,
};

const reloadSlice = createSlice({
  name: 'reloadSlice',
  initialState,
  reducers: {
    appReloadHandler: (state: ReloadType, action: PayloadAction<{}>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { appReloadHandler } = reloadSlice.actions;
export default reloadSlice.reducer;
