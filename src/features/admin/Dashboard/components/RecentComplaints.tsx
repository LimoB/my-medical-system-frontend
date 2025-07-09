const complaints = [
  {
    patient: 'Laura',
    issue: 'Appointment was rescheduled without notice',
    status: 'Open',
  },
  {
    patient: 'Mike',
    issue: 'Doctor was late',
    status: 'In Progress',
  },
];

export default function RecentComplaints() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
      <ul className="space-y-4">
        {complaints.map((c, i) => (
          <li
            key={i}
            className="border border-gray-100 rounded-xl p-4 hover:shadow transition space-y-1"
          >
            <div className="text-sm font-medium text-gray-800">{c.patient}</div>
            <p className="text-sm text-gray-600">{c.issue}</p>
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                c.status === 'Open'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {c.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
