import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@redux/slice/themeSlice';
import userReducer from '@redux/slice/userSlice';
import reloadReducer from '@redux/slice/reloadSlice';
import wishlistReducer from '@redux/slice/wishlistIdsSlice';
import wishlistDataReducer from '@redux/slice/wishlistDataSlice';
import cardsReducer from '@redux/slice/cardsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    reload: reloadReducer,
    wishlistIds: wishlistReducer,
    wishlistData: wishlistDataReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
