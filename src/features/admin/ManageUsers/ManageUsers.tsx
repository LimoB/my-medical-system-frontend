import { useState } from 'react';
import { Loader } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@/components/ui/button';
import { useUsers } from './useUsers';
import UserTable from './UserTable';
import AddUserModal from './AddUserModal';
import type { CreateUserPayload } from '@/types/user';

const ManageUsers = () => {
  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    currentUsers,
    handleRoleChange,
    handleDelete,
    fetchUsers,
  } = useUsers();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<CreateUserPayload>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user',
    contact_phone: '',
    address: '',
  });

  const openModal = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'user',
      contact_phone: '',
      address: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'user',
      contact_phone: '',
      address: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white text-gray-800">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnHover />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Manage Users</h1>
          <Button
            onClick={openModal}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all px-4 py-2 text-sm font-semibold rounded-md shadow"
          >
            + Add User
          </Button>
        </div>

        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
          />
        </div>

        {/* Status messages */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-blue-600 py-12">
            <Loader className="animate-spin" size={22} />
            <span className="text-sm font-medium">Loading users...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium text-sm">{error}</p>
          </div>
        ) : currentUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No users found.</p>
          </div>
        ) : (
          <UserTable
            users={currentUsers}
            onRoleChange={handleRoleChange}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* Modal */}
        {showModal && (
          <AddUserModal
            formData={formData}
            setFormData={setFormData}
            closeModal={closeModal}
            fetchUsers={fetchUsers}
          />
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
