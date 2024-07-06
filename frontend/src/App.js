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

function App() {
  const ProtectedProducts = AuthGuard(Products);
  const ProtectedProductsInfo = AuthGuard(ProductInfo);
  const ProtectedCart = AuthGuard(Cart);
  const ProtectedProfile = AuthGuard(Profile);

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/products" element={<ProtectedProducts />} />
            <Route path="/cart" element={<ProtectedCart />} />
            <Route path="/profile" element={<ProtectedProfile />} />
            <Route path="/products/:id" element={<ProtectedProductsInfo />} />
            <Route path="/*" element={<Auth />} />
          </Routes>
        </div>
      </Router>
      <Snackbar />
    </div>
  );
}

export default App;
