import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Appointment } from '@/types/appointment';
import type { User } from '@/types/user';
import { createConsultation } from '@/services/consultations';

type Props = {
  appointment: Appointment;
  patient: User | null;
  onClose: () => void;
  onRefresh: () => void;
  disabled?: boolean;
};

const ConsultationForm = ({
  appointment,
  patient,
  onClose,
  onRefresh,
  disabled = false,
}: Props) => {
  const [consultationData, setConsultationData] = useState({
    diagnosis: '',
    symptoms: '',
    treatment_plan: '',
    additional_notes: '',
    duration_minutes: 30,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setConsultationData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createConsultation({
        appointment_id: appointment.appointment_id,
        doctor_id: appointment.doctor_id,
        patient_id: patient?.user_id ?? 0,
        symptoms: consultationData.symptoms || undefined,
        diagnosis: consultationData.diagnosis,
        treatment_plan: consultationData.treatment_plan || undefined,
        additional_notes: consultationData.additional_notes || undefined,
        duration_minutes: consultationData.duration_minutes,
        status: 'Completed',
      });

      alert('Consultation saved successfully!');
      onRefresh();
      onClose();
    } catch (err) {
      console.error('❌ Error saving consultation:', err);
      alert('Failed to save consultation.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold">Add Consultation</h3>

      <div>
        <label className="block font-semibold mb-1">Diagnosis*</label>
        <input
          type="text"
          name="diagnosis"
          value={consultationData.diagnosis}
          onChange={handleChange}
          required
          disabled={disabled}
          className="border p-2 rounded w-full"
          placeholder="Enter diagnosis"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Symptoms</label>
        <textarea
          name="symptoms"
          value={consultationData.symptoms}
          onChange={handleChange}
          disabled={disabled}
          className="border p-2 rounded w-full"
          placeholder="e.g. Headache, fatigue"
          rows={2}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Treatment Plan</label>
        <textarea
          name="treatment_plan"
          value={consultationData.treatment_plan}
          onChange={handleChange}
          disabled={disabled}
          className="border p-2 rounded w-full"
          placeholder="e.g. Take antimalarials for 5 days"
          rows={2}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Additional Notes</label>
        <textarea
          name="additional_notes"
          value={consultationData.additional_notes}
          onChange={handleChange}
          disabled={disabled}
          className="border p-2 rounded w-full"
          placeholder="Any additional observations"
          rows={2}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Duration (minutes)</label>
        <input
          type="number"
          name="duration_minutes"
          value={consultationData.duration_minutes}
          onChange={handleChange}
          min={1}
          disabled={disabled}
          className="border p-2 rounded w-full"
          placeholder="Duration in minutes"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={disabled}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Save Consultation
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;
