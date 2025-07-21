import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorById } from '@/features/slices/doctorsSlice';
import type { RootState, AppDispatch } from '@/store/store';

const DoctorProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ⬇️ Get the logged-in user from the auth slice
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const { selectedDoctor, loading, error } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
    if (loggedInUser?.user_id) {
      dispatch(fetchDoctorById(loggedInUser.user_id)); // Use actual user_id
    }
  }, [dispatch, loggedInUser]);

  if (loading || !selectedDoctor) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const { user: doctorUser, specialization, description } = selectedDoctor;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-teal-700">My Profile</h2>

      <div className="space-y-4 text-gray-800">
        <p><strong>Name:</strong> Dr. {doctorUser.first_name} {doctorUser.last_name}</p>
        <p><strong>Email:</strong> {doctorUser.email}</p>
        <p><strong>Specialization:</strong> {specialization || 'Not provided'}</p>
        <p><strong>Phone Number:</strong> {doctorUser.contact_phone || 'Not provided'}</p>
        <p><strong>Description:</strong> {description || 'No description available.'}</p>
        <p><strong>Address:</strong> {doctorUser.address || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default DoctorProfile;
