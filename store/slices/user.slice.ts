import { IUserProfile } from "@/types/TypeUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  profile: IUserProfile | null;
}

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<IUserProfile>) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
