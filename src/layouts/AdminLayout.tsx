import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaMoneyCheckAlt,
  FaBullhorn,
  FaCalendarCheck,
} from 'react-icons/fa';
import AdminTopBar from '@/components/AdminTopBar';

const navItems = [
  { label: 'Dashboard', icon: FaTachometerAlt, to: '/admin/dashboard' },
  { label: 'Appointments', icon: FaCalendarAlt, to: '/admin/appointments' },
  { label: 'Doctors', icon: FaUserMd, to: '/admin/doctors' },
  { label: 'Users', icon: FaUsers, to: '/admin/users' },
  { label: 'Payments', icon: FaMoneyCheckAlt, to: '/admin/payments' },
  { label: 'Complaints', icon: FaBullhorn, to: '/admin/complaints' },
  { label: 'Manage Meetings', icon: FaCalendarCheck, to: '/admin/meetings' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen font-sans bg-[#f8f9fa] overflow-y-hidden overflow-x-auto">
      {/* Sidebar as a group for hover */}
      <aside
        className={`
          group bg-[#0f766e] text-white flex flex-col py-6 px-2
          rounded-tr-[2rem] rounded-br-[2rem] shadow-xl overflow-hidden z-40
          fixed sm:relative top-0 left-0 h-full transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-56' : 'w-[4.5rem] sm:hover:w-56'}
        `}
      >
        <nav className="flex flex-col gap-6 mt-16">
          {navItems.map(({ to, icon: Icon, label }, idx) => (
            <NavLink
              key={idx}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 py-2 px-4 rounded-xl transition-all duration-300
                ${isActive ? 'bg-white text-[#0f766e] shadow-md' : 'hover:bg-[#0e6b64] text-white'}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span
                className={`
                  text-sm whitespace-nowrap transition-opacity duration-300 ease-in-out
                  ${sidebarOpen
                    ? 'opacity-100 inline'
                    : 'opacity-0 hidden sm:group-hover:inline sm:group-hover:opacity-100'
                  }
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
          flex-1 flex flex-col transition-all duration-300 ease-in-out h-screen
          ${sidebarOpen ? 'ml-56' : 'ml-[4.5rem] sm:group-hover:ml-56'}
        `}
      >
        {/* TopBar */}
        <div className="shrink-0">
          <AdminTopBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-20 px-4 sm:px-6 pb-6">
          <Outlet />
          <footer className="mt-10 text-center text-sm">
            <p className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent font-semibold tracking-wide">
              © {new Date().getFullYear()} Harmony Health Clinic – Admin Portal
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
