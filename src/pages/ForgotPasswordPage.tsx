import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../services/auth';
import { Loader2 } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      toast.success(res.message || 'Reset code sent successfully');
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 1000);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.error || 'Failed to send reset code';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('/forgot-bg.jpg')] bg-cover bg-center scale-110 animate-bgMove" />

      {/* Glass card */}
      <div className="relative z-10 max-w-md w-full p-8 bg-white/40 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl animate-scaleIn">
        <h2 className="text-3xl font-extrabold text-center text-teal-800 mb-6 tracking-tight">
          Forgot Your Password?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 flex items-center justify-center gap-2 rounded-md transition font-semibold ${
              isLoading
                ? 'bg-teal-600 cursor-not-allowed opacity-80'
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Sending...
              </>
            ) : (
              'Send Reset Code'
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-800 mt-6">
          Remembered your password?{' '}
          <Link
            to="/login"
            className="text-teal-700 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }

        @keyframes bgMove {
          0%, 100% { background-position: center center; }
          50% { background-position: center 30%; }
        }
        .animate-bgMove {
          animation: bgMove 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;
