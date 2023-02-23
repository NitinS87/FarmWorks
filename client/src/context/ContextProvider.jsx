import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  userProfile: false,
};

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userActiveMenu, setUserActiveMenu] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const handleUserLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  return (
    <StateContext.Provider
      value={{
        initialState,
        users,
        setUsers,
        userActiveMenu,
        setUserActiveMenu,
        currentUser,
        setCurrentUser,
        handleUserLogout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
