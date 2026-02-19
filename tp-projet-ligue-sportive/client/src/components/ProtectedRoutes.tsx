import { Navigate } from "react-router-dom";
import { getRole, isAuthenticated } from "../utils/auth";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/connexion" />;
  }

  if (allowedRoles && !allowedRoles.includes(getRole() || "")) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
