import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { isAdmin, user } = useAuth();

  if (user === undefined) return null;

  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
