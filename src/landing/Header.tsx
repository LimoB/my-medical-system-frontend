// File: src/landing/Header.tsx
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `hover:text-teal-600 transition ${
      location.pathname === path ? 'text-teal-700 underline underline-offset-4 font-semibold' : 'text-gray-700'
    }`;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/harmony.png" alt="HarmonyClinic" className="h-8 w-8" />
          <span className="text-xl font-bold text-teal-700">
            Harmony Health<span className="text-green-600">Clinic</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className={linkClasses('/')}>Home</Link>
          <a href="#services" className="hover:text-teal-600">Service</a>
          <a href="#contact" className="hover:text-teal-600">Contact Us</a>
          <a href="#help" className="hover:text-teal-600">Help</a>
          <a href="#insights" className="hover:text-teal-600">Health Insights</a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/register" className="text-teal-700 hover:underline font-medium">Sign Up</Link>
          <Link
            to="/login"
            className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
