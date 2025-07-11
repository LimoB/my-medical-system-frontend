
const ImpactSection = () => {
  const stats = [
    { label: '99.9%', desc: 'Patient Experience' },
    { label: '10+', desc: 'Years of Service' },
    { label: '12k+', desc: 'Patients Cared For' },
    { label: '20+', desc: 'Growth Metrics' },
  ];

  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-3xl md:text-4xl font-bold text-teal-700">{stat.label}</h3>
            <p className="text-gray-600 mt-2">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
