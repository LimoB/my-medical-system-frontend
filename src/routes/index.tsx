import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import DoctorRoutes from './DoctorRoutes';
import UserRoutes from './UserRoutes';
import PublicLayout from '../layouts/PublicLayout'; // Public layout for header and other shared elements
import HomePage from '../pages/HomePage'; // Directly import HomePage here
import ServicePage from '../landing/ServicePage'; // Service Page component
import ContactPage from '../landing/ContactPage'; // Import the ContactPage component
import HelpPage from '../landing/HelpPage'; // Import the Help Page
import HealthInsightsPage from '../landing/HealthInsightsPage'; // Import the Health Insights Page

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
      {/* Public Pages like HomePage, ServicePage, etc */}
      <Route index element={<HomePage />} /> {/* HomePage */}
      <Route path="service" element={<ServicePage />} /> {/* Service Page */}
      <Route path="contact" element={<ContactPage />} /> {/* Contact Page */}
      <Route path="help" element={<HelpPage />} /> {/* Help Page */}
      <Route path="insights" element={<HealthInsightsPage />} /> {/* Health Insights Page */}
    </Route>
  </Routes>
);

export default AppRoutes;
