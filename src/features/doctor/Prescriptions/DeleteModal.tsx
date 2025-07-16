import React from 'react';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Delete Prescription</h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete this prescription?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white p-2 rounded w-28"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black p-2 rounded w-28"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
