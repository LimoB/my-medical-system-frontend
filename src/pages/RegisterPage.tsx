import RegisterHeroSection from './RegisterHeroSection'; // Import the Register Hero Section with the form
import Footer from '../landing/Footer'; // Import the Footer component

const RegisterPage = () => {
  return (
    <div>
      {/* Register Hero Section which includes the registration form */}
      <RegisterHeroSection />
      
      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default RegisterPage;
