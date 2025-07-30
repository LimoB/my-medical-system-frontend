import { Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from '../features/user/Dashboard/UserDashboard';
import BookAppointment from '../features/user/BookAppointment/BookAppointment';
import ConfirmBooking from '../features/user/BookAppointment/bookingComponents/ConfirmBooking';
import MyAppointments from '../features/user/MyAppointments/MyAppointments';
import UserPrescriptions from '../features/user/Prescriptions/UserPrescriptions';
import UserPayments from '../features/user/Payments/UserPayments';
import UserComplaints from '../features/user/Complaints/UserComplaints';
import UserProfile from '../features/user/Profile/UserProfile';
import UserNotifications from '../features/user/Notifications/UserNotifications';
import PaymentSuccess from '../features/user/Payments/payment-success';
import PaymentCancel from '../features/user/Payments/payment-cancel';
import UserConsultations from '../features/user/Consultation/UserConsultations';

// import Settings from '../features//Settings/Settings'; // ✅ Assuming a shared path

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

        {/* ✅ Booking flow */}
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="book-appointment/confirm" element={<ConfirmBooking />} />

        {/* Payment result pages */}
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="payment-cancel" element={<PaymentCancel />} />

        {/* ✅ Other user routes */}
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="prescriptions" element={<UserPrescriptions />} />
        <Route path="payments" element={<UserPayments />} />
        <Route path="complaints" element={<UserComplaints />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="notifications" element={<UserNotifications />} />
        <Route path="consultations" element={<UserConsultations />} />
        {/* <Route path="settings" element={<Settings />} /> ✅ Added here */}
      </Route>

      {/* Redirect unknown paths to dashboard */}
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  );
};

export default UserRoutes;
