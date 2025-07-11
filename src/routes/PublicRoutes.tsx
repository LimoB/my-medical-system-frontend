import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ServicePage from '../landing/ServicePage'; // Correctly Import ServicePage
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

import PublicLayout from '../layouts/PublicLayout';

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Wrap all public routes in PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} /> {/* Corrected Service Page Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Optional: A 404 Page Not Found route */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default PublicRoutes;
