const Newsletter = () => {
  return (
    <section className="bg-[#f4f4f5] text-teal-700 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-6">
          Stay Informed
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base md:text-lg">
          Subscribe to our newsletter for health tips, clinic updates, and more.
        </p>
        <form className="flex flex-col sm:flex-row gap-6 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl text-gray-800 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg transition-all"
          />
          <button className="bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-800 transition-shadow duration-300">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
