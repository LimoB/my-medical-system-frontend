import { useState, useEffect, useMemo } from 'react';
import {
  fetchPrescriptions,
  updatePrescription,
  deletePrescription,
} from '@/services/prescription';
import { fetchUserById } from '@/services/users';
import type { Prescription, PrescriptionUpdatePayload } from '@/types/prescription';
import PrescriptionModal from './PrescriptionModal';
import DeleteModal from './DeleteModal';
import PrescriptionCard from './PrescriptionCard';

const ITEMS_PER_PAGE = 6;

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [newPrescription, setNewPrescription] = useState<PrescriptionUpdatePayload>({
    notes: '',
    image_url: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState<Prescription | null>(null);

  const [patients, setPatients] = useState<Record<number, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAllPrescriptions = async () => {
      setLoading(true);
      try {
        const data = await fetchPrescriptions();
        const patientIds = [...new Set(data.map((p) => p.patient_id))];
        const patientPromises = patientIds.map((id) => fetchUserById(id));
        const patientsData = await Promise.all(patientPromises);

        const patientNameMap = patientsData.reduce((acc, patient) => {
          acc[patient.user_id] = `${patient.first_name} ${patient.last_name}`;
          return acc;
        }, {} as Record<number, string>);

        setPatients(patientNameMap);
        setPrescriptions(data);
      } catch (err) {
        console.error('Failed to fetch prescriptions', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPrescriptions();
  }, []);

  const handleUpdatePrescription = async () => {
    if (!selectedPrescription) return;
    try {
      const updated = await updatePrescription(selectedPrescription.prescription_id, {
        ...newPrescription,
      });

      setPrescriptions((prev) =>
        prev.map((p) =>
          p.prescription_id === updated.prescription_id ? updated : p
        )
      );

      setSelectedPrescription(null);
      setIsEditing(false);
      setNewPrescription({ notes: '', image_url: '' });
    } catch (err) {
      console.error('Error updating prescription:', err);
    }
  };

  const handleDeletePrescription = async () => {
    if (!prescriptionToDelete) return;
    try {
      await deletePrescription(prescriptionToDelete.prescription_id);
      setPrescriptions((prev) =>
        prev.filter((p) => p.prescription_id !== prescriptionToDelete.prescription_id)
      );
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting prescription:', err);
    }
  };

  const handleSelectPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setNewPrescription({
      notes: prescription.notes || '',
      image_url: prescription.image_url || '',
    });
    setIsEditing(true);
  };

  const handleOpenDeleteModal = (prescription: Prescription) => {
    setPrescriptionToDelete(prescription);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPrescriptionToDelete(null);
  };

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return prescriptions.slice(start, start + ITEMS_PER_PAGE);
  }, [prescriptions, currentPage]);

  const totalPages = Math.ceil(prescriptions.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Prescriptions</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading prescriptions...</div>
      ) : prescriptions.length === 0 ? (
        <div className="text-center text-gray-500">No prescriptions found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((prescription) => (
              <PrescriptionCard
                key={prescription.prescription_id}
                prescription={prescription}
                patientName={patients[prescription.patient_id] || 'Unknown'}
                onEdit={() => handleSelectPrescription(prescription)}
                onDelete={() => handleOpenDeleteModal(prescription)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md font-medium ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && selectedPrescription && (
        <PrescriptionModal
          isEditing={isEditing}
          selectedPrescription={selectedPrescription}
          newPrescription={newPrescription}
          setNewPrescription={setNewPrescription}
          onUpdate={handleUpdatePrescription}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {isDeleteModalOpen && prescriptionToDelete && (
        <DeleteModal
          onConfirm={handleDeletePrescription}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </div>
  );
};

export default Prescriptions;
