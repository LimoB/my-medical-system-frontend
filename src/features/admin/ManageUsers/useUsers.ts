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

  const fetchUserList = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
      console.log('Users fetched successfully:', data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users.');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

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

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id.toString());
      toast.success('User deleted');
      console.log(`User with ID ${id} deleted successfully`);
      fetchUserList();
    } catch (err) {
      console.error(`Error deleting user with ID ${id}:`, err);
      toast.error('Failed to delete user');
    }
  };

  const handleRoleChange = async (id: number, newRole: UserRole) => {
    try {
      const existingUser = await fetchUserById(id.toString());
      console.log('Existing user fetched for update:', existingUser);

      const updatedUser: UpdateUserPayload = {
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        contact_phone: existingUser.contact_phone,
        email: existingUser.email,
        role: newRole,
      };

      await updateUser(id.toString(), updatedUser);

      toast.success('Role updated');
      console.log(`Role updated for user ID ${id} to '${newRole}'`);

      fetchUserList();
    } catch (err) {
      console.error(`Failed to update role for user ID ${id}:`, err);
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
