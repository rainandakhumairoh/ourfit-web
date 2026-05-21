import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role: "user" | "admin" }

  const login = (username, password, role) => {
    if (role === "admin") {
      if (username === "adminourfit" && password === "ownercantiq05") {
        setUser({ username, role });
        return true; // sukses login
      } else {
        return false;
      }
    }

    if (role === "user") {
      setUser({ username, role });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
