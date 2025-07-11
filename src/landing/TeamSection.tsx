const doctors = [
  { 
    name: 'Dr. Boaz Limo', 
    specialty: 'CEO & Co-Founder', 
    image: '/doc.jpeg',
    description: 'Passionate about transforming healthcare through innovation, empathy, and leadership.',
  },
  { 
    name: 'Dr. Sophie Moore', 
    specialty: 'Dental Specialist', 
    image: '/doc2.jpg', 
    description: 'Expert in oral care, helping you maintain a healthy, confident smile.',
  },
  { 
    name: 'Dr. Matt Cannon', 
    specialty: 'Orthopedic', 
    image: '/doc3.jpeg', 
    description: 'Expert in treating bone and joint conditions to restore your mobility and comfort.',
  },
  { 
    name: 'Dr. Andy Smith', 
    specialty: 'Brain Surgeon', 
    image: '/ddd 12.jpeg',
    description: 'Expert in brain and nerve surgery, committed to precision, safety, and patient recovery.',
  },
  { 
    name: 'Dr. Lily Woods', 
    specialty: 'Heart Specialist', 
    image: '/doc3.jpeg',
    description: 'Expert in heart health, providing personalized and compassionate cardiac care.',
  },
  { 
    name: 'Dr. Patrick Meyer', 
    specialty: 'Eye Specialist', 
    image: '/patient.jpg',
    description: 'Focused on preserving and improving your vision with expert, personalized eye care.',
  }
];

const TeamSection = () => {
  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-teal-700">
          Meet the Experts Behind Your Care
        </h2>
        <p className="text-gray-600 mb-10 text-lg md:text-xl">
          Our team of experienced doctors, nurses, and specialists is dedicated to providing compassionate, expert care you can trust.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-teal-600 text-lg font-semibold mb-2">{doc.name}</h3>
              <p className="text-black font-bold text-sm mb-4">{doc.specialty}</p> {/* Bold and black for specialty */}
              <p className="text-gray-600 text-sm mb-6">{doc.description}</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
