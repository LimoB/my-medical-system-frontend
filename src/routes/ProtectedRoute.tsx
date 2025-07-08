import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: JSX.Element; // ✅ optional for flexibility
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Render custom layout or nested outlet
  return children ?? <Outlet />;
};

export default ProtectedRoute;
