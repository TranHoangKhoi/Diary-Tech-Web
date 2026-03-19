import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFarm } from "@/types/TypeFarm";

interface FarmState {
  farms: IFarm[];
  currentFarm: IFarm | null;
  loading: boolean;
}

const initialState: FarmState = {
  farms: [],
  currentFarm: null,
  loading: false,
};

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    setFarms: (state, action: PayloadAction<IFarm[]>) => {
      state.farms = action.payload;

      // auto chọn farm đầu tiên nếu chưa có currentFarm
      if (!state.currentFarm && action.payload.length > 0) {
        state.currentFarm = action.payload[0];
      }
    },

    setCurrentFarm: (state, action: PayloadAction<IFarm>) => {
      state.currentFarm = action.payload;
    },

    setFarmLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    clearFarms: (state) => {
      state.farms = [];
      state.currentFarm = null;
    },
  },
});

export const { setFarms, setCurrentFarm, setFarmLoading, clearFarms } =
  farmSlice.actions;

export default farmSlice.reducer;
