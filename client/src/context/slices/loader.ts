import { createSlice } from "@reduxjs/toolkit";

interface LOADER {
  loader: boolean;
}

const initialLoader: LOADER = {
  loader: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialLoader,
  reducers: {
    showLoader: (state) => {
      return {
        ...state,
        loader: false,
      };
    },
    hideLoader: (state) => {
      return {
        ...state,
        loader: true,
      };
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
