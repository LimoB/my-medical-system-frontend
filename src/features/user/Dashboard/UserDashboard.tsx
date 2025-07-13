// src/pages/user/UserDashboard.tsx

const UserDashboard = () => {
  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-2">Welcome Back!</h1>
        <p className="text-gray-600 text-lg">
          Your health journey starts here — manage your care with ease.
        </p>
      </header>

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Book Appointment */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Book an Appointment</h2>
            <p className="text-gray-600 text-sm mb-4">
              Easily schedule a visit with a specialist at your convenience.
            </p>
          </div>
          <button className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition w-max">
            Book Now
          </button>
        </div>

        {/* My Appointments */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">My Appointments</h2>
          <p className="text-gray-600 text-sm">
            Review your upcoming or past appointments here.
          </p>
        </div>

        {/* Prescriptions */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Prescriptions</h2>
          <p className="text-gray-600 text-sm">
            View medical prescriptions from your appointments.
          </p>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Payments</h2>
          <p className="text-gray-600 text-sm">
            Track your payment history and transaction status.
          </p>
        </div>

        {/* Complaints */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Complaints</h2>
          <p className="text-gray-600 text-sm">
            Submit or check the status of complaints or issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
