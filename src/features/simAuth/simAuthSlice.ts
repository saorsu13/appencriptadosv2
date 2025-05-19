// src/features/simAuth/simAuthSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SimAuthState {
  isSimAuthenticated: boolean;
  iccid?: string;
}

const initialState: SimAuthState = {
  isSimAuthenticated: false,
};

export const simAuthSlice = createSlice({
  name: 'simAuth',
  initialState,
  reducers: {
    loginSim(state, action: PayloadAction<{ iccid: string }>) {
      state.isSimAuthenticated = true;
      state.iccid = action.payload.iccid;
    },
    logoutSim(state) {
      state.isSimAuthenticated = false;
      delete state.iccid;
    },
  },
});

export const { loginSim, logoutSim } = simAuthSlice.actions;
export default simAuthSlice.reducer;
