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
}

export default function BaseTopBar({ onToggleSidebar }: BaseTopBarProps) {
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

  const role = user?.role || 'user';
  const basePath = `/${role}`;

  return (
    <header className="px-4 md:px-12 flex items-center justify-between h-20 sticky top-0 z-50 bg-transparent w-full">
      {/* Left: Sidebar toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="block lg:hidden p-3 rounded-full hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
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
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 sm:p-3 rounded-full hover:bg-gray-100 transition">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <button className="p-2 sm:p-3 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-4 p-2 pr-3 transition"
          >
            <img
              src={user?.image_url || '/default-avatar.jpg'}
              alt="User Avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-avatar.jpg';
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border border-gray-300"
            />
            <span className="hidden sm:block text-sm sm:text-base font-medium text-gray-800 truncate max-w-[100px] sm:max-w-[150px]">
              {user?.first_name
                ? `${user.first_name} ${user.last_name}`
                : user?.email || 'User'}
            </span>
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full w-52 bg-white border border-gray-200 z-50"
              >
                <div className="flex flex-col py-2 text-[15px] text-gray-700">
                  <div
                    onClick={() => {
                      navigate(`${basePath}/profile`);
                      setDropdownOpen(false);
                    }}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Profile</span>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`${basePath}/settings`);
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
