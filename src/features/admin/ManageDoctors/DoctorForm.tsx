import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { DoctorCreatePayload, SanitizedDoctor } from '@/types/doctor';

interface Props {
  initialData: SanitizedDoctor; // update-only form
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

const DoctorForm = ({ initialData, onSubmit, onCancel }: Props) => {
  // ❗ Guard: if user is undefined, show error
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
  } = useForm<DoctorCreatePayload>({
    defaultValues: {
      user_id: initialData.user.user_id,
      specialization: initialData.specialization || '',
      available_days: initialData.available_days || '',
    },
  });

  const availableDays = watch('available_days') || '';
  const selectedDays = availableDays.split(',').map((d) => d.trim()).filter(Boolean);

  const toggleDay = (day: string) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setValue('available_days', updated.join(', '));
  };

  const submitForm = (data: DoctorCreatePayload) => {
    if (!data.specialization.trim()) {
      toast.error('Specialization is required.');
      return;
    }
    onSubmit(data);
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

      {/* Specialization input with suggestions */}
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
