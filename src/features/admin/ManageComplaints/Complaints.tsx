// src/features/admin/Complaints.tsx
export default function Complaints() {
  const complaints = [
    { id: 1, user: "Alice", message: "Delay in appointment confirmation.", status: "Pending" },
    { id: 2, user: "Bob", message: "Payment not reflected.", status: "Resolved" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.user}</td>
                <td className="px-4 py-2">{c.message}</td>
                <td className="px-4 py-2">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
