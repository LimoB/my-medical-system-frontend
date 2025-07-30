import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  fetchDoctors,
  deleteDoctor,
  updateDoctor,
} from '@/features/slices/doctorsSlice';

import type { AppDispatch, RootState } from '@/store/store';
import type { DoctorCreatePayload, SanitizedDoctor } from '@/types/doctor';

import DoctorTable from './DoctorTable';
import DoctorForm from '@/components/DoctorForm';
import DoctorDetailsModal from './DoctorDetailsModal';
import Modal from '@/components/Modal';

const Doctors = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    doctors,
    loading,
    error,
  } = useSelector((state: RootState) => state.doctors);

  const [viewingDoctor, setViewingDoctor] = useState<SanitizedDoctor | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<SanitizedDoctor | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (payload: DoctorCreatePayload) => {
    const formattedPayload: DoctorCreatePayload = {
      ...payload,
      payment_per_hour:
        typeof payload.payment_per_hour === 'string'
          ? parseFloat(payload.payment_per_hour)
          : payload.payment_per_hour,
    };

    try {
      if (editingDoctor?.doctor_id) {
        await dispatch(updateDoctor({ id: editingDoctor.doctor_id, data: formattedPayload })).unwrap();
        toast.success('Doctor updated successfully');
      } else {
        toast.warn('Doctor creation is not handled via Redux yet.');
        // You can add `createDoctor` thunk in your slice and dispatch it here if needed.
      }

      setShowForm(false);
      setEditingDoctor(null);
    } catch (err) {
      console.error('❌ Failed to save doctor:', err);
      toast.error('Failed to save doctor');
    }
  };

  const handleDelete = async (doctorId: number) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await dispatch(deleteDoctor(doctorId)).unwrap();
      toast.success('Doctor deleted');
    } catch (err) {
      console.error('❌ Delete failed:', err);
      toast.error('Failed to delete doctor');
    }
  };

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
