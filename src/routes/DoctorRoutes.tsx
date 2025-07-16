import { Route, Routes, Navigate } from 'react-router-dom';
import DoctorDashboard from '../features/doctor/Dashboard/DoctorDashboard';
import MyAppointments from '../features/doctor/MyAppointments/MyAppointments';
import CalendarPage from '../features/doctor/Calendar/CalendarPage';
import Patients from '../features/doctor/Patients/Patients';
import Prescriptions from '../features/doctor/Prescriptions/Prescriptions';
import Consultation from '../features/doctor/Consultation/Consultation';
import Complaints from '../features/doctor/Complaints/Complaints';
import Payments from '../features/doctor/Payments/Payments';
import Reports from '../features/doctor/Reports/Reports';
import Settings from '../features/doctor/Settings/Settings';
import DoctorNotifications from '../features/doctor/Notifications/DoctorNotifications';
import Meetings from '../features/doctor/Meetings/Meetings'; // ✅ Added

import DoctorLayout from '../layouts/DoctorLayout';
import ProtectedRoute from './ProtectedRoute';

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<DoctorNotifications />} />
          <Route path="meetings" element={<Meetings />} /> {/* ✅ New route */}
        </Route>
      </Route>

      {/* Redirect unknown paths to dashboard */}
      <Route path="*" element={<Navigate to="/doctor" replace />} />
    </Routes>
  );
};

export default DoctorRoutes;
