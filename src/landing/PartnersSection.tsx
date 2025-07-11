
const partners = [
    '/Partener.jpeg',
    '/partner2.jpeg',
    '/partner3.jpeg',
    '/partner1.jpeg',
];

const PartnersSection = () => {
    return (
        <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-teal-700">
                    Our Trusted Partners
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {partners.map((logo, i) => (
                        <img 
                            key={i} 
                            src={logo} 
                            alt={`Partner ${i}`} 
                            className="h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
