import React from "react";
import type { Complaint, ComplaintStatus } from "@/types/complaints";

interface ComplaintDetailsModalProps {
  complaint: Complaint;
  onClose: () => void;
  onStatusChange: (id: number, status: ComplaintStatus) => void;
  onDelete: (id: number) => void;
  updatingStatus: boolean;
  deletingId: number | null;
}

const ComplaintDetailsModal: React.FC<ComplaintDetailsModalProps> = ({
  complaint,
  onClose,
  onStatusChange,
  onDelete,
  updatingStatus,
  deletingId,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="complaint-details-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 sm:mx-0 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="complaint-details-title"
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
        >
          📝 Complaint Details
        </h2>

        <div className="space-y-4 text-gray-700 text-sm md:text-base">
          <p>
            <span className="font-semibold text-gray-600">ID:</span>{' '}
            {complaint.complaint_id}
          </p>
          <p>
            <span className="font-semibold text-gray-600">User:</span>{' '}
            {complaint.user
              ? `${complaint.user.first_name} ${complaint.user.last_name} (${complaint.user.email})`
              : 'Unknown'}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Appointment:</span>{' '}
            {complaint.appointment
              ? `#${complaint.appointment.appointment_id} on ${new Date(
                  complaint.appointment.date
                ).toLocaleDateString()} at ${complaint.appointment.time}`
              : 'None'}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Subject:</span>{' '}
            {complaint.subject}
          </p>
          <p className="whitespace-pre-wrap">
            <span className="font-semibold text-gray-600">Description:</span>{' '}
            {complaint.description}
          </p>
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-semibold text-gray-700">Update Status</label>
          <select
            value={complaint.status}
            onChange={(e) =>
              onStatusChange(complaint.complaint_id, e.target.value as ComplaintStatus)
            }
            disabled={updatingStatus}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {['Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            Close
          </button>
          <button
            onClick={() => onDelete(complaint.complaint_id)}
            type="button"
            disabled={deletingId === complaint.complaint_id}
            className={`px-4 py-2 rounded-lg bg-red-600 text-white transition ${
              deletingId === complaint.complaint_id
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-red-700'
            }`}
          >
            {deletingId === complaint.complaint_id ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
