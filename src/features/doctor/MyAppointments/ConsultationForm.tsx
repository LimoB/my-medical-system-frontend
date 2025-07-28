import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Appointment } from '@/types/appointment';
import type { User } from '@/types/user';
import { createConsultation } from '@/services/consultations';
import { toast } from 'react-toastify';
import { FileText, Stethoscope, ClipboardCheck, Clock, StickyNote, FileSignature } from 'lucide-react';

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

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setConsultationData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!consultationData.diagnosis.trim()) {
      setError('Diagnosis is required.');
      return;
    }

    try {
      await createConsultation({
        appointment_id: appointment.appointment_id,
        doctor_id: appointment.doctor_id,
        patient_id: patient?.user_id ?? 0,
        symptoms: consultationData.symptoms || undefined,
        diagnosis: consultationData.diagnosis.trim(),
        treatment_plan: consultationData.treatment_plan || undefined,
        additional_notes: consultationData.additional_notes || undefined,
        duration_minutes: consultationData.duration_minutes,
        status: 'Completed',
        consultation_type: 'initial',
      });

      toast.success('✅ Consultation saved successfully!');
      onRefresh();
      onClose();
    } catch (err: any) {
      console.error('❌ Error saving consultation:', err);
      setError(err?.response?.data?.error || 'Failed to save consultation.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border rounded-2xl bg-white shadow-xl max-w-2xl mx-auto animate-fade-in"
    >
      <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 text-transparent bg-clip-text flex items-center gap-2">
        <Stethoscope className="w-7 h-7" /> Add Consultation
      </h3>

      {error && (
        <div className="text-red-600 font-medium border border-red-300 bg-red-50 rounded p-3 animate-pulse">
          {error}
        </div>
      )}

      {/* Diagnosis */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <ClipboardCheck className="w-4 h-4 text-gray-500" />
          Diagnosis <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="diagnosis"
          value={consultationData.diagnosis}
          onChange={handleChange}
          disabled={disabled}
          required
          placeholder="Enter diagnosis"
          className="w-full border rounded-xl px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Symptoms */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <FileText className="w-4 h-4 text-gray-500" />
          Symptoms
        </label>
        <textarea
          name="symptoms"
          value={consultationData.symptoms}
          onChange={handleChange}
          disabled={disabled}
          rows={2}
          placeholder="e.g. Headache, fatigue"
          className="w-full border rounded-xl px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Treatment Plan */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <FileSignature className="w-4 h-4 text-gray-500" />
          Treatment Plan
        </label>
        <textarea
          name="treatment_plan"
          value={consultationData.treatment_plan}
          onChange={handleChange}
          disabled={disabled}
          rows={2}
          placeholder="e.g. Take antimalarials for 5 days"
          className="w-full border rounded-xl px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Additional Notes */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <StickyNote className="w-4 h-4 text-gray-500" />
          Additional Notes
        </label>
        <textarea
          name="additional_notes"
          value={consultationData.additional_notes}
          onChange={handleChange}
          disabled={disabled}
          rows={2}
          placeholder="Any additional observations"
          className="w-full border rounded-xl px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <Clock className="w-4 h-4 text-gray-500" />
          Duration (minutes)
        </label>
        <input
          type="number"
          name="duration_minutes"
          value={consultationData.duration_minutes}
          onChange={handleChange}
          min={1}
          disabled={disabled}
          placeholder="e.g. 30"
          className="w-full border rounded-xl px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition duration-200"
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={disabled}
          className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:brightness-110 transition duration-200"
        >
          Save Consultation
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;
