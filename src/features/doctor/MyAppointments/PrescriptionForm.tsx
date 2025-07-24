import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Appointment } from '@/types/appointment';
import type { User } from '@/types/user';
import { createPrescription } from '@/services/prescription';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  uploading?: boolean;
};

const PrescriptionForm = ({
  appointment,
  patient,
  onClose,
  onRefresh,
  disabled = false,
}: Props) => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionInput[]>([
    { notes: '', image_url: '', uploading: false },
  ]);
  const [saving, setSaving] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const updated = [...prescriptions];

    if (name === 'notes' || name === 'image_url') {
      updated[index][name] = value;
    }

    setPrescriptions(updated);
  };

  const handleFileUpload = async (index: number, file: File) => {
    const updated = [...prescriptions];
    updated[index].uploading = true;
    setPrescriptions(updated);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      updated[index].image_url = res.data.secure_url;
      toast.success('📸 Image uploaded successfully!');
    } catch (err) {
      toast.error('❌ Failed to upload image.');
    } finally {
      updated[index].uploading = false;
      setPrescriptions([...updated]);
    }
  };

  const handleFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileUpload(index, file);
  };

  const addPrescription = () => {
    setPrescriptions([...prescriptions, { notes: '', image_url: '', uploading: false }]);
  };

  const removePrescription = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      for (const presc of prescriptions) {
        if (presc.notes.trim() === '') continue;

        const payload = {
          appointment_id: appointment.appointment_id,
          doctor_id: appointment.doctor_id,
          patient_id: patient?.user_id ?? 0,
          notes: presc.notes.trim(),
          image_url: presc.image_url?.trim() || undefined,
        };

        await createPrescription(payload);
      }

      toast.success('✅ Prescriptions saved successfully!');
      onRefresh();
      onClose();
    } catch (err) {
      toast.error('❌ Failed to save prescriptions.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border rounded-2xl bg-white shadow-xl max-w-2xl mx-auto animate-fade-in"
    >
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-transparent bg-clip-text">
        Add Prescription
      </h3>

      {prescriptions.map((presc, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl p-4 space-y-4 shadow transition-transform hover:scale-[1.01]"
        >
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              name="notes"
              value={presc.notes}
              onChange={(e) => handleChange(i, e)}
              placeholder="e.g. Take one tablet after lunch"
              className="w-full border rounded-lg px-4 py-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              disabled={disabled}
              required={i === 0}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(i, e)}
              disabled={presc.uploading || disabled}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-teal-400 file:text-white hover:file:brightness-110"
            />
            {presc.uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            {presc.image_url && (
              <img
                src={presc.image_url}
                alt="Prescription"
                className="mt-2 w-24 h-24 rounded object-cover border"
              />
            )}
          </div>

          {prescriptions.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removePrescription(i)}
                className="text-red-600 text-sm hover:underline transition"
                disabled={disabled}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Add Another */}
      <div>
        <button
          type="button"
          onClick={addPrescription}
          className="text-blue-600 text-sm hover:underline transition"
          disabled={disabled}
        >
          + Add Another Prescription
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
          disabled={disabled || saving}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={disabled || saving}
          className="px-4 py-2 rounded text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:brightness-110 transition"
        >
          {saving ? 'Saving...' : 'Save Prescriptions'}
        </button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
