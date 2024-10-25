import { combineReducers } from "redux";
import productsReducer from "./productsSlice";
import addressReducer from "./addressSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  address: addressReducer,
  user: userSlice,
});

export default rootReducer;
