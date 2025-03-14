import React, { createContext, useState, useContext } from "react";

// Create a Context
const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User login/sign-in information
  const [timerEvents, setTimerEvents] = useState([]); // User history
  const [reloadHistory, setReloadHistory] = useState(false);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        timerEvents,
        setTimerEvents,
        reloadHistory,
        setReloadHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
