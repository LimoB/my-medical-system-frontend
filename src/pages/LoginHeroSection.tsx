import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/auth';
import { loginSuccess } from '@/features/slices/authSlice';
import type { DecodedToken } from '@/types/auth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const LoginHeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();

    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await loginUser(formData);

      if (!token || !user) {
        toast.error('Invalid login response from server.');
        return;
      }

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('savedEmail', formData.email);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      dispatch(loginSuccess({ token, user: user as DecodedToken }));

      toast.success('Login successful!', {
        autoClose: 2000,
        pauseOnHover: true,
      });

      // Delay navigation to allow toast to show
      setTimeout(() => {
        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'doctor':
            navigate('/doctor');
            break;
          default:
            navigate('/user');
            break;
        }
      }, 1500);
    } catch (err: any) {
      console.error('Login error:', err);
      const errMsg = err?.response?.data?.error || 'Invalid credentials';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 animate-bgMove bg-[url('/national-cancer.jpg')] bg-cover bg-center scale-110" />

      {/* Glassy login card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/40 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 animate-scale-in">
        <h2 className="text-3xl font-extrabold text-center text-teal-800 mb-6 tracking-tight">
          Log In to Harmony Health Clinic
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-800 font-medium">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner pr-10 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-teal-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-teal-700 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md font-semibold text-white transition-all duration-300
              ${loading ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800'}`}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-800 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-teal-700 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Tailwind animations */}
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        @keyframes bgMove {
          0%, 100% {
            background-position: center center;
          }
          50% {
            background-position: center 30%;
          }
        }

        .animate-bgMove {
          animation: bgMove 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginHeroSection;
