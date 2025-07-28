import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  doctorName?: string;
};

const LoginPromptModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Login Required',
  message = 'You need to log in to book an appointment.',
  confirmText = 'Login',
  cancelText = 'Cancel',
  doctorName,
}: Props) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const handleClose = () => {
    // Delay actual close for smooth transition
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match the leave transition duration
  };

  const displayMessage = doctorName
    ? `To book an appointment with Dr. ${doctorName}, please log in first.`
    : message;

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gradient-to-br from-teal-200/30 via-white/20 to-teal-300/20 backdrop-blur-sm" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-10 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-10 scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-8 sm:p-10 text-left align-middle shadow-2xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-teal-600 text-white p-3 rounded-full shadow-md">
                  <LogIn className="w-7 h-7" />
                </div>
                <Dialog.Title as="h3" className="text-2xl font-bold text-gray-800">
                  {title}
                </Dialog.Title>
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {displayMessage}
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-semibold bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                  {confirmText}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginPromptModal;
