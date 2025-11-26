import { Navigate, Outlet } from 'react-router-dom';
import { useGetMe } from '../features/auth/hooks/useGetMe';

export default function AdminRoute() {
  const { myAccount, isLoadingMyAccount } = useGetMe();

  if (isLoadingMyAccount) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="animate-pulse text-lg">Checking permissions...</div>
      </div>
    );
  }

  if (!myAccount) {
    return <Navigate to="/login" replace />;
  }

  if (myAccount.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
