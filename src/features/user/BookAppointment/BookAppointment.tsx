import { useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

const mockDoctors: Doctor[] = [
  { id: 1, name: 'Dr. Alice', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Bob', specialty: 'Dermatology' },
  { id: 3, name: 'Dr. Carol', specialty: 'Pediatrics' },
];

const BookAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !time) return;

    // Simulate successful booking
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Book an Appointment</h3>

      {submitted ? (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded">
          Appointment booked successfully! You’ll be contacted with confirmation shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">-- Choose a Doctor --</option>
              {mockDoctors.map(({ id, name, specialty }) => (
                <option key={id} value={id}>
                  {name} ({specialty})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800 transition"
          >
            Book Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
