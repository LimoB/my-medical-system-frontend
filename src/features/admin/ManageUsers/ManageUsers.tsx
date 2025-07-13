import { useState } from 'react';
import { Loader } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@/components/ui/button';
import { useUsers } from './useUsers';
import UserTable from './UserTable';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import type { CreateUserPayload, User } from '@/types/user';
import { updateUser } from '@/services/users';

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<CreateUserPayload>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user',
    contact_phone: '',
    address: '',
  });

  const openAddModal = () => {
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

  const closeAddModal = () => {
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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleSaveEditedUser = async (updatedUser: Partial<User>) => {
    try {
      console.log('📝 Saving edited user:', updatedUser);

      if (!updatedUser.user_id) throw new Error('User ID missing for update');

      const payload = {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        contact_phone: updatedUser.contact_phone,
        address: updatedUser.address,
        image_url: updatedUser.image_url, // ✅ include image
        role: updatedUser.role,
        is_verified: updatedUser.is_verified,
      };

      await updateUser(updatedUser.user_id.toString(), payload);
      setEditModalOpen(false);
      setSelectedUser(null);
      fetchUsers(); // 🔄 Refresh list
    } catch (err) {
      console.error('❌ Failed to update user:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white text-gray-800">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnHover />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Manage Users</h1>
          <Button
            onClick={openAddModal}
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
            onEdit={handleEdit} // ✅ Edit button triggers modal
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
            closeModal={closeAddModal}
            fetchUsers={fetchUsers}
          />
        )}

        {/* Edit User Modal */}
        <EditUserModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={selectedUser}
          onSave={handleSaveEditedUser}
        />
      </main>
    </div>
  );
};

export default ManageUsers;
