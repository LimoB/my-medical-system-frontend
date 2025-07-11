const services = [
  {
    title: 'Dental treatments',
    image: '/images/dental.jpeg',
    description:
      'Comprehensive dental care including cleanings, fillings, and cosmetic treatments — all delivered with precision and comfort.',
  },
  {
    title: 'Bones treatments',
    image: '/images/bones.jpeg',
    description:
      'Expert orthopedic care for fractures, joint pain, and bone conditions — helping you move with strength and confidence.',
  },
  {
    title: 'Diagnosis',
    image: '/images/diagnosis.jpeg',
    description:
      'Accurate and timely diagnostic services using advanced technology to support effective treatment decisions.',
  },
  {
    title: 'Cardiology',
    image: '/images/cardiology.jpeg',
    description:
      'Comprehensive heart care from diagnosis to treatment — focused on keeping your heart healthy and strong.',
  },
  {
    title: 'Surgery',
    image: '/images/surgery.jpeg',
    description:
      'Safe, advanced surgical procedures performed by experienced specialists to ensure the best outcomes.',
  },
  {
    title: 'Eye care',
    image: '/images/eyecare.jpeg',
    description:
      'Comprehensive eye exams, treatments, and vision solutions to help you see the world clearly.',
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-6">
          Our Medical Services
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base md:text-lg">
          Discover a wide range of personalized healthcare services designed to meet your needs at every stage of life. From routine checkups to specialized treatments, we’re here to support your journey to better health.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              <div className="p-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="px-6 pb-6 text-left">
                <h3 className="text-lg font-semibold text-teal-700 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm text-teal-600 font-medium hover:text-teal-800 transition duration-300"
                >
                  Learn More <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
