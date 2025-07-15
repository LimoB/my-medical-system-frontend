import { Routes, Route } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import DoctorRoutes from './DoctorRoutes';
import UserRoutes from './UserRoutes';
import PublicLayout from '../layouts/PublicLayout';

import HomePage from '../pages/HomePage';
import ServicePage from '../landing/servicePage/ServicePage';
import ContactPage from '../landing/contactPage/ContactPage';
import HelpPage from '../landing/HelpPage';
import HealthInsightsPage from '../landing/HealthInsightsPage';

import AboutPage from '../landing/AboutPage'; // ✅ Add this
import DoctorsPage from '@/components/DoctorsListSection'; // ✅ Add this

import PublicRoutes from './PublicRoutes';

const AppRoutes = () => (
  <Routes>
    {/* Admin Routes */}
    <Route path="/admin/*" element={<AdminRoutes />} />

    {/* Doctor Routes */}
    <Route path="/doctor/*" element={<DoctorRoutes />} />

    {/* User Routes */}
    <Route path="/user/*" element={<UserRoutes />} />

    {/* Public Routes with PublicLayout */}
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} /> {/* ✅ About Us */}
      <Route path="doctors" element={<DoctorsPage />} /> {/* ✅ Doctors */}
      <Route path="service" element={<ServicePage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="insights" element={<HealthInsightsPage />} />
    </Route>

    {/* Catch-all */}
    <Route path="/*" element={<PublicRoutes />} />
  </Routes>
);

export default AppRoutes;
