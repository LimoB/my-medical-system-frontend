import { useState, useEffect, useRef } from 'react';
import { Bell, MessageSquare, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutButton from '@/components/LogoutButton';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
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
    <header className="bg-white px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 h-16 shadow-sm border-b border-gray-100">
      {/* Left: Sidebar toggle and search */}
      <div className="flex items-center gap-4">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Search input (hidden on small screens) */}
        <div className="hidden sm:block w-48 md:w-72">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full px-4 py-2 text-sm border border-gray-200 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Right: Icons + Avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100 transition">
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </button>

        {/* Profile + Animated Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="/logo.jpeg"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 hover:ring-2 hover:ring-teal-400 transition duration-150"
            onClick={() => setDropdownOpen((prev) => !prev)}
          />
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-md z-50 overflow-hidden"
              >
                <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Settings
                </div>
                <LogoutButton className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
