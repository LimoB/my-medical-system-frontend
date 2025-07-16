import React, { useEffect } from 'react';
import type { PrescriptionUpdatePayload } from '@/types/prescription';

interface PrescriptionModalProps {
  isEditing: boolean;
  selectedPrescription: any;
  newPrescription: PrescriptionUpdatePayload;
  setNewPrescription: React.Dispatch<React.SetStateAction<PrescriptionUpdatePayload>>;
  onUpdate: () => void;
  onCancel: () => void;
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isEditing,
  selectedPrescription,
  newPrescription,
  setNewPrescription,
  onUpdate,
  onCancel
}) => {
  // When the modal is opened and editing an existing prescription,
  // use the selectedPrescription to populate the fields.
  useEffect(() => {
    if (isEditing && selectedPrescription) {
      setNewPrescription({
        notes: selectedPrescription.notes || '',
        image_url: selectedPrescription.image_url || '',
      });
    }
  }, [isEditing, selectedPrescription, setNewPrescription]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {isEditing ? 'Update Prescription' : 'Create Prescription'}
        </h2>

        <textarea
          placeholder="Notes"
          value={newPrescription.notes}
          onChange={(e) => setNewPrescription({ ...newPrescription, notes: e.target.value })}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPrescription.image_url}
          onChange={(e) => setNewPrescription({ ...newPrescription, image_url: e.target.value })}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isEditing ? 'Update Prescription' : 'Create Prescription'}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black p-2 rounded w-full mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PrescriptionModal;
