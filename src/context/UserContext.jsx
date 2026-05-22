import {createContext, useEffect, useState,} from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {

  // ambil user dari localStorage
  const [currentUser, setCurrentUser] = useState(() => {

    const savedUser =
      localStorage.getItem("currentUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // simpan otomatis ke localStorage
  useEffect(() => {

    if (currentUser) {

      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );

    } else {

      localStorage.removeItem("currentUser");

    }

  }, [currentUser]);


  // LOGIN
  const login = (userData) => {

    setCurrentUser(userData);
  };


  // LOGOUT
  const logout = () => {

    setCurrentUser(null);

    window.location.href = "/";
  };


  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}