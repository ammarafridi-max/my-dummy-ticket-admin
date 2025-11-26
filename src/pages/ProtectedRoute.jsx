import { Navigate, Outlet } from 'react-router-dom';
import { useGetMe } from '../features/auth/hooks/useGetMe';

export default function ProtectedRoute() {
  const { myAccount, isLoadingMyAccount } = useGetMe();

  if (isLoadingMyAccount) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="animate-pulse text-lg">Checking authentication...</div>
      </div>
    );
  }

  if (!myAccount) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
