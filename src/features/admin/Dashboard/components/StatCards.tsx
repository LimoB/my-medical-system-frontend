import { User, UserCheck, CalendarDays, AlertCircle } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: 134, icon: User, gradient: 'from-cyan-500 to-blue-500' },
  { label: 'Total Doctors', value: 15, icon: UserCheck, gradient: 'from-purple-500 to-indigo-500' },
  { label: "Today's Appointments", value: '22 (KES 5,000)', icon: CalendarDays, gradient: 'from-green-400 to-emerald-500' },
  { label: 'Open Complaints', value: 4, icon: AlertCircle, gradient: 'from-red-400 to-pink-500' },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map(({ label, value, icon: Icon, gradient }) => (
        <div
          key={label}
          className={`p-5 rounded-2xl shadow-md text-white bg-gradient-to-br ${gradient} flex flex-col justify-between`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 opacity-90" />
            <h2 className="text-sm font-medium">{label}</h2>
          </div>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
