// File: src/features/admin/hooks/useDashboardData.ts

import { useState, useEffect } from 'react';
import { User, UserCheck, CalendarDays, AlertCircle } from 'lucide-react';
import {
  fetchAppointmentStatus,
  fetchDashboardStats,
  fetchRecentAppointments,
  fetchRecentComplaints,
  fetchSatisfactionScore,
  fetchWeeklyAppointments,
} from '@/services/dashboardService';

import type {
  StatItem,
  ChartDataItem,
  PieDataItem,
  GaugeDataItem,
  Appointment,
  Complaint,
} from '@/types/dashboard';

export function useDashboardData() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [gaugeData, setGaugeData] = useState<GaugeDataItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          statsRes,
          chartRes,
          pieRes,
          gaugeRes,
          recentAppointmentsRes,
          recentComplaintsRes,
        ] = await Promise.all([
          fetchDashboardStats(),
          fetchWeeklyAppointments(),
          fetchAppointmentStatus(),
          fetchSatisfactionScore(),
          fetchRecentAppointments(),
          fetchRecentComplaints(),
        ]);

        // Fallback score in case API returns undefined/null
        const satisfactionScore =
          typeof gaugeRes.score === 'number' ? gaugeRes.score : 0;

        setStats([
          {
            label: 'Total Users',
            value: statsRes.totalUsers,
            icon: User,
            gradient: 'from-cyan-500 to-blue-500',
          },
          {
            label: 'Total Doctors',
            value: statsRes.totalDoctors,
            icon: UserCheck,
            gradient: 'from-purple-500 to-indigo-500',
          },
          {
            label: "Today's Appointments",
            value: `${statsRes.totalAppointmentsToday} (KES ${statsRes.totalRevenueToday})`,
            icon: CalendarDays,
            gradient: 'from-green-400 to-emerald-500',
          },
          {
            label: 'Open Complaints',
            value: statsRes.openComplaints,
            icon: AlertCircle,
            gradient: 'from-red-400 to-pink-500',
          },
        ]);

        setChartData(chartRes);
        setPieData(pieRes);
        setGaugeData([
          {
            name: 'Satisfaction',
            value: satisfactionScore,
            fill: '#0f766e',
          },
        ]);
        setAppointments(recentAppointmentsRes);
        setComplaints(recentComplaintsRes);
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    chartData,
    pieData,
    gaugeData,
    appointments,
    complaints,
    loading,
    error, // ✅ returned for UI use
  };
}
