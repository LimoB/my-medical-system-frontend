import React, { useEffect, useRef } from 'react';
import type { PrescriptionUpdatePayload } from '@/types/prescription';
import { X } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && selectedPrescription) {
      setNewPrescription({
        notes: selectedPrescription.notes || '',
        image_url: selectedPrescription.image_url || '',
      });
    }
  }, [isEditing, selectedPrescription, setNewPrescription]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setNewPrescription((prev) => ({
          ...prev,
          image_url: result,
        }));
      } else {
        console.warn('FileReader returned a non-string result');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-transparent bg-clip-text">
          {isEditing ? 'Update Prescription' : 'Create Prescription'}
        </h2>

        {/* Notes */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={newPrescription.notes}
          onChange={(e) =>
            setNewPrescription((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="e.g. Take one tablet after meals"
          rows={3}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-teal-500 focus:border-teal-500"
        />

        {/* Image upload */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Image (optional)</label>
        <div className="flex items-center gap-3 mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-teal-400 file:text-white hover:file:brightness-110"
          />
        </div>

        {newPrescription.image_url && (
          <img
            src={newPrescription.image_url}
            alt="Preview"
            className="w-28 h-28 object-cover rounded mb-4 border"
          />
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onUpdate}
            className="px-4 py-2 rounded text-white font-medium bg-gradient-to-r from-teal-600 to-emerald-500 hover:brightness-110 transition"
          >
            {isEditing ? 'Update Prescription' : 'Create Prescription'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
