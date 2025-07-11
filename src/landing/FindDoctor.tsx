import { useState } from 'react';

const FindDoctor = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  const handleToggle = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-6">
          Find A Doctor
        </h2>
        <form className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <input
            type="text"
            placeholder="Name"
            className="w-full sm:w-1/4 px-4 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Specialty"
            className="w-full sm:w-1/4 px-4 py-3 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Availability Toggle */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-teal-700">Available</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isAvailable}
                onChange={handleToggle}
              />
              <span
                className={`w-12 h-6 rounded-full transition-all ease-in-out duration-300 ${
                  isAvailable ? 'bg-teal-600' : 'bg-gray-400'
                }`}
              ></span>
              <span
                className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all ease-in-out duration-300 ${
                  isAvailable ? 'translate-x-6 bg-white' : 'translate-x-0 bg-white'
                }`}
              ></span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-700 transition duration-300 mt-6"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default FindDoctor;
