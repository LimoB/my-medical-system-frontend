// src/features/admin/Payments.tsx
export default function Payments() {
  const payments = [
    { id: 1, user: "Alice", amount: 150, method: "Credit Card", date: "2025-07-07" },
    { id: 2, user: "Bob", amount: 200, method: "PayPal", date: "2025-07-06" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Method</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.user}</td>
                <td className="px-4 py-2">${p.amount}</td>
                <td className="px-4 py-2">{p.method}</td>
                <td className="px-4 py-2">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
