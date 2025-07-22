import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck2,
  FileText,
  CreditCard,
  MessageSquare,
  Bell,
} from 'lucide-react';
import UserTopBar from '@/components/UserTopBar';

const navItems = [
  { to: '/user', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/user/book-appointment', icon: CalendarCheck2, label: 'Book Appointment' },
  { to: '/user/appointments', icon: CalendarCheck2, label: 'My Appointments' },
  { to: '/user/prescriptions', icon: FileText, label: 'Prescriptions' },
  { to: '/user/payments', icon: CreditCard, label: 'Payments' },
  { to: '/user/complaints', icon: MessageSquare, label: 'Complaints' },
  { to: '/user/notifications', icon: Bell, label: 'Notifications' },
];

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState<number | null>(null);

  // Show label for 3 seconds on icon click
  const handleIconClick = (idx: number) => {
    setActiveLabel(idx);
    setTimeout(() => {
      setActiveLabel(null);
    }, 3000);
  };

  return (
    <div className="flex h-screen font-sans bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside
        className={`w-[4.5rem] bg-[#0f766e] text-white flex flex-col py-6 px-2 
        rounded-tr-[2rem] rounded-br-[2rem] shadow-xl overflow-hidden fixed z-50 h-full sm:${sidebarOpen ? 'w-56' : 'w-[4.5rem] hover:w-56'} transition-all`}
      >
        <nav className="flex flex-col gap-6 mt-12 relative">
          {navItems.map(({ to, icon: Icon, label }, idx) => (
            <div className="relative" key={idx}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center justify-center sm:justify-start gap-4 py-2 px-4 rounded-xl transition-all duration-300 whitespace-nowrap
                  ${isActive ? 'bg-white text-[#0f766e] shadow-md' : 'hover:bg-[#0e6b64] text-white'}`
                }
                onClick={() => handleIconClick(idx)}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="hidden sm:inline lg:inline group-hover:inline text-sm">
                  {label}
                </span>
              </NavLink>

              {/* Floating Label on Mobile */}
              {activeLabel === idx && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md shadow-md sm:hidden z-50 animate-fade-in-out">
                  {label}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-[4.5rem] sm:ml-[4.5rem]">
        {/* Top Bar */}
        <UserTopBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-6 bg-[#f8f9fa] pb-20">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="text-center text-sm py-6">
          <p className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent font-semibold tracking-wide">
            © {new Date().getFullYear()} Harmony Health Clinic – Patient Portal
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
