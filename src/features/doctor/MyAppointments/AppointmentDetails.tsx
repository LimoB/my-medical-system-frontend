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
      onRefresh();
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
      onRefresh();
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
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl space-y-5 animate-fade-in">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text">
          Appointment Details
        </h2>

        {patient ? (
          <div className="flex gap-4 items-center border p-4 rounded-lg bg-gray-50">
            <img
              src={patient.image_url ?? ''}
              alt={`${patient.first_name} ${patient.last_name}`}
              className="w-20 h-20 rounded-full object-cover border shadow"
            />
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {patient.first_name} {patient.last_name}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Phone:</strong> {patient.contact_phone}</p>
              <p><strong>Address:</strong> {patient.address}</p>
              <p><strong>Role:</strong> {patient.role}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Loading patient info...</p>
        )}

        <div className="space-y-2 text-sm">
          <p><strong>Date:</strong> {formattedDate} ({dayOfWeek})</p>
          <p><strong>Time:</strong> {appointment.time_slot}</p>

          {appointment.reason && (
            <p><strong>Reason:</strong> {appointment.reason}</p>
          )}

          <div>
            <label className="block font-medium mt-2 mb-1">Status</label>
            <select
              value={status}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value as
                  | 'Pending'
                  | 'Confirmed'
                  | 'Cancelled'
                  | 'Completed')
              }
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            disabled={loading}
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Close
            </button>
            <button
              onClick={handleStatusChange}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
