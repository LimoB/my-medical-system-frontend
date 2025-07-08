// src/features/admin/Doctors.tsx
export default function Doctors() {
  const doctors = [
    { id: 1, name: "Dr. Emily Carter", specialty: "Cardiology", email: "emily@clinic.com" },
    { id: 2, name: "Dr. Raj Kumar", specialty: "Neurology", email: "raj@clinic.com" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Specialty</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-t">
                <td className="px-4 py-2">{doc.name}</td>
                <td className="px-4 py-2">{doc.specialty}</td>
                <td className="px-4 py-2">{doc.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
