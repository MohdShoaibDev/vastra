import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type cardType = {
  id: string;
  name: string;
  number: string;
  expiry: string;
};

const initialState: cardType[] = [];

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    appcardsHandler: (
      state: cardType[],
      action: PayloadAction<cardType[] | cardType>,
    ) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const { appcardsHandler } = cardSlice.actions;
export default cardSlice.reducer;
