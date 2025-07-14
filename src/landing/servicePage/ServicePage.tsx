import ServiceHeroSection from './ServiceHeroSection'; // Import the hero section
import ServicesSection from './ServicesSection'; // Import the services section
import FindDoctor from '../FindDoctor'; // Import FindDoctor section
import DoctorsListSection from '@/components/DoctorsListSection';
import Testimonials from '../Testimonials'; // Import Testimonials section
import Footer from '../Footer'; // Import Footer section
import Newsletter from '../Newsletter'; // Import Newsletter section

const ServicePage = () => {
  return (
    <div>
      {/* Hero section with the background image and booking form */}
      <ServiceHeroSection />

      {/* Find a Doctor section */}
      <FindDoctor />

      {/* Medical services list */}
      <ServicesSection />

      {/* Doctors section to showcase all the doctors */}
            <DoctorsListSection />

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
