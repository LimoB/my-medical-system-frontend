// features/user/BookAppointment/AppointmentForm.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createAppointment } from '@/services/appointments';
import type { RootState } from '@/store/store';
import type { SanitizedDoctor } from '@/types/doctor';
import { toast } from 'react-toastify';

type Props = {
  doctor?: SanitizedDoctor;
};

const AppointmentForm = ({ doctor }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    doctor_id: doctor?.doctor_id || '',
    appointment_date: '',
    time_slot: '',
    total_amount: doctor?.payment_per_hour?.toString() || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      await createAppointment({
        user_id: user.user_id,
        doctor_id: Number(formData.doctor_id),
        appointment_date: formData.appointment_date,
        time_slot: formData.time_slot,
        total_amount: formData.total_amount,
      });
      toast.success('Appointment booked successfully!');
      setFormData({
        doctor_id: '',
        appointment_date: '',
        time_slot: '',
        total_amount: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6 bg-white shadow rounded">
      {doctor && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold">
            Dr. {doctor.name} ({doctor.specialization})
          </h2>
          <p className="text-sm text-gray-600">{doctor.description}</p>
          <p className="text-sm mt-2">
            <strong>Available Days:</strong> {doctor.available_days}
          </p>
          <p className="text-sm">
            <strong>Hourly Rate:</strong> KES {doctor.payment_per_hour}
          </p>
        </div>
      )}

      <div>
        <label className="block mb-1">Appointment Date</label>
        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Time Slot</label>
        <select
          name="time_slot"
          value={formData.time_slot}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select a time</option>
          {doctor?.available_hours?.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="text"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Booking...' : 'Confirm Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;
