// BookingCalendar.tsx
import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { SanitizedDoctor } from '@/types/doctor';

type Props = {
  doctor: SanitizedDoctor;
  onConfirm: (date: Date, time: string) => void;
};

const BookingCalendar = ({ doctor, onConfirm }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>('');

  const availableDayIndices = useMemo(() => {
    const map: Record<string, number> = {
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
      .map((d) => map[d.trim()])
      .filter((d) => d !== undefined);
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

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedDate && selectedHour) {
          onConfirm(selectedDate, selectedHour);
        }
      }}
    >
      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
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

      {/* Time */}
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
            {doctor.available_hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Button */}
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
