// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./chatSlice";

export const chatStore = configureStore({
  reducer: {
    chatReducer: userReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof chatStore.getState>;
export type AppDispatch = typeof chatStore.dispatch;
