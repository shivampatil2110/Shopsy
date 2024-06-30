import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContext } from "./util/GlobalState";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Auth from "./Auth/Auth";
import Products from "./ProductsPage/Products";
import Snackbar from "./util/Snackbar";
import Navbar from "./Navbar/Navbar";
import Cart from "./Cart/Cart";
import ProductInfo from "./ProductsPage/ProductInfo";
import Profile from "./Profile/Profile";

function App() {
  const [state, setState] = useContext(GlobalContext);
  // const navigate = useNavigate();

  useEffect(() => {
    const setLoggedIn = () => {
      const userExists = Cookies.get("jwtToken");
      if (userExists == undefined) {
        setState({ ...state, isLoggedIn: false });
        // navigate("/");
      }
    };
    setLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products/:id" element={<ProductInfo />} />
          </Routes>
        </div>
      </Router>
      <Snackbar />
    </div>
  );
}

export default App;
