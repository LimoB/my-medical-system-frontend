import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/service', label: 'Service' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/help', label: 'Help' },
  { to: '/insights', label: 'Health Insights' },
];

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isActive = useMemo(
    () => (path: string) => location.pathname === path,
    [location.pathname]
  );

  const linkClasses = (path: string) =>
    `transition font-medium ${
      isActive(path)
        ? 'text-teal-600 underline underline-offset-4'
        : 'text-black hover:text-teal-500'
    }`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/harmony.png" alt="HarmonyClinic" className="h-8 w-8" />
          <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
            Harmony Health<span className="text-black">Clinic</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={linkClasses(to)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/register" className="text-black hover:underline">Sign Up</Link>
          <Link
            to="/login"
            className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition"
          >
            Log In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          className="md:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md md:hidden animate-slide-down border-t border-gray-200 shadow-md"
          >
            <div className="flex flex-col space-y-4 p-6 text-black">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={linkClasses(to)}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <hr className="border-gray-300" />
              <Link to="/register" className="hover:underline" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-teal-600 text-white text-center py-2 rounded-full hover:bg-teal-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
