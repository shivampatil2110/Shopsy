import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProducts, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
