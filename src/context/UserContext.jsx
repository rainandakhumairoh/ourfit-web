import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  // ambil user dari localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // simpan otomatis ke localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // LOGIN untuk User biasa
  const login = (userData) => {
    setCurrentUser(userData);
  };

  // LOGIN untuk Admin
  const adminLogin = (username, password) => {
    // Validasi admin credentials
    if (username === "adminourfit" && password === "ownercantiq05") {
      const adminUser = {
        id: "admin",
        name: "Admin Ourfit",
        email: "admin@ourfit.com",
        role: "admin",
      };
      setCurrentUser(adminUser);
      return { success: true, message: "Admin login berhasil" };
    } else {
      return { success: false, message: "Username atau password salah" };
    }
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
        adminLogin,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}