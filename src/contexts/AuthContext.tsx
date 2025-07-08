import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export interface DecodedToken {
  id: number;
  email: string;
  role: 'admin' | 'doctor' | 'user';
  first_name: string;
  last_name: string;
  avatarUrl?: string;
  contact_phone?: string;
  address?: string;
  exp: number; // Unix timestamp in seconds
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  login: (token: string, rememberMe?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load token on app start
  useEffect(() => {
    const storedToken =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          setUser(decoded);
          setToken(storedToken);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Failed to decode token:', err);
        logout();
      }
    }
  }, []);

  const login = (newToken: string, rememberMe = false) => {
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      setUser(decoded);
      setToken(newToken);

      if (rememberMe) {
        localStorage.setItem('token', newToken);
      } else {
        sessionStorage.setItem('token', newToken);
      }
    } catch (err) {
      console.error('Invalid token on login:', err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
