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
  onCancel,
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in space-y-6">
        {/* ❌ Close */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 📝 Title */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-transparent bg-clip-text">
          {isEditing ? 'Update Prescription' : 'Create Prescription'}
        </h2>

        {/* ✍️ Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={newPrescription.notes}
            onChange={(e) =>
              setNewPrescription((prev) => ({ ...prev, notes: e.target.value }))
            }
            rows={3}
            placeholder="e.g. Take one tablet after meals"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* 📁 Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image (optional)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gradient-to-r file:from-blue-500 file:to-teal-400
              file:text-white hover:file:brightness-110"
          />
        </div>

        {/* 🖼️ Image Preview */}
        {newPrescription.image_url && (
          <img
            src={newPrescription.image_url}
            alt="Preview"
            className="w-28 h-28 object-cover rounded-lg border border-gray-300"
          />
        )}

        {/* 🔘 Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={onUpdate}
            className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold hover:brightness-110 transition"
          >
            {isEditing ? 'Update Prescription' : 'Create Prescription'}
          </button>
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
