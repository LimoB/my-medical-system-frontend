// src/layouts/UserLayout.tsx
import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import LogoutButton from '../components/LogoutButton';
import {
  LayoutDashboard,
  CalendarCheck2,
  UserCircle2,
  Bell,
  Menu,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user from Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-teal-700 text-white w-64 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static z-20 h-full`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">User Panel</h2>
          <nav className="flex flex-col space-y-4 text-sm">
            <Link to="/user" className="flex items-center gap-2 hover:underline">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              to="/user/book-appointment"
              className="flex items-center gap-2 hover:underline"
            >
              <CalendarCheck2 size={18} /> Book Appointment
            </Link>
            <Link to="/user/profile" className="flex items-center gap-2 hover:underline">
              <UserCircle2 size={18} /> Profile
            </Link>
            <Link
              to="/user/notifications"
              className="flex items-center gap-2 hover:underline relative"
            >
              <Bell size={18} /> Notifications
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                3
              </span>
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-teal-600">
          <LogoutButton />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-teal-700 md:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-lg font-semibold">Welcome to Harmony Health Clinic</h1>

          {/* User Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-medium text-teal-800 hover:text-teal-900"
              >
                <img
                  src={user.avatarUrl || '/avatar-placeholder.png'}
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

        <main className="flex-grow p-6">
          <Outlet />
        </main>

        <footer className="bg-gray-200 text-center text-sm py-4 text-gray-600">
          © {new Date().getFullYear()} Harmony Health Clinic – User Portal
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
