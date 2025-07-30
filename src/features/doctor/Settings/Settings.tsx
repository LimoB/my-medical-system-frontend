import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DoctorForm from '@/components/DoctorForm';
import { getDoctorByUserId, updateDoctor } from '@/services/doctors';
import type { SanitizedDoctor, DoctorCreatePayload } from '@/types/doctor';

const Settings = () => {
  const [doctor, setDoctor] = useState<SanitizedDoctor | null>(null);
  const [loading, setLoading] = useState(true);

  // Get currently logged-in user from localStorage or use Redux/auth context
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.user_id;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!userId) throw new Error('User ID not found.');
        const doctorData = await getDoctorByUserId(userId);
        setDoctor(doctorData);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch doctor profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [userId]);

  const handleUpdate = async (payload: DoctorCreatePayload) => {
    try {
      if (!doctor) return;
      await updateDoctor(doctor.doctor_id, payload);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    toast.info('No changes were saved');
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-600 text-center text-lg font-medium">
        Loading your profile...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-6 text-center text-red-600 text-lg font-medium">
        Doctor profile not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Settings</h1>
      <DoctorForm initialData={doctor} onSubmit={handleUpdate} onCancel={handleCancel} />
    </div>
  );
};

export default Settings;
