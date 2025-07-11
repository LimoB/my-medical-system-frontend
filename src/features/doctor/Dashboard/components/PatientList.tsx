type Patient = {
  name: string;
  type: string;
  time: string;
  color: 'pink' | 'blue' | 'green' | 'red';
};

const patients: Patient[] = [
  { name: 'Laura Limo', type: 'Weekly Visit', time: '9:15 AM', color: 'pink' },
  { name: 'Amy Dunham', type: 'Routine Checkup', time: '9:30 AM', color: 'blue' },
  { name: 'Demi Joan', type: 'Report', time: '9:50 AM', color: 'green' },
  { name: 'Susan Myers', type: 'Weekly Visit', time: '10:15 AM', color: 'red' },
];

const colorMap: Record<Patient['color'], { bg: string; text: string }> = {
  pink: { bg: 'bg-pink-100', text: 'text-pink-800' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
  green: { bg: 'bg-green-100', text: 'text-green-800' },
  red: { bg: 'bg-red-100', text: 'text-red-800' },
};

const PatientList = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Patient List</h2>
        <span className="text-xs text-gray-400 font-medium">Today</span>
      </div>

      <ul className="space-y-4">
        {patients.map((patient, index) => {
          const initials = patient.name
            .split(' ')
            .map((n) => n[0])
            .join('');
          const colors = colorMap[patient.color];

          return (
            <li key={index} className="flex items-center justify-between">
              {/* Avatar + Info */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center ${colors.bg} ${colors.text}`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {patient.name}
                  </p>
                  <p className="text-xs text-blue-400">{patient.type}</p>
                </div>
              </div>

              {/* Time */}
              <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                {patient.time}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PatientList;
