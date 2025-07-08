// import React from 'react';

const doctors = [
  { name: 'Dr. Sarah Mwangi', specialty: 'Cardiologist', image: '/doc.jpeg' },
  { name: 'Dr. John Otieno', specialty: 'Dentist', image: '/doc2.jpg' },
  { name: 'Dr. Amina Yusuf', specialty: 'Pediatrician', image: '/doc3.jpeg' },
];

const TeamSection = () => {
  return (
    <section className="bg-gray-50 py-14 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Meet Our Experts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
              <p className="text-teal-600">{doc.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;