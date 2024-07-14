import { combineReducers } from "redux";
import productsReducer from "./productsSlice";
import addressSlice from "./productsSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  address: addressSlice,
  // Add more reducers here
});

export default rootReducer;
