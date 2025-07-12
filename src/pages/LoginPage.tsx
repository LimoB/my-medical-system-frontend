import LoginHeroSection from './LoginHeroSection'; // Import the hero section with the form
import Footer from '../landing/Footer'; // Import the Footer component

const LoginPage = () => {
  return (
    <div>
      {/* Login Hero Section which includes the login form */}
      <LoginHeroSection />


       {/* Footer section */}
      <Footer />
    </div>
  );
};

export default LoginPage;
