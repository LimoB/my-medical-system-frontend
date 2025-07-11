import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ServicePage from '../landing/servicePage/ServicePage'; // Correctly import ServicePage
import LoginPage from '../pages/LoginPage'; // Correctly import LoginPage
import RegisterPage from '../pages/RegisterPage'; // Correctly import RegisterPage
import VerifyEmailPage from '../pages/VerifyEmailPage'; // Correctly import VerifyEmailPage
import ForgotPasswordPage from '../pages/ForgotPasswordPage'; // Correctly import ForgotPasswordPage
import ResetPasswordPage from '../pages/ResetPasswordPage'; // Correctly import ResetPasswordPage

import PublicLayout from '../layouts/PublicLayout'; // Wrap public routes with PublicLayout

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Wrap all public routes in PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Login route */}
        <Route path="/register" element={<RegisterPage />} /> {/* Register route */}
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
