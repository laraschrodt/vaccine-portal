import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RegisterPage from "./pages/patient/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Öffentliche Route */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Geschützter Bereich */}
          <Route
            path="/patient/*"
            element={
              <ProtectedRoute>
              </ProtectedRoute>
            }
          />

          {/* Default: Weiterleitung auf /register */}
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
