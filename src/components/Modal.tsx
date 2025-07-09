
import type { ReactNode } from 'react';

const Modal = ({ onClose, title, children }: { onClose: () => void; title: string; children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-lg p-6 relative">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
