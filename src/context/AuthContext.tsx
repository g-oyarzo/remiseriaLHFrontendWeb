import { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';
import type { Cuenta, LoginResponse, MeResponse } from '../features/auth/types';

interface AuthContextType {
  cuenta: Cuenta | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [cuenta, setCuenta] = useState<Cuenta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    api.get<MeResponse>('/auth/me')
      .then((res) => setCuenta(res.data.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post<LoginResponse>('/auth/login', { email, password });
    const { token, cuenta } = res.data.data;
    localStorage.setItem('token', token);
    setCuenta(cuenta);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      setCuenta(null);
    }
  };

  return (
    <AuthContext.Provider value={{ cuenta, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}