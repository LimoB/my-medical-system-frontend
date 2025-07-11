const testimonials = [
  {
    name: 'John Carter',
    quote: '“An amazing service” Truly amazing service! The staff was kind, professional, and made me feel cared for every step of the way.',
    image: '/Partener.jpeg',
    position: 'CEO at Safaricom',
  },
  {
    name: 'Sophie Moore',
    quote: '“One of a kind service” The team went above and beyond — I’ve never felt more comfortable during a medical visit.',
    image: '/patient.jpg',
    position: 'MD at KCB',
  },
  {
    name: 'Andy Smith',
    quote: '“The best service” Efficient, friendly, and professional. Highly recommend Harmony Health Clinic!',
    image: '/patient.jpg',
    position: 'CEO at Dot Austere',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-6">
          What Our Patients Say
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base md:text-lg">
          Hear from real patients who’ve experienced our compassionate care, expert treatments, and dedicated support throughout their health journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              <div className="mb-6 flex justify-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <p className="text-xl text-gray-700 italic mb-4">“{t.quote}”</p>
              <h4 className="font-semibold text-teal-700">{t.name}</h4>
              <p className="text-gray-500">{t.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
