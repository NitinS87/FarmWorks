import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// const StateContext = createContext();

// const initialState = {
//   userProfile: false,
// };

// export const UserContext = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   const handleUserLogout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         initialState,
//         currentUser,
//         setCurrentUser,
//         handleUserLogout,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);

export const LoginContext = createContext({});

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:8000/api/farmer/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
