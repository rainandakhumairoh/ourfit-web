import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../src/context/UserContext";

export default function PrivateRoute({ children, role = "admin" }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser || currentUser.role !== role) {
    // Kalau bukan admin, redirect ke login admin
    return <Navigate to="/login-admin" replace />;
  }

  return children;
}