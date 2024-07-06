import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AuthGuard = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = Cookies.get("jwtToken");

    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthGuard;
