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
    <div className="bg-white p-5 rounded-2xl shadow-lg w-full h-full transition-all hover:shadow-xl">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Prescription</h2>

      <div className="bg-gray-50 p-5 rounded-xl space-y-4 shadow-inner">
        {/* 👤 Patient Name */}
        <div>
          <p className="text-sm text-gray-500">Patient</p>
          <p className="text-base font-medium text-gray-800">{patientName}</p>
        </div>

        {/* 📝 Notes */}
        <div>
          <p className="text-sm text-gray-500">Notes</p>
          <p className="text-sm text-gray-700">
            {prescription.notes || <span className="italic text-gray-400">No notes provided</span>}
          </p>
        </div>

        {/* 🖼️ Image */}
        <div>
          <p className="text-sm text-gray-500">Image</p>
          {prescription.image_url ? (
            <img
              src={prescription.image_url}
              alt="Prescription"
              className="w-full h-40 object-cover rounded-lg border border-gray-300"
            />
          ) : (
            <p className="text-sm italic text-gray-400">No image available</p>
          )}
        </div>
      </div>

      {/* 🛠️ Actions */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onEdit}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 transition shadow-md"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          onClick={onDelete}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition shadow-md"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionCard;
