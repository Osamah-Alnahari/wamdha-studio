// Authentication types
export interface User {
  email: string;
  name?: string;
  userId?: string;
  isLoggedIn: boolean;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
