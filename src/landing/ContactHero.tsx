
const ContactHero = () => {
  return (
    <section className="relative bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: `url('/path/to/your/image.jpg')` }}>
      <div className="absolute inset-0 bg-teal-700 opacity-50"></div>
      <div className="relative z-10 text-center text-white py-16 px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Get in touch with us for any inquiries or to book an appointment. We’re here to assist you.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
