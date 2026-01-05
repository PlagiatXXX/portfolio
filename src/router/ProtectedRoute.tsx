import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  isAuthenticated, 
  redirectTo = '/' 
}: ProtectedRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
