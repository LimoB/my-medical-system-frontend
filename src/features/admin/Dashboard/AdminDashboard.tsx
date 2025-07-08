import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { CalendarDays, User, UserCheck, AlertCircle } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: 134, icon: User, gradient: 'from-cyan-500 to-blue-500' },
  { label: 'Total Doctors', value: 15, icon: UserCheck, gradient: 'from-purple-500 to-indigo-500' },
  { label: "Today's Appointments", value: '22 (KES 5,000)', icon: CalendarDays, gradient: 'from-green-400 to-emerald-500' },
  { label: 'Open Complaints', value: 4, icon: AlertCircle, gradient: 'from-red-400 to-pink-500' },
];

const chartData = [
  { name: 'Mon', appointments: 10 },
  { name: 'Tue', appointments: 14 },
  { name: 'Wed', appointments: 8 },
  { name: 'Thu', appointments: 16 },
  { name: 'Fri', appointments: 12 },
];

const pieData = [
  { name: 'Completed', value: 45 },
  { name: 'Pending', value: 20 },
  { name: 'Cancelled', value: 5 },
];

const gaugeData = [{ name: 'Satisfaction', value: 78, fill: '#0f766e' }];

const appointments = [
  {
    patient: 'Laura Limo',
    doctor: 'Dr. Kim',
    date: '8 July',
    time: '10:30 AM',
    status: 'Confirmed',
  },
  {
    patient: 'Susan Myers',
    doctor: 'Dr. Ray',
    date: '8 July',
    time: '11:00 AM',
    status: 'Pending',
  },
];

const complaints = [
  {
    patient: 'Laura',
    issue: 'Appointment was rescheduled without notice',
    status: 'Open',
  },
  {
    patient: 'Mike',
    issue: 'Doctor was late',
    status: 'In Progress',
  },
];

const COLORS = ['#0f766e', '#facc15', '#ef4444'];

export default function AdminDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="p-6 space-y-8">
        {/* Stat Cards */}
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Weekly Appointments</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barCategoryGap={30}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f766e" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar
                  dataKey="appointments"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                  animationDuration={900}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Appointment Status</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  labelLine={false}
                  label={({ name, percent }) =>
                    percent !== undefined ? `${name} ${(percent * 100).toFixed(0)}%` : name
                  }
                  dataKey="value"
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  height={36}
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Radial Gauge Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Patient Satisfaction</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={gaugeData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  dataKey="value"
                  fill="#0f766e"
                  background
                  cornerRadius={10}
                />
                <Legend
                  iconSize={10}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  formatter={() => `Satisfaction: ${gaugeData[0].value}%`}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appointments */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
            <ul className="space-y-4">
              {appointments.map((a, i) => (
                <li
                  key={i}
                  className="border border-gray-100 rounded-xl p-4 hover:shadow transition space-y-1"
                >
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-800">{a.patient}</span>
                    <span className="text-gray-500">{a.date} – {a.time}</span>
                  </div>
                  <div className="text-sm text-gray-600">Doctor: {a.doctor}</div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      a.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Complaints */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
            <ul className="space-y-4">
              {complaints.map((c, i) => (
                <li
                  key={i}
                  className="border border-gray-100 rounded-xl p-4 hover:shadow transition space-y-1"
                >
                  <div className="text-sm font-medium text-gray-800">{c.patient}</div>
                  <p className="text-sm text-gray-600">{c.issue}</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      c.status === 'Open'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
