import { useAuth } from '../../contexts/AuthContext';

const DoctorProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="space-y-2">
        <p><strong>Name:</strong> Dr. {user.first_name} {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {/* Add more fields if needed */}
      </div>
    </div>
  );
};

export default DoctorProfile;
