import { useState } from 'react';
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
  CalendarDays,
} from 'lucide-react';
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
  { to: '/doctor/meetings', icon: CalendarDays, label: 'Meetings' },
];

const DoctorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen font-sans bg-[#f8f9fa] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          group bg-[#007c89] text-white flex flex-col py-6 px-2
          rounded-tr-[2rem] rounded-br-[2rem] shadow-xl overflow-hidden z-40
          fixed sm:relative top-0 left-0 h-full transition-all duration-500 ease-in-out
          ${sidebarOpen ? 'w-56' : 'w-[4.5rem]'}
          ${!sidebarOpen ? 'sm:hover:w-56' : ''}
        `}
      >
        <nav className="flex flex-col gap-6 mt-16">
          {navItems.map(({ to, icon: Icon, label }, idx) => (
            <NavLink
              key={idx}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 py-2 px-4 rounded-xl transition-all duration-300
                ${isActive ? 'bg-white text-[#007c89] shadow-md' : 'hover:bg-[#006d77] text-white'}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span
                className={`
                  text-sm whitespace-nowrap transition-opacity duration-300 ease-in-out
                  ${sidebarOpen ? 'opacity-100 inline' : 'opacity-0 hidden sm:inline sm:group-hover:opacity-100'}
                `}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-500 ease-in-out h-screen
          ${sidebarOpen ? 'ml-56' : 'ml-[4.5rem] sm:hover:ml-56'}
        `}
      >
        {/* Fixed TopBar */}
        <div className="shrink-0">
          <DoctorTopBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-20 px-4 sm:px-6 pb-6">
          <Outlet />
          <footer className="mt-10 text-center text-sm">
            <p className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent font-semibold tracking-wide">
              © {new Date().getFullYear()} Harmony Health Clinic – Doctor Portal
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
