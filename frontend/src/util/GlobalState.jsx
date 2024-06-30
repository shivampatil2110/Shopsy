import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    cart: 0,
    isLoggedIn: true,
  }); // global variable

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {children}
    </GlobalContext.Provider>
  );
};
