"use client";
import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken) => {
    console.log(sessionToken);
  },
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const AppProvider = ({ children, initialSessionToken }) => {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);

  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
};

// Thêm PropTypes cho AppProvider
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialSessionToken: PropTypes.string.isRequired,
};

export default AppProvider;
