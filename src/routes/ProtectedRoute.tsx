import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type { JSX } from 'react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: JSX.Element; // optional for flexibility
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  // Select user from Redux auth slice
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Render children or nested routes
  return children ?? <Outlet />;
};

export default ProtectedRoute;
