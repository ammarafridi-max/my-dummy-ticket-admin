import { createContext, useContext, useEffect, useState } from 'react';
import { useGetMe } from '../features/auth/hooks/useGetMe';
import { useLogout } from '../features/auth/hooks/useLogout';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { myAccount, isLoadingMyAccount } = useGetMe();
  const { logout } = useLogout();

  const [user, setUser] = useState(null);

  // Sync global user state whenever useGetMe() returns
  useEffect(() => {
    if (!isLoadingMyAccount) setUser(myAccount || null);
  }, [myAccount, isLoadingMyAccount]);

  // Automatically logout on 401 (backend rejects cookie)
  useEffect(() => {
    if (!isLoadingMyAccount && myAccount === null) {
      // user is not logged in
      // auto logout is optional — uncomment if desired:
      // logout();
    }
  }, [myAccount, isLoadingMyAccount]);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isAdmin,
        logout,
      }}
    >
      {!isLoadingMyAccount ? (
        children
      ) : (
        <div className="flex items-center justify-center h-screen text-white">
          <div className="animate-pulse text-lg">Loading...</div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
