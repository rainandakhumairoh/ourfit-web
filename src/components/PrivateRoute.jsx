import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../src/context/UserContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user || user.role !== "admin") {
    // Kalau bukan admin, redirect ke login
    return <Navigate to="/login" replace />;
  }

  return children;
}
