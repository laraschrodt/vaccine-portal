import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
