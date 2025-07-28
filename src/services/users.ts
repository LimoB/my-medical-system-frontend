// src/services/users.ts

import api from '@/services/axios';
import { store } from '@/store/store';
import type {
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from '@/types/user';


import type { RootState } from '@/store/store';

const getAuthHeaders = () => {
  const state = store.getState() as RootState; // ✅ Fix here
  const token = state.auth.token;
  console.log('🔑 Auth token used for request:', token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all users (admin only), sorted by newest first
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users', getAuthHeaders());
    const users = response.data as User[];
    console.log(`✅ Users fetched: (${users.length})`, users);
    return users.sort((a, b) => b.user_id - a.user_id); // newest first
  } catch (error: any) {
    console.error('❌ Failed to fetch users:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (id: string | number): Promise<User> => {
  try {
    console.log(`📥 Fetching user with ID: ${id}`);
    const response = await api.get(`/users/${id}`, getAuthHeaders());
    console.log('✅ User fetched:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Failed to fetch user ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Create a new user (admin only)
export const createUser = async (data: CreateUserPayload): Promise<User> => {
  try {
    console.log('📤 Creating user with data:', data);
    const response = await api.post('/auth/admin/create-user', data, getAuthHeaders());
    console.log('✅ User created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Failed to create user:', error.response?.data || error.message);
    throw error;
  }
};

// Update a user (ensure user_id isn't sent in payload)
export const updateUser = async (
  id: string | number,
  data: Partial<UpdateUserPayload>
): Promise<User> => {
  try {
    console.log(`📤 Updating user ID ${id} with data:`, data);
    const { user_id, ...updateData } = data as any;
    console.log('📦 Final payload sent:', updateData);
    const response = await api.put(`/users/${id}`, updateData, getAuthHeaders());
    console.log('✅ User updated:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Failed to update user ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id: string | number): Promise<void> => {
  try {
    console.log(`🗑️ Deleting user ID: ${id}`);
    await api.delete(`/users/${id}`, getAuthHeaders());
    console.log(`✅ User ID ${id} deleted successfully`);
  } catch (error: any) {
    console.error(`❌ Failed to delete user ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
