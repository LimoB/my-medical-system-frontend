// src/features/admin/ManageComplaints/ComplaintsTable.tsx
import React from "react";
import type { Complaint } from "@/types/complaints";

interface ComplaintsTableProps {
  complaints: Complaint[];
  onSelect: (complaint: Complaint) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
  complaints,
  onSelect,
  onDelete,
  deletingId,
}) => {
  if (complaints.length === 0) return <p>No complaints found.</p>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-green-100 to-blue-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {complaints.map((complaint) => (
            <tr
              key={complaint.complaint_id}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelect(complaint)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {complaint.complaint_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {complaint.user
                  ? `${complaint.user.first_name} ${complaint.user.last_name}`
                  : "Unknown User"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {complaint.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {complaint.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(complaint.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  className="text-red-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(complaint.complaint_id);
                  }}
                  disabled={deletingId === complaint.complaint_id}
                >
                  {deletingId === complaint.complaint_id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
