// import React from 'react';

const services = [
  { title: 'General Consultation', icon: '🩺' },
  { title: 'Dental Care', icon: '🦷' },
  { title: 'Cardiology', icon: '❤️' },
  { title: 'Neurology', icon: '🧠' },
  { title: 'Pediatrics', icon: '👶' },
  { title: 'Lab Services', icon: '🔬' },
];

const ServicesSection = () => {
  return (
    <section className="bg-white py-14 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Our Medical Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-teal-50 border border-teal-100 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-teal-700">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
