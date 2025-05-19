// src/features/networkProfile/networkProfileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NetworkProfileState {
  networkProfile: string;
  recommendedNetwork: string;
}

const initialState: NetworkProfileState = {
  networkProfile: 'r1',
  recommendedNetwork: 'r1',
};

const networkProfileSlice = createSlice({
  name: 'networkProfile',
  initialState,
  reducers: {
    updateCurrentNetwork: (state, action: PayloadAction<string>) => {
      state.networkProfile = action.payload;
    },
    setRecommendedNetwork: (state, action: PayloadAction<string>) => {
      state.recommendedNetwork = action.payload;
    },
  },
});

export const { updateCurrentNetwork, setRecommendedNetwork } = networkProfileSlice.actions;
export default networkProfileSlice.reducer;
