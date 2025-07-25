import ServiceHeroSection from './ServiceHeroSection'; // Import the hero section
import ServicesSection from './ServicesSection'; // Import the services section
import Testimonials from '../Testimonials'; // Import Testimonials section
import Footer from '../Footer'; // Import Footer section
import Newsletter from '../Newsletter'; // Import Newsletter section

const ServicePage = () => {
  return (
    <div>
      {/* Hero section with the background image and booking form */}
      <ServiceHeroSection />

    

      {/* Medical services list */}
      <ServicesSection />

    
      {/* Testimonials section */}
      <Testimonials />

      {/* Newsletter section */}
      <Newsletter />

      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default ServicePage;
