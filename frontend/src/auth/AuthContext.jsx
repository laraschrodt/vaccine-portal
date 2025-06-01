import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCsrf } from "../utils/csrf";

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await fetch("/api/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrf(),
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Bad credentials");
    const data = await res.json();
    setUser({ username, groups: data.groups });

    if (data.groups.includes("Patient")) {
      navigate("/patient/dashboard");
    }
    // if (data.groups.includes("ClinicStaff")) navigate("/clinic/dashboard"); // Noch nicht implementiert
    // else if (data.groups.includes("Admin"))   navigate("/admin/dashboard");  // Noch nicht implementiert
    else if (data.groups.length === 0) {
      navigate("/");
    }
  };

  const logout = () => {
    fetch("/api/logout/", { method: "POST", credentials: "include" });
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
