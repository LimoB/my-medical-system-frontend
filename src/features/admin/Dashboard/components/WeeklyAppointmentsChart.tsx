// File: src/features/admin/Dashboard/components/WeeklyAppointmentsChart.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDashboardData } from '@/features/admin/hooks/useDashboardData';
import { Loader2 } from 'lucide-react';

export default function WeeklyAppointmentsChart() {
  const { chartData, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-52 bg-white rounded-2xl shadow-sm">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
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
  );
}
