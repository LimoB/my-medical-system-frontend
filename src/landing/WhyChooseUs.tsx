
const WhyChooseUs = () => {
    return (
        <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-teal-700 mb-6">Why Choose Harmony Health Clinic</h2>
                    <p className="text-gray-600 mb-6">
                        We provide high-quality care tailored to your personal health needs. Our team is dedicated to ensuring a smooth,
                        empathetic experience for every single visit. Our technology, skilled professionals, and commitment to excellence
                        ensure our patients experience a better quality of life.
                    </p>
                    <div className="flex gap-6">
                        <button className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition duration-300">
                            Get Started
                        </button>
                        <button className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-full hover:bg-teal-50 transition duration-300">
                            Talk to an Expert
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="/surgery-team2.jpg" // Ensure the image path is correct
                        alt="Surgery Team"
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
