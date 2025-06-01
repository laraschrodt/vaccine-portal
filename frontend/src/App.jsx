import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RegisterPage from "./pages/patient/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/patient/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  useEffect(() => {
    fetch("/api/csrf/", { credentials: "include" });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login"    element={<LoginPage />}  />

          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allow={["Patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
