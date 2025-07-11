import { useDashboardData } from '@/features/admin/hooks/useDashboardData';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function RecentComplaints() {
  const { complaints, loading } = useDashboardData();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-gray-500">Loading complaints...</p>
      </div>
    );
  }

  if (!complaints.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Complaints</h2>
        </div>
        <p className="text-gray-500">No recent complaints found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Complaints</h2>
        <button
          onClick={() => navigate('/admin/manage-complaints')}
          className="text-sm text-teal-600 hover:underline"
        >
          View all
        </button>
      </div>

      <ul className="space-y-4">
        {complaints.map((complaint, index) => {
          const timeAgo = complaint.created_at
            ? formatDistanceToNow(new Date(complaint.created_at), { addSuffix: true })
            : 'Unknown time';

          const statusColor =
            complaint.status === 'Resolved'
              ? 'bg-green-100 text-green-700'
              : complaint.status === 'Open'
              ? 'bg-red-100 text-red-700'
              : 'bg-orange-100 text-orange-700';

          return (
            <li
              key={index}
              className="border border-gray-100 rounded-xl p-4 hover:shadow transition space-y-1"
            >
              <div className="flex justify-between text-sm font-medium text-gray-800">
                <span>{complaint.patient}</span>
                <span className="text-xs text-gray-500">{timeAgo}</span>
              </div>

              <p className="text-sm text-gray-600">{complaint.issue}</p>

              <div className="flex justify-between items-center">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${statusColor}`}
                >
                  {complaint.status}
                </span>

                {complaint.assigned_to && (
                  <span className="text-xs text-gray-500 italic">
                    Assigned to: {complaint.assigned_to}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
