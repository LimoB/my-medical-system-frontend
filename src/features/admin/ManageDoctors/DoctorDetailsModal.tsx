// ManageDoctors/DoctorDetailsModal.tsx
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import type { SanitizedDoctor } from '@/types/doctor';

interface Props {
  doctor: SanitizedDoctor;
  onClose: () => void;
}

const DoctorDetailsModal = ({ doctor, onClose }: Props) => {
  return (
    <Dialog open onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal Panel */}
      <Dialog.Panel className="relative z-10 bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <Dialog.Title className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
          Doctor Details
        </Dialog.Title>

        <div className="space-y-2 text-sm text-gray-800">
          <p>
            <strong>Name:</strong> {doctor.user?.first_name} {doctor.user?.last_name}
          </p>
          <p>
            <strong>Email:</strong> {doctor.user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {doctor.user?.contact_phone || '—'}
          </p>
          <p>
            <strong>Specialization:</strong> {doctor.specialization || '—'}
          </p>
          <p>
            <strong>Available Days:</strong> {doctor.available_days || '—'}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="text-green-600 border border-green-500 hover:bg-black hover:text-white hover:border-black transition-colors px-4 py-2 text-sm rounded-md"
          >
            Close
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DoctorDetailsModal;
