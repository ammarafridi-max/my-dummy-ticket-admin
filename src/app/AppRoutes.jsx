import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../features/auth/pages/Login';
import NotFound from '../pages/NotFound';

// Dummy Ticket Routes
import DummyTickets from '../features/dummy-tickets/pages/DummyTickets';
import DummyTicketDetail from '../features/dummy-tickets/pages/DummyTicketDetail';
import SendEmail from '../features/dummy-tickets/pages/SendEmail';

// Protection Routes
import ProtectedRoute from '../pages/ProtectedRoute';
import AdminRoute from '../pages/AdminRoute';

// Users
import Users from '../features/users/pages/Users';
import CreateUser from '../features/users/pages/CreateUser';
import UpdateUser from '../features/users/pages/UpdateUser';
import MyAccount from '../features/account/pages/MyAccount';

// Blog
import Blogs from '../features/blog/pages/Blogs';
import CreateBlogPost from '../features/blog/pages/CreateBlogPost';
import UpdateBlogPost from '../features/blog/pages/UpdateBlogPost';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route element={<AdminRoute />}>
              <Route path="dummy-tickets" element={<DummyTickets />} />
              <Route path="dummy-tickets/:sessionId" element={<DummyTicketDetail />} />
              <Route path="send-email" element={<SendEmail />} />
              <Route path="users" element={<Users />} />
              <Route path="users/create" element={<CreateUser />} />
              <Route path="users/:username" element={<UpdateUser />} />
            </Route>

            <Route path="account" element={<MyAccount />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/create" element={<CreateBlogPost />} />
            <Route path="blogs/:id" element={<UpdateBlogPost />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
