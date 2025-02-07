import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function PrivateRoutes({ children }) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div></div>; // Show a loading indicator while checking the user state
  }

  return user ? children : <Navigate to="/login" />;
}
