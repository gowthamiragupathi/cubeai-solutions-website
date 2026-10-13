import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/endpoints";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cube_auth_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("cube_auth_token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const profile = await api.auth.me();
          setUser(profile);
          localStorage.setItem("cube_auth_user", JSON.stringify(profile));
        } catch (err) {
          console.warn("Session expired or invalid, logging out:", err);
          logout();
        }
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    const data = await api.auth.login(email, password);
    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem("cube_auth_token", data.access_token);
    localStorage.setItem("cube_auth_user", JSON.stringify(data.user));
    return data.user;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("cube_auth_token");
    localStorage.removeItem("cube_auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
