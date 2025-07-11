import ContactHero from '../landing/ContactHero';  // Import the hero section
import ContactForm from '../landing/ContactForm';  // Import the contact form

const ContactPage = () => {
  return (
    <div>
      <ContactHero />  {/* Hero section with background image */}
      <ContactForm />  {/* Contact form */}
    </div>
  );
};

export default ContactPage;
