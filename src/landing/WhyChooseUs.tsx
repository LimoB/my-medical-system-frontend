// import React from 'react';

const WhyChooseUs = () => {
    return (
        <section className="bg-gray-50 py-14 px-6 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Why Choose Harmony Health Clinic</h2>
                    <p className="text-gray-600 mb-4">
                        We provide high-quality care tailored to your personal health needs. Our team is dedicated to ensuring a smooth,
                        empathetic experience for every single visit. Our technology, skilled professionals, and commitment to excellence
                        ensure our patients experience a better quality of life.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 transition">
                            Get Started
                        </button>
                        <button className="text-teal-600 border border-teal-600 px-6 py-3 rounded hover:bg-teal-50 transition">
                            Talk to an Expert
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img src="surgery-team2.jpg" alt="Surgery Team" className="rounded-lg shadow-md w-full" />
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;