import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/index"; // Adjust the path based on where you create slices

const store = configureStore({
  reducer: rootReducer,
});

export default store;
