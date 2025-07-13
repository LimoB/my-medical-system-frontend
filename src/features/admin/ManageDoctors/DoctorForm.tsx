import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { DoctorCreatePayload, SanitizedDoctor } from '@/types/doctor';

interface Props {
  initialData: SanitizedDoctor;
  onSubmit: (payload: DoctorCreatePayload) => void;
  onCancel: () => void;
}

const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const commonSpecializations = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Psychiatrist',
  'Oncologist',
  'General Practitioner',
];

// Internal form structure
type DoctorFormValues = {
  user_id: number;
  specialization: string;
  available_days: string;
  available_hours: string; // comma-separated string
  payment_per_hour: number;
  description?: string;
};

const DoctorForm = ({ initialData, onSubmit, onCancel }: Props) => {
  if (!initialData.user) {
    return <p className="text-red-500">Invalid doctor data: User is missing.</p>;
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    defaultValues: {
      user_id: initialData.user.user_id,
      specialization: initialData.specialization || '',
      available_days: initialData.available_days || '',
      available_hours: initialData.available_hours?.join(', ') || '',
      payment_per_hour: initialData.payment_per_hour || 0,
      description: initialData.description || '',
    },
  });

  const availableDays = watch('available_days') || '';
  const selectedDays = typeof availableDays === 'string'
    ? availableDays.split(',').map((d) => d.trim()).filter(Boolean)
    : [];

  const toggleDay = (day: string) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setValue('available_days', updated.join(', '));
  };

  const submitForm = (data: DoctorFormValues) => {
    if (!data.specialization.trim()) {
      toast.error('Specialization is required.');
      return;
    }

    const payload: DoctorCreatePayload = {
      user_id: data.user_id,
      specialization: data.specialization,
      available_days: data.available_days,
      available_hours: data.available_hours
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
      payment_per_hour: data.payment_per_hour,
      description: data.description?.trim() || '',
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-5 p-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      {/* Read-only user name display */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
        <input
          type="text"
          disabled
          value={`${initialData.user.first_name} ${initialData.user.last_name}`}
          className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Specialization input */}
      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
          Specialization
        </label>
        <input
          id="specialization"
          list="specializations"
          {...register('specialization', { required: true })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <datalist id="specializations">
          {commonSpecializations.map((spec) => (
            <option key={spec} value={spec} />
          ))}
        </datalist>
        {errors.specialization && (
          <p className="text-sm text-red-500 mt-1">Specialization is required.</p>
        )}
      </div>

      {/* Available Days Checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {allDays.map((day) => (
            <label key={day} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="form-checkbox text-blue-600"
              />
              <span className="text-sm text-gray-700">{day}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Hidden input for available_days */}
      <Controller
        name="available_days"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />

      {/* Available Hours input */}
      <div>
        <label htmlFor="available_hours" className="block text-sm font-medium text-gray-700 mb-1">
          Available Hours (comma-separated)
        </label>
        <input
          id="available_hours"
          {...register('available_hours')}
          placeholder="e.g. 09:00, 10:00, 14:00"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Payment per hour input */}
      <div>
        <label htmlFor="payment_per_hour" className="block text-sm font-medium text-gray-700 mb-1">
          Payment Per Hour (KSh)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('payment_per_hour', { required: true })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        {errors.payment_per_hour && (
          <p className="text-sm text-red-500 mt-1">This field is required.</p>
        )}
      </div>

      {/* Description textarea */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="Short bio or description"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-green-600 border border-green-500 px-4 py-2 rounded-md hover:bg-black hover:text-white hover:border-black transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-md hover:bg-black hover:text-white transition-colors"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
