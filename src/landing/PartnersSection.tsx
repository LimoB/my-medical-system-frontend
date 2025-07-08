// import React from 'react';

const partners = [
    '/Partener.jpeg',
    '/partner2.jpeg',
    '/partner3.jpeg',
    '/partner1.jpeg',
];

const PartnersSection = () => {
    return (
        <section className="bg-gray-50 py-12 px-6 md:px-12">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Trusted Partners</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {partners.map((logo, i) => (
                        <img key={i} src={logo} alt={`Partner ${i}`} className="h-12 object-contain" />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
