import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const AdminProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-teal-700">Admin Profile</h2>

      {/* Profile Picture */}
      {user.image_url && (
        <div className="flex justify-center">
          <img
            src={user.image_url}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border border-gray-300"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
        <div>
          <strong>First Name:</strong> <p>{user.first_name}</p>
        </div>
        <div>
          <strong>Last Name:</strong> <p>{user.last_name}</p>
        </div>
        <div>
          <strong>Email:</strong> <p>{user.email}</p>
        </div>
        <div>
          <strong>Role:</strong> <p className="capitalize">{user.role}</p>
        </div>
        <div>
          <strong>Phone:</strong> <p>{user.contact_phone || 'N/A'}</p>
        </div>
        <div>
          <strong>Address:</strong> <p>{user.address || 'N/A'}</p>
        </div>
        <div>
          <strong>Created At:</strong>{' '}
          <p>{new Date(user.created_at || '').toLocaleDateString() || 'N/A'}</p>
        </div>
        <div>
          <strong>Updated At:</strong>{' '}
          <p>{new Date(user.updated_at || '').toLocaleDateString() || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
