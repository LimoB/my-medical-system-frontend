import { useState, useEffect } from 'react';
import { fetchPrescriptions, updatePrescription, deletePrescription } from '@/services/prescription';
import { fetchUserById } from '@/services/users'; // Fetch Patient Details
import { getDoctorById } from '@/services/doctors'; // Fetch Doctor Details
import type { Prescription, PrescriptionUpdatePayload } from '@/types/prescription';
import PrescriptionTable from './PrescriptionTable';
import PrescriptionModal from './PrescriptionModal';
import DeleteModal from './DeleteModal';

// Prescriptions Component
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

  // Storing patient and doctor data
  const [patients, setPatients] = useState<Record<number, string>>({});
  const [doctors, setDoctors] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchAllPrescriptions = async () => {
      setLoading(true);
      try {
        const data = await fetchPrescriptions();
        
        // Fetch user details (doctor and patient) for each prescription
        const patientIds = [...new Set(data.map((p) => p.patient_id))];
        const doctorIds = [...new Set(data.map((p) => p.doctor_id))];

        const patientPromises = patientIds.map((id) => fetchUserById(id));
        const doctorPromises = doctorIds.map((id) => getDoctorById(id));

        // Wait for all fetches to resolve
        const [patientsData, doctorsData] = await Promise.all([
          Promise.all(patientPromises),
          Promise.all(doctorPromises),
        ]);

        // Create name mapping
        const patientNameMap = patientsData.reduce((acc, patient) => {
          acc[patient.user_id] = `${patient.first_name} ${patient.last_name}`;
          return acc;
        }, {} as Record<number, string>);

        const doctorNameMap = doctorsData.reduce((acc, doctor) => {
          acc[doctor.doctor_id] = `${doctor.user.first_name} ${doctor.user.last_name}`;
          return acc;
        }, {} as Record<number, string>);

        setPatients(patientNameMap);
        setDoctors(doctorNameMap);

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
      const updatedPrescription = await updatePrescription(selectedPrescription.prescription_id, {
        ...newPrescription,
      });
      setPrescriptions((prev) =>
        prev.map((prescription) =>
          prescription.prescription_id === updatedPrescription.prescription_id ? updatedPrescription : prescription
        )
      );
      setSelectedPrescription(null);
      setIsEditing(false);
      setNewPrescription({
        notes: '',
        image_url: '',
      });
    } catch (err) {
      console.error('Error updating prescription:', err);
    }
  };

  const handleDeletePrescription = async () => {
    if (prescriptionToDelete) {
      try {
        await deletePrescription(prescriptionToDelete.prescription_id);
        setPrescriptions((prev) => prev.filter((prescription) => prescription.prescription_id !== prescriptionToDelete.prescription_id));
        setIsDeleteModalOpen(false); // Close modal after deletion
      } catch (err) {
        console.error('Error deleting prescription:', err);
      }
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

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Prescriptions</h1>

      <PrescriptionTable
        prescriptions={prescriptions}
        loading={loading}
        patients={patients}
        doctors={doctors}
        onEdit={handleSelectPrescription}
        onDelete={handleOpenDeleteModal}
      />

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
