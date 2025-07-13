import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  getDoctors,
  createDoctor,
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


  const handleSubmit = async (payload: DoctorCreatePayload) => {
    const formattedPayload: DoctorCreatePayload = {
      ...payload,
      payment_per_hour:
        typeof payload.payment_per_hour === 'string'
          ? parseFloat(payload.payment_per_hour)
          : payload.payment_per_hour,
    };

    console.log('📤 Submitting payload:', formattedPayload);

    try {
      if (!editingDoctor?.doctor_id) {
        console.log('🆕 Creating new doctor...');
        await createDoctor(formattedPayload);
        toast.success('Doctor created successfully');
      } else {
        console.log('✏️ Updating doctor ID:', editingDoctor.doctor_id);
        await updateDoctor(editingDoctor.doctor_id, formattedPayload);
        toast.success('Doctor updated successfully');
      }

      setShowForm(false);
      setEditingDoctor(null);
      await fetchDoctors();
    } catch (error: any) {
      console.error('❌ Failed to save doctor:', error);
      if (error.response) {
        console.error('📥 Server response data:', error.response.data);
      }
      toast.error('Failed to save doctor');
    }
  };


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

      {viewingDoctor && (
        <DoctorDetailsModal
          doctor={viewingDoctor}
          onClose={() => setViewingDoctor(null)}
        />
      )}

      {showForm && editingDoctor && (
        <Modal
          title={editingDoctor.doctor_id ? 'Edit Doctor' : 'Add Doctor Info'}
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
      )}
    </div>
  );
};

export default Doctors;
