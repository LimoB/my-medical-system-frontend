// File: Doctors.tsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  getDoctors,
  updateDoctor,
  deleteDoctor,
} from '@/services/doctors';

import type { SanitizedDoctor, DoctorCreatePayload } from '@/types/doctor';

import DoctorTable from './DoctorTable';
import DoctorForm from './DoctorForm';
import DoctorDetailsModal from './DoctorDetailsModal';
import Modal from '@/components/Modal';

const Doctors = () => {
  const [doctors, setDoctors] = useState<SanitizedDoctor[]>([]);
  const [viewingDoctor, setViewingDoctor] = useState<SanitizedDoctor | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<SanitizedDoctor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('❌ Failed to load doctors:', error);
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  // Update doctor only
  const handleSubmit = async (payload: DoctorCreatePayload) => {
    if (
      editingDoctor?.doctor_id === undefined ||
      editingDoctor?.doctor_id === null ||
      !editingDoctor.user?.user_id
    ) {
      toast.error('Invalid doctor selected for update.');
      console.warn('🚨 Missing or invalid doctor_id/user:', editingDoctor);
      return;
    }

    try {
      await updateDoctor(editingDoctor.doctor_id, payload);
      toast.success('Doctor updated successfully');
      setShowForm(false);
      setEditingDoctor(null);
      await fetchDoctors();
    } catch (error) {
      console.error('❌ Update failed:', error);
      toast.error('Failed to update doctor');
    }
  };


  // Delete doctor
  const handleDelete = async (doctorId: number) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await deleteDoctor(doctorId);
      toast.success('Doctor deleted');
      await fetchDoctors();
    } catch (error) {
      console.error('❌ Delete failed:', error);
      toast.error('Failed to delete doctor');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Doctors</h2>

      {loading ? (
        <p className="text-gray-500">Loading doctors...</p>
      ) : (
        <DoctorTable
          doctors={doctors}
          onView={setViewingDoctor}
          onEdit={(doc) => {
            setEditingDoctor(doc);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* 👁️ View Doctor Details */}
      {viewingDoctor && (
        <DoctorDetailsModal
          doctor={viewingDoctor}
          onClose={() => setViewingDoctor(null)}
        />
      )}

      {/* 📝 Edit Doctor Form */}
      {showForm && editingDoctor ? (
        <Modal
          title="Edit Doctor"
          onClose={() => {
            setShowForm(false);
            setEditingDoctor(null);
          }}
        >
          <DoctorForm
            initialData={editingDoctor}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingDoctor(null);
            }}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default Doctors;
