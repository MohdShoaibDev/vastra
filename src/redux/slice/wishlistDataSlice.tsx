import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'src/types/product';

const initialState: Product[] | [] = [];
const wishlistDataSlice = createSlice({
  name: 'wishlistDataSlice',
  initialState,
  reducers: {
    appWishlistDataHandler: (
      state,
      action: PayloadAction<Product[] | Product>,
    ) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const { appWishlistDataHandler } = wishlistDataSlice.actions;
export default wishlistDataSlice.reducer;
