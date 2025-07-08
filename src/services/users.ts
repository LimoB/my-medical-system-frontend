import api from '@/services/axios';
import type {
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from '@/types/user';

// GET: Fetch all users (admin only)
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

// GET: Fetch a single user by ID
export const fetchUserById = async (id: string | number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// POST: Create a new user
export const createUser = async (data: CreateUserPayload): Promise<User> => {
  const response = await api.post('/users', data);
  return response.data;
};

// PUT: Update a full user
export const updateUser = async (
  id: string | number,
  data: UpdateUserPayload | User // Can accept full user object for PUT
): Promise<User> => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

// DELETE: Remove a user (admin only)
export const deleteUser = async (id: string | number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
