// src/features/admin/ManageComplaints/Complaints.tsx
import React, { useEffect, useState } from "react";
import ComplaintsTable from "./ComplaintsTable";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import {
  fetchComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "@/services/complaints";
import type { Complaint, ComplaintStatus } from "@/types/complaints";

const Complaints: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchComplaints();
      setComplaints(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleStatusChange = async (id: number, newStatus: ComplaintStatus) => {
    setUpdatingStatus(true);
    try {
      await updateComplaintStatus(id, newStatus);
      setComplaints((prev) =>
        prev.map((c) =>
          c.complaint_id === id
            ? { ...c, status: newStatus, updated_at: new Date().toISOString() }
            : c
        )
      );
      if (selectedComplaint?.complaint_id === id) {
        setSelectedComplaint((prev) => (prev ? { ...prev, status: newStatus } : prev));
      }
    } catch {
      alert("Failed to update complaint status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteComplaint = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    setDeletingId(id);
    try {
      await deleteComplaint(id);
      setComplaints((prev) => prev.filter((c) => c.complaint_id !== id));
      setSelectedComplaint(null);
    } catch {
      alert("Failed to delete complaint.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Complaints</h1>

      <ComplaintsTable
        complaints={complaints}
        onSelect={setSelectedComplaint}
        onDelete={handleDeleteComplaint}
        deletingId={deletingId}
      />

      {selectedComplaint && (
        <ComplaintDetailsModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteComplaint}
          updatingStatus={updatingStatus}
          deletingId={deletingId}
        />
      )}
    </div>
  );
};

export default Complaints;
