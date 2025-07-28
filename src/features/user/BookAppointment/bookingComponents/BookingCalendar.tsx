import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { SanitizedDoctor } from '@/types/doctor';

type AppointmentSlot = {
  date: string;
  time: string;
};

type Props = {
  doctor: SanitizedDoctor;
  onConfirm: (date: Date, time: string) => void;
  bookedSlots: AppointmentSlot[];
};

const BookingCalendar = ({ doctor, onConfirm, bookedSlots }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>('');

  const availableDayIndices = useMemo(() => {
    const dayMap: Record<string, number> = {
      Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
      Thursday: 4, Friday: 5, Saturday: 6,
    };
    return doctor.available_days
      .split(',')
      .map((day) => dayMap[day.trim()])
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

  const availableHoursForDate = useMemo(() => {
    if (!selectedDate) return [];

    const selectedDateStr = selectedDate.toISOString().split('T')[0];

    const bookedTimes = bookedSlots
      .filter((slot) => slot.date === selectedDateStr)
      .map((slot) => slot.time);

    return doctor.available_hours.filter((hour) => !bookedTimes.includes(hour));
  }, [selectedDate, bookedSlots, doctor.available_hours]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDate && selectedHour) {
      onConfirm(selectedDate, selectedHour);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      {/* Date Picker */}
      <div>
        <label className="block text-base font-semibold text-gray-700 mb-2">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedHour('');
          }}
          filterDate={isDayAvailable}
          placeholderText="📅 Choose a date"
          highlightDates={[
            { 'react-datepicker__day--highlighted-custom-1': highlightDates },
          ]}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Time Buttons */}
      {selectedDate && (
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">Select Time</label>
          {availableHoursForDate.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableHoursForDate.map((hour) => (
                <button
                  key={hour}
                  type="button"
                  onClick={() => setSelectedHour(hour)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    border shadow-sm
                    ${selectedHour === hour
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                    }`}
                >
                  {hour}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No available time slots for this day.</p>
          )}
        </div>
      )}

      {/* Confirm Button */}
      <button
        type="submit"
        disabled={!selectedDate || !selectedHour}
        className={`w-full py-3 rounded-full font-semibold text-lg transition-all duration-300
          ${selectedDate && selectedHour
            ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        Confirm Appointment
      </button>
    </form>
  );
};

export default BookingCalendar;
