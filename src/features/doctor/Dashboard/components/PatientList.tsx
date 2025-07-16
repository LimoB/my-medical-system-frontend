import { useEffect, useState } from 'react';
import { getDoctorPatients } from '@/services/doctors';
import type { DoctorPatient } from '@/types/doctor';
import dayjs from 'dayjs';

// Used to give consistent colors based on user_id
const colors = ['pink', 'blue', 'green', 'red'] as const;

const colorMap: Record<(typeof colors)[number], { bg: string; text: string }> = {
  pink: { bg: 'bg-pink-100', text: 'text-pink-800' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
  green: { bg: 'bg-green-100', text: 'text-green-800' },
  red: { bg: 'bg-red-100', text: 'text-red-800' },
};

const PatientList = () => {
  const [patients, setPatients] = useState<DoctorPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getDoctorPatients();
        const today = dayjs().format('YYYY-MM-DD');

        const todaysPatients = data.filter((p) =>
          dayjs(p.appointmentDate).format('YYYY-MM-DD') === today
        );

        setPatients(todaysPatients);
      } catch (err) {
        console.error('Failed to fetch doctor patients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Patient List</h2>
        <span className="text-xs text-gray-400 font-medium">Today</span>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500 text-center">Loading...</p>
      ) : patients.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No patients for today.</p>
      ) : (
        <ul className="space-y-4">
          {patients.map((patient, index) => {
            const name = `${patient.user.first_name} ${patient.user.last_name}`;
            const initials = name
              .split(' ')
              .map((n) => n[0])
              .join('');

            const color = colors[patient.user.user_id % colors.length];
            const time = dayjs(`${patient.appointmentDate}T${patient.timeSlot}`).format('h:mm A');

            return (
              <li key={index} className="flex items-center justify-between">
                {/* Avatar + Info */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center ${colorMap[color].bg} ${colorMap[color].text}`}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      {name}
                    </p>
                    <p className="text-xs text-blue-400">{patient.status}</p>
                  </div>
                </div>

                {/* Time */}
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                  {time}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PatientList;
