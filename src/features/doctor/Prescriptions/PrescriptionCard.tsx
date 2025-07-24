import React from 'react';
import { Button } from '@/components/ui/button';
import type { Prescription } from '@/types/prescription';
import { Pencil, Trash2 } from 'lucide-react';

interface PrescriptionCardProps {
  prescription: Prescription;
  patientName: string;
  onEdit: () => void;
  onDelete: () => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  patientName,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between h-full">
      <div className="space-y-2">
        {/* 👤 Patient Name */}
        <h2 className="text-lg font-semibold text-gray-800">{patientName}</h2>

        {/* 📝 Notes */}
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Notes:</span>{' '}
          {prescription.notes || 'No notes provided'}
        </p>

        {/* 🖼️ Image */}
        {prescription.image_url ? (
          <div className="mt-2">
            <img
              src={prescription.image_url}
              alt="Prescription"
              className="w-full h-40 object-cover rounded-lg border border-gray-300"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic mt-2">No image available</p>
        )}
      </div>

      {/* 🛠️ Actions */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
        <Button
          onClick={onEdit}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
        <Button
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionCard;
