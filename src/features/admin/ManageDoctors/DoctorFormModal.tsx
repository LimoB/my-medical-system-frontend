// File: ManageDoctors/DoctorFormModal.tsx

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
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
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent"
                >
                  {initialData ? 'Edit Doctor' : 'Add Doctor'}
                </Dialog.Title>

                <DoctorForm
                  initialData={initialData}
                  onSubmit={onSubmit}
                  onCancel={onClose}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DoctorFormModal;
