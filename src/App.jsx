import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import AuthProvider from './context/AuthContext';
import Dashboard from './pages/Dashboard/Dashboard';
import DummyTickets from './pages/DummyTickets/DummyTickets';
import Login from './pages/Login/Login';
import PrivateRoutes from './pages/PrivateRoutes/PrivateRoutes';

// Users
import Users from './pages/Users/Users';
import ReadUser from './pages/ReadUser/ReadUser';
import CreateUser from './pages/CreateUser/CreateUser';

// Roles
import Roles from './features/roles/Roles';
import CreateRole from './features/roles/CreateRole';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <PrivateRoutes>
                  <AppLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dummy-tickets" element={<DummyTickets />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:username" element={<ReadUser />} />
              <Route path="users/create" element={<CreateUser />} />
              <Route path="roles" element={<Roles />} />
              <Route path="roles/create" element={<CreateRole />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
