import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@redux/slice/themeSlice';
import userReducer from '@redux/slice/userSlice';
import reloadReducer from '@redux/slice/reloadSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    reload: reloadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
