// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";
import farmReducer from "./slices/farm.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userReducer,
    farm: farmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
