import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem("nexgile_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string) => {
    // Check hardcoded admin
    if (email === "admin@nexgile.com" && password === "admin123") {
      const u = { email, name: "Admin User" };
      setUser(u);
      localStorage.setItem("nexgile_user", JSON.stringify(u));
      return true;
    }
    // Check registered users
    const users = JSON.parse(localStorage.getItem("nexgile_registered_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const u = { email: found.email, name: found.name };
      setUser(u);
      localStorage.setItem("nexgile_user", JSON.stringify(u));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("nexgile_user");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
