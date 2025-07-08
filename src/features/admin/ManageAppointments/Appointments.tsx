// src/features/admin/Appointments.tsx
export default function Appointments() {
  const mockAppointments = [
    { id: 1, patient: "Alice Smith", doctor: "Dr. Johnson", date: "2025-07-10", time: "10:00 AM", status: "Confirmed" },
    { id: 2, patient: "Bob Brown", doctor: "Dr. Adams", date: "2025-07-11", time: "1:00 PM", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Doctor</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockAppointments.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2">{a.patient}</td>
                <td className="px-4 py-2">{a.doctor}</td>
                <td className="px-4 py-2">{a.date}</td>
                <td className="px-4 py-2">{a.time}</td>
                <td className="px-4 py-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
