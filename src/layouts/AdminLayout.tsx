import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaMoneyCheckAlt,
  FaBullhorn,
  FaCog,
  FaBars,
} from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import TopBar from '@/components/TopBar'; // ✅ Adjust import path if needed

const sidebarItems = [
  { label: 'Dashboard', icon: <FaTachometerAlt />, to: '/admin/dashboard' },
  { label: 'Appointments', icon: <FaCalendarAlt />, to: '/admin/appointments' },
  { label: 'Doctors', icon: <FaUserMd />, to: '/admin/doctors' },
  { label: 'Users', icon: <FaUsers />, to: '/admin/users' },
  { label: 'Payments', icon: <FaMoneyCheckAlt />, to: '/admin/payments' },
  { label: 'Complaints', icon: <FaBullhorn />, to: '/admin/complaints' },
  { label: 'Settings', icon: <FaCog />, to: '/admin/settings' },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } bg-gradient-to-b from-teal-600 to-emerald-500 text-white flex flex-col py-6 shadow-lg transition-all duration-300 ease-in-out rounded-r-3xl`}
      >
        {/* Toggle Button */}
        <div className="flex justify-between items-center px-4 mb-8">
          {!collapsed && (
            <div className="text-xl font-semibold tracking-wide">Harmony</div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-white/80 focus:outline-none text-xl"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              data-tooltip-id={collapsed ? `tip-${item.label}` : undefined}
              data-tooltip-content={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {collapsed && (
                <Tooltip id={`tip-${item.label}`} place="right" className="z-50" />
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
