// File: src/layouts/UserLayout.tsx
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
import UserTopBar from '@/components/UserTopBar'; // ✅ Shared top bar

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
        {/* ✅ Reusable Top Bar */}
        <UserTopBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-6 bg-[#f8f9fa]">
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
