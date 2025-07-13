import { useState, useEffect, useRef } from 'react';
import {
  Bell,
  MessageSquare,
  Menu,
  User as UserIcon,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutButton from '@/components/LogoutButton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

interface BaseTopBarProps {
  onToggleSidebar: () => void;
  greeting: string;
}

export default function BaseTopBar({ onToggleSidebar, greeting }: BaseTopBarProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white px-6 md:px-12 flex items-center justify-between h-24 border-b shadow-md sticky top-0 z-50">
      {/* Left: Sidebar toggle & greeting */}
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-3 rounded-full hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{greeting}</h1>
      </div>

      {/* Center: Search */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-5 py-3 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-5">
        <button className="p-3 rounded-full hover:bg-gray-100 transition">
          <MessageSquare className="w-6 h-6 text-gray-700" />
        </button>
        <button className="p-3 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-4 p-2 pr-4 rounded-full border border-gray-200 hover:ring-2 hover:ring-cyan-500 transition"
          >
            <img
              src={user?.image_url || '/default-avatar.jpg'}
              alt="User Avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-avatar.jpg';
              }}
              className="w-12 h-12 object-cover rounded-full border border-gray-300"
            />
            <span className="text-base font-medium text-gray-800 truncate max-w-[150px]">
              {user?.first_name
                ? `${user.first_name} ${user.last_name}`
                : user?.email || 'User'}
            </span>
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="flex flex-col py-2 text-[15px] text-gray-700">
                  <div
                    onClick={() => {
                      navigate('/admin/profile');
                      setDropdownOpen(false);
                    }}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Profile</span>
                  </div>
                  <div
                    onClick={() => {
                      navigate('/admin/settings');
                      setDropdownOpen(false);
                    }}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </div>
                  <LogoutButton className="text-left px-5 py-3 hover:bg-gray-100 w-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
