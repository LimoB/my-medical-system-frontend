import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../services/auth';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginSuccess, type DecodedToken } from '@/features/auth/authSlice';
import { Eye, EyeOff } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const LoginHeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      const res = await loginUser(formData);
      const token = res?.token;
      const role = res?.user?.role;

      if (!token || !role) {
        toast.error('Invalid login response from server.');
        return;
      }

      // Store in browser storage
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('savedEmail', formData.email);
      } else {
        sessionStorage.setItem('token', token);
      }

      // Decode and dispatch to Redux
      const decoded = jwtDecode<DecodedToken>(token);
      dispatch(loginSuccess({ token, user: decoded }));

      // Redirect by role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'doctor') {
        navigate('/doctor');
      } else {
        navigate('/user');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errMsg = err?.response?.data?.error || 'Invalid credentials';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/national-cancer.jpg')` }} // Set your image path here
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg opacity-90">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          Log In to Harmony Health Clinic
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-teal-600 border-gray-300 rounded"
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
            className={`w-full py-2 rounded transition ${loading
              ? 'bg-teal-300 cursor-not-allowed'
              : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginHeroSection;
