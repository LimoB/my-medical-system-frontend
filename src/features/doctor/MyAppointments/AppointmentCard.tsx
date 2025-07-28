import { useState, useEffect, type ChangeEvent } from 'react';
import { FilePlus, ClipboardCheck } from 'lucide-react';
import type { Appointment } from '@/types/appointment';
import type { User } from '@/types/user';
import { toast } from 'react-toastify';
import {
  updateAppointmentStatus,
  deleteAppointment,
} from '@/services/appointments';
import { fetchUserById } from '@/services/users';
import ConsultationForm from './ConsultationForm';
import PrescriptionForm from './PrescriptionForm';

type Props = {
  appointment: Appointment;
};

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Cancelled: 'bg-red-100 text-red-800',
  Completed: 'bg-green-100 text-green-800',
  Failed: 'bg-gray-300 text-gray-600',
};

const AppointmentCard = ({ appointment }: Props) => {
  const [status, setStatus] = useState<'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'Failed'>(appointment.appointment_status);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<User | null>(null);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toast[type](message);
  };

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
      await updateAppointmentStatus(appointment.appointment_id, { status });
      showToast('Status updated');
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
      showToast('Appointment deleted');
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
    <>
      <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transition duration-300 hover:shadow-2xl animate-fade-in space-y-5">
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-green-400 text-transparent bg-clip-text">
          Appointment Details
        </h2>

        {/* Patient Info */}
        {patient ? (
          <div className="flex gap-4 items-center border p-4 rounded-xl bg-gray-50 shadow-inner">
            <img
              src={patient.image_url ?? ''}
              alt={`${patient.first_name} ${patient.last_name}`}
              className="w-20 h-20 rounded-full object-cover border shadow-sm"
            />
            <div className="space-y-1 text-sm text-gray-700">
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

        {/* Appointment Info */}
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Date:</strong> {formattedDate} ({dayOfWeek})</p>
          <p><strong>Time:</strong> {appointment.time_slot}</p>
          {appointment.reason && (
            <p><strong>Reason:</strong> {appointment.reason}</p>
          )}

          {/* Status Dropdown */}
          <div className="mt-3">
            <label className="block font-medium mb-1">Change Status</label>
            <select
              value={status}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value as typeof status)
              }
              disabled={loading}
              className="w-full border rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500 transition"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between flex-wrap gap-3 pt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
            disabled={loading}
          >
            Delete
          </button>

          <button
            onClick={handleStatusChange}
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded hover:brightness-110 transition text-sm"
            disabled={loading}
          >
            Update Status
          </button>

          <button
            onClick={() => {
              setShowConsultationForm(true);
              setShowPrescriptionForm(false);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-2 rounded hover:brightness-110 transition text-sm"
          >
            <ClipboardCheck className="w-4 h-4" />
            Make Consultation
          </button>

          <button
            onClick={() => {
              setShowPrescriptionForm(true);
              setShowConsultationForm(false);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded hover:brightness-110 transition text-sm"
          >
            <FilePlus className="w-4 h-4" />
            Make Prescription
          </button>
        </div>
      </div>

      {/* Forms */}
      {showConsultationForm && patient && (
        <div className="mt-4 animate-fade-in">
          <ConsultationForm
            appointment={appointment}
            patient={patient}
            onClose={() => setShowConsultationForm(false)}
            onRefresh={() => showToast('Refreshed!')}
            disabled={false}
          />
        </div>
      )}

      {showPrescriptionForm && patient && (
        <div className="mt-4 animate-fade-in">
          <PrescriptionForm
            appointment={appointment}
            patient={patient}
            onClose={() => setShowPrescriptionForm(false)}
            onRefresh={() => showToast('Refreshed!')}
            disabled={false}
          />
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
