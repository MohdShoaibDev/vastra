import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ReloadType = {
  home: boolean;
  wishlist: boolean;
  orders: boolean;
};

const initialState: ReloadType = {
  orders: false,
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
