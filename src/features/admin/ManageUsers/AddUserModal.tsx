import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { createUser } from '@/services/users';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { CreateUserPayload } from '@/types/user';

interface Props {
  formData: CreateUserPayload;
  setFormData: (user: CreateUserPayload) => void;
  closeModal: () => void;
  fetchUsers: () => void;
}

const AddUserModal = ({ formData, setFormData, closeModal, fetchUsers }: Props) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUser(formData);
      toast.success('User created successfully');
      fetchUsers();
      setTimeout(() => closeModal(), 300);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'Failed to create user. Please check your input.';
      toast.error(errorMessage);
      console.error('Create user error:', error?.response?.data || error.message);
    }
  };

  return (
    <AnimatePresence>
      <Dialog open onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 sm:p-8 shadow-2xl"
        >
          <Dialog.Title className="mb-6 text-center text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
            Create New User
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <input
              type="text"
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Contact Phone"
              value={formData.contact_phone || ''}
              onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as CreateUserPayload['role'] })
              }
              required
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={closeModal}
                variant="outline"
                className="!text-red-600 !border-red-600 hover:!bg-red-100 focus:!ring-red-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
              >
                Save
              </Button>
            </div>

          </form>

          <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
};

export default AddUserModal;
