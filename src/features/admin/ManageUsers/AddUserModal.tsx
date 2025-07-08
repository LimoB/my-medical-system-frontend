import { Dialog } from '@headlessui/react';
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
      toast.success('✅ User created successfully');
      fetchUsers();
      closeModal();
    } catch (error: any) {
      console.error('Create user error:', error);
      toast.error('❌ Failed to create user');
    }
  };

  return (
    <Dialog open onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black/30 fixed inset-0" aria-hidden="true" />

      <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl z-10 w-full max-w-md">
        <Dialog.Title className="text-xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
          Create New User
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.first_name || ''}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.last_name || ''}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password || ''}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Contact Phone"
            value={formData.contact_phone || ''}
            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address || ''}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            value={formData.role || 'user'}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value as CreateUserPayload['role'] })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>
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
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddUserModal;
