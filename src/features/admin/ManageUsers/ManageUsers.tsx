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
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-white text-gray-800">
      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnHover />

      <main className="flex-1 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-900">Manage Users</h1>
          <Button
            onClick={openModal}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600"
          >
            + Add User
          </Button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-3 py-2 border rounded w-full max-w-md shadow-sm bg-white border-gray-300 text-gray-800"
        />

        {/* Status Messages */}
        {loading ? (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader className="animate-spin" size={20} />
            Loading users...
          </div>
        ) : error ? (
          <p className="text-red-600 font-medium">{error}</p>
        ) : currentUsers.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
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

        {/* Add User Modal */}
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
