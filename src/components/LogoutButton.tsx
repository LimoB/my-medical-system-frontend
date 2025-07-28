// src/components/LogoutButton.tsx
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '@/features/slices/authSlice';

const LogoutButton = ({ className = '' }: { className?: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      // 🔴 Clear token/user from storage
      localStorage.removeItem('token');
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      // 🔄 Update Redux state
      dispatch(logout());

      // ✅ Show feedback and redirect
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout Error:', error);
    }
  };

  return (
    <div
      onClick={handleLogout}
      className={`cursor-pointer text-sm text-left px-4 py-2 hover:bg-gray-100 transition ${className}`}
    >
      Logout
    </div>
  );
};

export default LogoutButton;
