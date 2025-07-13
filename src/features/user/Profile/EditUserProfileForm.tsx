// src/features/user/Profile/EditUserProfileForm.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { updateUser } from '@/services/users';
import { toast } from 'react-toastify';

const EditUserProfileForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    image_url: user?.image_url || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!user || typeof user.user_id !== 'number') {
    toast.error('Invalid user information');
    return;
  }

  try {
    setLoading(true);

    // Ensure you're not sending user_id in formData
    const { user_id, ...safeData } = formData as any;

    await updateUser(user.user_id, safeData);
    toast.success('Profile updated successfully');
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Failed to update profile';
    toast.error(message);
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Profile Image URL</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md"
          placeholder="https://example.com/profile.jpg"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default EditUserProfileForm;
