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
    console.log('📨 Verifying email with:', { email, code });

    try {
      const res = await verifyEmail({ email, code });
      toast.success(res.message || 'Email verified!');
      setMessage('✅ Verification successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || 'Verification failed';
      setMessage(errorMsg);
      toast.error(errorMsg);
      console.error('❌ Verification error:', err);
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
    console.log('🔁 Resending code to:', email);

    try {
      const res = await resendCode(email);
      toast.success(res.message || 'Code resent!');
      setMessage(res.message);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || 'Could not resend code';
      setMessage(errorMsg);
      toast.error(errorMsg);
      console.error('❌ Resend error:', err);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('/verify-bg.jpg')] bg-cover bg-center animate-bgMove scale-110" />

      {/* Glass container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl animate-scale-in">
        <h2 className="text-3xl font-extrabold text-center text-teal-800 mb-6 tracking-tight">
          Verify Your Email
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Verification Code</label>
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md bg-white/90 shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-medium flex items-center justify-center gap-2 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800'
              }`}
            >
              {loading ? (
                <>
                  <Spinner /> Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className={`w-full py-2 rounded-md border font-medium flex items-center justify-center gap-2 ${
                resendLoading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-teal-700 border-teal-700 hover:bg-teal-50'
              }`}
            >
              {resendLoading ? (
                <>
                  <Spinner color="text-teal-600" /> Resending...
                </>
              ) : (
                'Resend Verification Code'
              )}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>

      {/* Animations */}
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

// ✅ Spinner component
const Spinner = ({ color = 'text-white' }: { color?: string }) => (
  <svg
    className={`animate-spin h-5 w-5 ${color}`}
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

export default VerifyEmailPage;
