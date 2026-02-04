import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function AdminRoute() {
  const { loading, user, isAdmin } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
