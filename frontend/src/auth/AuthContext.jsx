import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await axios.get("/api/users/csrf/");
      const response = await axios.post("/api/users/login/", { email, password });
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || "Fehler beim Login" };
    }
  };

  const logout = async () => {
    await axios.post("/api/users/logout/");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
