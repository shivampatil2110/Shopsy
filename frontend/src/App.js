import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Products from "./ProductsPage/Products";
import Snackbar from "./util/Snackbar";
import Cart from "./Cart/Cart";
import ProductInfo from "./ProductsPage/ProductInfo";
import Profile from "./Profile/Profile";
import AuthGuard from "./Auth/AuthGuard";
import Address from "./Profile/Address";
import AddAddress from "./Profile/AddAddress";
import Orders from "./Orders/Orders";

function App() {
  const ProtectedProducts = AuthGuard(Products);
  const ProtectedProductsInfo = AuthGuard(ProductInfo);
  const ProtectedCart = AuthGuard(Cart);
  const ProtectedProfile = AuthGuard(Profile);
  const ProtectedAddress = AuthGuard(Address);
  const ProtectedAddAdderess = AuthGuard(AddAddress);
  const ProtectedOrders = AuthGuard(Orders);

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/products" element={<ProtectedProducts />} />
            <Route path="/cart" element={<ProtectedCart />} />
            <Route path="/profile" element={<ProtectedProfile />} />
            <Route path="/profile/address" element={<ProtectedAddress />} />
            <Route
              path="/profile/address/addAddress"
              element={<ProtectedAddAdderess />}
            />
            <Route path="/products/:id" element={<ProtectedProductsInfo />} />
            <Route path="/orders" element={<ProtectedOrders />} />
            <Route path="/*" element={<Auth />} />
          </Routes>
        </div>
      </Router>
      <Snackbar />
    </div>
  );
}

export default App;
