import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContext } from "./util/GlobalState";
import Cookies from "js-cookie";
import Auth from "./Auth/Auth";
import Products from "./ProductsPage/Products";
import Snackbar from "./util/Snackbar";
import Navbar from "./Navbar/Navbar";
import Cart from "./Cart/Cart";

function App() {
  const [state, setState] = useContext(GlobalContext);

  const setLoggedIn = () => {
    const userExists = Cookies.get("jwtToken");
    if (userExists) {
      setState({ ...state, isLoggedIn: true });
    }
  };
  // setLoggedIn();

  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/my-component" element={<MyComponent />} /> */}
          </Routes>
        </div>
      </Router>
      <Snackbar />
    </div>
  );
}

export default App;
