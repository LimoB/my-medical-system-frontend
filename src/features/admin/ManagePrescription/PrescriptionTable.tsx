import React from 'react';
import { Button } from '@/components/ui/button';
import type { Prescription } from '@/types/prescription';

interface PrescriptionTableProps {
  prescriptions: Prescription[];
  patients: Record<number, string>;
  doctors: Record<number, string>;
  onEdit: (prescription: Prescription) => void;
  onDelete: (prescription: Prescription) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PrescriptionTable: React.FC<PrescriptionTableProps> = ({
  prescriptions,
  patients,
  doctors,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-100 to-blue-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Patient Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Prescription Details
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Doctor
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Notes
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Image URL
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {prescriptions.map((prescription) => (
            <tr
              key={prescription.prescription_id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {patients[prescription.patient_id] || 'Loading...'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {prescription.notes || 'No details available'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {doctors[prescription.doctor_id] || 'Loading...'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {prescription.notes || 'No notes available'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {prescription.image_url ? (
                  <a
                    href={prescription.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    View Image
                  </a>
                ) : (
                  'No image available'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => onEdit(prescription)}
                    className="text-yellow-600 border border-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 px-3 py-1 text-sm rounded-md transition"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDelete(prescription)}  // ✅ fixed
                    className="text-red-600 border border-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 px-3 py-1 text-sm rounded-md transition"
                  >
                    Delete
                  </Button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-end items-center px-6 py-4 border-t bg-gray-50 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={`page-${page}`}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-300 ${page === currentPage
                  ? 'bg-gradient-to-r from-green-500 to-sky-500 text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50'
                }`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionTable;
