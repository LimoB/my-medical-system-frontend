// ManageDoctors/DoctorFormModal.tsx
import { Dialog } from '@headlessui/react';
import DoctorForm from './DoctorForm';
import type { SanitizedDoctor, DoctorCreatePayload } from '@/types/doctor';

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: SanitizedDoctor;
  onSubmit: (payload: DoctorCreatePayload) => void;
}

const DoctorFormModal = ({ open, onClose, initialData, onSubmit }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <Dialog.Panel className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <Dialog.Title className="text-xl font-semibold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
          {initialData ? 'Edit Doctor' : 'Add Doctor'}
        </Dialog.Title>
        <DoctorForm initialData={initialData} onSubmit={onSubmit} onCancel={onClose} />
      </Dialog.Panel>
    </Dialog>
  );
};

export default DoctorFormModal;
