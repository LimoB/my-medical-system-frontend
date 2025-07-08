// import React from 'react';

const FindDoctor = () => {
  return (
    <section className="bg-gray-50 py-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Find A Doctor</h2>
        <form className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Name"
            className="w-full sm:w-1/3 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Specialty"
            className="w-full sm:w-1/3 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default FindDoctor;