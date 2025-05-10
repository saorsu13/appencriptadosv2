import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  lang: string;
}

const initialState: SettingsState = {
  lang: 'es',  // idioma por defecto
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
