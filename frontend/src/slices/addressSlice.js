import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: null,
  reducers: {
    addAddressToPayload: (state, action) => {
      return action.payload;
    },
    setAddressToNull: (state, action) => {
      return null;
    },
  },
});

export const { addAddressToPayload, setAddressToNull } = addressSlice.actions;
export default addressSlice.reducer;
