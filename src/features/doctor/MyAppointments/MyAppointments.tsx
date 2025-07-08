import { useState } from 'react';

interface Appointment {
  id: number;
  patientName: string;
  date: string; // ISO string or formatted date
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

const mockAppointments: Appointment[] = [
  { id: 1, patientName: 'John Doe', date: '2025-07-15', time: '10:00 AM', status: 'Scheduled' },
  { id: 2, patientName: 'Jane Smith', date: '2025-07-16', time: '2:00 PM', status: 'Completed' },
  { id: 3, patientName: 'Sam Wilson', date: '2025-07-17', time: '11:30 AM', status: 'Cancelled' },
];

const MyAppointments = () => {
  const [appointments] = useState<Appointment[]>(mockAppointments);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">My Appointments</h3>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-teal-100">
            <th className="border px-4 py-2 text-left">Patient</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Time</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(({ id, patientName, date, time, status }) => (
            <tr key={id} className="even:bg-gray-50">
              <td className="border px-4 py-2">{patientName}</td>
              <td className="border px-4 py-2">{date}</td>
              <td className="border px-4 py-2">{time}</td>
              <td className="border px-4 py-2">{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;
