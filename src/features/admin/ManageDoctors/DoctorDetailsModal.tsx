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
    <Dialog
      open
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-labelledby="doctor-details-title"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal Panel */}
      <Dialog.Panel className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <Dialog.Title
          id="doctor-details-title"
          className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent"
        >
          Doctor Details
        </Dialog.Title>

        <Dialog.Description className="sr-only">
          Detailed information about the selected doctor.
        </Dialog.Description>

        <div className="space-y-3 text-sm text-gray-800 leading-relaxed">
          <Detail label="Name" value={`${doctor.user?.first_name ?? '—'} ${doctor.user?.last_name ?? ''}`} />
          <Detail label="Email" value={doctor.user?.email ?? '—'} />
          <Detail label="Phone" value={doctor.user?.contact_phone ?? '—'} />
          <Detail label="Specialization" value={doctor.specialization ?? '—'} />
          <Detail label="Available Days" value={doctor.available_days ?? '—'} />
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

// Reusable Detail row component
const Detail = ({ label, value }: { label: string; value: string }) => (
  <p>
    <span className="font-medium">{label}:</span> {value}
  </p>
);

export default DoctorDetailsModal;
