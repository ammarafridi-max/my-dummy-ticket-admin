import { createContext, useContext, useEffect, useState } from 'react';
import { getMeApi } from '../features/auth/services/apiAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  async function fetchUser() {
    const me = await getMeApi();
    setUser(me || null);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const isAuthenticated = user !== null && user !== undefined;
  const isAdmin = user?.role === 'admin';

  async function logout() {
    await fetch(`${import.meta.env.VITE_BACKEND}/api/auth/logout`, {
      credentials: 'include',
    });
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isAdmin,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {user === undefined ? (
        <div className="flex items-center justify-center h-screen text-white">
          <div className="animate-pulse text-lg">Loading session...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
