import { Routes, Route } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import DoctorRoutes from './DoctorRoutes';
import UserRoutes from './UserRoutes';
import PublicLayout from '../layouts/PublicLayout'; // Public layout for header and other shared elements
import HomePage from '../pages/HomePage'; // HomePage for public routes
import ServicePage from '../landing/servicePage/ServicePage'; // ServicePage for public routes
import ContactPage from '../landing/contactPage/ContactPage'; // ContactPage for public routes
import HelpPage from '../landing/HelpPage'; // HelpPage for public routes
import HealthInsightsPage from '../landing/HealthInsightsPage'; // HealthInsightsPage for public routes
import PublicRoutes from './PublicRoutes'; // Import PublicRoutes for handling public routes

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
      {/* Public Pages */}
      <Route index element={<HomePage />} /> {/* HomePage */}
      <Route path="service" element={<ServicePage />} /> {/* Service Page */}
      <Route path="contact" element={<ContactPage />} /> {/* Contact Page */}
      <Route path="help" element={<HelpPage />} /> {/* Help Page */}
      <Route path="insights" element={<HealthInsightsPage />} /> {/* Health Insights Page */}
    </Route>

    {/* Public Routes handled by PublicRoutes */}
    <Route path="/*" element={<PublicRoutes />} />
  </Routes>
);

export default AppRoutes;
