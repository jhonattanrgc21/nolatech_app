// AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { addSession, getToken, removeToken } from "../utils/storage";
import { Login } from "../interfaces/login.interface";
import { Session } from "../interfaces/session.interface";
import { signinRequest } from "../services/authService";
import { AuthContextProps } from "../interfaces/auth-context.interface";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [error, setError] = useState('');

  const login = async (loginForm: Login) => {
    try {
      const session: Session = await signinRequest(loginForm);
      setUserSession(session);
      addSession(session);
      setIsAuthenticated(true);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userSession, error }}>
      {children}
    </AuthContext.Provider>
  );
};
