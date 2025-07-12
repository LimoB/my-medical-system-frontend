import { useEffect, useState } from 'react';
import {
  fetchUsers,
  deleteUser,
  fetchUserById,
  updateUser,
} from '@/services/users';
import type { User, UserRole, UpdateUserPayload } from '@/types/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USERS_PER_PAGE = 5;

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 🔄 Fetch users from backend
  const fetchUserList = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
      console.log('✅ Users fetched:', data);
    } catch (err) {
      console.error('❌ Error fetching users:', err);
      setError('Failed to fetch users.');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  // 🔍 Filtered and paginated list
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // ❌ Delete user
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id.toString());
      toast.success('User deleted');
      console.log(`🗑️ User ID ${id} deleted`);
      fetchUserList();
    } catch (err) {
      console.error(`❌ Error deleting user ${id}:`, err);
      toast.error('Failed to delete user');
    }
  };

  // 🔄 Update user role
  const handleRoleChange = async (id: number, newRole: UserRole) => {
    try {
      const user = await fetchUserById(id.toString());
      if (!user) throw new Error('User not found');



      const updatedPayload: UpdateUserPayload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        contact_phone: user.contact_phone || '',
        address: user.address || '',
        image_url: user.image_url || '',
        is_verified: user.is_verified ?? true,
        role: newRole,
      };


      await updateUser(id.toString(), updatedPayload);
      toast.success(`✅ Role updated to "${newRole}"`);
      console.log(`🔁 Role updated for user ID ${id}: ${newRole}`);

      fetchUserList(); // Refresh user list
    } catch (err) {
      console.error(`❌ Failed to update role for user ID ${id}:`, err);
      toast.error('Failed to update role');
    }
  };

  return {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    currentUsers,
    handleDelete,
    handleRoleChange,
    fetchUsers: fetchUserList,
  };
};
