import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: [],
  reducers: {
    addAddressToPayload: (state, action) => {
      console.log("Action Payload:", action.payload);
      state.push(action.payload);
      console.log("Updated State:", state);
    },
  },
});

export const { addAddressToPayload } = addressSlice.actions;
export default addressSlice.reducer;
