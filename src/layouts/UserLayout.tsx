import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck2,
  FileText,
  CreditCard,
  MessageSquare,
  UserCircle2,
  Bell,
  LogOut,
  Menu,
  ChevronDown,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutButton from '@/components/LogoutButton';
import type { RootState } from '@/store/store';

const navItems = [
  { to: '/user', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/user/book-appointment', icon: CalendarCheck2, label: 'Book Appointment' },
  { to: '/user/appointments', icon: CalendarCheck2, label: 'My Appointments' },
  { to: '/user/prescriptions', icon: FileText, label: 'Prescriptions' },
  { to: '/user/payments', icon: CreditCard, label: 'Payments' },
  { to: '/user/complaints', icon: MessageSquare, label: 'Complaints' },
  { to: '/user/profile', icon: UserCircle2, label: 'Profile' },
  { to: '/user/notifications', icon: Bell, label: 'Notifications' },
  { to: '/logout', icon: LogOut, label: 'Logout' },
];

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    setDropdownOpen(false);
  };

  return (
    <div className="flex h-screen font-sans bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside
        className={`group transition-all duration-500 ease-in-out
        ${sidebarOpen ? 'w-56' : 'w-0 sm:w-[4.5rem] hover:w-56'}
        bg-[#0f766e] text-white flex flex-col py-6 px-2 
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
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="text-teal-700 sm:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-lg font-semibold text-gray-800">
            Welcome to Harmony Health Clinic
          </h1>

          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-medium text-teal-800 hover:text-teal-900"
              >
                <img
                  src={user.image_url || '/avatar-placeholder.png'}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                {user.first_name}
                <ChevronDown size={18} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-44 z-30"
                  >
                    <button
                      onClick={() => handleLinkClick('/user/profile')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleLinkClick('/user/notifications')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Notifications
                    </button>
                    <div className="border-t border-gray-200 my-1" />
                    <div className="px-4 py-2">
                      <LogoutButton />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-6 bg-[#f8f9fa]">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 text-center text-sm py-4 text-gray-600">
          © {new Date().getFullYear()} Harmony Health Clinic – Patient Portal
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
