//DeleteConfirmationModal.tsx
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold text-red-600 mb-2">
            Confirm Deletion
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-700 mb-4">
            Are you sure you want to delete <strong>{name}</strong>'s record? This action cannot be undone.
          </Dialog.Description>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
