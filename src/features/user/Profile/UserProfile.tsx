import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import EditUserProfileForm from './EditUserProfileForm';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <p className="text-center text-gray-500 italic mt-10">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text">
        My Profile
      </h2>

      <div className="flex items-center gap-6">
        <img
          src={user.image_url || '/avatar-placeholder.png'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-teal-400 shadow-md"
        />
        <div>
          <p className="text-xl font-semibold text-gray-800">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <EditUserProfileForm />
    </div>
  );
};

export default UserProfile;
