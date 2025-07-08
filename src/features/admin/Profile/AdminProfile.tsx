import { useAuth } from '@/contexts/AuthContext';

const AdminProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6 space-y-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">Admin Profile</h2>

      <div>
        <strong>Name:</strong> {user.first_name} {user.last_name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Role:</strong> {user.role}
      </div>
      <div>
        <strong>Contact:</strong> {user.contact_phone || 'N/A'}
      </div>
      <div>
        <strong>Address:</strong> {user.address || 'N/A'}
      </div>
    </div>
  );
};

export default AdminProfile;
