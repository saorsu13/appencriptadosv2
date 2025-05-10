import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDefaultCurrencyValue } from '@/utils/currency'

export interface Sim {
  idSim: string;
  simName: string;
  name?: string;
  provider: string;
  iccid: string;
  code?: string;
  type?: string;
  currency?: string;
}

export interface SimState {
  sims: Sim[];
  currentSim: Sim | null;
}

const initialState: SimState = {
  sims: [],
  currentSim: null,
};

const simSlice = createSlice({
  name: 'sims',
  initialState,
  reducers: {
    addSim: (state, action: PayloadAction<Sim>) => {
      const newSim = action.payload;
      newSim.currency = newSim.currency ?? getDefaultCurrencyValue();
      if (!state.sims.find(item => item.idSim === newSim.idSim)) {
        state.sims.push(newSim);
      }
    },
    updateCurrentSim: (state, action: PayloadAction<string | null>) => {
      const id = action.payload;
      if (!id) {
        state.currentSim = null;
        return;
      }
      const sim = state.sims.find(item => item.idSim === id || item.iccid === id);
      if (sim) {
        state.currentSim = sim;
      }
    },
    
    updateSimName: (
      state,
      action: PayloadAction<{ idSim: string; newName: string }>,
    ) => {
      const { idSim, newName } = action.payload;
      const sim = state.sims.find(s => s.idSim === idSim);
      if (sim) {
        sim.simName = newName;
        if (state.currentSim?.idSim === idSim) {
          state.currentSim.simName = newName;
        }
      }
    },
    updateSimCurrency: (
      state,
      action: PayloadAction<{ id: string; currency: string }>
    ) => {
      const { id, currency } = action.payload;
      const sim = state.sims.find(s => s.idSim === id);
      if (sim) {
        sim.currency = currency;
      }
      if (state.currentSim?.idSim === id) {
        state.currentSim.currency = currency;
      }
    },
    deleteSim: (state, action: PayloadAction<string>) => {
      state.sims = state.sims.filter(item => item.idSim !== action.payload);
      if (state.currentSim?.idSim === action.payload) {
        state.currentSim = state.sims.length ? state.sims[0] : null;
      }
    },
    deleteAllSims: state => {
      state.sims = [];
      state.currentSim = null;
    },
    resetSimState: state => {
      state.sims = [];
      state.currentSim = null;
    },
    setSims: (state, action: PayloadAction<Sim[]>) => {
      const newSims = action.payload;
      const prevId = state.currentSim?.idSim;
      state.sims = newSims;
      const stillExists = newSims.find(sim => sim.idSim === prevId);
      state.currentSim = stillExists ?? newSims[0] ?? null;
    },
  },
});

export const {
  addSim,
  updateCurrentSim,
  updateSimName,
  deleteSim,
  deleteAllSims,
  resetSimState,
  setSims,
  updateSimCurrency,
} = simSlice.actions;

export default simSlice.reducer;
