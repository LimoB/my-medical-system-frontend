// src/routes/UserRoutes.tsx
import { Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from '../features/user/Dashboard/UserDashboard';
import BookAppointment from '../features/user/BookAppointment/BookAppointment';
// import UserProfile from '../features/user/Profile/UserProfile';
import UserNotifications from '../features/user/Notifications/UserNotifications';
import UserLayout from '../layouts/UserLayout';
import ProtectedRoute from './ProtectedRoute';

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        {/* <Route path="profile" element={<UserProfile />} /> */}
        <Route path="notifications" element={<UserNotifications />} />
      </Route>

      {/* Redirect unknown user paths to dashboard */}
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  );
};

export default UserRoutes;
