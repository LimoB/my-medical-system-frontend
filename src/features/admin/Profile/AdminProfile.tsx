import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const AdminProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <p className="text-center text-gray-600 mt-10">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 mt-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 text-center">Admin Profile</h2>

      {/* Profile Picture */}
      <div className="flex justify-center">
        <img
          src={user.image_url || '/default-avatar.png'}
          alt="Profile"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-avatar.png';
          }}
          className="w-32 h-32 rounded-full border border-gray-300 shadow-sm object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
        <div>
          <strong>First Name:</strong>
          <p>{user.first_name || 'N/A'}</p>
        </div>
        <div>
          <strong>Last Name:</strong>
          <p>{user.last_name || 'N/A'}</p>
        </div>
        <div>
          <strong>Email:</strong>
          <p>{user.email || 'N/A'}</p>
        </div>
        <div>
          <strong>Role:</strong>
          <p className="capitalize">{user.role || 'N/A'}</p>
        </div>
        <div>
          <strong>Phone:</strong>
          <p>{user.contact_phone || 'N/A'}</p>
        </div>
        <div>
          <strong>Address:</strong>
          <p>{user.address || 'N/A'}</p>
        </div>
        <div>
          <strong>Created At:</strong>
          <p>
            {user.created_at
              ? new Date(user.created_at).toLocaleString()
              : 'N/A'}
          </p>
        </div>
        <div>
          <strong>Updated At:</strong>
          <p>
            {user.updated_at
              ? new Date(user.updated_at).toLocaleString()
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
