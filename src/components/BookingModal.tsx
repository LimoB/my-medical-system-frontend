import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { X } from 'lucide-react';
import type { RootState } from '@/store/store';
import type { SanitizedDoctor } from '@/types/doctor';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  doctor?: SanitizedDoctor | null;
};

const BookingModal = ({ isOpen, onClose, doctor }: BookingModalProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>('');

  // Convert doctor's available days (e.g., "Monday,Wednesday,Friday") to indices (0 = Sunday)
  const availableDayIndices = useMemo(() => {
    if (!doctor) return [];
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
      .filter((d) => d !== undefined);
  }, [doctor]);

  const isDayAvailable = (date: Date) => {
    return availableDayIndices.includes(date.getDay());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
    } else {
      // You can route to a detailed booking page or send selected data
      navigate('/user/book-appointment');
    }
  };

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-teal-700 text-center">Book with Dr. {doctor.name}</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* User info */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-md border border-gray-300 bg-gray-100"
              value={user ? `${user.first_name} ${user.last_name}` : ''}
              placeholder="Your Name"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-md border border-gray-300 bg-gray-100"
              value={user?.email || ''}
              placeholder="Your Email"
              disabled
            />
          </div>

          {/* Calendar */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              filterDate={isDayAvailable}
              placeholderText="Choose available date"
              className="w-full p-3 rounded-md border border-gray-300"
              highlightDates={[
                {
                  "react-datepicker__day--highlighted-custom-1": Array(30)
                    .fill(0)
                    .map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      return isDayAvailable(date) ? date : null;
                    })
                    .filter(Boolean) as Date[],
                },
              ]}
            />


          </div>

          {/* Time slot */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Select Time</label>
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
            >
              <option value="">-- Select Time Slot --</option>
              {doctor.available_hours.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-full hover:bg-teal-700 transition duration-300"
          >
            {user ? 'Continue to Booking' : 'Login to Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
