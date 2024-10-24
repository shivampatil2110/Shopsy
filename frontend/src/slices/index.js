import { combineReducers } from "redux";
import productsReducer from "./productsSlice";
import addressReducer from "./addressSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  address: addressReducer,
  // Add more reducers here
});

export default rootReducer;
