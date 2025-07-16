import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Calendar,
  Video,
  PieChart,
  Users,
  ClipboardList,
  FileText,
  DollarSign,
  AlertCircle,
  CalendarDays, // ✅ Optional: use CalendarDays instead of Calendar if you want variety
} from 'lucide-react';
import { useState } from 'react';
import DoctorTopBar from '@/components/DoctorTopBar';

const navItems = [
  { to: '/doctor/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { to: '/doctor/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/doctor/appointments', icon: ClipboardList, label: 'Appointments' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/prescriptions', icon: FileText, label: 'Prescriptions' },
  { to: '/doctor/consultation', icon: Video, label: 'Consultation' },
  { to: '/doctor/complaints', icon: AlertCircle, label: 'Complaints' },
  { to: '/doctor/payments', icon: DollarSign, label: 'Payments' },
  { to: '/doctor/reports', icon: PieChart, label: 'Reports' },
  { to: '/doctor/meetings', icon: CalendarDays, label: 'Meetings' }, // ✅ New link
];

const DoctorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen font-sans bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside
        className={`group transition-all duration-500 ease-in-out
          ${sidebarOpen ? 'w-56' : 'w-0 sm:w-[4.5rem] hover:w-56'}
          bg-[#007c89] text-white flex flex-col py-6 px-2 
          rounded-tr-[2rem] rounded-br-[2rem] shadow-xl overflow-hidden fixed sm:relative z-50`}
      >
        <nav className="flex flex-col gap-6 mt-12">
          {navItems.map(({ to, icon: Icon, label }, idx) => (
            <NavLink
              key={idx}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 py-2 px-4 rounded-xl transition-all duration-300 whitespace-nowrap
                ${isActive
                  ? 'bg-white text-[#007c89] shadow-md'
                  : 'hover:bg-[#006d77] text-white'}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden lg:inline group-hover:inline opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-sm">
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 sm:ml-[4.5rem]">
        {/* Top Bar */}
        <DoctorTopBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8f9fa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
