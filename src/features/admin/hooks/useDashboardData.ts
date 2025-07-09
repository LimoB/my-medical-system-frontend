import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { User, UserCheck, CalendarDays, AlertCircle } from 'lucide-react';

// Define the types for the data structures:

export interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  gradient: string;
}

export interface ChartDataItem {
  name: string;
  appointments: number;
}

export interface PieDataItem {
  name: string;
  value: number;
}

export interface GaugeDataItem {
  name: string;
  value: number;
  fill: string;
}

export interface Appointment {
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | string;
}

export interface Complaint {
  patient: string;
  issue: string;
  status: 'Open' | 'In Progress' | string;
}

export function useDashboardData() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [gaugeData, setGaugeData] = useState<GaugeDataItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch call - replace this with actual API fetch logic
    setTimeout(() => {
      setStats([
        { label: 'Total Users', value: 134, icon: User, gradient: 'from-cyan-500 to-blue-500' },
        { label: 'Total Doctors', value: 15, icon: UserCheck, gradient: 'from-purple-500 to-indigo-500' },
        { label: "Today's Appointments", value: '22 (KES 5,000)', icon: CalendarDays, gradient: 'from-green-400 to-emerald-500' },
        { label: 'Open Complaints', value: 4, icon: AlertCircle, gradient: 'from-red-400 to-pink-500' },
      ]);
      setChartData([
        { name: 'Mon', appointments: 10 },
        { name: 'Tue', appointments: 14 },
        { name: 'Wed', appointments: 8 },
        { name: 'Thu', appointments: 16 },
        { name: 'Fri', appointments: 12 },
      ]);
      setPieData([
        { name: 'Completed', value: 45 },
        { name: 'Pending', value: 20 },
        { name: 'Cancelled', value: 5 },
      ]);
      setGaugeData([{ name: 'Satisfaction', value: 78, fill: '#0f766e' }]);
      setAppointments([
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
      ]);
      setComplaints([
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
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return {
    stats,
    chartData,
    pieData,
    gaugeData,
    appointments,
    complaints,
    loading,
  };
}
