import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const gaugeData = [{ name: 'Satisfaction', value: 78, fill: '#0f766e' }];

export default function PatientSatisfactionGauge() {
  return (
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
  );
}
