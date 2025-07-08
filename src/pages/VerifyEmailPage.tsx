import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmail, resendCode } from '../services/auth';
import { toast } from 'react-toastify';

const VerifyEmailPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await verifyEmail({ email, code });
      toast.success(res.message || 'Email verified!');
      setMessage('Verification successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || 'Verification failed';
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    setResendLoading(true);
    setMessage('');

    try {
      const res = await resendCode(email);
      toast.success(res.message || 'Code resent!');
      setMessage(res.message);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || 'Could not resend code';
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">
          Verify Your Email
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Verification Code</label>
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition ${
                loading ? 'bg-gray-400' : 'bg-teal-700 hover:bg-teal-800'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className={`w-full py-2 rounded-md border transition ${
                resendLoading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-teal-700 border-teal-700 hover:bg-teal-50'
              }`}
            >
              {resendLoading ? 'Resending...' : 'Resend Verification Code'}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
