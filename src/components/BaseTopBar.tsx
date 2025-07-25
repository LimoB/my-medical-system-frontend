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

  // Your role-based notification navigation function
  const handleNotificationClick = () => {
    if (!user?.role) return; // safety check

    switch (user.role) {
      case 'admin':
        navigate('/admin/notifications');
        break;
      case 'doctor':
        navigate('/doctor/notifications');
        break;
      case 'user':
      default:
        navigate('/user/notifications');
        break;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between bg-transparent">
      {/* Sidebar Toggle (Mobile) */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="block sm:hidden p-2 rounded-full hover:bg-[#f0fdfa] focus:outline-none"
        >
          <Menu className="w-5 h-5 text-[#0f766e]" />
        </button>
      </div>

      {/* Center: Search Bar (Desktop only) */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-5 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0f766e] bg-white/80 backdrop-blur-sm"
        />
      </div>

      {/* Right Side: Icons + User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Message icon (no change) */}
        <button className="p-2 rounded-full hover:bg-[#f0fdfa] transition">
          <MessageSquare className="w-5 h-5 text-[#0f766e]" />
        </button>

        {/* Notification icon with role-based navigation */}
        <button
          onClick={handleNotificationClick}
          className="p-2 rounded-full hover:bg-[#f0fdfa] transition"
        >
          <Bell className="w-5 h-5 text-[#0f766e]" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 sm:p-2 pr-2 sm:pr-3"
          >
            <img
              src={user?.image_url || '/default-avatar.jpg'}
              alt="User Avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-avatar.jpg';
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-full border border-gray-300"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-800 truncate max-w-[100px] sm:max-w-[140px]">
              {user?.first_name
                ? `${user.first_name} ${user.last_name}`
                : user?.email || 'User'}
            </span>
          </button>

          {/* Dropdown Content */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-md z-50"
              >
                <div className="flex flex-col py-2 text-sm text-gray-700">
                  <div
                    onClick={() => {
                      navigate(`${basePath}/profile`);
                      setDropdownOpen(false);
                    }}
                    className="px-5 py-3 hover:bg-[#f0fdfa] cursor-pointer flex items-center gap-3"
                  >
                    <UserIcon className="w-5 h-5 text-[#0f766e]" />
                    <span>Profile</span>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`${basePath}/settings`);
                      setDropdownOpen(false);
                    }}
                    className="px-5 py-3 hover:bg-[#f0fdfa] cursor-pointer flex items-center gap-3"
                  >
                    <Settings className="w-5 h-5 text-[#0f766e]" />
                    <span>Settings</span>
                  </div>
                  <LogoutButton className="text-left px-5 py-3 hover:bg-[#f0fdfa] w-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
