import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const linkClasses = (path: string) =>
    `transition font-medium ${
      location.pathname === path
        ? 'text-teal-600 underline underline-offset-4'
        : 'text-black hover:text-teal-500'
    }`;

  // Close on outside click
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
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md">
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
          <Link to="/" className={linkClasses('/')}>Home</Link>
          <Link to="/about" className={linkClasses('/about')}>About Us</Link>
          <Link to="/doctors" className={linkClasses('/doctors')}>Doctors</Link>
          <Link to="/service" className={linkClasses('/service')}>Service</Link>
          <Link to="/contact" className={linkClasses('/contact')}>Contact Us</Link>
          <Link to="/help" className={linkClasses('/help')}>Help</Link>
          <Link to="/insights" className={linkClasses('/insights')}>Health Insights</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/register" className="text-black hover:underline">Sign Up</Link>
          <Link
            to="/login"
            className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition"
          >
            Log In
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-white/40 backdrop-blur-md md:hidden animate-slide-down"
          >
            <div className="flex flex-col space-y-4 p-6 text-black">
              <Link to="/" className={linkClasses('/')} onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" className={linkClasses('/about')} onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link to="/doctors" className={linkClasses('/doctors')} onClick={() => setMenuOpen(false)}>Doctors</Link>
              <Link to="/service" className={linkClasses('/service')} onClick={() => setMenuOpen(false)}>Service</Link>
              <Link to="/contact" className={linkClasses('/contact')} onClick={() => setMenuOpen(false)}>Contact Us</Link>
              <Link to="/help" className={linkClasses('/help')} onClick={() => setMenuOpen(false)}>Help</Link>
              <Link to="/insights" className={linkClasses('/insights')} onClick={() => setMenuOpen(false)}>Health Insights</Link>
              <Link to="/register" className="hover:underline" onClick={() => setMenuOpen(false)}>Sign Up</Link>
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
