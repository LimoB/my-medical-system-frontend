// DeleteConfirmationModal.tsx
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
        <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
          <Dialog.Title className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
            🗑️ Confirm Deletion
          </Dialog.Title>

          <Dialog.Description className="text-sm text-gray-600 mb-6">
            Are you sure you want to permanently delete <strong>{name}</strong>'s record? This action cannot be undone.
          </Dialog.Description>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-red-500 to-pink-500 hover:brightness-110 transition"
            >
              Yes, Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
