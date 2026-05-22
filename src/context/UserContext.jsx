import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  // Simpan registered users (di production pakai database)
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: "user1", password: "pass123", role: "user" }
  ]);

  const register = (username, password) => {
    // Cek apakah user sudah terdaftar
    if (registeredUsers.some(u => u.username === username)) {
      return false; // User sudah ada
    }
    
    // Tambah user baru
    setRegisteredUsers([...registeredUsers, { username, password, role: "user" }]);
    return true; // Registrasi berhasil
  };

  const login = (username, password, role) => {
    if (role === "admin") {
      // Admin hardcoded
      if (username === "adminourfit" && password === "ownercantiq05") {
        setUser({ username, role });
        return true;
      }
      return false;
    }

    if (role === "user") {
      // Cek di registered users
      const foundUser = registeredUsers.find(
        u => u.username === username && u.password === password
      );
      
      if (foundUser) {
        setUser({ username, role });
        return true;
      }
      return false;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, registeredUsers }}>
      {children}
    </UserContext.Provider>
  );
}