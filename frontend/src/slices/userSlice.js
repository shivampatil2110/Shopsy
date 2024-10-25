import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    updateProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
