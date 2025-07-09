// src/services/users.ts

import api from '@/services/axios';
import { store } from '@/store/store';
import type {
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from '@/types/user';

// Retrieve the authentication token from Redux store
const getAuthHeaders = () => {
  const token = store.getState().auth.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all users (admin only), sorted by newest first
export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users', getAuthHeaders());
  const users = response.data as User[];
  return users.sort((a, b) => b.user_id - a.user_id); // newest users first
};

// Fetch a single user by ID
export const fetchUserById = async (id: string | number): Promise<User> => {
  const response = await api.get(`/users/${id}`, getAuthHeaders());
  return response.data;
};

// Create a new user (admin only)
export const createUser = async (data: CreateUserPayload): Promise<User> => {
  const response = await api.post('/auth/admin/create-user', data, getAuthHeaders());
  return response.data;
};

// Update a user
export const updateUser = async (
  id: string | number,
  data: UpdateUserPayload | User
): Promise<User> => {
  const response = await api.put(`/users/${id}`, data, getAuthHeaders());
  return response.data;
};

// Delete a user (admin only)
export const deleteUser = async (id: string | number): Promise<void> => {
  await api.delete(`/users/${id}`, getAuthHeaders());
};
