import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { cuenta, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;
  if (!cuenta) return <Navigate to="/login" replace />;

  // Normalizamos el rol a minúsculas para evitar errores por mayúsculas/minúsculas
  const rolNormalizado = cuenta.rol?.toLowerCase();
  
  if (rolNormalizado !== 'administrador' && rolNormalizado !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}