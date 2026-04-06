import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {};
const wishlistIdsSlice = createSlice({
  name: 'wishlistIdsSlice',
  initialState,
  reducers: {
    appWishlistIdsHandler: (state, action: PayloadAction<{}>) => {
      return action.payload;
    },
  },
});

export const { appWishlistIdsHandler } = wishlistIdsSlice.actions;
export default wishlistIdsSlice.reducer;
