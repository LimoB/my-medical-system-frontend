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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ code: form.code, newPassword: form.newPassword });
      toast.success(res.message || 'Password reset successful!');
      navigate('/login');
    } catch (err: any) {
      const errMsg = err?.response?.data?.error || 'Failed to reset password';
      toast.error(errMsg);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {form.email && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Reset Code</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter the code sent to your email"
              />
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isSending}
                className="text-sm text-teal-600 hover:underline mt-1"
              >
                {isSending ? 'Sending...' : 'Resend Code'}
              </button>
            </div>
          </div>

          {/* Reusable password input with strength meter */}
          <PasswordInput
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
          />

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Back to{' '}
          <Link to="/login" className="text-teal-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
