import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@/components/ui/button';
import UserTable from './UserTable';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import type { CreateUserPayload, User, UserRole } from '@/types/user';

import { fetchUsers } from '@/features/slices/usersSlice';
import { deleteUser, fetchUserById, updateUser } from '@/services/users';
import type { RootState, AppDispatch } from '@/store/store';

const USERS_PER_PAGE = 5;

const ManageUsers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

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
      if (!updatedUser.user_id) throw new Error('User ID missing for update');

      const payload = {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        contact_phone: updatedUser.contact_phone,
        address: updatedUser.address,
        image_url: updatedUser.image_url,
        role: updatedUser.role,
        is_verified: updatedUser.is_verified,
      };

      await updateUser(updatedUser.user_id.toString(), payload);
      setEditModalOpen(false);
      setSelectedUser(null);
      dispatch(fetchUsers()); // ✅ refetch updated list
      toast.success('User updated successfully');
    } catch (err) {
      console.error('❌ Failed to update user:', err);
      toast.error('Failed to update user');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id.toString());
      toast.success('User deleted');
      dispatch(fetchUsers());
    } catch (err) {
      console.error(`❌ Error deleting user ${id}:`, err);
      toast.error('Failed to delete user');
    }
  };

  const handleRoleChange = async (id: number, newRole: UserRole) => {
    try {
      const user = await fetchUserById(id.toString());
      if (!user) throw new Error('User not found');

      await updateUser(id.toString(), {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        contact_phone: user.contact_phone || '',
        address: user.address || '',
        image_url: user.image_url || '',
        is_verified: user.is_verified ?? true,
        role: newRole,
      });

      toast.success(`Role updated to "${newRole}"`);
      dispatch(fetchUsers());
    } catch (err) {
      console.error(`❌ Failed to update role for user ID ${id}:`, err);
      toast.error('Failed to update role');
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
            onEdit={handleEdit}
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
            fetchUsers={() => dispatch(fetchUsers())}
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
