import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = {
  card: string;
  bgColor: string;
  mainTextColor: string;
  secondaryTextColor: string;
  primaryIconColor: string;
  secondIconColor: string;
  secondaryBgColor: string;
  textFieldBgColor: string;
};

const initialState: ThemeType = {
  card: 'rgba(256,256,256,0.5)',
  bgColor: '#EEF1F6',
  mainTextColor: 'black',
  secondaryTextColor: '#666',
  primaryIconColor: 'black',
  secondIconColor: 'gray',
  secondaryBgColor: 'white',
  textFieldBgColor: '#1E1E1E',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    appThemeHandler: (state, action: PayloadAction<ThemeType>) => {
      return action.payload;
    },
  },
});

export const { appThemeHandler } = themeSlice.actions;
export default themeSlice.reducer;
