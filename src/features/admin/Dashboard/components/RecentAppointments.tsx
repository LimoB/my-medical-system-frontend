// File: src/features/admin/Dashboard/components/RecentAppointments.tsx

import { useDashboardData } from '@/features/admin/hooks/useDashboardData';

export default function RecentAppointments() {
  const { appointments, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-gray-500">Loading appointments...</p>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-gray-500">No recent appointments found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
      <ul className="space-y-4">
        {appointments.map((a, i) => (
          <li
            key={i}
            className="border border-gray-100 rounded-xl p-4 hover:shadow transition space-y-1"
          >
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-800">{a.patient}</span>
              <span className="text-gray-500">{a.date} – {a.time}</span>
            </div>
            <div className="text-sm text-gray-600">Doctor: {a.doctor}</div>
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                a.status === 'Confirmed'
                  ? 'bg-green-100 text-green-700'
                  : a.status === 'Cancelled'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {a.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
