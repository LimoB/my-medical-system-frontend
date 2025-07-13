// src/features/user/Profile/UserProfile.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import EditUserProfileForm from './EditUserProfileForm';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-teal-700 mb-2">My Profile</h2>

      <div className="flex items-center gap-4">
        <img
          src={user.image_url || '/avatar-placeholder.png'}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-semibold">{user.first_name} {user.last_name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <EditUserProfileForm />
    </div>
  );
};

export default UserProfile;
