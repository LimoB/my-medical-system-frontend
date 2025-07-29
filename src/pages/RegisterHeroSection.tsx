import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../services/auth';
import type { RegisterData } from '../types/auth';
import PasswordInput from '../components/PasswordInput';
import { Loader2 } from 'lucide-react'; // 🌀 Spinner icon
import 'react-toastify/dist/ReactToastify.css';

const RegisterHeroSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<RegisterData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    contact_phone: '',
    address: '',
    role: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`🖊️ Input changed: ${name} = ${value}`);

    if (name === 'role') {
      setFormData({ ...formData, role: value as 'user' | 'admin' | 'doctor' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("📨 Form submitted with data:", formData);

    try {
      const res = await registerUser(formData);
      console.log("✅ Registration API success:", res);

      toast.success(res.message || 'Registration successful!', {
        autoClose: 2000,
        pauseOnHover: true,
      });

      setTimeout(() => {
        console.log("🔁 Redirecting to email verification...");
        navigate('/verify-email', {
          state: { email: formData.email },
        });
      }, 1500);
    } catch (err: any) {
      const errMsg = err?.response?.data?.error || 'Registration failed';
      console.error("❌ Registration API error:", err);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background animation */}
      <div className="absolute inset-0 z-0 animate-bgMove bg-[url('/national-cancer.jpg')] bg-cover bg-center scale-110" />

      {/* Glassy registration card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/40 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 animate-scale-in">
        <h2 className="text-3xl font-extrabold text-center text-teal-800 mb-6 tracking-tight">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-800">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-800">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-800">Phone</label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="user">User / Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-2 px-4 font-semibold text-white rounded-md transition-all duration-300 ${
              loading ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800'
            }`}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-sm text-center text-gray-800 mt-6 space-y-1">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-teal-700 font-semibold hover:underline">
              Log In
            </Link>
          </p>
          <p>
            Already registered and have a code?{' '}
            <Link to="/verify-email" className="text-teal-700 font-semibold hover:underline">
              Verify Email
            </Link>
          </p>
        </div>
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

export default RegisterHeroSection;
