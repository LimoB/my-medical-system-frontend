// File: src/features/admin/Dashboard/components/PatientSatisfactionGauge.tsx

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDashboardData } from '@/features/admin/hooks/useDashboardData';

export default function PatientSatisfactionGauge() {
  const { gaugeData, loading } = useDashboardData();

  // Loading state
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-gray-500">Loading satisfaction data...</p>
      </div>
    );
  }

  // Error or empty data state
  const satisfaction = gaugeData?.[0];
  const value = typeof satisfaction?.value === 'number' ? satisfaction.value : undefined;
  const fillColor = satisfaction?.fill || '#0f766e';

  if (value === undefined) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-gray-500">No satisfaction data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Patient Satisfaction</h2>
      <ResponsiveContainer width="100%" height={220}>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={[{ ...satisfaction, value }]}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            dataKey="value"
            fill={fillColor}
            background
            cornerRadius={10}
          />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={() => `Satisfaction: ${value}%`}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
