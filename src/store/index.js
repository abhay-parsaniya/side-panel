import { configureStore } from "@reduxjs/toolkit";

import sidepanelSlice from "./sidepanel-slice";

const store = configureStore({
  reducer: {
    sidepanel: sidepanelSlice.reducer,
  },
});

export default store;