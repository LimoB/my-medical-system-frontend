import LogoutButton from '@/components/LogoutButton';

const DoctorDashboard = () => {
  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-700">Doctor Dashboard</h1>
        <LogoutButton />
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
        <p>View your scheduled appointments here.</p>
        {/* Import and embed MyAppointments component if you want */}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Patient Records</h2>
        <p>Access patient medical records and notes here.</p>
      </section>
    </div>
  );
};

export default DoctorDashboard;
