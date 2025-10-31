// contexts/AuthContext.tsx
"use client"; // Nếu dùng Next.js 13+ App Router

import { AuthService } from "@/services/AuthService";
import { AuthStore } from "@/stores/AuthStore";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Khởi tạo auth khi app mount (check xem có token hay không)
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Nếu có access token trong store, lấy user info
        if (AuthStore.isAuthenticated()) {
          const currentUser = await AuthService.getCurrentUser();
          setUser(currentUser);
        } else {
          // Nếu không có token, cố gắng refresh
          try {
            await AuthService.refreshToken();
            const currentUser = await AuthService.getCurrentUser();
            setUser(currentUser);
          } catch (err) {
            // Refresh thất bại, user chưa login
            console.log("[AUTH] No valid session");
          }
        }
      } catch (error) {
        console.error("[AUTH CONTEXT] Init failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await AuthService.login(email, password);
      // const currentUser = await AuthService.getCurrentUser();
      // setUser(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAuth = async () => {
    try {
      await AuthService.refreshToken();
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("[AUTH CONTEXT] Refresh failed:", error);
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
