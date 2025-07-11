import HeroSection from '../landing/HeroSection';
import FindDoctor from '../landing/FindDoctor';
import ImpactSection from '../landing/ImpactSection';
import WhyChooseUs from '../landing/WhyChooseUs';
import ServicesSection from '../landing/servicePage/ServicesSection'; // Importing only the Services Section
import TeamSection from '../landing/TeamSection';
import Testimonials from '../landing/Testimonials';
import PartnersSection from '../landing/PartnersSection';
import Newsletter from '../landing/Newsletter';
import Footer from '../landing/Footer';

const HomePage = () => {
  return (
    <div>
      {/* Hero section for Home */}
      <HeroSection />

      {/* Find Doctor section */}
      <FindDoctor />

      {/* Impact Section */}
      <ImpactSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Services Section without the Hero Section */}
      <ServicesSection />  {/* Services only, no hero section */}

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Partners Section */}
      <PartnersSection />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
