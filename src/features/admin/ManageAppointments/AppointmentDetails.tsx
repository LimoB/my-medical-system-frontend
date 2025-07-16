import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { updateAppointmentStatus } from '@/services/appointments';
import { toast } from 'react-toastify';
import type { Appointment, AppointmentStatusUpdatePayload } from '@/types/appointment';

interface Props {
  appointment: Appointment;
  onClose: () => void;
  onUpdated: () => void;
}

const AppointmentDetails = ({ appointment, onClose, onUpdated }: Props) => {
  const [status, setStatus] = useState<AppointmentStatusUpdatePayload['status']>(
    appointment.appointment_status
  );
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const payload: AppointmentStatusUpdatePayload = { status };
      await updateAppointmentStatus(appointment.appointment_id, payload);
      toast.success('Appointment status updated');
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog open onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal panel */}
      <Dialog.Panel className="relative z-10 bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <Dialog.Title className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
          Appointment Details
        </Dialog.Title>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-800">
          <p>
            <strong>Patient:</strong> {appointment.user?.first_name} {appointment.user?.last_name}
          </p>
          <p>
            <strong>Doctor:</strong>{' '}
            {appointment.doctor?.user
              ? `${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`
              : '—'}
          </p>
          <p>
            <strong>Date:</strong> {appointment.appointment_date}
          </p>
          <p>
            <strong>Time:</strong> {appointment.time_slot}
          </p>
          <p>
            <strong>Current Status:</strong>{' '}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${status === 'Confirmed'
                  ? 'bg-green-100 text-green-700'
                  : status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
            >
              {appointment.appointment_status}
            </span>
          </p>
        </div>

        {/* Status Dropdown */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as AppointmentStatusUpdatePayload['status'])
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>Completed
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="text-green-600 border border-green-500 hover:bg-black hover:text-white hover:border-black transition-colors px-4 py-2 text-sm rounded-md"
          >
            Cancel
          </Button>

          <Button
            disabled={updating}
            onClick={handleUpdate}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${updating
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:bg-black hover:text-white'
              }`}
          >
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AppointmentDetails;
