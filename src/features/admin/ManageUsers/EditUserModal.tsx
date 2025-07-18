import { useState, useEffect } from 'react';
import type { User } from '@/types/user';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: Partial<User>) => void;
}

const EditUserModal = ({ isOpen, onClose, user, onSave }: EditUserModalProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<User['role']>('user');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setRole(user.role);
      setImageUrl(user.image_url || '');
      setError('');
    }
  }, [user]);

  const isFormValid = firstName.trim() && lastName.trim() && email.trim();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      setImageUrl(res.data.secure_url);
    } catch (err) {
      setError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user || !isFormValid) return;
    setSaving(true);
    try {
      onSave({
        user_id: user.user_id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        role,
        image_url: imageUrl,
      });
      onClose();
    } catch (err) {
      setError('Failed to save user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />

        <Dialog.Panel className="relative z-50 bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transition-all transform">
          <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
            Edit User
          </Dialog.Title>

          <div className="space-y-4">
            {/* 🖼️ Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
              {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Profile"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-avatar.png';
                  }}
                  className="mt-2 w-24 h-24 object-cover rounded-full border"
                />
              )}
            </div>

            {/* 📝 First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 📝 Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 📧 Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 🛡️ Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as User['role'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* ❌ Error */}
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
          </div>

          {/* 🔘 Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={saving || uploading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={uploading || saving || !isFormValid}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditUserModal;
