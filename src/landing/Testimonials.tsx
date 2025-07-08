// import React from 'react';

const testimonials = [
    {
        name: 'Jane Wanjiru',
        quote: 'Excellent care, kind staff, and very professional doctors. Highly recommend!',
        image: '/Partener.jpeg',
    },
    {
        name: 'Daniel Njoroge',
        quote: 'I was impressed by the technology and the personalized attention I received.',
        image: '/patient.jpg',
    },
];

const Testimonials = () => {
    return (
        <section className="bg-white py-14 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-10">What Our Patients Say</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-lg shadow">
                            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                            <p className="text-gray-600 italic">“{t.quote}”</p>
                            <h4 className="mt-4 font-semibold text-teal-700">— {t.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;