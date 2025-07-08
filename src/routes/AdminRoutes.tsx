
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from '../features/admin/Dashboard/AdminDashboard';
import ManageUsers from '../features/admin/ManageUsers/ManageUsers';
import AdminProfile from '../features/admin/Profile/AdminProfile';
import AdminSettings from '../features/admin/Settings/AdminSettings';
import Appointments from '../features/admin/ManageAppointments/Appointments';
import Complaints from '../features/admin/ManageComplaints/Complaints';
import Doctors from '../features/admin/ManageDoctors/Doctors';
import Payments from '../features/admin/ManagePayments/Payments';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
