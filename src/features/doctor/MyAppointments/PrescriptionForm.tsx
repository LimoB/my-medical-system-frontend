import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Appointment } from '@/types/appointment';
import type { User } from '@/types/user';
import { createPrescription } from '@/services/prescription';

type Props = {
  appointment: Appointment;
  patient: User | null;
  onClose: () => void;
  onRefresh: () => void;
  disabled?: boolean;
};

type PrescriptionInput = {
  notes: string;
  image_url?: string;
};

// ✅ Basic URL validator
const isValidUrl = (url: string | undefined): boolean => {
  if (!url || url.trim() === '') return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const PrescriptionForm = ({
  appointment,
  patient,
  onClose,
  onRefresh,
  disabled = false,
}: Props) => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionInput[]>([
    { notes: '', image_url: '' },
  ]);

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = [...prescriptions];
    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
    };
    setPrescriptions(updated);
  };

  const addPrescription = () => {
    setPrescriptions([...prescriptions, { notes: '', image_url: '' }]);
  };

  const removePrescription = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      for (const presc of prescriptions) {
        if (presc.notes.trim() === '') continue;

        // ✅ Validate image_url
        if (!isValidUrl(presc.image_url)) {
          alert(`Invalid image URL provided: "${presc.image_url}"`);
          return;
        }

        const payload = {
          appointment_id: appointment.appointment_id,
          doctor_id: appointment.doctor_id,
          patient_id: patient?.user_id ?? 0,
          notes: presc.notes.trim(),
          image_url: presc.image_url?.trim() || undefined,
        };

        console.log('📦 Sending prescription:', payload);
        await createPrescription(payload);
      }

      alert('Prescriptions saved successfully!');
      onRefresh();
      onClose();
    } catch (err) {
      console.error('❌ Error saving prescriptions:', err);
      alert('Failed to save prescriptions.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold">Add Prescriptions</h3>

      {prescriptions.map((presc, i) => (
        <div key={i} className="border p-3 rounded mb-2 space-y-2">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Prescription Notes*
            </label>
            <textarea
              name="notes"
              placeholder="e.g. Take 1 tablet twice daily"
              value={presc.notes}
              onChange={(e) => handleChange(i, e)}
              className="border p-2 rounded w-full"
              rows={3}
              disabled={disabled}
              required={i === 0}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image_url"
              placeholder="https://example.com/image.jpg"
              value={presc.image_url}
              onChange={(e) => handleChange(i, e)}
              className="border p-2 rounded w-full"
              disabled={disabled}
            />
          </div>

          {prescriptions.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removePrescription(i)}
                className="text-red-600 text-sm underline"
                disabled={disabled}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={addPrescription}
          className="text-blue-600 text-sm underline"
          disabled={disabled}
        >
          + Add Another Prescription
        </button>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
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
          Save Prescriptions
        </button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
