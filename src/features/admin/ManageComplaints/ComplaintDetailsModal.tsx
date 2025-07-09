// src/features/admin/ManageComplaints/ComplaintDetailsModal.tsx
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="complaint-details-title"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 mx-4 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="complaint-details-title"
          className="text-2xl font-semibold mb-5 text-gray-900"
        >
          Complaint Details
        </h2>

        <div className="space-y-3 text-gray-800 text-sm sm:text-base">
          <p>
            <strong className="font-medium text-gray-700">ID:</strong> {complaint.complaint_id}
          </p>
          <p>
            <strong className="font-medium text-gray-700">User:</strong>{" "}
            {complaint.user
              ? `${complaint.user.first_name} ${complaint.user.last_name} (${complaint.user.email})`
              : "Unknown"}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Appointment:</strong>{" "}
            {complaint.appointment
              ? `#${complaint.appointment.appointment_id} on ${new Date(
                  complaint.appointment.date
                ).toLocaleDateString()} at ${complaint.appointment.time}`
              : "None"}
          </p>
          <p>
            <strong className="font-medium text-gray-700">Subject:</strong> {complaint.subject}
          </p>
          <p className="whitespace-pre-wrap">
            <strong className="font-medium text-gray-700">Description:</strong>{" "}
            {complaint.description}
          </p>
        </div>

        <label className="block mt-6">
          <span className="font-semibold text-gray-700 mb-1 block">Status:</span>
          <select
            value={complaint.status}
            onChange={(e) => onStatusChange(complaint.complaint_id, e.target.value as ComplaintStatus)}
            disabled={updatingStatus}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition"
          >
            {["Open", "In Progress", "Resolved", "Closed"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition disabled:opacity-50"
            onClick={() => onDelete(complaint.complaint_id)}
            disabled={deletingId === complaint.complaint_id}
            type="button"
          >
            {deletingId === complaint.complaint_id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
