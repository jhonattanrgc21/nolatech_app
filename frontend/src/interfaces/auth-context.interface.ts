import { Login } from "./login.interface";
import { Session } from "./session.interface";

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (loginForm: Login) => void;
  logout: () => void;
  userSession: Session | null;
  error: string;
}
