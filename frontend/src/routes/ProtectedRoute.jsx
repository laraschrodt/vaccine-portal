import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children, allow = [] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.some(r => user.groups.includes(r))) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
