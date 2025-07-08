// import React from 'react';

const ImpactSection = () => {
  const stats = [
    { label: '99.9%', desc: 'Patient Experience' },
    { label: '10+', desc: 'Years of Service' },
    { label: '12k+', desc: 'Patients Cared For' },
    { label: '20+', desc: 'Growth Metrics' },
  ];

  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <h3 className="text-3xl md:text-4xl font-bold text-teal-600">{stat.label}</h3>
            <p className="text-gray-600 mt-2">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
