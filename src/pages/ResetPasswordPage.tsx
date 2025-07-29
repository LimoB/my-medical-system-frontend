import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { resetPassword, resendCode } from '../services/auth';
import { toast } from 'react-toastify';
import PasswordInput from '../components/PasswordInput';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prefillEmail = location?.state?.email || '';
  const prefillCode = location?.state?.code || '';

  const [form, setForm] = useState({
    email: prefillEmail,
    code: prefillCode,
    newPassword: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await resetPassword({ code: form.code, newPassword: form.newPassword });
      toast.success(res.message || 'Password reset successful!');
      navigate('/login');
    } catch (err: any) {
      const errMsg = err?.response?.data?.error || 'Failed to reset password';
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!form.email) {
      toast.error('Email not available to resend code.');
      return;
    }

    try {
      setIsSending(true);
      const res = await resendCode(form.email);
      toast.success(res.message || 'Code resent successfully');
    } catch (err: any) {
      const errMsg = err?.response?.data?.error || 'Failed to resend code';
      toast.error(errMsg);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background animation */}
      <div className="absolute inset-0 z-0 animate-bgMove bg-[url('/national-cancer.jpg')] bg-cover bg-center scale-110" />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/40 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 animate-scale-in">
        <h2 className="text-3xl font-extrabold text-center text-teal-800 mb-6 tracking-tight">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {form.email && (
            <div>
              <label className="block text-sm font-medium text-gray-800">Email Address</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100/80 text-gray-600 shadow-inner cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-800">Reset Code</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md bg-white/90 shadow-inner focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Enter the code sent to your email"
              />
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isSending}
                className="text-sm text-teal-600 hover:underline mt-1 flex items-center gap-1"
              >
                {isSending && <Spinner size="sm" color="text-teal-600" />}
                {isSending ? 'Sending...' : 'Resend Code'}
              </button>
            </div>
          </div>

          <PasswordInput
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 flex justify-center items-center gap-2 rounded-md font-semibold transition ${isSubmitting
              ? 'bg-teal-600 opacity-80 cursor-not-allowed'
              : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
          >
            {isSubmitting && <Spinner />}
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-800 mt-6">
          Back to{' '}
          <Link to="/login" className="text-teal-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
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

// Reusable Spinner component
const Spinner = ({
  size = 'base',
  color = 'text-white',
}: {
  size?: 'base' | 'sm';
  color?: string;
}) => {
  const spinnerSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <svg
      className={`animate-spin ${spinnerSize} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
};

export default ResetPasswordPage;
