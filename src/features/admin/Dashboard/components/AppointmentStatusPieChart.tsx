import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const pieData = [
  { name: 'Completed', value: 45 },
  { name: 'Pending', value: 20 },
  { name: 'Cancelled', value: 5 },
];

const COLORS = ['#0f766e', '#facc15', '#ef4444'];

export default function AppointmentStatusPieChart() {
  return (
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
  );
}
