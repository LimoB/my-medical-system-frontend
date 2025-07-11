// File: src/features/admin/Dashboard/components/StatCards.tsx

import { useDashboardData } from '@/features/admin/hooks/useDashboardData';
import { Loader2 } from 'lucide-react';

export default function StatCards() {
  const { stats, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

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
