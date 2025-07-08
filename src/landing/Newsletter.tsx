const Newsletter = () => {
    return (
        <section className="bg-teal-700 text-white py-16 px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
                <p className="text-white/90 mb-6">
                    Subscribe to our newsletter for health tips, clinic updates, and more.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-3 rounded text-gray-800 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button className="bg-white text-teal-700 font-semibold px-6 py-3 rounded hover:bg-teal-100 transition">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
