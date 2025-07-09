import StatCards from './components/StatCards';
import WeeklyAppointmentsChart from './components/WeeklyAppointmentsChart';
import AppointmentStatusPieChart from './components/AppointmentStatusPieChart';
import PatientSatisfactionGauge from './components/PatientSatisfactionGauge';
import RecentAppointments from './components/RecentAppointments';
import RecentComplaints from './components/RecentComplaints';
import { useDashboardData } from '../hooks/useDashboardData';

export default function AdminDashboard() {
  const { loading } = useDashboardData();

  if (loading) return <p className="p-6 text-center">Loading dashboard...</p>;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="p-6 space-y-8">
        <StatCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WeeklyAppointmentsChart />
          <AppointmentStatusPieChart />
          <PatientSatisfactionGauge />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentAppointments />
          <RecentComplaints />
        </div>
      </div>
    </div>
  );
}
