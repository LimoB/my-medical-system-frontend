// File: src/pages/HomePage.tsx
import HeroSection from '../landing/HeroSection';
import FindDoctor from '../landing/FindDoctor';
import ImpactSection from '../landing/ImpactSection';
import WhyChooseUs from '../landing/WhyChooseUs';
import ServicesSection from '../landing/ServicesSection';
import TeamSection from '../landing/TeamSection';
import Testimonials from '../landing/Testimonials';
import PartnersSection from '../landing/PartnersSection';
import Newsletter from '../landing/Newsletter';
import Footer from '../landing/Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FindDoctor />
      <ImpactSection />
      <WhyChooseUs />
      <ServicesSection />
      <TeamSection />
      <Testimonials />
      <PartnersSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
