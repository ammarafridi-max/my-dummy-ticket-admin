import 'react-tooltip/dist/react-tooltip.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Login from './features/auth/Login';
import PrivateRoutes from './pages/PrivateRoutes';

import DummyTickets from './features/dummyTickets/DummyTickets';

// Users
import Users from './features/users/Users';
import CreateUser from './features/users/CreateUser';

import MyAccount from './features/account/MyAccount';
import SendEmail from './features/email/SendEmail';
import DummyTicketDetail from './features/dummyTickets/DummyTicketDetail';
import NotFound from './pages/NotFound';
import UpdateUser from './features/users/UpdateUser';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300 * 1000,
    },
  },
});

export default function App() {
  return (
    <>
      <Toaster />
      <ToastContainer position="top-right" autoClose={3000} />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dummy-tickets" element={<DummyTickets />} />
                  <Route
                    path="dummy-tickets/:sessionId"
                    element={<DummyTicketDetail />}
                  />
                  <Route path="send-email" element={<SendEmail />} />
                  <Route path="account" element={<MyAccount />} />
                  <Route path="users" element={<Users />} />
                  <Route path="users/create" element={<CreateUser />} />
                  <Route path="users/:username" element={<UpdateUser />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}
