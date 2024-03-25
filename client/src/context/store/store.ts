import { configureStore } from "@reduxjs/toolkit";

import loader from "../slices/loader";

export const store = configureStore({
  reducer: {
    loader,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
