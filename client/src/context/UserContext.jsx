import React, { createContext, useContext, useState } from "react";

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
