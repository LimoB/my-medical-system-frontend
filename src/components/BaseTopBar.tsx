// File: src/components/topbars/BaseTopBar.tsx

import { useState, useEffect, useRef } from 'react';
import { Bell, MessageSquare, Menu, User as UserIcon, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutButton from '@/components/LogoutButton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

interface BaseTopBarProps {
  onToggleSidebar: () => void;
  greeting: string;
}

export default function BaseTopBar({ onToggleSidebar, greeting }: BaseTopBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user data from Redux state
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white px-4 md:px-6 flex items-center justify-between h-20 border-b shadow-sm sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{greeting}</h1>
      </div>

      {/* Center search */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {/* Avatar with Name Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-3 p-2 rounded-full border border-gray-200 overflow-hidden hover:ring-2 hover:ring-cyan-500 transition focus:outline-none"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {/* Avatar */}
            <img
              src={user?.image_url || '/default-avatar.jpg'} // Default avatar if image_url is not available
              alt="Profile"
              className="w-10 h-10 object-cover rounded-full"
            />
            {/* Name or Email next to avatar */}
            <span className="text-sm font-medium text-gray-700">
              {user?.name || user?.email || 'User'} {/* Show email if name is missing */}
            </span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="flex flex-col py-2 text-sm text-gray-700">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                  <LogoutButton className="text-left px-4 py-2 hover:bg-gray-100 w-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
