
const UserDashboard = () => {
  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-700">User Dashboard</h1>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
        <p>Schedule your next appointment with a doctor.</p>
        {/* You can import and embed BookAppointment component here */}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
        <p>Review your upcoming and past appointments here.</p>
      </section>
    </div>
  );
};

export default UserDashboard;
