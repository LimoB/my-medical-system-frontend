const ContactHero = () => {
    return (
        <section
            className="relative bg-cover bg-center h-[50vh] md:h-[80vh] flex items-center justify-center"
            style={{ backgroundImage: `url('/national-cancer.jpg')` }} // Set the correct image path here
        >
            {/* Remove the blue overlay */}
            <div className="relative z-10 text-center text-white py-16 px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                <p className="text-lg mb-8 max-w-3xl mx-auto">
                    Get in touch with us for any inquiries or to book an appointment. We’re here to assist you.
                </p>
            </div>
        </section>
    );
};

export default ContactHero;
