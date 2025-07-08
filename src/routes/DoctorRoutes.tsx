import { Route, Routes, Navigate } from 'react-router-dom';
import DoctorDashboard from '../features/doctor/Dashboard/DoctorDashboard';
import MyAppointments from '../features/doctor/MyAppointments/MyAppointments';
// import DoctorProfile from '../features/doctor/Profile/DoctorProfile';
import DoctorNotifications from '../features/doctor/Notifications/DoctorNotifications';
import DoctorLayout from '../layouts/DoctorLayout';
import ProtectedRoute from './ProtectedRoute';

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          {/* <Route path="profile" element={<DoctorProfile />} /> */}
          <Route path="notifications" element={<DoctorNotifications />} />
          {/* you can add more doctor routes here */}
        </Route>
      </Route>

      {/* Redirect unknown doctor paths to dashboard */}
      <Route path="*" element={<Navigate to="/doctor" replace />} />
    </Routes>
  );
};

export default DoctorRoutes;
