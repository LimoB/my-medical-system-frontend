import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaMoneyCheckAlt,
  FaBullhorn,
} from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import AdminTopBar from '@/components/AdminTopBar';

const navItems = [
  { label: 'Dashboard', icon: FaTachometerAlt, to: '/admin/dashboard' },
  { label: 'Appointments', icon: FaCalendarAlt, to: '/admin/appointments' },
  { label: 'Doctors', icon: FaUserMd, to: '/admin/doctors' },
  { label: 'Users', icon: FaUsers, to: '/admin/users' },
  { label: 'Payments', icon: FaMoneyCheckAlt, to: '/admin/payments' },
  { label: 'Complaints', icon: FaBullhorn, to: '/admin/complaints' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans">
      {/* Sidebar */}
      <aside
        className={`group transition-all duration-500 ease-in-out
        ${sidebarOpen ? 'w-56' : 'w-0 sm:w-[4.5rem] hover:w-56'}
        bg-gradient-to-b from-teal-600 to-emerald-500 text-white flex flex-col py-6 px-2 
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
                  ? 'bg-white text-[#0f766e] shadow-md'
                  : 'hover:bg-[#0e6b64] text-white'}`
              }
              onClick={() => setSidebarOpen(false)}
              data-tooltip-id={sidebarOpen ? undefined : `tip-${label}`}
              data-tooltip-content={sidebarOpen ? undefined : label}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden lg:inline group-hover:inline opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-sm">
                {label}
              </span>
              {!sidebarOpen && (
                <Tooltip id={`tip-${label}`} place="right" className="z-50" />
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 sm:ml-[4.5rem]">
        {/* Top Bar */}
        <AdminTopBar onToggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8f9fa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
