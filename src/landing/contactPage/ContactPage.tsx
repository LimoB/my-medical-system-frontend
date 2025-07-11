import ContactHero from './ContactHero';  // Import the hero section
import ContactForm from './ContactForm';  // Import the contact form
import Newsletter from '../Newsletter';  // Import the Newsletter section
import Footer from '../Footer';  // Import the Footer section

const ContactPage = () => {
  return (
    <div>
      <ContactHero />  {/* Hero section with background image */}
      <ContactForm />  {/* Contact form */}
      <Newsletter />   {/* Newsletter section */}
      <Footer />       {/* Footer section */}
    </div>
  );
};

export default ContactPage;
