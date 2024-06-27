import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(); // global variable

  return (
    <GlobalContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
