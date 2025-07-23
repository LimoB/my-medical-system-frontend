import { useEffect, useState, type ChangeEvent } from 'react';
import type { Appointment } from '@/types/appointment';
import type { User } from '@/types/user';
import {
  updateAppointmentStatus,
  deleteAppointment,
} from '@/services/appointments';
import { fetchUserById } from '@/services/users';

type Props = {
  appointment: Appointment;
  onClose: () => void;
  onRefresh: () => void;
};

const AppointmentDetails = ({ appointment, onClose, onRefresh }: Props) => {
  const [status, setStatus] = useState<
    'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'Failed'
  >(appointment.appointment_status);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!appointment.user_id) return;
      try {
        const user = await fetchUserById(appointment.user_id);
        setPatient(user);
      } catch (err) {
        console.error('Failed to load patient profile:', err);
      }
    };
    loadUser();
  }, [appointment.user_id]);

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      await updateAppointmentStatus(appointment.appointment_id, {
        status,
      });
      onRefresh?.();
      onClose();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    try {
      setLoading(true);
      await deleteAppointment(appointment.appointment_id);
      onRefresh?.();
      onClose();
    } catch (err) {
      console.error('Error deleting appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  const appointmentDate = new Date(appointment.appointment_date);
  const formattedDate = appointmentDate.toLocaleDateString();
  const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Appointment Details</h2>

        {patient ? (
          <div className="space-y-1">
            <img
              src={patient.image_url ?? ''}
              alt={`${patient.first_name} ${patient.last_name}`}
              className="w-20 h-20 rounded-full object-cover"
            />
            <p>
              <strong>Name:</strong> {patient.first_name} {patient.last_name}
            </p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.contact_phone}</p>
            <p><strong>Address:</strong> {patient.address}</p>
            <p><strong>Role:</strong> {patient.role}</p>
          </div>
        ) : (
          <p>Loading patient info...</p>
        )}

        <div className="space-y-1">
          <p>
            <strong>Date:</strong>{' '}
            {formattedDate} ({dayOfWeek})
          </p>
          <p><strong>Time:</strong> {appointment.time_slot}</p>
          <label className="block font-semibold mt-2">Status:</label>
          <select
            value={status}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setStatus(e.target.value as
                | 'Pending'
                | 'Confirmed'
                | 'Cancelled'
                | 'Completed')
            }
            className="border p-2 w-full rounded"
            disabled={loading}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {appointment.reason && <p><strong>Reason:</strong> {appointment.reason}</p>}

        <div className="flex justify-between pt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={loading}
          >
            Delete
          </button>
          <div>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >
              Close
            </button>
            <button
              onClick={handleStatusChange}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
