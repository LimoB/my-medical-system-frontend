import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { SanitizedDoctor } from '@/types/doctor';

type AppointmentSlot = {
  date: string; // Format: 'YYYY-MM-DD'
  time: string; // Format: 'HH:mm'
};

type Props = {
  doctor: SanitizedDoctor;
  onConfirm: (date: Date, time: string) => void;
  bookedSlots: AppointmentSlot[]; // Pass this from parent
};

const BookingCalendar = ({ doctor, onConfirm, bookedSlots }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>('');

  // Map available day names to numeric indices (0 = Sunday, ..., 6 = Saturday)
  const availableDayIndices = useMemo(() => {
    const dayMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    return doctor.available_days
      .split(',')
      .map((day) => dayMap[day.trim()])
      .filter((dayIndex) => dayIndex !== undefined);
  }, [doctor]);

  const isDayAvailable = (date: Date) => availableDayIndices.includes(date.getDay());

  const highlightDates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 60 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return isDayAvailable(date) ? date : null;
    }).filter(Boolean) as Date[];
  }, [availableDayIndices]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDate && selectedHour) {
      onConfirm(selectedDate, selectedHour);
    }
  };

  // Filter available hours based on selected date
  const availableHoursForDate = useMemo(() => {
    if (!selectedDate) return [];

    const selectedDateStr = selectedDate.toISOString().split('T')[0];

    const bookedTimes = bookedSlots
      .filter((slot) => slot.date === selectedDateStr)
      .map((slot) => slot.time);

    return doctor.available_hours.filter((hour) => !bookedTimes.includes(hour));
  }, [selectedDate, bookedSlots, doctor.available_hours]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedHour(''); // reset hour when changing date
          }}
          filterDate={isDayAvailable}
          placeholderText="Choose a date"
          highlightDates={[
            {
              'react-datepicker__day--highlighted-custom-1': highlightDates,
            },
          ]}
          className="w-full border border-gray-300 rounded-md p-3"
        />
      </div>

      {/* Time Picker */}
      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3"
            required
          >
            <option value="">-- Choose Time Slot --</option>
            {availableHoursForDate.length > 0 ? (
              availableHoursForDate.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))
            ) : (
              <option disabled>No available slots</option>
            )}
          </select>
        </div>
      )}

      {/* Confirm Button */}
      <button
        type="submit"
        disabled={!selectedDate || !selectedHour}
        className={`w-full py-3 rounded-full font-medium transition ${
          selectedDate && selectedHour
            ? 'bg-teal-600 text-white hover:bg-teal-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Confirm Appointment
      </button>
    </form>
  );
};

export default BookingCalendar;
