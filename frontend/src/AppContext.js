import React, { createContext, useState, useContext } from 'react';

// Create a Context
const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User login/sign-in information
    const [history, setHistory] = useState([]); // User history
    const [isTimerActive, setIsTimerActive] = useState(false); // Timer status

    return (
        <AppContext.Provider value={{ user, setUser, history, setHistory, isTimerActive, setIsTimerActive }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
    return useContext(AppContext);
};