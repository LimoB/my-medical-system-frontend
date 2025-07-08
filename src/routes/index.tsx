import { Routes, Route } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import DoctorRoutes from './DoctorRoutes';
import UserRoutes from './UserRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => (
  <Routes>
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/doctor/*" element={<DoctorRoutes />} />
    <Route path="/user/*" element={<UserRoutes />} />

    {/* Catch-all public routes */}
    <Route path="/*" element={<PublicRoutes />} />
  </Routes>
);

export default AppRoutes;
