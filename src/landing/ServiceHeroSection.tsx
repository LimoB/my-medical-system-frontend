const ServiceHeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-between px-6 md:px-12"
      style={{ backgroundImage: `url('/national-cancer.jpg')` }} // Background image
    >
      {/* Content Container */}
      <div className="flex justify-between w-full items-center">

        {/* Text on the Left */}
        <div className="w-full md:w-1/2 text-left text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Where Excellence in Healthcare Feels Personal
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            We focus on the smallest details – because they matter most to your health.
          </p>
          <div className="flex justify-start gap-6">
            {/* Get Quote Now Button */}
            <button 
              className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition duration-300"
              aria-label="Get a quote now"
            >
              Get Quote Now
            </button>

            {/* Learn More Button */}
            <button 
              className="bg-white text-teal-600 px-8 py-4 rounded-full border-2 border-teal-600 hover:bg-teal-600 hover:text-white transition duration-300"
              aria-label="Learn more about our services"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Booking Appointment Form on the Right */}
        <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-teal-700 text-center">Book an Appointment</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-2 text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm mb-2 text-gray-700">Select Service</label>
              <select
                id="service"
                className="w-full p-3 rounded-md border border-gray-300"
              >
                <option value="Dental treatments">Dental treatments</option>
                <option value="Bones treatments">Bones treatments</option>
                <option value="Diagnosis">Diagnosis</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Surgery">Surgery</option>
                <option value="Eye care">Eye care</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm mb-2 text-gray-700">Appointment Date</label>
              <input
                type="date"
                id="date"
                className="w-full p-3 rounded-md border border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-full hover:bg-teal-700 transition duration-300"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
