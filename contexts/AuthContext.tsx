"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);

  // Fetch current session when app loads
  useEffect(() => {
    mountedRef.current = true;

    async function loadUser() {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();
        if (idToken && mountedRef.current) {
          const payload = JSON.parse(atob(idToken.split(".")[1]));
          const email = payload.email || "";
          const name = payload.name || "";
          const userId = payload.sub || "";
          setUser({ email, name, userId, isLoggedIn: true });
        } else if (mountedRef.current) {
          setUser(null); // Not logged in
        }
      } catch (error) {
        if (mountedRef.current) {
          setUser(null); // Not logged in
        }
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
