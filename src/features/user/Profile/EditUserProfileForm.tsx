// src/features/user/Profile/EditUserProfileForm.tsx

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import type { RootState } from '@/store/store';
import { updateUser } from '@/services/users';
import axios from 'axios';

const EditUserProfileForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    contact_phone: user?.contact_phone || '',
    address: user?.address || '',
    date_of_birth: user?.date_of_birth || '',
    image_url: user?.image_url || '',
    uploading: false,
  });

  const [loading, setLoading] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (file: File) => {
    setFormData((prev) => ({ ...prev, uploading: true }));

    const formDataImg = new FormData();
    formDataImg.append('file', file);
    formDataImg.append('upload_preset', uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataImg
      );
      setFormData((prev) => ({
        ...prev,
        image_url: res.data.secure_url,
      }));
      toast.success('✅ Profile image uploaded!');
    } catch {
      toast.error('❌ Failed to upload image.');
    } finally {
      setFormData((prev) => ({ ...prev, uploading: false }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || typeof user.user_id !== 'number') {
      toast.error('Invalid user');
      return;
    }

    try {
      setLoading(true);
      const { uploading, ...safeData } = formData;
      await updateUser(user.user_id, safeData);
      toast.success('✅ Profile updated!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || '❌ Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto animate-fade-in"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text">
        Edit Profile
      </h2>

      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
        <input
          type="text"
          name="contact_phone"
          value={formData.contact_phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={formData.uploading}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-teal-400 file:text-white hover:file:brightness-110"
        />
        {formData.uploading && (
          <p className="text-sm text-gray-500 mt-1">Uploading...</p>
        )}
        {formData.image_url && (
          <img
            src={formData.image_url}
            alt="Profile"
            className="mt-2 w-24 h-24 rounded-full object-cover border"
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading || formData.uploading}
          className="px-4 py-2 rounded text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </form>
  );
};

export default EditUserProfileForm;
